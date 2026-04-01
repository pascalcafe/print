"use client";

import type { LabelElement } from "@easyprint/shared/template/document";
import { useEditorStore } from "../../lib/editor-store";

const items: {
  type: LabelElement["type"];
  label: string;
  description: string;
  variant?: "default" | "dynamic";
}[] = [
  { type: "text", label: "Texto", description: "Titulos, blocos e conteudo livre" },
  {
    type: "text",
    label: "Campo dinamico",
    description: "Texto vinculado ao schema de dados",
    variant: "dynamic"
  },
  { type: "barcode", label: "Codigo de barras", description: "Identificacao escaneavel" },
  { type: "qrcode", label: "QR Code", description: "Leitura 2D para links e dados" },
  { type: "line", label: "Linha", description: "Separacao e guias visuais" },
  { type: "shape", label: "Retangulo", description: "Areas, bordas e blocos" },
  { type: "image", label: "Imagem", description: "Logo e elementos graficos" }
];

export function EditorLibrary({ readOnly = false }: { readOnly?: boolean }) {
  const addCanvasElement = useEditorStore((state) => state.addCanvasElement);

  return (
    <aside className="editor-sidebar">
      <div className="editor-sidebar__header">
        <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
          Biblioteca
        </div>
        <strong>Elementos</strong>
      </div>

      <div className="editor-sidebar__body" style={{ display: "grid", gap: 12, alignContent: "start" }}>
        {items.map((item) => (
          <button
            key={`${item.type}-${item.label}`}
            disabled={readOnly}
            onClick={() => addCanvasElement(item.type, { variant: item.variant })}
            style={{
              textAlign: "left",
              background: readOnly ? "rgba(255,255,255,0.55)" : "#fff",
              border: "1px solid var(--line)",
              borderRadius: 16,
              padding: 14,
              display: "grid",
              gap: 6,
              opacity: readOnly ? 0.6 : 1,
              cursor: readOnly ? "not-allowed" : "pointer"
            }}
          >
            <span style={{ fontWeight: 600 }}>{item.label}</span>
            <span className="muted" style={{ fontSize: 13 }}>
              {item.description}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
