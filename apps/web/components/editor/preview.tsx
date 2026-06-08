import type { LabelDocument } from "@easyprint/shared/template/document";
import { buildPreviewPayload } from "@easyprint/shared/template/render";
import { LabelPreviewSurface } from "./label-preview-surface";

export function EditorPreview({ document }: { document: LabelDocument }) {
  const scale = Math.min(2.6, 240 / Math.max(document.document.width, 1));

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="muted" style={{ fontSize: 12 }}>
        Preview
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <LabelPreviewSurface
          document={document}
          scale={scale}
          previewPayload={buildPreviewPayload(document)}
          preset="editor"
        />
      </div>
    </div>
  );
}
