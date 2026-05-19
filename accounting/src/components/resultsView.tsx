import React from "react";
import { Card } from "../types";
import MathText from "./MathText";

type Props = {
  correct: number;
  wrong: number;
  wrongCards: Card[];
  onReturnHome: () => void;
};

export default function ResultsView({ correct, wrong, wrongCards, onReturnHome }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-50 p-4">
      <div className="w-full max-w-xl rounded-organic bg-white p-8 shadow-organic border border-clay/20">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-semibold text-charcoal">🏁 Review Complete</h1>
          <p className="mt-3 text-clay font-sans">You finished the session. Here's how you did.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-organic bg-organic-orange-50 p-5 text-center border border-organic-orange-200">
            <p className="text-sm text-organic-orange-700 font-mono uppercase tracking-wide">Correct</p>
            <p className="mt-2 text-4xl font-serif font-bold text-organic-orange-700">{correct}</p>
          </div>
          <div className="rounded-organic bg-rose-50 p-5 text-center border border-rose-200">
            <p className="text-sm text-rose-700 font-mono uppercase tracking-wide">Wrong</p>
            <p className="mt-2 text-4xl font-serif font-bold text-rose-700">{wrong}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-serif font-semibold text-charcoal">Missed Questions</h2>
          <ul className="mt-3 space-y-2 text-clay font-sans">
            {wrongCards.length > 0 ? (
              wrongCards.map((c, idx) => (
                <li key={idx}>
                  • <MathText text={c.q} />
                </li>
              ))
            ) : (
              <li className="text-sm text-clay/60">No missed cards this session.</li>
            )}
          </ul>
        </div>

        <button
          onClick={onReturnHome}
          className="mt-8 w-full rounded-organic bg-charcoal px-6 py-3 text-cream font-semibold transition-all duration-200 hover:bg-gray-800 hover:shadow-industrial active:scale-95"
        >
          Back to chapters
        </button>
      </div>
    </div>
  );
}