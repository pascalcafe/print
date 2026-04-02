"use client";

import type { CSSProperties } from "react";
import type { LabelDocument } from "@easyprint/shared/template/document";
import {
  buildPreviewPayload,
  type PreviewPayload
} from "@easyprint/shared/template/render";
import { LabelDocumentSurface } from "./document-renderer";

const PRESET_STYLES = {
  editor: {
    containerStyle: {
      marginInline: "auto"
    } satisfies CSSProperties,
    surfaceStyle: {
      borderRadius: 16,
      border: "1px solid var(--line)",
      boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)"
    } satisfies CSSProperties
  },
  modal: {
    containerStyle: {
      marginInline: "auto"
    } satisfies CSSProperties,
    surfaceStyle: {
      borderRadius: 18,
      border: "1px solid var(--line)",
      boxShadow: "0 18px 34px rgba(15, 23, 42, 0.10)"
    } satisfies CSSProperties
  },
  preview: {
    containerStyle: {} satisfies CSSProperties,
    surfaceStyle: {
      borderRadius: 20,
      border: "1px solid var(--line)",
      boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)"
    } satisfies CSSProperties
  },
  print: {
    containerStyle: {
      display: "block"
    } satisfies CSSProperties,
    surfaceStyle: {
      borderRadius: 0,
      border: "none",
      boxShadow: "none"
    } satisfies CSSProperties
  }
} as const;

export function LabelPreviewSurface({
  document,
  scale,
  previewPayload,
  preset = "editor",
  containerStyle,
  surfaceStyle
}: {
  document: LabelDocument;
  scale: number;
  previewPayload?: PreviewPayload;
  preset?: keyof typeof PRESET_STYLES;
  containerStyle?: CSSProperties;
  surfaceStyle?: CSSProperties;
}) {
  const presetStyles = PRESET_STYLES[preset];

  return (
    <LabelDocumentSurface
      document={document}
      scale={scale}
      previewPayload={previewPayload ?? buildPreviewPayload(document)}
      containerStyle={{
        ...presetStyles.containerStyle,
        ...containerStyle
      }}
      surfaceStyle={{
        ...presetStyles.surfaceStyle,
        ...surfaceStyle
      }}
    />
  );
}
