"use client";

import type { CSSProperties } from "react";
import type { TextElement } from "@easyprint/shared/template/document";

export const EDITOR_UNIT_SCALE = 6;

export const TEXT_FONT_OPTIONS = [
  { value: "\"IBM Plex Sans\", \"Segoe UI\", sans-serif", label: "IBM Plex Sans" },
  { value: "\"IBM Plex Serif\", Georgia, serif", label: "IBM Plex Serif" },
  { value: "\"Segoe UI\", Arial, sans-serif", label: "Segoe UI" },
  { value: "Arial, Helvetica, sans-serif", label: "Arial" },
  { value: "\"Trebuchet MS\", sans-serif", label: "Trebuchet" },
  { value: "\"Times New Roman\", Times, serif", label: "Times New Roman" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "\"Courier New\", monospace", label: "Courier New" },
  { value: "\"IBM Plex Mono\", \"Courier New\", monospace", label: "IBM Plex Mono" }
] as const;

const MIN_TEXT_HEIGHT_UNITS = 6;
let measurementCanvas: HTMLCanvasElement | null = null;

const normalizeContent = (value: string) => value.replace(/\r\n/g, "\n");

const getMeasurementContext = () => {
  if (typeof document === "undefined") {
    return null;
  }

  if (!measurementCanvas) {
    measurementCanvas = document.createElement("canvas");
  }

  return measurementCanvas.getContext("2d");
};

const buildFontDescriptor = (element: TextElement, fontSizePx: number) =>
  `${element.fontStyle} ${element.fontWeight} ${fontSizePx}px ${element.fontFamily}`;

const breakLongToken = (token: string, maxWidthPx: number, context: CanvasRenderingContext2D) => {
  if (context.measureText(token).width <= maxWidthPx) {
    return [token];
  }

  const pieces: string[] = [];
  let current = "";

  for (const character of token) {
    const next = `${current}${character}`;
    if (current && context.measureText(next).width > maxWidthPx) {
      pieces.push(current);
      current = character;
      continue;
    }

    current = next;
  }

  if (current) {
    pieces.push(current);
  }

  return pieces;
};

const wrapLine = (line: string, maxWidthPx: number, context: CanvasRenderingContext2D) => {
  if (!line) {
    return [""];
  }

  const tokens = line.split(/(\s+)/).filter((token) => token.length > 0);
  const wrapped: string[] = [];
  let current = "";

  for (const token of tokens) {
    const segments =
      context.measureText(token).width > maxWidthPx && !/^\s+$/.test(token)
        ? breakLongToken(token, maxWidthPx, context)
        : [token];

    for (const segment of segments) {
      const next = `${current}${segment}`;
      if (current && context.measureText(next).width > maxWidthPx) {
        wrapped.push(current.trimEnd());
        current = segment.trimStart();
        continue;
      }

      current = next;
    }
  }

  wrapped.push(current.trimEnd());
  return wrapped.filter((entry, index) => entry.length > 0 || index === 0);
};

export const getTextElementStyle = (
  element: TextElement,
  scale = 1
): CSSProperties => ({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  color: element.color,
  fontFamily: element.fontFamily,
  fontSize: element.fontSize * scale,
  fontWeight: element.fontWeight,
  fontStyle: element.fontStyle,
  textDecoration: element.textDecoration,
  lineHeight: element.lineHeight,
  textAlign: element.align,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  display: "block"
});

export const measureTextElementHeight = (
  element: TextElement,
  content: string,
  widthUnits = element.width,
  unitScale = EDITOR_UNIT_SCALE
) => {
  const context = getMeasurementContext();
  if (!context) {
    return Math.max(element.height, MIN_TEXT_HEIGHT_UNITS);
  }

  const fontSizePx = Math.max(1, element.fontSize * unitScale);
  const maxWidthPx = Math.max(fontSizePx, widthUnits * unitScale);
  context.font = buildFontDescriptor(element, fontSizePx);

  const wrappedLines = normalizeContent(content)
    .split("\n")
    .flatMap((line) => wrapLine(line, maxWidthPx, context));

  const lineCount = Math.max(1, wrappedLines.length);
  const heightPx = lineCount * fontSizePx * element.lineHeight + fontSizePx * 0.35;
  const heightUnits = Number((heightPx / unitScale).toFixed(2));

  return Math.max(MIN_TEXT_HEIGHT_UNITS, heightUnits);
};
