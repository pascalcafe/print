"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchTemplateDocument } from "../../../lib/api";
import { SessionGuard } from "../../../components/app/session-guard";
import { sessionHasPermission, type ApiSession } from "../../../lib/session";
import type { LabelDocument } from "@easyprint/shared/template/document";
import { buildPreviewPayload } from "@easyprint/shared/template/render";
import { LabelDocumentSurface } from "../../../components/editor/document-renderer";
import { EDITOR_UNIT_SCALE } from "../../../lib/editor-text";

export default function PreviewPage() {
  const params = useParams<{ id: string }>();
  const [session, setSession] = useState<ApiSession | null>(null);
  const [document, setDocument] = useState<LabelDocument | null>(null);
  const canViewTemplates = sessionHasPermission(session, "template.view");

  useEffect(() => {
    if (!session || !params?.id || !canViewTemplates) return;
    void fetchTemplateDocument(params.id, session).then(setDocument);
  }, [canViewTemplates, params?.id, session]);

  const previewPayload = useMemo(
    () => (document ? buildPreviewPayload(document) : {}),
    [document]
  );

  return (
    <SessionGuard onSession={setSession}>
      {!canViewTemplates ? (
        <main className="shell">
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso ao preview.
          </div>
        </main>
      ) : document ? (
        <main className="shell" data-print-page style={{ display: "grid", placeItems: "center" }}>
          <section
            className="panel"
            style={{
              padding: 32,
              display: "grid",
              gap: 20,
              width: "min(1080px, 100%)"
            }}
          >
            <header
              data-print-chrome
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap"
              }}
            >
              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
                  Preview desacoplado
                </div>
                <h1 style={{ margin: 0 }}>{document.name}</h1>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href={`/editor/${document.id}`}>Voltar ao editor</Link>
                <button onClick={() => window.print()}>Imprimir esta etiqueta</button>
              </div>
            </header>

            <div
              data-print-chrome
              className="muted"
              style={{ fontSize: 13 }}
            >
              A impressao agora isola somente a area da etiqueta. Nenhum titulo, menu ou chrome da
              interface entra na pagina impressa.
            </div>

            <div
              style={{
                display: "grid",
                placeItems: "center",
                padding: 24,
                borderRadius: 24,
                background:
                  "linear-gradient(180deg, rgba(248,250,252,0.96), rgba(241,245,249,0.94))"
              }}
            >
              <div data-print-root>
                <LabelDocumentSurface
                  document={document}
                  scale={EDITOR_UNIT_SCALE}
                  previewPayload={previewPayload}
                  surfaceStyle={{
                    borderRadius: 20,
                    border: "1px solid var(--line)",
                    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)"
                  }}
                />
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="shell">Carregando preview...</main>
      )}
    </SessionGuard>
  );
}
