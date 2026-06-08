"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  type LabelDocument,
  type LabelElement,
  type TextElement
} from "@easyprint/shared/template/document";
import {
  buildPreviewPayload,
  type PreviewPayload,
  resolveTextElementContent
} from "@easyprint/shared/template/render";
import { getTextElementStyle } from "../../lib/editor-text";
import { QrSymbol } from "./qr-symbol";

export const getElementFrameStyle = (
  element: LabelElement,
  scale: number,
  extra?: CSSProperties
): CSSProperties => ({
  position: "absolute",
  left: element.x * scale,
  top: element.y * scale,
  width: element.width * scale,
  height: element.height * scale,
  transform: `rotate(${element.rotation}deg)`,
  transformOrigin: "center center",
  display: element.visible ? "block" : "none",
  ...extra
});

export function LabelElementContent({
  document,
  element,
  scale = 1,
  previewPayload = buildPreviewPayload(document),
  textOverride,
  textChildren
}: {
  document: LabelDocument;
  element: LabelElement;
  scale?: number;
  previewPayload?: PreviewPayload;
  textOverride?: string;
  textChildren?: ReactNode;
}) {
  if (element.type === "text") {
    const content =
      textOverride ?? resolveTextElementContent(document, element, previewPayload);

    return (
      <div style={getTextElementStyle(element as TextElement, scale)}>
        {textChildren ?? content}
      </div>
    );
  }

  if (element.type === "shape") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: element.fill,
          border: `${Math.max(1, element.strokeWidth * scale)}px solid ${element.stroke}`,
          borderRadius: element.borderRadius * scale
        }}
      />
    );
  }

  if (element.type === "line") {
    return (
      <div
        style={{
          width: "100%",
          height: Math.max(1, element.strokeWidth * scale),
          background: element.stroke,
          marginTop: Math.max(0, element.height * scale / 2 - Math.max(1, element.strokeWidth * scale) / 2)
        }}
      />
    );
  }

  if (element.type === "barcode") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          border: `${Math.max(1, scale * 0.4)}px solid #111827`,
          background:
            `repeating-linear-gradient(90deg, #111827 0 ${Math.max(2, scale)}px, transparent ${Math.max(2, scale)}px ${Math.max(4, scale * 2)}px)`,
          display: "grid",
          placeItems: "end center",
          paddingBottom: Math.max(2, scale * 0.75),
          fontSize: Math.max(8, scale * 1.45)
        }}
      >
        {element.showHumanReadable ? element.value : ""}
      </div>
    );
  }

  if (element.type === "qrcode") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: Math.max(2, scale * 0.4),
          background: "#ffffff",
          border: `${Math.max(1, scale * 0.35)}px solid #111827`
        }}
      >
        <QrSymbol value={element.value} level={element.errorCorrection} />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: `${Math.max(1, scale * 0.35)}px dashed #94a3b8`,
        display: "grid",
        placeItems: "center",
        color: "#64748b",
        background: "rgba(148, 163, 184, 0.08)",
        backgroundSize: element.fit === "contain" ? "contain" : element.fit === "stretch" ? "100% 100%" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: element.src ? `url(${element.src})` : undefined,
        opacity: element.opacity
      }}
    >
      {element.src ? null : "Imagem"}
    </div>
  );
}

export function LabelDocumentSurface({
  document,
  scale,
  previewPayload = buildPreviewPayload(document),
  containerStyle,
  surfaceStyle,
  renderElement
}: {
  document: LabelDocument;
  scale: number;
  previewPayload?: PreviewPayload;
  containerStyle?: CSSProperties;
  surfaceStyle?: CSSProperties;
  renderElement?: (element: LabelElement, content: ReactNode) => ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: document.document.width * scale,
        height: document.document.height * scale,
        ...containerStyle
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: document.document.background,
          overflow: "hidden",
          ...surfaceStyle
        }}
      >
        {[...document.elements]
          .sort((left, right) => left.zIndex - right.zIndex)
          .map((element) => {
            const content = (
              <div key={element.id} style={getElementFrameStyle(element, scale)}>
                <LabelElementContent
                  document={document}
                  element={element}
                  scale={scale}
                  previewPayload={previewPayload}
                />
              </div>
            );

            return renderElement ? renderElement(element, content) : content;
          })}
      </div>
    </div>
  );
}
