import React from "react";

type Props = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function OptionButton({ children, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-organic border-2 text-left transition-all duration-200 font-sans ${
        selected 
          ? "border-organic-orange-500 bg-organic-orange-50 text-charcoal shadow-inner-organic" 
          : "border-clay/30 bg-white hover:border-organic-orange-300 hover:bg-organic-orange-50/50"
      }`}
    >
      {children}
    </button>
  );
}