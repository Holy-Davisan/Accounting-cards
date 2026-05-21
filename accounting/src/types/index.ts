export type CardCategory = 'vocab' | 'concept' | 'exercise' | 'general';

export type Card = {
  q: string;
  a: string;
  o: string[];
  category: CardCategory;
  explanation: string;
  // optional per-option explanations (A,B,C...) to show after reveal
  explanations?: Record<string, string>;
  // FSRS metadata (optional) to support spaced repetition scheduling
  reviews?: Array<{ date: string; rating: 1 | 2 | 3 | 4 }>;
  difficulty?: number; // 0-1
  stability?: number; // in days
  retrievability?: number; // 0-1
  lastReview?: string; // ISO date
  nextReview?: string; // ISO date
  interval?: number; // days
  repetitions?: number;
};

export type Chapter = {
  id: string;
  title: string;
  description: string;
  cards: Card[];
};

export type ScoreState = {
  correct: number;
  wrong: number;
};

// AI-friendly types
export type AiCard = {
  id: string;
  q: string;
  o: string[];
  a: string; // canonical answer, preferably letter (A-D) when applicable
  explanation?: string;
  explanations: Record<string, string>; // map from option key (A,B,C,...) to explanation (can be blank)
  truths?: string[]; // optional concise factual statements
};

export type AiChapter = {
  id: string;
  title: string;
  description: string;
  cards: AiCard[];
};