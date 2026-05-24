/**
 * Simple FSRS (Free Spaced Repetition System) / SM-2 implementation
 * Based on simplified SM-2 algorithm for ease of use
 */

export type FSRSCard = {
  q: string;
  a: string;
  o: string[];
  category: string;
  explanation: string;
  explanations: Record<string, string>;
  reviews: Array<{ date: string; rating: 1 | 2 | 3 | 4 }>;
  difficulty: number; // 0-1
  stability: number; // in days
  retrievability: number; // 0-1
  lastReview?: string | null; // ISO date
  nextReview?: string | null; // ISO date
  interval: number; // days
  repetitions: number;
};

const INITIAL_DIFFICULTY = 0.3;
const INITIAL_STABILITY = 1; // 1 day
const INITIAL_RETRIEVABILITY = 0.5;

/**
 * Update FSRS card based on user's self-grade (1-4)
 * 1 = complete blackout (wrong)
 * 2 = incorrect but remembered
 * 3 = correct with serious difficulty (educated guess)
 * 4 = perfect response (knew it)
 */
export function updateFSRSCard(card: FSRSCard, grade: 1 | 2 | 3 | 4): FSRSCard {
  const now = new Date().toISOString();
  const updated = { ...card };

  // Append review to history
  updated.reviews = [...(card.reviews || []), { date: now, rating: grade }];

  // SM-2 algorithm: adjust difficulty based on grade
  // grades 1 (fail) and 2 (hard) decrease difficulty; 3 and 4 increase
  const difficultyChange = (5 - grade) * 0.1; // grade 1->0.4, 2->0.3, 3->0.2, 4->0.1
  updated.difficulty = Math.max(0, Math.min(1, (card.difficulty || INITIAL_DIFFICULTY) - difficultyChange * 0.2));

  // Stability (EF / ease factor): how many days until next review
  // better grades => longer intervals
  const efMultiplier = 1.3 - (5 - grade) * 0.1;
  updated.stability = Math.max(1, (card.stability || INITIAL_STABILITY) * efMultiplier);

  // Interval: days until next review (increases based on repetitions)
  // First review: 1 day, second: 3 days, then: previous * stability
  if (!card.repetitions || card.repetitions === 0) {
    updated.interval = 1;
  } else if (card.repetitions === 1) {
    updated.interval = 3;
  } else {
    updated.interval = Math.ceil((card.interval || 1) * updated.stability);
  }

  // Retrievability: reset to 0.5 after each review (will decay over time)
  updated.retrievability = 0.5;

  // Update repetitions count
  updated.repetitions = (card.repetitions || 0) + 1;

  // Set timestamps
  updated.lastReview = now;
  updated.nextReview = new Date(Date.now() + updated.interval * 24 * 60 * 60 * 1000).toISOString();

  return updated;
}

/**
 * Filter cards that are due for review
 * Card is due if nextReview is in the past or not set
 */
export function isCardDue(card: FSRSCard): boolean {
  if (!card.nextReview) return true; // never reviewed
  const nextReviewDate = new Date(card.nextReview);
  return nextReviewDate <= new Date();
}

/**
 * Calculate days until card is due
 */
export function daysUntilDue(card: FSRSCard): number {
  if (!card.nextReview) return 0;
  const nextReviewDate = new Date(card.nextReview);
  const now = new Date();
  const diff = nextReviewDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
