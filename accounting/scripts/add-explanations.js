/**
 * Migration script to add per-option explanations to all cards
 * - Correct answer: uses existing explanation field
 * - Wrong answers: "this option is not right"
 * 
 * Run: npm run add:explanations
 */

const fs = require('fs');
const path = require('path');

const fsrsDir = path.join(__dirname, '..', 'data', 'fsrs');
const chapterIds = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4'];

function addExplanationsToChapter(chapterId) {
  const fsrsPath = path.join(fsrsDir, `${chapterId}.json`);
  
  if (!fs.existsSync(fsrsPath)) {
    console.log(`⚠️  ${chapterId}.json not found`);
    return;
  }

  const chapter = JSON.parse(fs.readFileSync(fsrsPath, 'utf8'));
  let updatedCount = 0;

  chapter.cards = chapter.cards.map((card) => {
    if (!card.explanations) {
      // Build explanations object from correct answer
      const answerIndex = card.a.charCodeAt(0) - 65; // 'A' = 0, 'B' = 1, etc.
      const correctAnswer = card.a;
      
      const explanations = {};
      const options = ['A', 'B', 'C', 'D'];
      
      options.forEach((opt) => {
        if (opt === correctAnswer) {
          // Correct answer gets the actual explanation
          explanations[opt] = card.explanation || `This is the correct answer.`;
        } else {
          // Wrong answers get generic message
          explanations[opt] = 'This option is not right.';
        }
      });

      card.explanations = explanations;
      updatedCount++;
    }

    return card;
  });

  fs.writeFileSync(fsrsPath, JSON.stringify(chapter, null, 2));
  console.log(`✅ ${chapterId}: Added explanations to ${updatedCount} cards`);
}

console.log('🚀 Adding per-option explanations to all chapters...\n');

chapterIds.forEach((id) => {
  addExplanationsToChapter(id);
});

console.log('\n✅ Migration complete!');
console.log('   - Correct answers: show the card explanation');
console.log('   - Wrong answers: show "This option is not right."');
