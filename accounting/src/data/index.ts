import { Chapter } from "../types";
import * as chapter1 from "./cards/chapter1";
import * as chapter2 from "./cards/chapter2";

const chapterDefinitions: Chapter[] = [
  {
    id: "chapter-1",
    title: "Chapter 1",
    description: "Chapter 1",
    cards: chapter1.cards,
  },
  {
    id: "chapter-2",
    title: "Chapter 2",
    description: "Chapter 2",
    cards: chapter2.cards,
  },
];

export const chapters: Chapter[] = chapterDefinitions;
