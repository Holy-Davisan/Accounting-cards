export type CardCategory = 'vocab' | 'concept' | 'exercise' | 'general';

export type Card = {
  q: string;
  a: string;
  o: string[];
  category: CardCategory;
  explanation: string;
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
  explanations: Record<string, string>; // map from option key (A,B,C,...) to explanation (can be blank)
  truths?: string[]; // optional concise factual statements
};

export type AiChapter = {
  id: string;
  title: string;
  description: string;
  cards: AiCard[];
};