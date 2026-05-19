import React from "react";
import { Card } from "../types";
import MathText from "./MathText";

type Props = {
  wrongCards: Card[];
  currentIndex: number;
  onNext: () => void;
  onContinue: () => void;
};

export default function ReviewMode({ wrongCards, currentIndex, onNext, onContinue }: Props) {
  const card = wrongCards[currentIndex];
  const isLastCard = currentIndex === wrongCards.length - 1;

  if (!card) return null;

  return (
    <div className="min-h-screen bg-forest-50 p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress bar for review */}
        <div className="h-2 bg-clay/20 rounded-industrial w-full mb-8 shadow-inner">
          <div
            className="h-full bg-rose-500 rounded-industrial transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / wrongCards.length) * 100}%` }}
          />
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-organic bg-white p-6 shadow-organic border-l-4 border-rose-500">
          <div>
            <h1 className="text-2xl font-serif font-bold text-charcoal">🧠 Wrong Card Cave</h1>
            <p className="mt-2 text-clay font-sans">
              Review the cards you got wrong in this section. Study carefully before continuing.
            </p>
            <p className="mt-1 text-sm text-clay/60 font-mono">
              Card {currentIndex + 1} of {wrongCards.length}
            </p>
          </div>
        </div>

        {/* Review Card Display */}
        <div className="rounded-organic bg-white p-8 shadow-organic border border-clay/20">
          <div className="space-y-6">
            {/* Question */}
            <div>
              <h2 className="text-xl font-serif font-semibold text-charcoal mb-3">Question:</h2>
              <p className="text-lg text-clay font-sans leading-relaxed">
                <MathText text={card.q} />
              </p>
            </div>

            {/* Answer */}
            <div className="border-t border-clay/10 pt-6">
              <h3 className="text-lg font-serif font-semibold text-organic-orange-600 mb-3">Correct Answer:</h3>
              <p className="text-lg text-charcoal font-sans font-medium leading-relaxed">
                <MathText text={card.a} />
              </p>
            </div>

            {/* Options (if available) */}
            {card.o && card.o.length > 0 && (
              <div className="border-t border-clay/10 pt-6">
                <h3 className="text-lg font-serif font-semibold text-clay mb-3">All Options:</h3>
                <div className="space-y-2">
                  {card.o.map((option, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-industrial border-2 ${
                        option === card.a
                          ? 'border-organic-orange-500 bg-organic-orange-50 text-organic-orange-700 font-medium'
                          : 'border-clay/20 bg-clay/5 text-clay'
                      }`}
                    >
                      <MathText text={option} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-clay/10">
              <div className="text-sm text-clay/60 font-mono">
                {currentIndex + 1} / {wrongCards.length}
              </div>
              <div className="flex gap-3">
                {!isLastCard ? (
                  <button
                    onClick={onNext}
                    className="rounded-industrial bg-organic-orange-500 px-6 py-3 text-white font-semibold transition-all duration-200 hover:bg-organic-orange-700 hover:shadow-industrial active:scale-95"
                  >
                    Next Wrong Card
                  </button>
                ) : (
                  <button
                    onClick={onContinue}
                    className="rounded-industrial bg-charcoal px-6 py-3 text-cream font-semibold transition-all duration-200 hover:bg-gray-800 hover:shadow-industrial active:scale-95"
                  >
                    Continue Session
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}