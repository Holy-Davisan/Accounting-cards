const fs = require('fs');
const path = require('path');

const cardFiles = ['chapter1.ts', 'chapter2.ts', 'chapter3.ts'];
const dir = path.join(__dirname, '..', 'src', 'data', 'cards');

function tokenize(text) {
  return text.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 2);
}

function categorizeQuestion(q) {
  const normalized = q.trim();
  const vocab = /^(what is|what are|which term|define|which of the following is|what does .* mean|what is the .* called|what is .* primarily|what are .* considered)/i;
  const concept = /^(why|according to|which characteristic|which assumption|which principle|how|when|what is the main purpose|why are|why can|why does|what does .* primarily|what is .* best described|what is .* primarily designed)/i;
  const exercise = /(activity|transaction|example|company|purchase|repay|buy|paid|classify|belongs on|measured at|prepaid|deferred|liabilities|assets|revenue|expense|cash flow|accounts payable|accounts receivable|inventory)/i;

  if (vocab.test(normalized)) return 'vocab';
  if (concept.test(normalized)) return 'concept';
  if (exercise.test(normalized)) return 'exercise';
  return 'general';
}

function buildExplanation(card) {
  const answer = String(card.a).trim();
  const optionLetters = ['A', 'B', 'C', 'D'];
  const choiceIndex = optionLetters.indexOf(answer.toUpperCase());

  if (choiceIndex >= 0 && card.o[choiceIndex]) {
    return `The correct choice is ${answer} because the option "${card.o[choiceIndex]}" correctly answers the question.`;
  }

  const exactOption = card.o.find((opt) => opt.trim().toLowerCase() === answer.toLowerCase());
  if (exactOption) {
    return `The correct answer is "${exactOption}" because it best matches the question wording.`;
  }

  if (answer) {
    return `The correct answer is "${answer}".`;
  }

  return 'The correct answer is defined by the card content.';
}

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
  const require = () => {};
  new Function('exports', 'require', js)(module.exports, require);
  return module.exports.cards;
}

function formatCard(card) {
  const lines = [
    '  {',
    `    q: ${JSON.stringify(card.q)},`,
    `    a: ${JSON.stringify(card.a)},`,
    `    o: ${JSON.stringify(card.o)},`,
    `    category: ${JSON.stringify(card.category)},`,
    `    explanation: ${JSON.stringify(card.explanation)},`,
    '  },',
  ];
  return lines.join('\n');
}

cardFiles.forEach((fileName) => {
  const filePath = path.join(dir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  const headerEnd = content.indexOf('export const cards');
  if (headerEnd < 0) {
    throw new Error(`Could not find export const cards in ${fileName}`);
  }
  const header = content.slice(0, headerEnd);
  const cards = parseCards(content);
  const updated = cards.map((card) => {
    const cat = categorizeQuestion(card.q);
    return {
      ...card,
      category: cat,
      explanation: buildExplanation(card),
    };
  });
  const cardText = updated.map(formatCard).join('\n');
  const output = `${header}export const cards: Card[] = [\n${cardText}\n];\n`;
  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`Updated ${fileName} (${updated.length} cards)`);
});
