import { Chapter, Card } from "../types";

type DataSet = {
  cards: Card[];
  title?: string;
};

const context = (require as any).context("./", false, /^((?!index).)*\.ts$/);

const chapterDefinitions = context
  .keys()
  .filter((path: string) => !path.includes("index.ts"))
  .sort((a: string, b: string) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path: string, index: number) => {
    const module: DataSet = context(path);
    const title = module.title ? module.title : `Chapter ${index + 1}`;
    return {
      id: `chapter-${index + 1}`,
      title,
      description: module.title ? module.title : `Chapter ${index + 1}`,
      cards: module.cards,
    } as Chapter;
  });

export const chapters: Chapter[] = chapterDefinitions;
