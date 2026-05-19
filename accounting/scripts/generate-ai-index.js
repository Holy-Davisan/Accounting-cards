const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data', 'cards');
const outDir = path.join(__dirname, '..', 'src', 'data', 'ai');
const indexOut = path.join(outDir, 'keywordIndex.json');

function extractCardsFromFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const match = src.match(/export const cards[\s\S]*?=\s*\[([\s\S]*?)\];/m);
  if (!match) return [];
  const body = match[1];
  // crude split by object boundaries - assumes objects end with },\n  
  const objs = body.split(/\n\s*},\s*\n/);
  const cards = objs.map((o) => {
    const qMatch = o.match(/q:\s*"([\s\S]*?)"\s*,/);
    const oMatch = o.match(/o:\s*\[([\s\S]*?)\]\s*,?/);
    const aMatch = o.match(/a:\s*"([\s\S]*?)"\s*,/);
    const q = qMatch ? qMatch[1].trim() : null;
    const opts = oMatch ? oMatch[1].split(/,\s*/).map(s => s.replace(/^"|"$/g,'').trim()) : [];
    const a = aMatch ? aMatch[1].trim() : null;
    return q ? { q, o: opts, a } : null;
  }).filter(Boolean);
  return cards;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3);
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));
const index = {};

files.forEach((file) => {
  const chapterId = path.basename(file, '.ts').replace('chapter', 'chapter-');
  const cards = extractCardsFromFile(path.join(dataDir, file));
  cards.forEach((c, i) => {
    const id = `${chapterId}-idx-${String(i+1).padStart(2,'0')}`;
    const tokens = new Set(tokenize(c.q));
    c.o.forEach(opt => tokenize(opt).forEach(t => tokens.add(t)));
    tokens.forEach((t) => {
      if (!index[t]) index[t] = [];
      if (!index[t].includes(id)) index[t].push(id);
    });
  });
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(indexOut, JSON.stringify(index, null, 2));
console.log('Wrote', indexOut);
