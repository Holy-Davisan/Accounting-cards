import React from "react";
import { Card } from "../types";
import OptionButton from "./optionButton";

type Props = {
card: Card;
index: number;
total: number;
selected: string | null;
revealed: boolean;
isCorrect: boolean;
onSelect: (key: string) => void;
onReveal: () => void;
onNext: () => void;
};

export default function QuestionCard({
card,
index,
total,
selected,
revealed,
isCorrect,
onSelect,
onReveal,
onNext,
}: Props) {
return (
<div className="bg-white w-full max-w-md rounded-organic shadow-organic border-l-4 border-organic-orange-500 p-6">
<h1 className="text-lg font-serif font-bold mb-2 text-charcoal">🪨 Caveman Accounting</h1>

  <p className="text-sm text-clay mb-4 font-mono">
    Card {index + 1} / {total}
  </p>

  <h2 className="text-lg font-serif font-semibold mb-4 text-charcoal">{card.q}</h2>

  <div className="space-y-3">
    {card.o.map((opt, idx) => {
      const key = ["A", "B", "C", "D"][idx];

      return (
        <OptionButton
          key={key}
          label={`${key}. ${opt}`}
          selected={selected === key}
          onClick={() => onSelect(key)}
        />
      );
    })}
  </div>

  {!revealed ? (
    <button
      onClick={onReveal}
      className="mt-6 w-full bg-organic-orange-500 text-white p-3 rounded-organic font-semibold transition-all duration-200 hover:bg-organic-orange-700 hover:shadow-organic active:scale-95"
    >
      Reveal 🪨
    </button>
  ) : (
    <div className="mt-6">
      <p className="font-serif font-bold text-charcoal">Correct answer: {card.a}</p>

      <p className="text-sm mt-2 font-sans text-clay">
        {isCorrect ? "🧠 Unga Smart" : "🪨 Rock Brain"}
      </p>

      <button
        onClick={onNext}
        className="mt-4 w-full bg-forest-900 text-cream p-3 rounded-organic font-semibold transition-all duration-200 hover:bg-charcoal hover:shadow-industrial active:scale-95"
      >
        Next →
      </button>
    </div>
  )}
</div>

);
}