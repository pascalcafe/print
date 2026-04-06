"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTestPrintJob,
  createTemplateVersion,
  decideTemplateApproval,
  fetchTemplateDocument,
  fetchTemplateApprovals,
  fetchTemplateVersions,
  publishTemplate,
  rollbackTemplateVersion,
  saveTemplate,
  submitTemplateReview,
  type TemplateApprovalItem,
  type TemplateVersionItem
} from "../../lib/api";
import { useEditorStore } from "../../lib/editor-store";
import {
  clearEditorDraft,
  loadEditorDraft,
  saveEditorDraft,
  serializeTemplatePayload,
  type StoredEditorDraft
} from "../../lib/editor-draft";
import { loadStoredSession, sessionHasPermission } from "../../lib/session";
import type { LabelDocument } from "@easyprint/shared/template/document";
import { EditorCanvas } from "./canvas";
import { EditorLibrary } from "./library";
import { EditorProperties } from "./properties";
import { EditorStatusBar } from "./status-bar";
import { EditorTopbar } from "./topbar";

export function EditorShell({ initialDocument }: { initialDocument: LabelDocument }) {
  const router = useRouter();
  const [session] = useState(() => loadStoredSession());
  const [showLibrary, setShowLibrary] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const canEdit = sessionHasPermission(session, "template.edit");
  const canReview = sessionHasPermission(session, "template.review");
  const canApprove = sessionHasPermission(session, "template.approve");
  const canPublish = sessionHasPermission(session, "template.publish");
  const canRollback = sessionHasPermission(session, "template.rollback");
  const canCreateVersion = sessionHasPermission(session, "template.version.create");
  const canPrintTest = sessionHasPermission(session, "print-job.test");
  const canManageAssets = sessionHasPermission(session, "asset.manage");
  const [versions, setVersions] = useState<TemplateVersionItem[]>([]);
  const [approvals, setApprovals] = useState<TemplateApprovalItem[]>([]);
  const [rollbackPending, setRollbackPending] = useState(false);
  const [createVersionPending, setCreateVersionPending] = useState(false);
  const [recoverableDraft, setRecoverableDraft] = useState<StoredEditorDraft | null>(null);
  const lastSavedPayloadRef = useRef(serializeTemplatePayload(initialDocument));
  const didHydrateRef = useRef(false);
  const autosaveInFlightRef = useRef(false);
  const autosaveQueuedRef = useRef(false);
  const previousDraftKeyRef = useRef(initialDocument.id);
  const {
    history,
    loadDocument,
    undoAction,
    redoAction,
    markStatus,
    patchTemplate,
    setSavingState,
    syncPersistedTemplate
  } = useEditorStore();
  const lifecycleReadOnly =
    history.present.id !== "template-new" && history.present.status !== "draft";
  const editorReadOnly = !canEdit || lifecycleReadOnly;
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  useEffect(() => {
    const serverPayload = serializeTemplatePayload(initialDocument);
    const localDraft = loadEditorDraft(initialDocument.id);

    lastSavedPayloadRef.current = serverPayload;
    didHydrateRef.current = false;
    previousDraftKeyRef.current = initialDocument.id;
    loadDocument(initialDocument);
    setRecoverableDraft(
      localDraft && serializeTemplatePayload(localDraft.document) !== serverPayload
        ? localDraft
        : null
    );

    const timeout = window.setTimeout(() => {
      didHydrateRef.current = true;
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [initialDocument, loadDocument]);

  const refreshVersions = useCallback(async (templateId?: string) => {
    const activeTemplateId = templateId ?? useEditorStore.getState().history.present.id;
    if (!session || activeTemplateId === "template-new") {
      setVersions([]);
      return;
    }

    try {
      const nextVersions = await fetchTemplateVersions(activeTemplateId, session);
      setVersions(nextVersions);
    } catch {
      setVersions([]);
    }
  }, [session]);

  const refreshApprovals = useCallback(async (templateId?: string) => {
    const activeTemplateId = templateId ?? useEditorStore.getState().history.present.id;
    if (!session || activeTemplateId === "template-new") {
      setApprovals([]);
      return;
    }

    try {
      const nextApprovals = await fetchTemplateApprovals(activeTemplateId, session);
      setApprovals(nextApprovals);
    } catch {
      setApprovals([]);
    }
  }, [session]);

  useEffect(() => {
    void refreshVersions();
    void refreshApprovals();
  }, [refreshApprovals, refreshVersions]);

  const handleSave = useCallback(async () => {
    if (!session || editorReadOnly) return false;
    const currentDocument = useEditorStore.getState().history.present;
    const wasNew = currentDocument.id === "template-new";
    setSavingState("saving");
    try {
      const response = await saveTemplate(currentDocument, session, {
        versionNotes: "Salvo pelo editor web"
      });
      lastSavedPayloadRef.current = serializeTemplatePayload(currentDocument);
      syncPersistedTemplate({
        id: response.id,
        version: response.currentVersion,
        status: String(response.status).toLowerCase() as LabelDocument["status"]
      });
      clearEditorDraft(currentDocument.id);
      if (wasNew) {
        router.replace(`/editor/${response.id}`);
      }
      setSavingState("saved");
      markStatus("Template salvo");
      void refreshVersions(response.id);
      return true;
    } catch {
      setSavingState("error");
      markStatus("Falha ao salvar");
      return false;
    }
  }, [editorReadOnly, markStatus, refreshVersions, router, session, setSavingState, syncPersistedTemplate]);

  const handleAutosave = useCallback(
    async (documentSnapshot: LabelDocument, payloadSnapshot: string) => {
      if (!session || editorReadOnly || documentSnapshot.id === "template-new") {
        return;
      }

      if (autosaveInFlightRef.current) {
        autosaveQueuedRef.current = true;
        return;
      }

      autosaveInFlightRef.current = true;
      setSavingState("saving");
      markStatus("Autosave remoto em andamento");

      try {
        const response = await saveTemplate(documentSnapshot, session, {
          versionNotes: "Autosave do editor"
        });

        lastSavedPayloadRef.current = payloadSnapshot;
        syncPersistedTemplate({
          id: response.id,
          version: response.currentVersion,
          status: String(response.status).toLowerCase() as LabelDocument["status"]
        });
        clearEditorDraft(documentSnapshot.id);
        setSavingState("saved");
        markStatus(
          `Autosave sincronizado ${new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
          })}`
        );
        void refreshVersions(response.id);
      } catch {
        setSavingState("error");
        markStatus("Falha no autosave remoto");
      } finally {
        autosaveInFlightRef.current = false;
        if (autosaveQueuedRef.current) {
          autosaveQueuedRef.current = false;
          const latestDocument = useEditorStore.getState().history.present;
          const latestPayload = serializeTemplatePayload(latestDocument);
          if (latestDocument.id !== "template-new" && latestPayload !== lastSavedPayloadRef.current) {
            void handleAutosave(latestDocument, latestPayload);
          }
        }
      }
    },
    [editorReadOnly, markStatus, refreshVersions, session, setSavingState, syncPersistedTemplate]
  );

  useEffect(() => {
    if (!didHydrateRef.current) {
      return;
    }

    const currentDocument = history.present;
    const previousDraftKey = previousDraftKeyRef.current;
    if (previousDraftKey !== currentDocument.id) {
      clearEditorDraft(previousDraftKey);
      previousDraftKeyRef.current = currentDocument.id;
    }

    const localTimeout = window.setTimeout(() => {
      saveEditorDraft(currentDocument);
    }, 700);

    const payload = serializeTemplatePayload(currentDocument);
    if (
      !session ||
      editorReadOnly ||
      currentDocument.id === "template-new" ||
      payload === lastSavedPayloadRef.current
    ) {
      return () => window.clearTimeout(localTimeout);
    }

    const remoteTimeout = window.setTimeout(() => {
      void handleAutosave(currentDocument, payload);
    }, 1800);

    return () => {
      window.clearTimeout(localTimeout);
      window.clearTimeout(remoteTimeout);
    };
  }, [editorReadOnly, handleAutosave, history.present, session]);

  const handlePublish = async () => {
    if (!session || !canPublish || history.present.id === "template-new") return;
    const password = window.prompt("Confirme sua senha para publicar este template");
    if (!password) return;
    const reason = window.prompt("Motivo da publicacao (opcional)") ?? undefined;
    const response = await publishTemplate(history.present.id, session, { password, reason });
    const nextStatus = String(response.status).toLowerCase() as LabelDocument["status"];
    patchTemplate({ status: nextStatus });
    lastSavedPayloadRef.current = serializeTemplatePayload({
      ...useEditorStore.getState().history.present,
      status: nextStatus
    });
    clearEditorDraft(history.present.id);
    markStatus("Template publicado");
    void refreshVersions();
    void refreshApprovals();
  };

  const handlePrintTest = async () => {
    if (!session || !canPrintTest) return;
    let templateId = history.present.id;
    if (templateId === "template-new") {
      await handleSave();
      templateId = useEditorStore.getState().history.present.id;
    }
    if (!templateId || templateId === "template-new") return;
    await createTestPrintJob(
      {
        templateId,
        payload: {
          sample: true
        }
      },
      session
    );
    markStatus("Impressao teste registrada");
  };

  const handleRollback = async (version: number) => {
    if (!session || !canRollback || history.present.id === "template-new") return;
    const password = window.prompt("Confirme sua senha para restaurar esta versao");
    if (!password) return;
    const reason = window.prompt("Motivo do rollback (opcional)") ?? undefined;
    setRollbackPending(true);
    try {
      await rollbackTemplateVersion(history.present.id, version, { password, reason }, session);
      const refreshed = await fetchTemplateDocument(history.present.id, session);
      lastSavedPayloadRef.current = serializeTemplatePayload(refreshed);
      clearEditorDraft(refreshed.id);
      loadDocument(refreshed);
      setRecoverableDraft(null);
      markStatus(`Template restaurado da versao ${version}`);
      void refreshVersions();
      void refreshApprovals();
    } catch {
      markStatus("Falha ao restaurar versao");
    } finally {
      setRollbackPending(false);
    }
  };

  const handleCreateVersion = async () => {
    if (!session || !canCreateVersion || history.present.id === "template-new") return;
    setCreateVersionPending(true);
    try {
      await createTemplateVersion(
        history.present.id,
        {
          notes: `Nova versao de trabalho a partir da v${history.present.version}`
        },
        session
      );
      const refreshed = await fetchTemplateDocument(history.present.id, session);
      lastSavedPayloadRef.current = serializeTemplatePayload(refreshed);
      loadDocument(refreshed);
      clearEditorDraft(refreshed.id);
      setRecoverableDraft(null);
      markStatus(`Nova versao criada a partir da v${history.present.version}`);
      void refreshVersions();
      void refreshApprovals();
    } catch {
      markStatus("Falha ao criar nova versao");
    } finally {
      setCreateVersionPending(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!session || !canReview || history.present.id === "template-new") return;
    const notes = window.prompt("Observacoes para a revisao (opcional)") ?? undefined;
    try {
      const response = await submitTemplateReview(history.present.id, { notes }, session);
      patchTemplate({
        status: String(response.status).toLowerCase() as LabelDocument["status"]
      });
      markStatus("Template enviado para revisao");
      void refreshVersions();
      void refreshApprovals();
    } catch {
      markStatus("Falha ao enviar template para revisao");
    }
  };

  const handleApprovalDecision = async (decision: "approved" | "rejected") => {
    if (!session || !canApprove || history.present.id === "template-new") return;
    const password = window.prompt(
      decision === "approved"
        ? "Confirme sua senha para aprovar este template"
        : "Confirme sua senha para rejeitar este template"
    );
    if (!password) return;
    const notes =
      window.prompt(
        decision === "approved"
          ? "Observacoes da aprovacao (opcional)"
          : "Motivo da rejeicao (opcional)"
      ) ?? undefined;

    try {
      const response = await decideTemplateApproval(
        history.present.id,
        { decision, password, notes },
        session
      );
      patchTemplate({
        status: String(response.status).toLowerCase() as LabelDocument["status"]
      });
      markStatus(
        decision === "approved"
          ? "Template aprovado formalmente"
          : "Template devolvido para draft"
      );
      void refreshVersions();
      void refreshApprovals();
    } catch {
      markStatus("Falha ao registrar decisao de aprovacao");
    }
  };

  const handleRestoreDraft = () => {
    if (!recoverableDraft) return;
    loadDocument(recoverableDraft.document);
    markStatus("Rascunho local restaurado");
    setRecoverableDraft(null);
    didHydrateRef.current = true;
  };

  const handleDiscardDraft = () => {
    clearEditorDraft(initialDocument.id);
    setRecoverableDraft(null);
    markStatus("Rascunho local descartado");
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey;
      if (!modifier) return;

      const key = event.key.toLowerCase();
      if (key === "s") {
        event.preventDefault();
        void handleSave();
        return;
      }

      if (key === "z" && !event.shiftKey) {
        event.preventDefault();
        undoAction();
        return;
      }

      if ((key === "z" && event.shiftKey) || key === "y") {
        event.preventDefault();
        redoAction();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleSave, redoAction, undoAction]);

  return (
    <main className="shell editor-shell">
      <section
        className="panel editor-shell__frame"
        style={{
          display: "grid",
          gridTemplateRows: "auto auto minmax(0, 1fr) auto",
          minHeight: "calc(100vh - 56px)",
          overflow: "hidden"
        }}
      >
        <EditorTopbar
          editorReadOnly={editorReadOnly}
          canUndo={canUndo}
          canRedo={canRedo}
          canReview={canReview}
          canApprove={canApprove}
          canPublish={canPublish}
          canCreateVersion={canCreateVersion}
          canPrintTest={canPrintTest}
          showLibrary={showLibrary}
          showInspector={showInspector}
          onToggleLibrary={() => setShowLibrary((current) => !current)}
          onToggleInspector={() => setShowInspector((current) => !current)}
          onBack={() => router.push("/")}
          onSave={() => void handleSave()}
          onPrintTest={() => void handlePrintTest()}
          onPublish={() => void handlePublish()}
          onSubmitReview={() => void handleSubmitReview()}
          onApprovalDecision={(decision) => void handleApprovalDecision(decision)}
          onCreateVersion={() => void handleCreateVersion()}
        />

        {recoverableDraft ? (
          <div className="editor-shell__draft-banner">
            <div style={{ display: "grid", gap: 4 }}>
              <strong style={{ fontSize: 14 }}>Rascunho local encontrado</strong>
              <span className="muted" style={{ fontSize: 12 }}>
                Existe uma versao local mais recente salva em{" "}
                {new Date(recoverableDraft.savedAt).toLocaleString("pt-BR")}.
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={handleDiscardDraft}>Descartar</button>
              <button onClick={handleRestoreDraft}>Restaurar rascunho</button>
            </div>
          </div>
        ) : null}

        <div
          className="editor-shell__body"
          style={{
            display: "grid",
            gridTemplateColumns: `${showLibrary ? "216px" : "0px"} minmax(0, 1fr) ${showInspector ? "296px" : "0px"}`,
            minHeight: 0,
            overflow: "hidden"
          }}
        >
          {showLibrary ? <EditorLibrary readOnly={editorReadOnly} /> : <div />}
          <div
            className="editor-shell__stage"
            style={{
              minWidth: 0,
              background:
                "linear-gradient(180deg, rgba(248,250,252,0.92), rgba(241,245,249,0.92))",
              borderLeft: showLibrary ? "1px solid var(--line)" : "none",
              borderRight: showInspector ? "1px solid var(--line)" : "none"
            }}
          >
            <div className="editor-shell__stage-header" data-print-chrome>
              <div className="editor-shell__stage-title">
                <strong>Canvas</strong>
                <span className="muted">
                  Documento principal em foco, com ferramentas tecnicas distribuídas na barra superior.
                </span>
              </div>
              <div className="editor-shell__stage-meta">
                <span className="editor-toolbar__tag">
                  {history.present.document.width} x {history.present.document.height} {history.present.document.unit}
                </span>
                <span className="editor-toolbar__tag">
                  {history.present.elements.length} elementos
                </span>
                <button
                  type="button"
                  className="editor-toolbar__button editor-toolbar__button--ghost"
                  onClick={() => router.push("/")}
                >
                  Biblioteca
                </button>
              </div>
            </div>
            <div className="editor-shell__stage-canvas editor-scrollarea">
              <EditorCanvas readOnly={editorReadOnly} />
            </div>
          </div>
          {showInspector ? (
            <EditorProperties
              readOnly={editorReadOnly}
              canManageAssets={canManageAssets}
              versions={versions}
              approvals={approvals}
              rollbackPending={rollbackPending}
              createVersionPending={createVersionPending}
              onCreateVersion={canCreateVersion ? handleCreateVersion : undefined}
              onRollback={canRollback ? handleRollback : undefined}
            />
          ) : (
            <div />
          )}
        </div>

        <EditorStatusBar />
      </section>
    </main>
  );
}
