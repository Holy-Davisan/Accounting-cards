const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const vm = require('vm');

// Transpile a TypeScript file content to CommonJS JS and return exported symbols
function loadTsFileExports(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  // remove imports that only bring in types (common pattern: import { Card } from "../../types";)
  src = src.replace(/import\s+\{[^}]+\}\s+from\s+['"][^'"]*\/types['"];?\n?/g, '');
  const transpiled = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });

  const script = new vm.Script(transpiled.outputText, { filename: filePath });
  const sandbox = { module: { exports: {} }, exports: null, require, __dirname: path.dirname(filePath) };
  sandbox.exports = sandbox.module.exports;
  vm.createContext(sandbox);
  script.runInContext(sandbox);
  return sandbox.module.exports;
}

function normalizeCard(card) {
  return {
    q: card.q,
    a: card.a,
    o: card.o,
    category: card.category,
    explanation: card.explanation || '',
    explanations: card.explanations || {},
    reviews: [],
    difficulty: 0.3,
    stability: 1,
    retrievability: 0.5,
    lastReview: null,
    nextReview: null,
    interval: 1,
    repetitions: 0,
  };
}

function run() {
  const cardsDir = path.resolve(__dirname, '..', 'src', 'data', 'cards');
  const outDir = path.resolve(__dirname, '..', 'data', 'fsrs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(cardsDir).filter((f) => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(cardsDir, file);
    console.log('Processing', filePath);
    const mod = loadTsFileExports(filePath);
    const cards = mod.cards || [];
    const records = cards.map(normalizeCard);
    const chapterId = file.replace('.ts', '').replace(/chapter(\d+)/i, 'chapter-$1');
    const outPath = path.join(outDir, `${chapterId}.json`);
    const title = `Chapter ${file.match(/chapter(\d+)/i)?.[1] || file}`;
    fs.writeFileSync(outPath, JSON.stringify({ id: chapterId, title, cards: records }, null, 2));
    console.log('Wrote', outPath);
  }

  console.log('FSRS migration complete.');
}

run();
