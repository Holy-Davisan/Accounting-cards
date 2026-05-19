import React from "react";
import { Card } from "../types";
import { useScore } from "../hooks/useScore";
import { useFlashcards } from "../hooks/useFlashcards";
import QuestionCard from "../components/questionCard";
import ResultsView from "../components/resultsView";
import ReviewMode from "../components/reviewMode";

type Props = {
  cards: Card[];
  title: string;
  onQuit: () => void;
};

export default function FlashcardPage({ cards, title, onQuit }: Props) {
  const score = useScore();

  const flash = useFlashcards(cards, {
    onCorrect: () => score.markCorrect(),
    onWrong: (card) => score.markWrong(card),
  });

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-forest-50 p-4">
        <div className="w-full max-w-md rounded-organic border-2 border-clay/20 bg-white p-8 text-center shadow-organic">
          <h1 className="text-2xl font-serif font-bold text-charcoal">No cards found</h1>
          <p className="mt-3 text-clay font-sans">Return to the home page and try a different chapter or search term.</p>
          <button
            onClick={onQuit}
            className="mt-6 rounded-organic bg-organic-orange-500 px-5 py-3 text-white transition-all duration-200 hover:bg-organic-orange-700 hover:shadow-organic active:scale-95 font-semibold"
          >
            Back to Chapters
          </button>
        </div>
      </div>
    );
  }

  if (flash.shouldReview && !flash.isDone) {
    if (flash.isReviewMode) {
      return (
        <ReviewMode
          wrongCards={flash.currentChunkWrongCards}
          currentIndex={flash.reviewIndex}
          onNext={flash.next}
          onContinue={flash.continueAfterReview}
        />
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-forest-50 p-4">
        <div className="w-full max-w-md rounded-organic border-2 border-clay/20 bg-white p-8 text-center shadow-organic">
          <h1 className="text-2xl font-serif font-bold text-charcoal">🧠 Section Complete</h1>
          <p className="mt-3 text-clay font-sans">
            You've completed {flash.i % 10 === 0 ? 10 : flash.i % 10} cards in this section.
            {flash.currentChunkWrongCards.length > 0
              ? ` Time to review the ${flash.currentChunkWrongCards.length} card${flash.currentChunkWrongCards.length === 1 ? '' : 's'} you got wrong.`
              : ' Great job! No wrong cards to review.'
            }
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            {flash.currentChunkWrongCards.length > 0 ? (
              <button
                onClick={flash.startReview}
                className="rounded-organic bg-rose-500 px-5 py-3 text-white transition-all duration-200 hover:bg-rose-700 hover:shadow-organic active:scale-95 font-semibold"
              >
                Review Wrong Cards
              </button>
            ) : (
              <button
                onClick={flash.continueAfterReview}
                className="rounded-organic bg-organic-orange-500 px-5 py-3 text-white transition-all duration-200 hover:bg-organic-orange-700 hover:shadow-organic active:scale-95 font-semibold"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (flash.isDone) {
    return (
      <ResultsView
        correct={score.correct}
        wrong={score.wrong}
        wrongCards={score.wrongCards}
        onReturnHome={onQuit}
      />
    );
  }

  const isCorrect = flash.selected === flash.card.a;

  return (
    <div className="min-h-screen bg-forest-50 p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="h-2 bg-clay/20 rounded-industrial w-full mb-8 shadow-inner">
          <div
            className="h-full bg-organic-orange-500 rounded-industrial transition-all duration-300"
            style={{ width: `${((flash.i + 1) / flash.total) * 100}%` }}
          />
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-organic bg-white p-6 shadow-organic border-l-4 border-organic-orange-500">
          <div>
            <p className="text-sm font-mono font-semibold text-organic-orange-500 uppercase tracking-wide">{title}</p>
            <h1 className="mt-2 text-2xl font-serif font-bold text-charcoal">Flashcard session</h1>
          </div>
          <button
            onClick={onQuit}
            className="self-start rounded-industrial bg-charcoal px-5 py-3 text-sm font-semibold text-cream transition-all duration-200 hover:bg-gray-800 hover:shadow-industrial active:scale-95"
          >
            Back to Chapters
          </button>
        </div>

        <QuestionCard
          card={flash.card}
          index={flash.i}
          total={flash.total}
          selected={flash.selected}
          revealed={flash.revealed}
          isCorrect={isCorrect}
          onSelect={flash.select}
          onReveal={flash.reveal}
          onNext={flash.next}
        />
      </div>
    </div>
  );
}
