"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EditorShell } from "../../../components/editor/editor-shell";
import { SessionGuard } from "../../../components/app/session-guard";
import { fetchTemplateDocument } from "../../../lib/api";
import { sessionHasPermission, type ApiSession } from "../../../lib/session";
import type { LabelDocument } from "@easyprint/shared/template/document";

export default function EditorPage() {
  const params = useParams<{ id: string }>();
  const [session, setSession] = useState<ApiSession | null>(null);
  const [document, setDocument] = useState<LabelDocument | null>(null);
  const canViewTemplates = sessionHasPermission(session, "template.view");
  const canEditTemplates = sessionHasPermission(session, "template.edit");
  const isNewTemplate = params?.id === "new";

  useEffect(() => {
    if (!session || !params?.id || !canViewTemplates) return;
    void fetchTemplateDocument(params.id, session).then(setDocument);
  }, [canViewTemplates, params?.id, session]);

  return (
    <SessionGuard onSession={setSession}>
      {!canViewTemplates || (isNewTemplate && !canEditTemplates) ? (
        <main className="shell">
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso a esta tela do editor.
          </div>
        </main>
      ) : document ? (
        <EditorShell initialDocument={document} />
      ) : (
        <main className="shell">Carregando editor...</main>
      )}
    </SessionGuard>
  );
}
