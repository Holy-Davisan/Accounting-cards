import { Card } from "../Types";

const optionKeys = ["A", "B", "C", "D"];

export function normalizeCard(card: Card): Card {
  // Ensure `explanations` is a safe object (per-option explanations)
  const explanations = card.explanations ?? {};

  // If only a single `explanation` string exists, leave it as-is.
  // For per-option usage, ensure keys A-D exist (may be empty strings).
  optionKeys.forEach((k, idx) => {
    if (explanations[k] === undefined) {
      explanations[k] = "";
    }
  });

  // Normalize difficulty to allowed enum values; default to 'easy' when absent
  let difficulty: Card["difficulty"] = card.difficulty ?? "easy";
  if (difficulty !== "easy" && difficulty !== "hard") {
    difficulty = "easy";
  }

  return {
    ...card,
    explanations,
    difficulty,
  };
}

export function normalizeCards(cards: Card[]): Card[] {
  return cards.map(normalizeCard);
}
