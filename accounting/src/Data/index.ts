import { Chapter } from "../Types";
import * as chapter1 from "./cards/chapter1";
import * as chapter2 from "./cards/chapter2";
import * as chapter3 from "./cards/chapter3";
import * as chapter4 from "./cards/chapter4";
import * as chapter5 from "./cards/chapter5";
import * as chapter8 from "./cards/chapter8";
import * as chapter9 from "./cards/chapter9";
import * as chapter10 from "./cards/chapter10";
import { normalizeCards } from "../Lib/normalizers";

const chapterDefinitions: Chapter[] = [
  {
    id: "chapter-1",
    title: "Chapter 1",
    description: "Chapter 1",
    cards: normalizeCards(chapter1.cards),
  },
  {
    id: "chapter-2",
    title: "Chapter 2",
    description: "Chapter 2",
    cards: normalizeCards(chapter2.cards),
  },
  {
    id: "chapter-3",
    title: "Chapter 3",
    description: "Chapter 3",
    cards: normalizeCards(chapter3.cards),
  },
  {
    id: "chapter-4",
    title: "Chapter 4",
    description: "Chapter 4",
    cards: normalizeCards(chapter4.cards),
  },
  {
    id: "chapter-5",
    title: "Chapter 5",
    description: "Chapter 5",
    cards: normalizeCards(chapter5.cards),
  },
  {
    id: "chapter-8",
    title: "Chapter 8",
    description: "Chapter 8",
    cards: normalizeCards(chapter8.cards),
  },
  {
    id: "chapter-9",
    title: "Chapter 9",
    description: "Chapter 9",
    cards: normalizeCards(chapter9.cards),
  },
  {
    id: "chapter-10",
    title: "Chapter 10",
    description: "Chapter 10",
    cards: normalizeCards(chapter10.cards),
  }
];

export const chapters: Chapter[] = chapterDefinitions;

export async function getChapters(): Promise<Chapter[]> {
  const useDb = process.env.REACT_APP_USE_DB === 'true';
  if (!useDb) return Promise.resolve(chapterDefinitions);

  // fetch chapters and cards from local API
  try {
    const res = await fetch('/api/chapters');
    const body = await res.json();
    const chaptersFromDb = body.chapters || [];
    // fetch all cards and group by chapter_id
    const cardsRes = await fetch('/api/cards');
    const cardsBody = await cardsRes.json();
    const cards = cardsBody.cards || [];
    const map = new Map();
    for (const c of cards) {
      const chapter_id = c.chapter_id || 'unknown';
      if (!map.has(chapter_id)) map.set(chapter_id, []);
      map.get(chapter_id).push(c);
    }
    const result = chaptersFromDb.map((ch) => ({
      id: ch.id,
      title: ch.title,
      description: ch.description,
      cards: normalizeCards(map.get(ch.id) || []),
    }));
    return result;
  } catch (err) {
    // fall back to static data
    // eslint-disable-next-line no-console
    console.warn('Failed to load chapters from API, falling back to static data', err);
    return chapterDefinitions;
  }
}
