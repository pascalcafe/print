export type LabelUnit = "mm" | "cm" | "in" | "px";
export type DocumentOrientation = "portrait" | "landscape";
export type TemplateStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "published"
  | "archived";
export type ElementType = "text" | "barcode" | "qrcode" | "line" | "shape" | "image";
export type ElementAlignment = "left" | "center" | "right" | "top" | "middle" | "bottom";

export interface LabelDocumentSettings {
  width: number;
  height: number;
  unit: LabelUnit;
  orientation: DocumentOrientation;
  background: string;
  dpi: number;
}

export interface LabelDataField {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "boolean";
  required: boolean;
  description?: string;
  sampleValue?: string | number | boolean;
  fallbackValue?: string;
  formatType?: "text" | "date" | "currency" | "uppercase" | "lowercase";
  formatConfig?: Record<string, unknown>;
}

export interface LabelElementBase {
  id: string;
  type: ElementType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  visible: boolean;
  locked: boolean;
  zIndex: number;
}

export interface TextElement extends LabelElementBase {
  type: "text";
  contentMode: "static" | "dynamic";
  text: string;
  bindingKey?: string;
  placeholder?: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  fontStyle: "normal" | "italic";
  textDecoration: "none" | "underline";
  lineHeight: number;
  color: string;
  align: "left" | "center" | "right";
}

export interface BarcodeElement extends LabelElementBase {
  type: "barcode";
  value: string;
  format: "CODE128" | "EAN13";
  showHumanReadable: boolean;
}

export interface QrCodeElement extends LabelElementBase {
  type: "qrcode";
  value: string;
  errorCorrection: "L" | "M" | "Q" | "H";
}

export interface LineElement extends LabelElementBase {
  type: "line";
  stroke: string;
  strokeWidth: number;
}

export interface ShapeElement extends LabelElementBase {
  type: "shape";
  shape: "rectangle";
  fill: string;
  stroke: string;
  strokeWidth: number;
  borderRadius: number;
}

export interface ImageElement extends LabelElementBase {
  type: "image";
  assetId?: string;
  src?: string;
  fit: "contain" | "cover" | "stretch";
  opacity: number;
}

export type LabelElement =
  | TextElement
  | BarcodeElement
  | QrCodeElement
  | LineElement
  | ShapeElement
  | ImageElement;

export interface LabelDocument {
  id: string;
  name: string;
  version: number;
  status: TemplateStatus;
  document: LabelDocumentSettings;
  settings: Record<string, unknown>;
  dataSchema: LabelDataField[];
  elements: LabelElement[];
  metadata: Record<string, unknown>;
}

export const DEFAULT_DOCUMENT: LabelDocumentSettings = {
  width: 100,
  height: 50,
  unit: "mm",
  orientation: "landscape",
  background: "#ffffff",
  dpi: 203
};
