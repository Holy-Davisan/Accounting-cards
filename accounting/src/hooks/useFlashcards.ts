import { useState } from "react";
import { Card } from "../types";

type Options = {
onCorrect: (card: Card) => void;
onWrong: (card: Card) => void;
};

export function useFlashcards(cards: Card[], options: Options) {
const [i, setI] = useState(0);
const [selected, setSelected] = useState<string | null>(null);
const [revealed, setRevealed] = useState(false);
const [currentChunkWrongCards, setCurrentChunkWrongCards] = useState<Card[]>([]);
const [isReviewMode, setIsReviewMode] = useState(false);
const [reviewIndex, setReviewIndex] = useState(0);

const card = cards[i];
const total = cards.length;

// Check if we should enter review mode (after every 10 cards or at end)
const shouldReview = (i > 0 && i % 10 === 0) || i === total;
const isDone = i >= total && !isReviewMode;

const select = (key: string) => {
if (revealed || isReviewMode) return;
setSelected(key);
};

const reveal = () => {
if (!selected || isReviewMode) return;

setRevealed(true);

if (selected === card.a) {
  options.onCorrect(card);
} else {
  options.onWrong(card);
  setCurrentChunkWrongCards(prev => [...prev, card]);
}
};

const next = () => {
if (isReviewMode) {
  // Handle review mode navigation
  if (reviewIndex < currentChunkWrongCards.length - 1) {
    setReviewIndex(prev => prev + 1);
  } else {
    // End of review, continue to next chunk
    setIsReviewMode(false);
    setReviewIndex(0);
    setCurrentChunkWrongCards([]);
  }
} else {
  // Normal card progression
  setSelected(null);
  setRevealed(false);
  setI((prev) => prev + 1);
}
};

const startReview = () => {
if (currentChunkWrongCards.length > 0) {
  setIsReviewMode(true);
  setReviewIndex(0);
} else {
  // No wrong cards, just clear the chunk and stay on the next card index
  setCurrentChunkWrongCards([]);
}
};

const continueAfterReview = () => {
setIsReviewMode(false);
setReviewIndex(0);
setCurrentChunkWrongCards([]);
};

return {
i,
card,
selected,
revealed,
select,
reveal,
next,
isDone,
total,
shouldReview,
isReviewMode,
currentChunkWrongCards,
reviewIndex,
startReview,
continueAfterReview,
reviewCard: currentChunkWrongCards[reviewIndex],
};
}