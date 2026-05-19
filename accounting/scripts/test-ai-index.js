const fs = require('fs');
const path = require('path');

const idxPath = path.join(__dirname, '..', 'src', 'data', 'ai', 'keywordIndex.json');
if (!fs.existsSync(idxPath)) {
  console.error('MISSING', idxPath);
  process.exit(2);
}
const idx = JSON.parse(fs.readFileSync(idxPath, 'utf8'));
console.log('KEYS', Object.keys(idx).length);

const chapterFiles = ['chapter1.ts', 'chapter2.ts', 'chapter3.ts'].map(f =>
  path.join(__dirname, '..', 'src', 'data', 'ai', 'cards', f)
);
chapterFiles.forEach(f => {
  const exists = fs.existsSync(f);
  console.log(f, exists);
  if (exists) {
    const content = fs.readFileSync(f, 'utf8');
    const hasExport = /export\s+const\s+cards/.test(content);
    console.log('  has export const cards:', hasExport);
  }
});

console.log('SAMPLE_INDEX_KEYS:', Object.keys(idx).slice(0,10));
process.exit(0);
