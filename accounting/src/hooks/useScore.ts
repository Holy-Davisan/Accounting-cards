import { useState } from "react";
import { Card } from "../types";

export function useScore() {
const [correct, setCorrect] = useState(0);
const [wrong, setWrong] = useState(0);
const [wrongCards, setWrongCards] = useState<Card[]>([]);

const markCorrect = () => {
setCorrect((c) => c + 1);
};

const markWrong = (card: Card) => {
setWrong((w) => w + 1);
setWrongCards((prev) => [...prev, card]);
};

return {
correct,
wrong,
wrongCards,
markCorrect,
markWrong,
};
}