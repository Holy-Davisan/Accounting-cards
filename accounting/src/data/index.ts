import { Chapter } from "../types";
import * as chapter1 from "./cards/chapter1";
import * as chapter2 from "./cards/chapter2";
import * as chapter3 from "./cards/chapter3";
import * as chapter4 from "./cards/chapter4";

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
  {
    id: "chapter-3",
    title: "Chapter 3",
    description: "Chapter 3",
    cards: chapter3.cards,
  },
  {
    id: "chapter-4",
    title: "Chapter 4",
    description: "Chapter 4",
    cards: chapter4.cards,
  },
];

export const chapters: Chapter[] = chapterDefinitions;
