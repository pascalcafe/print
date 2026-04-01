import {
  type ElementAlignment,
  type LabelDataField,
  type LabelDocument,
  type LabelElement
} from "../template/document";
import {
  createBarcodeElement,
  createDynamicFieldElement,
  createImageElement,
  createLineElement,
  createQrCodeElement,
  createShapeElement,
  createTextElement
} from "../template/factories";

export interface EditorHistoryState {
  past: LabelDocument[];
  present: LabelDocument;
  future: LabelDocument[];
}

export type EditorElementPatch = Partial<LabelElement> & { id: string };
export interface AddElementOptions {
  variant?: "default" | "dynamic";
}

type LayerMoveDirection = "forward" | "backward" | "front" | "back";

export const createEditorHistory = (document: LabelDocument): EditorHistoryState => ({
  past: [],
  present: document,
  future: []
});

const cloneDocument = (document: LabelDocument): LabelDocument =>
  JSON.parse(JSON.stringify(document)) as LabelDocument;

const commit = (state: EditorHistoryState, next: LabelDocument): EditorHistoryState => ({
  past: [...state.past, cloneDocument(state.present)],
  present: next,
  future: []
});

const reindexZOrder = (elements: LabelElement[]) =>
  [...elements]
    .sort((left, right) => left.zIndex - right.zIndex)
    .map((element, index) => ({
      ...element,
      zIndex: index + 1
    }));

const nextElementId = (state: EditorHistoryState) => `el_${state.present.elements.length + 1}`;
const nextZIndex = (state: EditorHistoryState) =>
  state.present.elements.reduce((max, element) => Math.max(max, element.zIndex), 0) + 1;

export const addElement = (
  state: EditorHistoryState,
  type: LabelElement["type"],
  options?: AddElementOptions
): EditorHistoryState => {
  const id = nextElementId(state);
  const zIndex = nextZIndex(state);
  const newElement =
    type === "text"
      ? options?.variant === "dynamic"
        ? createDynamicFieldElement(id, zIndex)
        : createTextElement(id, zIndex)
      : type === "barcode"
        ? createBarcodeElement(id, zIndex)
        : type === "qrcode"
          ? createQrCodeElement(id, zIndex)
        : type === "line"
          ? createLineElement(id, zIndex)
          : type === "shape"
            ? createShapeElement(id, zIndex)
            : createImageElement(id, zIndex);

  return commit(state, {
    ...state.present,
    elements: [...state.present.elements, newElement]
  });
};

export const updateElement = (
  state: EditorHistoryState,
  patch: EditorElementPatch
): EditorHistoryState =>
  commit(state, {
    ...state.present,
    elements: state.present.elements.map((element) =>
      element.id === patch.id ? ({ ...element, ...patch } as LabelElement) : element
    )
  });

export const duplicateElement = (
  state: EditorHistoryState,
  elementId: string
): EditorHistoryState => {
  const source = state.present.elements.find((element) => element.id === elementId);
  if (!source) {
    return state;
  }

  const duplicated = {
    ...cloneDocument({ ...state.present, elements: [source] }).elements[0],
    id: nextElementId(state),
    name: `${source.name} copia`,
    x: source.x + 4,
    y: source.y + 4,
    zIndex: nextZIndex(state)
  } as LabelElement;

  return commit(state, {
    ...state.present,
    elements: [...state.present.elements, duplicated]
  });
};

export const toggleElementLock = (
  state: EditorHistoryState,
  elementId: string
): EditorHistoryState => {
  const target = state.present.elements.find((element) => element.id === elementId);
  if (!target) {
    return state;
  }

  return updateElement(state, {
    id: elementId,
    locked: !target.locked
  });
};

export const rotateElement = (
  state: EditorHistoryState,
  elementId: string,
  delta: number
): EditorHistoryState => {
  const target = state.present.elements.find((element) => element.id === elementId);
  if (!target) {
    return state;
  }

  const rotation = ((target.rotation + delta) % 360 + 360) % 360;
  return updateElement(state, {
    id: elementId,
    rotation
  });
};

export const alignElement = (
  state: EditorHistoryState,
  elementId: string,
  alignment: ElementAlignment
): EditorHistoryState => {
  const target = state.present.elements.find((element) => element.id === elementId);
  if (!target) {
    return state;
  }

  const nextPatch: Partial<LabelElement> = {};
  if (alignment === "left") nextPatch.x = 0;
  if (alignment === "center")
    nextPatch.x = Math.max(0, (state.present.document.width - target.width) / 2);
  if (alignment === "right")
    nextPatch.x = Math.max(0, state.present.document.width - target.width);
  if (alignment === "top") nextPatch.y = 0;
  if (alignment === "middle")
    nextPatch.y = Math.max(0, (state.present.document.height - target.height) / 2);
  if (alignment === "bottom")
    nextPatch.y = Math.max(0, state.present.document.height - target.height);

  return updateElement(state, {
    id: elementId,
    ...nextPatch
  });
};

export const moveElementLayer = (
  state: EditorHistoryState,
  elementId: string,
  direction: LayerMoveDirection
): EditorHistoryState => {
  const ordered = [...state.present.elements].sort((left, right) => left.zIndex - right.zIndex);
  const index = ordered.findIndex((element) => element.id === elementId);
  if (index === -1) {
    return state;
  }

  const next = [...ordered];
  const [target] = next.splice(index, 1);
  if (!target) {
    return state;
  }

  if (direction === "backward") {
    next.splice(Math.max(0, index - 1), 0, target);
  } else if (direction === "forward") {
    next.splice(Math.min(next.length, index + 1), 0, target);
  } else if (direction === "back") {
    next.unshift(target);
  } else {
    next.push(target);
  }

  return commit(state, {
    ...state.present,
    elements: reindexZOrder(next)
  });
};

export const selectDocument = (state: EditorHistoryState, document: LabelDocument) =>
  createEditorHistory(document);

export const updateDocumentSettings = (
  state: EditorHistoryState,
  patch: Partial<LabelDocument["document"]>
): EditorHistoryState =>
  commit(state, {
    ...state.present,
    document: {
      ...state.present.document,
      ...patch
    }
  });

export const updateTemplateMetadata = (
  state: EditorHistoryState,
  patch: Partial<Pick<LabelDocument, "name" | "status">>
): EditorHistoryState =>
  commit(state, {
    ...state.present,
    ...patch
  });

export const addDataField = (
  state: EditorHistoryState,
  field?: Partial<LabelDataField>
): EditorHistoryState => {
  const nextFieldIndex = state.present.dataSchema.length + 1;
  return commit(state, {
    ...state.present,
    dataSchema: [
      ...state.present.dataSchema,
      {
        key: field?.key ?? `field_${nextFieldIndex}`,
        label: field?.label ?? `Campo ${nextFieldIndex}`,
        type: field?.type ?? "text",
        required: field?.required ?? false,
        description: field?.description,
        sampleValue: field?.sampleValue ?? "",
        fallbackValue: field?.fallbackValue,
        formatType: field?.formatType ?? "text",
        formatConfig: field?.formatConfig ?? {}
      }
    ]
  });
};

export const updateDataField = (
  state: EditorHistoryState,
  key: string,
  patch: Partial<LabelDataField>
): EditorHistoryState =>
  commit(state, {
    ...state.present,
    dataSchema: state.present.dataSchema.map((field) =>
      field.key === key ? { ...field, ...patch } : field
    )
  });

export const removeDataField = (state: EditorHistoryState, key: string): EditorHistoryState =>
  commit(state, {
    ...state.present,
    dataSchema: state.present.dataSchema.filter((field) => field.key !== key),
    elements: state.present.elements.map((element) =>
      element.type === "text" && element.contentMode === "dynamic" && element.bindingKey === key
        ? {
            ...element,
            bindingKey: undefined,
            text: element.placeholder ?? element.text
          }
        : element
    )
  });

export const undo = (state: EditorHistoryState): EditorHistoryState => {
  const previous = state.past.at(-1);
  if (!previous) {
    return state;
  }

  return {
    past: state.past.slice(0, -1),
    present: previous,
    future: [cloneDocument(state.present), ...state.future]
  };
};

export const redo = (state: EditorHistoryState): EditorHistoryState => {
  const next = state.future[0];
  if (!next) {
    return state;
  }

  return {
    past: [...state.past, cloneDocument(state.present)],
    present: next,
    future: state.future.slice(1)
  };
};
