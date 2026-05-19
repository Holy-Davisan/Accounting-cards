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
  if (!DELIMITER_REGEX.test(text)) {
    return [{ type: "text", content: text }];
  }

  const tokens = text.split(DELIMITER_REGEX);
  const segments: Segment[] = [];
  let openDelimiter: string | null = null;
  let buffer = "";

  const flushText = () => {
    if (buffer) {
      segments.push({ type: "text", content: buffer });
      buffer = "";
    }
  };

  for (const token of tokens) {
    if (token === "\\(" || token === "\\[") {
      flushText();
      openDelimiter = token;
      buffer = "";
      continue;
    }

    if (token === "\\)" && openDelimiter === "\\(") {
      segments.push({
        type: "math",
        content: buffer,
        displayMode: false,
      });
      openDelimiter = null;
      buffer = "";
      continue;
    }

    if (token === "\\]" && openDelimiter === "\\[") {
      segments.push({
        type: "math",
        content: buffer,
        displayMode: true,
      });
      openDelimiter = null;
      buffer = "";
      continue;
    }

    if (token === "$$") {
      if (openDelimiter === "$$") {
        segments.push({
          type: "math",
          content: buffer,
          displayMode: true,
        });
        openDelimiter = null;
        buffer = "";
      } else if (!openDelimiter) {
        flushText();
        openDelimiter = token;
        buffer = "";
      } else {
        buffer += token;
      }
      continue;
    }

    if (token === "$") {
      if (openDelimiter === "$") {
        segments.push({
          type: "math",
          content: buffer,
          displayMode: false,
        });
        openDelimiter = null;
        buffer = "";
      } else if (!openDelimiter) {
        flushText();
        openDelimiter = token;
        buffer = "";
      } else {
        buffer += token;
      }
      continue;
    }

    buffer += token;
  }

  if (openDelimiter) {
    segments.push({ type: "text", content: `${openDelimiter}${buffer}` });
  } else {
    flushText();
  }

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
          <MathJax key={idx} inline={!segment.displayMode}>
            {segment.content}
          </MathJax>
        ) : (
          <span key={idx}>{segment.content}</span>
        )
      )}
    </span>
  );
}
