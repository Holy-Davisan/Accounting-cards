import { chapters } from "./index";

describe("data chapter loader", () => {
  it("loads chapter files from the nested cards folder", () => {
    expect(chapters.length).toBeGreaterThanOrEqual(4);
    expect(chapters.map((chapter) => chapter.id)).toEqual([
      "chapter-1",
      "chapter-2",
      "chapter-3",
      "chapter-4",
    ]);
    expect(chapters[0].cards.length).toBeGreaterThan(0);
    expect(chapters[1].cards.length).toBeGreaterThan(0);
    expect(chapters[2].cards.length).toBeGreaterThan(0);
    expect(chapters[3].cards.length).toBeGreaterThan(0);
  });
});
