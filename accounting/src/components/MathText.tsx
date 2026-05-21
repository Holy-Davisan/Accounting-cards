import React from "react";
import { MathJax } from "better-react-mathjax";

type Props = {
  text: string | React.ReactNode;
  className?: string;
};

type Segment =
  | { type: "text"; content: string }
  | { type: "math"; content: string; displayMode: boolean };

const DELIMITER_REGEX = /(\\\[|\\\]|\\\(|\\\)|\$\$|\$)/;

export function parseMathString(text: string): Segment[] {
  // Robust scanner: finds $...$, $$...$$, \(...\), \[...\]
  // - ignores escaped delimiters (preceded by backslash)
  // - if any opening delimiter is not closed, treat the whole string as plain text
  const segments: Segment[] = [];
  const len = text.length;
  let i = 0;
  let buffer = "";

  const pushText = (s: string) => {
    if (s) segments.push({ type: "text", content: s });
  };

  while (i < len) {
    const ch = text[i];

    // detect $$
    if (ch === "$") {
      if (i + 1 < len && text[i + 1] === "$") {
        // look for closing $$
        const start = i + 2;
        let j = start;
        let closed = -1;
        while (j < len) {
          if (text[j] === "$" && j + 1 < len && text[j + 1] === "$") {
            closed = j;
            break;
          }
          if (text[j] === "\\") j++; // skip escaped char
          j++;
        }
        if (closed === -1) {
          // unclosed delimiter: return whole text as plain
          return [{ type: "text", content: text }];
        }
        pushText(buffer);
        const content = text.slice(start, closed);
        segments.push({ type: "math", content, displayMode: true });
        buffer = "";
        i = closed + 2;
        continue;
      }

      // single $
      const start = i + 1;
      let j = start;
      let closed = -1;
      while (j < len) {
        if (text[j] === "$") {
          closed = j;
          break;
        }
        if (text[j] === "\\") j++; // skip escaped
        j++;
      }
      if (closed === -1) {
        return [{ type: "text", content: text }];
      }
      pushText(buffer);
      const content = text.slice(start, closed);
      segments.push({ type: "math", content, displayMode: false });
      buffer = "";
      i = closed + 1;
      continue;
    }

    // detect \( or \[
    if (ch === "\\" && i + 1 < len && (text[i + 1] === "(" || text[i + 1] === "[")) {
      const open = text[i + 1];
      const close = open === "(" ? ")" : "]";
      const start = i + 2;
      let j = start;
      let closed = -1;
      while (j < len) {
        if (text[j] === "\\" && j + 1 < len && text[j + 1] === close) {
          closed = j;
          break;
        }
        if (text[j] === "\\") j++; // skip escaped
        j++;
      }
      if (closed === -1) {
        return [{ type: "text", content: text }];
      }
      pushText(buffer);
      const content = text.slice(start, closed);
      segments.push({ type: "math", content, displayMode: open === "[" });
      buffer = "";
      i = closed + 2; // skip the escaped closer
      continue;
    }

    // default char
    buffer += ch;
    i++;
  }

  pushText(buffer);
  return segments;
}

export default function MathText({ text, className }: Props) {
  if (typeof text !== "string") {
    return <span className={className}>{text}</span>;
  }

  const segments = parseMathString(text);

  return (
    <span className={className}>
      {segments.map((segment, idx) =>
        segment.type === "math" ? (
          segment.displayMode ? (
            <div key={idx} className="my-2">
              <MathJax inline={false}>{segment.content}</MathJax>
            </div>
          ) : (
            <MathJax key={idx} inline>{segment.content}</MathJax>
          )
        ) : (
          <span key={idx}>{segment.content}</span>
        )
      )}
    </span>
  );
}
