import { chapters } from "./index";

describe("data chapter loader", () => {
  it("loads chapter files from the nested cards folder", () => {
    expect(chapters.length).toBeGreaterThanOrEqual(2);
    expect(chapters.map((chapter) => chapter.id)).toEqual([
      "chapter-1",
      "chapter-2",
    ]);
    expect(chapters[0].cards.length).toBeGreaterThan(0);
    expect(chapters[1].cards.length).toBeGreaterThan(0);
  });
});
