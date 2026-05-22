import React from "react";

type Props = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  explanation?: string;
  showExplanation?: boolean;
  highlightCorrect?: boolean;
};

export default function OptionButton({ children, selected, onClick, explanation, showExplanation, highlightCorrect = false }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-organic border-2 text-left transition-all duration-200 font-sans ${
        selected 
          ? "border-organic-orange-500 bg-organic-orange-50 text-charcoal shadow-inner-organic" 
          : "border-clay/30 bg-white hover:border-organic-orange-300 hover:bg-organic-orange-50/50"
      }`}
    >
      <div className={`${highlightCorrect ? "text-rose-600" : ""}`}>{children}</div>
      {showExplanation && explanation && (
        <div className="mt-2 pt-2 border-t border-clay/20 text-sm text-clay font-sans italic">
          {explanation}
        </div>
      )}
    </button>
  );
}