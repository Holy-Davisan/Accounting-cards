import React from "react";
import { Card } from "../Types";
import OptionButton from "./option-button";
import MathText from "./math-text";

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
  onGrade?: (grade: 1 | 2 | 3 | 4) => Promise<void> | void;
  gradingInProgress?: boolean;
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
  onGrade,
  gradingInProgress = false,
}: Props) {
return (
<div className="bg-white w-full max-w-md rounded-organic shadow-organic border-l-4 border-organic-orange-500 p-6">
<h1 className="text-lg font-serif font-bold mb-2 text-charcoal">🪨 Caveman Accounting</h1>

  <p className="text-sm text-clay mb-4 font-mono">
    Card {index + 1} / {total}
  </p>

  <h2 className="text-lg font-serif font-semibold mb-4 text-charcoal">
    <MathText text={card.q} />
  </h2>

  <div className="space-y-3">
    {card.o.map((opt, idx) => {
      const key = ["A", "B", "C", "D"][idx];
      const explanation = card.explanations?.[key];
      const isLetterAnswer = typeof card.a === "string" && card.a.length === 1;
      const isCorrectOption = isLetterAnswer ? card.a === key : card.a === opt;

      return (
        <OptionButton
          key={key}
          selected={selected === key}
          onClick={() => onSelect(key)}
          explanation={explanation}
          showExplanation={revealed}
          highlightCorrect={revealed && isCorrectOption}
        >
          <MathText text={`${key}. ${opt}`} />
        </OptionButton>
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

      {card.explanation ? (
        <div className="mt-4 rounded-industrial bg-clay/5 p-4 text-sm leading-relaxed text-charcoal">
          <p className="font-semibold">Explanation</p>
          <p className="mt-2 text-clay">{card.explanation}</p>
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-4 gap-2">
        <button
          onClick={() => {
            onGrade && onGrade(1);
            onNext();
          }}
          disabled={gradingInProgress}
          className="py-2 px-2 rounded-organic bg-rose-500 text-white font-semibold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {gradingInProgress ? "..." : "1"}
        </button>
        <button
          onClick={() => {
            onGrade && onGrade(2);
            onNext();
          }}
          disabled={gradingInProgress}
          className="py-2 px-2 rounded-organic bg-amber-500 text-white font-semibold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {gradingInProgress ? "..." : "2"}
        </button>
        <button
          onClick={() => {
            onGrade && onGrade(3);
            onNext();
          }}
          disabled={gradingInProgress}
          className="py-2 px-2 rounded-organic bg-organic-orange-500 text-white font-semibold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {gradingInProgress ? "..." : "3"}
        </button>
        <button
          onClick={() => {
            onGrade && onGrade(4);
            onNext();
          }}
          disabled={gradingInProgress}
          className="py-2 px-2 rounded-organic bg-forest-900 text-white font-semibold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {gradingInProgress ? "..." : "4"}
        </button>
      </div>
    </div>
  )}
</div>

);
}