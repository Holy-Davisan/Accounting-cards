#!/usr/bin/env node
// Migration script: read existing TypeScript data modules and persist to SQLite
/* eslint-disable no-console */
require('ts-node/register');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const repo_root = path.join(__dirname, '..');
const db_file = path.join(repo_root, 'data', 'cards.db');
const db = new Database(db_file);

function ensure_schema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      chapter_id TEXT,
      q TEXT,
      a TEXT,
      o TEXT,
      explanation TEXT,
      explanations TEXT,
      category TEXT,
      UNIQUE(chapter_id, q)
    );
  `);
}

function load_source_chapters() {
  const idx_path = path.join(repo_root, 'src', 'Data', 'index.ts');
  if (!fs.existsSync(idx_path)) {
    console.error('Source data index not found:', idx_path);
    process.exit(1);
  }
  // require via ts-node
  // eslint-disable-next-line global-require
  const src = require(idx_path);
  return src.chapters || src.default || [];
}

function migrate() {
  ensure_schema();
  const chapters = load_source_chapters();

  const insert_chapter = db.prepare('INSERT OR IGNORE INTO chapters (id, title, description) VALUES (?, ?, ?)');
  const insert_card = db.prepare('INSERT OR IGNORE INTO cards (id, chapter_id, q, a, o, explanation, explanations, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

  let chapter_count = 0;
  let card_count = 0;

  const insert_tx = db.transaction((chapters_list) => {
    for (const ch of chapters_list) {
      const chapter_id = ch.id || ch.title.replace(/\s+/g, '-').toLowerCase();
      insert_chapter.run(chapter_id, ch.title || '', ch.description || '');
      chapter_count += 1;

      const cards = ch.cards || [];
      for (let i = 0; i < cards.length; i += 1) {
        const c = cards[i];
        const card_id = c.id || `${chapter_id}::${i}`;
        const opts = Array.isArray(c.o) ? JSON.stringify(c.o) : JSON.stringify([]);
        const exps = c.explanations ? JSON.stringify(c.explanations) : null;
        insert_card.run(card_id, chapter_id, c.q || '', c.a || '', opts, c.explanation || '', exps, c.category || '');
        card_count += 1;
      }
    }
  });

  insert_tx(chapters);

  console.log(`Migrated ${chapter_count} chapters and ${card_count} cards into ${db_file}`);
}

if (require.main === module) {
  try {
    migrate();
    console.log('Migration complete.');
  } catch (err) {
    console.error('Migration failed:', err && err.stack ? err.stack : err);
    process.exit(2);
  }
}

module.exports = { migrate };
