import { useState } from "react";
import { Card } from "../Types";

type Options = {
  onCorrect: (card: Card) => void;
  onWrong: (card: Card) => void;
};

export function useFlashcards(cards: Card[], options: Options) {
  const [deck, setDeck] = useState(cards);
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [currentRoundWrongCards, setCurrentRoundWrongCards] = useState<Card[]>([]);
  const [nextRoundWrongCards, setNextRoundWrongCards] = useState<Card[]>([]);
  const [awaitingReview, setAwaitingReview] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);

  const card = deck[i];
  const total = deck.length;
  const isDone = i >= total && !awaitingReview && nextRoundWrongCards.length === 0;
  const shouldReview = awaitingReview;

  const select = (key: string) => {
    if (revealed || awaitingReview) return;
    setSelected(key);
  };

  const reveal = () => {
    if (!selected || awaitingReview || !card) return;

    setRevealed(true);

    if (selected === card.a) {
      options.onCorrect(card);
    } else {
      options.onWrong(card);
      setCurrentRoundWrongCards((prev) =>
        prev.some((wrongCard) => wrongCard.q === card.q) ? prev : [...prev, card]
      );
    }
  };

  const next = () => {
    setSelected(null);
    setRevealed(false);

    if (i < total - 1) {
      setI((prev) => prev + 1);
      return;
    }

    if (currentRoundWrongCards.length > 0) {
      setNextRoundWrongCards(currentRoundWrongCards);
      setCurrentRoundWrongCards([]);
      setAwaitingReview(true);
    }

    setI((prev) => prev + 1);
  };

  const startReview = () => {
    if (nextRoundWrongCards.length === 0) {
      return;
    }

    setDeck(nextRoundWrongCards);
    setNextRoundWrongCards([]);
    setAwaitingReview(false);
    setI(0);
    setSelected(null);
    setRevealed(false);
    setRoundNumber((prev) => prev + 1);
  };

  const continueAfterReview = () => {
    setAwaitingReview(false);
    setSelected(null);
    setRevealed(false);
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
    roundNumber,
    currentRoundWrongCards,
    nextRoundWrongCards,
    startReview,
    continueAfterReview,
  };
}
