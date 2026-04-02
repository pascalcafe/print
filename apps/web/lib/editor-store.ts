"use client";

import { create } from "zustand";
import type {
  ElementAlignment,
  LabelDataField,
  LabelDocument,
  LabelElement
} from "@easyprint/shared/template/document";
import {
  addElement,
  addDataField,
  alignElement,
  type AddElementOptions,
  createEditorHistory,
  duplicateElement,
  moveElementLayer,
  redo,
  type EditorHistoryState,
  rotateElement,
  toggleElementLock,
  undo,
  updateDataField,
  updateDocumentSettings,
  updateTemplateDocumentMetadata,
  updateTemplateMetadata,
  updateElement
} from "@easyprint/shared/editor/store";
import { removeDataField } from "@easyprint/shared/editor/store";

interface EditorStore {
  history: EditorHistoryState;
  selectedElementId?: string;
  zoom: number;
  unit: string;
  statusMessage: string;
  savingState: "idle" | "saving" | "saved" | "error";
  gridEnabled: boolean;
  snapEnabled: boolean;
  gridSize: number;
  loadDocument: (document: LabelDocument) => void;
  selectElement: (elementId?: string) => void;
  addCanvasElement: (type: LabelElement["type"], options?: AddElementOptions) => void;
  patchElement: (elementId: string, patch: Partial<LabelElement>) => void;
  addTemplateDataField: () => void;
  patchTemplateDataField: (key: string, patch: Partial<LabelDataField>) => void;
  removeTemplateDataField: (key: string) => void;
  duplicateSelectedElement: () => void;
  toggleSelectedLock: () => void;
  rotateSelectedElement: (delta: number) => void;
  moveSelectedLayer: (direction: "forward" | "backward" | "front" | "back") => void;
  alignSelectedElement: (alignment: ElementAlignment) => void;
  patchDocument: (patch: Partial<LabelDocument["document"]>) => void;
  patchTemplate: (patch: Partial<Pick<LabelDocument, "name" | "status">>) => void;
  patchMetadata: (patch: Partial<LabelDocument["metadata"]>) => void;
  syncPersistedTemplate: (
    patch: Partial<Pick<LabelDocument, "id" | "version" | "status">>
  ) => void;
  setZoom: (zoom: number) => void;
  markStatus: (status: string) => void;
  setSavingState: (state: EditorStore["savingState"]) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  setGridSize: (size: number) => void;
  undoAction: () => void;
  redoAction: () => void;
}

const emptyDocument = createEditorHistory({
  id: "template-new",
  name: "Nova etiqueta",
  version: 1,
  status: "draft",
  document: {
    width: 100,
    height: 50,
    unit: "mm",
    orientation: "landscape",
    background: "#ffffff",
    dpi: 203
  },
  settings: {},
  dataSchema: [],
  elements: [],
  metadata: {}
});

export const useEditorStore = create<EditorStore>((set) => ({
  history: emptyDocument,
  selectedElementId: undefined,
  zoom: 1,
  unit: "mm",
  statusMessage: "Pronto",
  savingState: "idle",
  gridEnabled: true,
  snapEnabled: true,
  gridSize: 4,
  loadDocument: (document) =>
    set({
      history: createEditorHistory(document),
      selectedElementId: document.elements[0]?.id,
      unit: document.document.unit,
      statusMessage: "Template carregado",
      savingState: "idle"
    }),
  selectElement: (elementId) => set({ selectedElementId: elementId }),
  addCanvasElement: (type, options) =>
    set((state) => {
      const nextHistory = addElement(state.history, type, options);
      return {
        history: nextHistory,
        selectedElementId: nextHistory.present.elements.at(-1)?.id,
        statusMessage: `Elemento ${type} adicionado`
      };
    }),
  patchElement: (elementId, patch) =>
    set((state) => ({
      history: updateElement(state.history, { id: elementId, ...patch }),
      statusMessage: "Elemento atualizado"
    })),
  addTemplateDataField: () =>
    set((state) => ({
      history: addDataField(state.history),
      statusMessage: "Campo dinamico adicionado"
    })),
  patchTemplateDataField: (key, patch) =>
    set((state) => ({
      history: updateDataField(state.history, key, patch),
      statusMessage: "Campo dinamico atualizado"
    })),
  removeTemplateDataField: (key) =>
    set((state) => ({
      history: removeDataField(state.history, key),
      statusMessage: "Campo dinamico removido"
    })),
  duplicateSelectedElement: () =>
    set((state) => {
      if (!state.selectedElementId) return state;
      const nextHistory = duplicateElement(state.history, state.selectedElementId);
      const nextElement = nextHistory.present.elements.at(-1);
      return {
        history: nextHistory,
        selectedElementId: nextElement?.id,
        statusMessage: "Elemento duplicado"
      };
    }),
  toggleSelectedLock: () =>
    set((state) => {
      if (!state.selectedElementId) return state;
      const current = state.history.present.elements.find(
        (element) => element.id === state.selectedElementId
      );
      return {
        history: toggleElementLock(state.history, state.selectedElementId),
        statusMessage: current?.locked ? "Elemento desbloqueado" : "Elemento bloqueado"
      };
    }),
  rotateSelectedElement: (delta) =>
    set((state) => {
      if (!state.selectedElementId) return state;
      return {
        history: rotateElement(state.history, state.selectedElementId, delta),
        statusMessage: "Rotacao atualizada"
      };
    }),
  moveSelectedLayer: (direction) =>
    set((state) => {
      if (!state.selectedElementId) return state;
      return {
        history: moveElementLayer(state.history, state.selectedElementId, direction),
        statusMessage: "Camada atualizada"
      };
    }),
  alignSelectedElement: (alignment) =>
    set((state) => {
      if (!state.selectedElementId) return state;
      return {
        history: alignElement(state.history, state.selectedElementId, alignment),
        statusMessage: `Alinhamento ${alignment}`
      };
    }),
  patchDocument: (patch) =>
    set((state) => ({
      history: updateDocumentSettings(state.history, patch),
      unit: patch.unit ?? state.unit,
      statusMessage: "Configuracao da etiqueta atualizada"
    })),
  patchTemplate: (patch) =>
    set((state) => ({
      history: updateTemplateMetadata(state.history, patch),
      statusMessage: "Template atualizado"
    })),
  patchMetadata: (patch) =>
    set((state) => ({
      history: updateTemplateDocumentMetadata(state.history, patch),
      statusMessage: "Metadados do template atualizados"
    })),
  syncPersistedTemplate: (patch) =>
    set((state) => ({
      history: {
        ...state.history,
        present: {
          ...state.history.present,
          ...patch
        }
      }
    })),
  setZoom: (zoom) => {
    const nextZoom = Math.min(3, Math.max(0.35, zoom));
    set({ zoom: nextZoom, statusMessage: `Zoom ${Math.round(nextZoom * 100)}%` });
  },
  markStatus: (statusMessage) => set({ statusMessage }),
  setSavingState: (savingState) => set({ savingState }),
  toggleGrid: () =>
    set((state) => ({
      gridEnabled: !state.gridEnabled,
      statusMessage: state.gridEnabled ? "Grade oculta" : "Grade exibida"
    })),
  toggleSnap: () =>
    set((state) => ({
      snapEnabled: !state.snapEnabled,
      statusMessage: state.snapEnabled ? "Snap desativado" : "Snap ativado"
    })),
  setGridSize: (gridSize) =>
    set((state) => ({
      gridSize,
      statusMessage: `Grade ${gridSize}${state.unit}`
    })),
  undoAction: () =>
    set((state) => ({
      history: undo(state.history),
      statusMessage: "Desfazer"
    })),
  redoAction: () =>
    set((state) => ({
      history: redo(state.history),
      statusMessage: "Refazer"
    }))
}));
