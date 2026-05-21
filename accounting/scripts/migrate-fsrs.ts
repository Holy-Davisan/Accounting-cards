import fs from 'fs';
import path from 'path';

// This script initializes FSRS JSON files under data/fsrs for each chapter.
// Run from the accounting folder: npm run migrate:fsrs

async function loadChapters() {
  // import the TypeScript data via ts-node/register (script is run with -r ts-node/register)
  const mod = await import('../src/data');
  return mod.chapters as any[];
}

function normalizeCard(card: any) {
  return {
    q: card.q,
    a: card.a,
    o: card.o,
    category: card.category,
    explanation: card.explanation || '',
    explanations: card.explanations || {},
    // FSRS defaults
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

async function run() {
  const chapters = await loadChapters();
  const outDir = path.resolve(__dirname, '..', 'data', 'fsrs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const chap of chapters) {
    const records = chap.cards.map((c: any) => normalizeCard(c));
    const filePath = path.join(outDir, `${chap.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify({ id: chap.id, title: chap.title, cards: records }, null, 2));
    console.log('Wrote', filePath);
  }

  console.log('FSRS migration complete.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
