"use client";

import { useMemo } from "react";
import type { LabelDocument } from "@easyprint/shared/template/document";
import type { PreviewPayload } from "@easyprint/shared/template/render";
import { LabelPreviewSurface } from "../editor/label-preview-surface";

const PREVIEW_MAX_WIDTH = 340;
const PREVIEW_MAX_HEIGHT = 420;

export function ModelPrintPreview({
  document,
  previewPayload,
  loading
}: {
  document: LabelDocument | null;
  previewPayload: PreviewPayload;
  loading: boolean;
}) {
  const previewScale = useMemo(() => {
    if (!document) {
      return 1;
    }

    return Math.min(
      5.5,
      PREVIEW_MAX_WIDTH / Math.max(document.document.width, 1),
      PREVIEW_MAX_HEIGHT / Math.max(document.document.height, 1)
    );
  }, [document]);

  return (
    <aside className="model-print-modal__preview">
      <header className="model-print-preview__header">
        <div className="muted" style={{ fontSize: 12 }}>
          Preview do modelo
        </div>
        <strong>Etiqueta pronta para impressao</strong>
        {document ? (
          <div className="model-print-preview__meta">
            {document.document.width} x {document.document.height} {document.document.unit}
          </div>
        ) : null}
      </header>

      <div className="model-print-preview__stage">
        {loading ? (
          <div className="muted">Carregando modelo...</div>
        ) : document ? (
          <div className="model-print-preview__frame">
            <LabelPreviewSurface
              document={document}
              previewPayload={previewPayload}
              scale={previewScale}
              preset="modal"
            />
          </div>
        ) : (
          <div className="muted">Selecione um modelo para visualizar.</div>
        )}
      </div>
    </aside>
  );
}
