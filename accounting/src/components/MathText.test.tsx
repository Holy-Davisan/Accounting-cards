import { parseMathString } from "./MathText";

describe("MathText parser", () => {
  it("parses plain text without math delimiters", () => {
    const segments = parseMathString("No math here");

    expect(segments).toEqual([
      { type: "text", content: "No math here" },
    ]);
  });

  it("parses inline dollar math expressions", () => {
    const segments = parseMathString("Assets = $A - L$");

    expect(segments).toEqual([
      { type: "text", content: "Assets = " },
      { type: "math", content: "A - L", displayMode: false },
    ]);
  });

  it("parses display math with double dollars", () => {
    const segments = parseMathString("Balance: $$A = L + E$$ end");

    expect(segments).toEqual([
      { type: "text", content: "Balance: " },
      { type: "math", content: "A = L + E", displayMode: true },
      { type: "text", content: " end" },
    ]);
  });

  it("parses TeX style inline and display delimiters", () => {
    const segments = parseMathString("First \\(x^2\\) then \\[y = mx + b\\]");

    expect(segments).toEqual([
      { type: "text", content: "First " },
      { type: "math", content: "x^2", displayMode: false },
      { type: "text", content: " then " },
      { type: "math", content: "y = mx + b", displayMode: true },
    ]);
  });
});
