import type { LabelDocument } from "@easyprint/shared/template/document";

const DRAFT_PREFIX = "easyprint:editor-draft:";

export interface StoredEditorDraft {
  document: LabelDocument;
  savedAt: string;
}

const getDraftKey = (id: string) => `${DRAFT_PREFIX}${id}`;

export const serializeTemplatePayload = (document: LabelDocument) =>
  JSON.stringify({
    name: document.name,
    status: document.status,
    document: document.document,
    settings: document.settings,
    dataSchema: document.dataSchema,
    elements: document.elements,
    metadata: document.metadata
  });

export function loadEditorDraft(id: string): StoredEditorDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(getDraftKey(id));
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredEditorDraft;
  } catch {
    return null;
  }
}

export function saveEditorDraft(document: LabelDocument) {
  if (typeof window === "undefined") {
    return;
  }

  const payload: StoredEditorDraft = {
    document,
    savedAt: new Date().toISOString()
  };
  window.localStorage.setItem(getDraftKey(document.id), JSON.stringify(payload));
}

export function clearEditorDraft(id: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(getDraftKey(id));
}
