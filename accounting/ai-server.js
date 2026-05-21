const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const OLLAMA_BASE = process.env.OLLAMA_BASE || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama-2-7b';

const dataRoot = path.join(__dirname, 'src', 'data');
const keywordIndexPath = path.join(dataRoot, 'ai', 'keywordIndex.json');
const cardSourceDir = path.join(dataRoot, 'cards');
const fsrsDir = path.join(__dirname, 'data', 'fsrs');

/**
 * Simple FSRS update: apply grade to card
 * grade: 1 (fail) to 4 (perfect)
 */
function updateFSRSCard(card, grade) {
  const now = new Date().toISOString();
  const updated = { ...card };
  updated.reviews = [...(card.reviews || []), { date: now, rating: grade }];
  const difficultyChange = (5 - grade) * 0.1;
  updated.difficulty = Math.max(0, Math.min(1, (card.difficulty || 0.3) - difficultyChange * 0.2));
  const efMultiplier = 1.3 - (5 - grade) * 0.1;
  updated.stability = Math.max(1, (card.stability || 1) * efMultiplier);
  if (!card.repetitions || card.repetitions === 0) {
    updated.interval = 1;
  } else if (card.repetitions === 1) {
    updated.interval = 3;
  } else {
    updated.interval = Math.ceil((card.interval || 1) * updated.stability);
  }
  updated.retrievability = 0.5;
  updated.repetitions = (card.repetitions || 0) + 1;
  updated.lastReview = now;
  updated.nextReview = new Date(Date.now() + updated.interval * 24 * 60 * 60 * 1000).toISOString();
  return updated;
}

function normalizeAnswer(card) {
  const ans = (card.a || '').toString().trim();
  if (/^[A-D]$/i.test(ans)) return ans.toUpperCase();
  const idx = card.o.findIndex((opt) => opt.trim().toLowerCase() === ans.toLowerCase());
  if (idx >= 0) return String.fromCharCode(65 + idx);
  return ans;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function parseCardsFromSource(filePath, chapterId) {
  const source = fs.readFileSync(filePath, 'utf8');
  const sectionMatch = source.match(/export const cards[\s\S]*?=\s*\[([\s\S]*?)\];/m);
  if (!sectionMatch) return [];
  const sectionText = sectionMatch[1];
  const objects = sectionText.split(/\n\s*},\s*\n/).map((obj) => obj.trim()).filter(Boolean);

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
      explanations: options.reduce((acc, _, optionIndex) => {
        acc[String.fromCharCode(65 + optionIndex)] = '';
        return acc;
      }, {}),
      truths: [],
    };
  });
}

function loadKeywordIndex() {
  if (!fs.existsSync(keywordIndexPath)) {
    throw new Error(`Missing keyword index at ${keywordIndexPath}`);
  }
  return JSON.parse(fs.readFileSync(keywordIndexPath, 'utf8'));
}

function buildCardMap() {
  const cardMap = new Map();
  const fileNames = fs.readdirSync(cardSourceDir).filter((file) => file.endsWith('.ts'));
  fileNames.forEach((fileName) => {
    const chapterId = fileName.replace('chapter', 'chapter-').replace('.ts', '');
    const cards = parseCardsFromSource(path.join(cardSourceDir, fileName), chapterId);
    cards.forEach((card) => cardMap.set(card.id, card));
  });
  return cardMap;
}

const keywordIndex = loadKeywordIndex();
const cardsById = buildCardMap();
const allCards = Array.from(cardsById.values());

function rankCardIds(tokens) {
  const scores = {};
  tokens.forEach((token) => {
    const ids = keywordIndex[token];
    if (!ids) return;
    ids.forEach((id) => {
      scores[id] = (scores[id] || 0) + 1;
    });
  });
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
}

function findCards(question) {
  const tokens = tokenize(question);
  const rankedIds = rankCardIds(tokens);
  const results = rankedIds.map((id) => cardsById.get(id)).filter(Boolean);
  if (results.length > 0) {
    return { cards: results.slice(0, 8), tokens };
  }

  const fallback = allCards.filter((card) => {
    const target = `${card.q} ${card.o.join(' ')}`.toLowerCase();
    return question.toLowerCase().split(/\s+/).some((term) => term && target.includes(term));
  });
  return { cards: fallback.slice(0, 8), tokens };
}

async function proxyOllama(body) {
  const response = await fetch(`${OLLAMA_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (pathname === '/api/ai/query' && req.method === 'GET') {
    const question = parsedUrl.searchParams.get('question') || '';
    if (!question.trim()) {
      return sendJson(res, 400, { error: 'Missing question query parameter' });
    }
    const { cards, tokens } = findCards(question);
    return sendJson(res, 200, { question, tokens, cards });
  }

  if (pathname === '/api/ai/answer' && req.method === 'POST') {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    try {
      const body = JSON.parse(raw || '{}');
      const question = (body.question || '').trim();
      if (!question) {
        return sendJson(res, 400, { error: 'Missing question in request body' });
      }
      const { cards } = findCards(question);
      const contextLines = cards.map((card) => {
        const explanationFragment = card.explanation ? ` | Explanation: ${card.explanation}` : '';
        return `Q: ${card.q} | A: ${card.a}${explanationFragment}`;
      });
      const prompt = `Answer the user question using only the following deterministic card facts. Do not invent new information.\n\n${contextLines.join('\n')}\n\nQuestion: ${question}\nAnswer:`;
      const { ok, data } = await proxyOllama({
        model: OLLAMA_MODEL,
        prompt,
        max_tokens: 256,
        temperature: 0.5,
      });
      if (!ok) {
        return sendJson(res, 502, { error: 'Ollama proxy failed', details: data });
      }
      const answerText = typeof data === 'object' && data?.output ? data.output : JSON.stringify(data);
      return sendJson(res, 200, {
        answer: answerText,
        context: contextLines,
        raw: data,
      });
    } catch (error) {
      return sendJson(res, 500, { error: 'Could not parse request', details: error?.message });
    }
  }

  if (pathname === '/api/generate' && req.method === 'POST') {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    try {
      const body = JSON.parse(raw || '{}');
      const { ok, data } = await proxyOllama(body);
      res.writeHead(ok ? 200 : 502, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(data));
    } catch (error) {
      return sendJson(res, 500, { error: 'Failed to proxy to Ollama', details: error?.message });
    }
  }

  if (pathname === '/api/ai/health' && req.method === 'GET') {
    return sendJson(res, 200, { status: 'ok', model: OLLAMA_MODEL });
  }

  if (pathname === '/api/fsrs/chapters' && req.method === 'GET') {
    try {
      const chapterIds = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4'];
      const chapters = [];
      for (const id of chapterIds) {
        const fsrsPath = path.join(fsrsDir, `${id}.json`);
        if (fs.existsSync(fsrsPath)) {
          const data = JSON.parse(fs.readFileSync(fsrsPath, 'utf8'));
          chapters.push(data);
        }
      }
      return sendJson(res, 200, { chapters });
    } catch (error) {
      return sendJson(res, 500, { error: 'Failed to load FSRS chapters', details: error?.message });
    }
  }

  if (pathname === '/api/fsrs/update' && req.method === 'POST') {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    try {
      const body = JSON.parse(raw || '{}');
      const { chapterId, cardQuestion, grade } = body;
      if (!chapterId || !cardQuestion || !grade || ![1, 2, 3, 4].includes(grade)) {
        return sendJson(res, 400, { error: 'Missing or invalid chapterId, cardQuestion, or grade (1-4)' });
      }
      const fsrsPath = path.join(fsrsDir, `${chapterId}.json`);
      if (!fs.existsSync(fsrsPath)) {
        return sendJson(res, 404, { error: `FSRS file not found for chapter ${chapterId}` });
      }
      const chapter = JSON.parse(fs.readFileSync(fsrsPath, 'utf8'));
      const cardIndex = chapter.cards.findIndex((c) => c.q === cardQuestion);
      if (cardIndex < 0) {
        return sendJson(res, 404, { error: `Card not found: ${cardQuestion}` });
      }
      const updatedCard = updateFSRSCard(chapter.cards[cardIndex], grade);
      chapter.cards[cardIndex] = updatedCard;
      fs.writeFileSync(fsrsPath, JSON.stringify(chapter, null, 2));
      return sendJson(res, 200, { success: true, card: updatedCard });
    } catch (error) {
      return sendJson(res, 500, { error: 'Failed to update FSRS', details: error?.message });
    }
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`AI server listening on http://localhost:${PORT}`);
  console.log(`Proxying Ollama at ${OLLAMA_BASE}`);
});
