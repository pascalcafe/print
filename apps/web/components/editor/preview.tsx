import type { LabelDocument } from "@easyprint/shared/template/document";
import { buildPreviewPayload } from "@easyprint/shared/template/render";
import { LabelDocumentSurface } from "./document-renderer";

export function EditorPreview({ document }: { document: LabelDocument }) {
  const scale = Math.min(2.6, 240 / Math.max(document.document.width, 1));

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="muted" style={{ fontSize: 12 }}>
        Preview
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <LabelDocumentSurface
          document={document}
          scale={scale}
          previewPayload={buildPreviewPayload(document)}
          containerStyle={{
            marginInline: "auto"
          }}
          surfaceStyle={{
            borderRadius: 16,
            border: "1px solid var(--line)",
            boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)"
          }}
        />
      </div>
    </div>
  );
}
