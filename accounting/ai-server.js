const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const db_path = path.join(__dirname, 'data', 'cards.db');
const db = new Database(db_path);

function ensure_tables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS chapters (id TEXT PRIMARY KEY, title TEXT, description TEXT);
    CREATE TABLE IF NOT EXISTS cards (id TEXT PRIMARY KEY, chapter_id TEXT, q TEXT, a TEXT, o TEXT, explanation TEXT, explanations TEXT, category TEXT);
  `);
}
ensure_tables();

// simple CRUD for chapters
app.get('/api/chapters', (req, res) => {
  const rows = db.prepare('SELECT * FROM chapters').all();
  res.json({ chapters: rows });
});
app.get('/api/chapters/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM chapters WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});
app.post('/api/chapters', (req, res) => {
  const { id, title, description } = req.body;
  try { db.prepare('INSERT INTO chapters (id, title, description) VALUES (?, ?, ?)').run(id, title, description); res.status(201).json({ id }); }
  catch (err) { res.status(400).json({ error: String(err) }); }
});
app.put('/api/chapters/:id', (req, res) => { const { title, description } = req.body; db.prepare('UPDATE chapters SET title = ?, description = ? WHERE id = ?').run(title, description, req.params.id); res.json({ ok: true }); });
app.delete('/api/chapters/:id', (req, res) => { db.prepare('DELETE FROM chapters WHERE id = ?').run(req.params.id); res.json({ ok: true }); });

// simple CRUD for cards
app.get('/api/cards', (req, res) => { const rows = db.prepare('SELECT * FROM cards').all(); res.json({ cards: rows }); });
app.get('/api/cards/:id', (req, res) => { const row = db.prepare('SELECT * FROM cards WHERE id = ?').get(req.params.id); if (!row) return res.status(404).json({ error: 'Not found' }); res.json(row); });
app.post('/api/cards', (req, res) => {
  const { id, chapter_id, q, a, o, explanation, explanations, category } = req.body;
  try {
    db.prepare('INSERT INTO cards (id, chapter_id, q, a, o, explanation, explanations, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .run(id, chapter_id, q, a, JSON.stringify(o || []), explanation || '', JSON.stringify(explanations || {}), category || '');
    res.status(201).json({ id });
  } catch (err) { res.status(400).json({ error: String(err) }); }
});
app.put('/api/cards/:id', (req, res) => {
  const { chapter_id, q, a, o, explanation, explanations, category } = req.body;
  db.prepare('UPDATE cards SET chapter_id = ?, q = ?, a = ?, o = ?, explanation = ?, explanations = ?, category = ? WHERE id = ?')
    .run(chapter_id, q, a, JSON.stringify(o || []), explanation || '', JSON.stringify(explanations || {}), category || '', req.params.id);
  res.json({ ok: true });
});
app.delete('/api/cards/:id', (req, res) => { db.prepare('DELETE FROM cards WHERE id = ?').run(req.params.id); res.json({ ok: true }); });

// AI helper utilities (parse TypeScript card source with regex)
const OLLAMA_BASE = process.env.OLLAMA_BASE || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama-2-7b';
const dataRoot = path.join(__dirname, 'src', 'data');
const keywordIndexPath = path.join(dataRoot, 'ai', 'keywordIndex.json');
const cardSourceDir = path.join(dataRoot, 'cards');
const fsrsDir = path.join(__dirname, 'data', 'fsrs');

function updateFSRSCard(card, grade) {
  const now = new Date().toISOString();
  const updated = { ...card };
  updated.reviews = [...(card.reviews || []), { date: now, rating: grade }];
  const difficultyChange = (5 - grade) * 0.1;
  updated.difficulty = Math.max(0, Math.min(1, (card.difficulty || 0.3) - difficultyChange * 0.2));
  const efMultiplier = 1.3 - (5 - grade) * 0.1;
  updated.stability = Math.max(1, (card.stability || 1) * efMultiplier);
  if (!card.repetitions || card.repetitions === 0) updated.interval = 1;
  else if (card.repetitions === 1) updated.interval = 3;
  else updated.interval = Math.ceil((card.interval || 1) * updated.stability);
  updated.retrievability = 0.5;
  updated.repetitions = (card.repetitions || 0) + 1;
  updated.lastReview = now;
  updated.nextReview = new Date(Date.now() + updated.interval * 24 * 60 * 60 * 1000).toISOString();
  return updated;
}

function normalizeAnswer(card) {
  const ans = (card.a || '').toString().trim();
  if (/^[A-D]$/i.test(ans)) return ans.toUpperCase();
  const idx = (card.o || []).findIndex((opt) => opt.trim().toLowerCase() === ans.toLowerCase());
  if (idx >= 0) return String.fromCharCode(65 + idx);
  return ans;
}

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

function parseCardsFromSource(filePath, chapterId) {
  const source = fs.readFileSync(filePath, 'utf8');
  const sectionMatch = source.match(/export const cards[\s\S]*?=\s*\[([\s\S]*?)\];/m);
  if (!sectionMatch) return [];
  const sectionText = sectionMatch[1];
  const objects = sectionText.split(/\n\s*},\s*\n/).map((s) => s.trim()).filter(Boolean);
  return objects.map((objText, index) => {
    const qMatch = objText.match(/q:\s*"((?:\\.|[^"\\])*)"/);
    const aMatch = objText.match(/a:\s*"((?:\\.|[^"\\])*)"/);
    const explanationMatch = objText.match(/explanation:\s*"((?:\\.|[^"\\])*)"/);
    const oMatch = objText.match(/o:\s*\[([\s\S]*?)\]/m);
    const options = oMatch ? Array.from(oMatch[1].matchAll(/"((?:\\.|[^"\\])*)"/g)).map((m) => m[1]) : [];
    const q = qMatch ? qMatch[1] : '';
    const a = aMatch ? aMatch[1] : '';
    const explanation = explanationMatch ? explanationMatch[1].replace(/\\"/g, '"') : '';
    return {
      id: `${chapterId}-idx-${String(index + 1).padStart(2, '0')}`,
      q,
      o: options,
      a: normalizeAnswer({ a, o: options }),
      explanation,
      explanations: options.reduce((acc, _, i) => { acc[String.fromCharCode(65 + i)] = ''; return acc; }, {}),
    };
  });
}

function loadKeywordIndex() {
  if (!fs.existsSync(keywordIndexPath)) return {};
  return JSON.parse(fs.readFileSync(keywordIndexPath, 'utf8'));
}

function buildCardMap() {
  const map = new Map();
  if (!fs.existsSync(cardSourceDir)) return map;
  const files = fs.readdirSync(cardSourceDir).filter((f) => f.endsWith('.ts'));
  for (const file of files) {
    const chapterId = file.replace('.ts', '').replace('chapter', 'chapter-');
    const cards = parseCardsFromSource(path.join(cardSourceDir, file), chapterId);
    for (const c of cards) map.set(c.id, c);
  }
  return map;
}

const keywordIndex = loadKeywordIndex();
const cardsById = buildCardMap();
const allCards = Array.from(cardsById.values());

function rankCardIds(tokens) {
  const scores = {};
  for (const t of tokens) {
    const ids = keywordIndex[t] || [];
    for (const id of ids) scores[id] = (scores[id] || 0) + 1;
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([id]) => id);
}

function findCards(question) {
  const tokens = tokenize(question);
  const ranked = rankCardIds(tokens);
  const results = ranked.map((id) => cardsById.get(id)).filter(Boolean);
  if (results.length) return { cards: results.slice(0, 8), tokens };
  const fallback = allCards.filter((card) => {
    const target = `${card.q} ${(card.o || []).join(' ')}`.toLowerCase();
    return question.toLowerCase().split(/\s+/).some((term) => term && target.includes(term));
  });
  return { cards: fallback.slice(0, 8), tokens };
}

async function proxyOllama(body) {
  const resp = await fetch(`${OLLAMA_BASE}/api/generate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await resp.json();
  return { ok: resp.ok, status: resp.status, data };
}

app.get('/api/ai/query', (req, res) => { const question = String(req.query.question || ''); if (!question.trim()) return res.status(400).json({ error: 'Missing question' }); const { cards, tokens } = findCards(question); res.json({ question, tokens, cards }); });

app.post('/api/ai/answer', async (req, res) => {
  try {
    const question = String((req.body && req.body.question) || '').trim();
    if (!question) return res.status(400).json({ error: 'Missing question' });
    const { cards } = findCards(question);
    const contextLines = cards.map((card) => `Q: ${card.q} | A: ${card.a}${card.explanation ? ` | Explanation: ${card.explanation}` : ''}`);
    const prompt = `Answer the user question using only the following deterministic card facts. Do not invent new information.\n\n${contextLines.join('\n')}\n\nQuestion: ${question}\nAnswer:`;
    const { ok, data } = await proxyOllama({ model: OLLAMA_MODEL, prompt, max_tokens: 256, temperature: 0.5 });
    if (!ok) return res.status(502).json({ error: 'Ollama proxy failed', details: data });
    const answerText = typeof data === 'object' && data?.output ? data.output : JSON.stringify(data);
    res.json({ answer: answerText, context: contextLines, raw: data });
  } catch (err) { res.status(500).json({ error: 'Failed', details: String(err) }); }
});

app.post('/api/generate', async (req, res) => { try { const { ok, data } = await proxyOllama(req.body || {}); return res.status(ok ? 200 : 502).json(data); } catch (err) { return res.status(500).json({ error: String(err) }); } });
app.get('/api/ai/health', (req, res) => res.json({ status: 'ok', model: OLLAMA_MODEL }));

app.get('/api/fsrs/chapters', (req, res) => {
  try {
    const chapterIds = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4'];
    const chapters = [];
    for (const id of chapterIds) {
      const fsrsPath = path.join(fsrsDir, `${id}.json`);
      if (fs.existsSync(fsrsPath)) chapters.push(JSON.parse(fs.readFileSync(fsrsPath, 'utf8')));
    }
    res.json({ chapters });
  } catch (err) { res.status(500).json({ error: String(err) }); }
});

app.post('/api/fsrs/update', (req, res) => {
  try {
    const { chapterId, cardQuestion, grade } = req.body || {};
    if (!chapterId || !cardQuestion || !grade || ![1,2,3,4].includes(grade)) return res.status(400).json({ error: 'Missing/invalid params' });
    const fsrsPath = path.join(fsrsDir, `${chapterId}.json`);
    if (!fs.existsSync(fsrsPath)) return res.status(404).json({ error: 'FSRS file not found' });
    const chapter = JSON.parse(fs.readFileSync(fsrsPath, 'utf8'));
    const idx = chapter.cards.findIndex((c) => c.q === cardQuestion);
    if (idx < 0) return res.status(404).json({ error: 'Card not found' });
    const updated = updateFSRSCard(chapter.cards[idx], grade);
    chapter.cards[idx] = updated;
    fs.writeFileSync(fsrsPath, JSON.stringify(chapter, null, 2));
    res.json({ success: true, card: updated });
  } catch (err) { res.status(500).json({ error: String(err) }); }
});

const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`API server listening on http://localhost:${port}`); console.log(`Proxying Ollama at ${OLLAMA_BASE}`); });


