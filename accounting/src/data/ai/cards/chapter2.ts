import { AiCard } from "../../../types";
import * as orig from "../../cards/chapter2";

function normalizeAnswer(card: { a: string; o: string[] }): string {
  const ans = (card.a || "").toString().trim();
  if (/^[A-D]$/i.test(ans)) return ans.toUpperCase();
  const idx = card.o.findIndex((opt) => opt.trim().toLowerCase() === ans.toLowerCase());
  if (idx >= 0) return String.fromCharCode(65 + idx);
  return ans;
}

function buildAiCards(chapterId: string, cards: { q: string; a: string; o: string[] }[]): AiCard[] {
  return cards.map((c, i) => {
    const normalized = normalizeAnswer(c);
    const optionsKeys = c.o.map((_, idx) => String.fromCharCode(65 + idx));
    const explanations: Record<string, string> = {} as Record<string, string>;
    optionsKeys.forEach((k) => (explanations[k] = ""));

    return {
      id: `${chapterId}-idx-${String(i + 1).padStart(2, "0")}`,
      q: c.q,
      o: c.o,
      a: normalized,
      explanations,
      truths: [],
    };
  });
}

export const cards: AiCard[] = buildAiCards("chapter-2", orig.cards as any);

export default cards;
