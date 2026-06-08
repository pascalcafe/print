"use client";

import { EDITOR_UNIT_SCALE } from "../../lib/editor-text";
import type { PreparedModelPrint } from "../../lib/model-printing";
import { LabelPreviewSurface } from "../editor/label-preview-surface";

export function ModelPrintSheet({
  printExecution
}: {
  printExecution: PreparedModelPrint | null;
}) {
  if (!printExecution) {
    return null;
  }

  return (
    <div className="label-print-portal" aria-hidden="true">
      <div data-print-root className="label-print-root">
        {Array.from({ length: printExecution.quantity }, (_, index) => (
          <div key={`${printExecution.templateId}-${index}`} className="label-print-root__page">
            <div className="label-print-root__item">
              <LabelPreviewSurface
                document={printExecution.document}
                previewPayload={printExecution.payload}
                scale={EDITOR_UNIT_SCALE}
                preset="print"
                containerStyle={{
                  width: printExecution.document.document.width * EDITOR_UNIT_SCALE,
                  height: printExecution.document.document.height * EDITOR_UNIT_SCALE
                }}
                surfaceStyle={{
                  background: printExecution.document.document.background
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
