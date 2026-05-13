export type Card = {
  q: string;
  a: string;
  o: string[];
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