const fs = require('fs');
const path = require('path');

const cardFiles = ['chapter1.ts', 'chapter2.ts', 'chapter3.ts'];
const dir = path.join(__dirname, '..', 'src', 'data', 'cards');
const validCategories = ['vocab', 'concept', 'exercise', 'general'];

function parseCards(text) {
  const header = 'export const cards: Card[] = [';
  const start = text.indexOf(header);
  if (start === -1) {
    throw new Error('Could not find cards array in file');
  }

  let pos = start + header.length;
  let depth = 1;
  let inString = false;
  let stringChar = '';
  let escaped = false;
  while (pos < text.length && depth > 0) {
    const char = text[pos];
    if (escaped) {
      escaped = false;
    } else if (char === '\\') {
      escaped = true;
    } else if (inString) {
      if (char === stringChar) {
        inString = false;
      }
    } else if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
    } else if (char === '[') {
      depth += 1;
    } else if (char === ']') {
      depth -= 1;
    }
    pos += 1;
  }
  if (depth !== 0) {
    throw new Error('Unbalanced brackets in cards array');
  }
  const arrayText = text.slice(start + header.length, pos - 1);
  const js = `const cards = [${arrayText}];\nexports.cards = cards;`;
  const module = { exports: {} };
  new Function('exports', js)(module.exports);
  return module.exports.cards;
}

let total = 0;
cardFiles.forEach((fileName) => {
  const filePath = path.join(dir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  const cards = parseCards(content);
  cards.forEach((card, idx) => {
    total += 1;
    if (typeof card.category !== 'string' || !validCategories.includes(card.category)) {
      throw new Error(`Invalid category in ${fileName} card ${idx + 1}: ${card.category}`);
    }
    if (typeof card.explanation !== 'string' || !card.explanation.trim()) {
      throw new Error(`Missing explanation in ${fileName} card ${idx + 1}`);
    }
    if (typeof card.q !== 'string' || !card.q.trim()) {
      throw new Error(`Missing question in ${fileName} card ${idx + 1}`);
    }
    if (!Array.isArray(card.o) || card.o.length !== 4) {
      throw new Error(`Invalid options in ${fileName} card ${idx + 1}`);
    }
  });
  console.log(`${fileName}: ${cards.length} cards validated`);
});
console.log(`Total cards validated: ${total}`);
