import {
  DEFAULT_DOCUMENT,
  type BarcodeElement,
  type ImageElement,
  type LabelDocument,
  type LabelElement,
  type LineElement,
  type QrCodeElement,
  type ShapeElement,
  type TextElement
} from "./document";

const DEFAULT_TEXT_FONT = "IBM Plex Sans";
const DEFAULT_TEXT_SIZE = 12;
const DEFAULT_TEXT_WEIGHT = 500;
const DEFAULT_TEXT_LINE_HEIGHT = 1.2;

const createElementBase = <TType extends LabelElement["type"]>(
  id: string,
  name: string,
  type: TType,
  x: number,
  y: number,
  width: number,
  height: number,
  zIndex: number
) => ({
  id,
  type,
  name,
  x,
  y,
  width,
  height,
  rotation: 0,
  visible: true,
  locked: false,
  zIndex
});

export const createInitialDocument = (overrides?: Partial<LabelDocument>): LabelDocument => ({
  id: overrides?.id ?? "template-new",
  name: overrides?.name ?? "Nova etiqueta",
  version: overrides?.version ?? 1,
  status: overrides?.status ?? "draft",
  document: { ...DEFAULT_DOCUMENT, ...overrides?.document },
  settings: overrides?.settings ?? {},
  dataSchema: overrides?.dataSchema ?? [],
  elements: (overrides?.elements ?? []).map(normalizeLabelElement),
  metadata: overrides?.metadata ?? {}
});

export const normalizeLabelElement = (element: LabelElement): LabelElement => {
  if (element.type !== "text") {
    return element;
  }

  return {
    ...element,
    fontSize: element.fontSize ?? DEFAULT_TEXT_SIZE,
    fontFamily: element.fontFamily ?? DEFAULT_TEXT_FONT,
    fontWeight: element.fontWeight ?? DEFAULT_TEXT_WEIGHT,
    fontStyle: element.fontStyle ?? "normal",
    textDecoration: element.textDecoration ?? "none",
    lineHeight: element.lineHeight ?? DEFAULT_TEXT_LINE_HEIGHT,
    color: element.color ?? "#111827",
    align: element.align ?? "left"
  };
};

export const normalizeLabelDocument = (document: LabelDocument): LabelDocument => ({
  ...document,
  document: { ...DEFAULT_DOCUMENT, ...document.document },
  elements: document.elements.map(normalizeLabelElement)
});

export const createTextElement = (id: string, zIndex: number): TextElement => ({
  ...createElementBase(id, "Texto", "text", 12, 12, 32, 10, zIndex),
  contentMode: "static",
  text: "Novo texto",
  bindingKey: undefined,
  placeholder: undefined,
  fontSize: DEFAULT_TEXT_SIZE,
  fontFamily: DEFAULT_TEXT_FONT,
  fontWeight: DEFAULT_TEXT_WEIGHT,
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: DEFAULT_TEXT_LINE_HEIGHT,
  color: "#111827",
  align: "left"
});

export const createDynamicFieldElement = (id: string, zIndex: number): TextElement => ({
  ...createElementBase(id, "Campo dinamico", "text", 12, 12, 36, 10, zIndex),
  contentMode: "dynamic",
  text: "{{sku}}",
  bindingKey: "sku",
  placeholder: "SKU",
  fontSize: DEFAULT_TEXT_SIZE,
  fontFamily: DEFAULT_TEXT_FONT,
  fontWeight: DEFAULT_TEXT_WEIGHT,
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: DEFAULT_TEXT_LINE_HEIGHT,
  color: "#0f172a",
  align: "left"
});

export const createBarcodeElement = (id: string, zIndex: number): BarcodeElement => ({
  ...createElementBase(id, "Codigo de barras", "barcode", 12, 28, 48, 18, zIndex),
  value: "123456789012",
  format: "CODE128",
  showHumanReadable: true
});

export const createQrCodeElement = (id: string, zIndex: number): QrCodeElement => ({
  ...createElementBase(id, "QR Code", "qrcode", 12, 12, 24, 24, zIndex),
  value: "https://easyprint.local/template",
  errorCorrection: "M"
});

export const createLineElement = (id: string, zIndex: number): LineElement => ({
  ...createElementBase(id, "Linha", "line", 12, 16, 50, 1, zIndex),
  stroke: "#1f2937",
  strokeWidth: 1
});

export const createShapeElement = (id: string, zIndex: number): ShapeElement => ({
  ...createElementBase(id, "Retangulo", "shape", 18, 18, 30, 16, zIndex),
  shape: "rectangle",
  fill: "transparent",
  stroke: "#2563eb",
  strokeWidth: 1,
  borderRadius: 2
});

export const createImageElement = (id: string, zIndex: number): ImageElement => ({
  ...createElementBase(id, "Imagem", "image", 18, 18, 24, 24, zIndex),
  assetId: undefined,
  src: undefined,
  fit: "contain",
  opacity: 1
});
