/**
 * Smart card selection utilities for FSRS-based review
 */

export type FSRSCard = {
  q: string;
  a: string;
  o: string[];
  category: string;
  explanation: string;
  explanations?: Record<string, string>;
  reviews?: Array<{ date: string; rating: 1 | 2 | 3 | 4 }>;
  difficulty?: number;
  stability?: number;
  retrievability?: number;
  lastReview?: string | null;
  nextReview?: string | null;
  interval?: number;
  repetitions?: number;
};

export type FSRSChapter = {
  id: string;
  title: string;
  cards: FSRSCard[];
};

/**
 * Load FSRS data for all chapters from the server
 */
export async function loadFSRSChapters(): Promise<FSRSChapter[]> {
  try {
    const res = await fetch('/api/fsrs/chapters');
    if (!res.ok) {
      throw new Error(`Failed to fetch FSRS chapters: ${res.statusText}`);
    }
    const data = await res.json();
    return data.chapters || [];
  } catch (err) {
    console.error('Failed to load FSRS chapters:', err);
    return [];
  }
}

/**
 * Check if a card is due for review
 */
function isCardDue(card: FSRSCard): boolean {
  if (!card.nextReview) return true; // never reviewed
  const nextReviewDate = new Date(card.nextReview);
  return nextReviewDate <= new Date();
}

/**
 * Get urgency score for a card (lower = more urgent)
 */
function getUrgencyScore(card: FSRSCard): number {
  if (!card.nextReview) return Number.NEGATIVE_INFINITY; // new cards are most urgent
  const nextReviewDate = new Date(card.nextReview);
  const now = new Date();
  return nextReviewDate.getTime() - now.getTime();
}

/**
 * Select the 20 most urgent cards from all chapters
 * Prioritizes: never-reviewed cards, then overdue cards, then cards due soonest
 */
export async function selectSmartCards(count: number = 20): Promise<FSRSCard[]> {
  const chapters = await loadFSRSChapters();
  const allCards = chapters.flatMap((ch) => ch.cards);

  // Sort by urgency: never reviewed, then overdue, then by next review date
  const sortedCards = allCards.sort((a, b) => {
    const scoreA = getUrgencyScore(a);
    const scoreB = getUrgencyScore(b);
    return scoreA - scoreB;
  });

  return sortedCards.slice(0, count);
}
