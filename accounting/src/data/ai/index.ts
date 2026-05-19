import { AiChapter, AiCard } from "../../types";
import * as ch1 from "../cards/chapter1";
import * as ch2 from "../cards/chapter2";
import * as ch3 from "../cards/chapter3";

function normalizeAnswer(card: { a: string; o: string[] }): string {
  const ans = (card.a || "").toString().trim();
  if (/^[A-D]$/i.test(ans)) return ans.toUpperCase();
  const idx = card.o.findIndex((opt) => opt.trim().toLowerCase() === ans.toLowerCase());
  if (idx >= 0) return String.fromCharCode(65 + idx);
  return ans;
}

function buildAiCards(chapterId: string, cards: { q: string; a: string; o: string[]; explanation?: string }[]): AiCard[] {
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
      explanation: c.explanation ?? "",
      explanations,
      truths: [],
    };
  });
}

const chapter1Cards = buildAiCards("chapter-1", ch1.cards as any);
const chapter2Cards = buildAiCards("chapter-2", ch2.cards as any);
const chapter3Cards = buildAiCards("chapter-3", ch3.cards as any);

export const aiChapters: AiChapter[] = [
  {
    id: "chapter-1",
    title: "Chapter 1",
    description: "Chapter 1 AI context",
    cards: chapter1Cards,
  },
  {
    id: "chapter-2",
    title: "Chapter 2",
    description: "Chapter 2 AI context",
    cards: chapter2Cards,
  },
  {
    id: "chapter-3",
    title: "Chapter 3",
    description: "Chapter 3 AI context",
    cards: chapter3Cards,
  },
];

export default aiChapters;
