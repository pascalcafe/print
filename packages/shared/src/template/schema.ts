import { z } from "zod";

const labelUnitSchema = z.enum(["mm", "cm", "in", "px"]);
const orientationSchema = z.enum(["portrait", "landscape"]);
const templateStatusSchema = z.enum([
  "draft",
  "in_review",
  "approved",
  "published",
  "archived"
]);

const elementBaseSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["text", "barcode", "qrcode", "line", "shape", "image"]),
  name: z.string().min(1),
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  rotation: z.number(),
  visible: z.boolean(),
  locked: z.boolean(),
  zIndex: z.number().int()
});

const textElementSchema = elementBaseSchema.extend({
  type: z.literal("text"),
  contentMode: z.enum(["static", "dynamic"]),
  text: z.string(),
  bindingKey: z.string().optional(),
  placeholder: z.string().optional(),
  fontSize: z.number().positive(),
  fontFamily: z.string().min(1),
  fontWeight: z.number().int(),
  fontStyle: z.enum(["normal", "italic"]).default("normal"),
  textDecoration: z.enum(["none", "underline"]).default("none"),
  lineHeight: z.number().positive().default(1.2),
  color: z.string().min(1),
  align: z.enum(["left", "center", "right"])
});

const barcodeElementSchema = elementBaseSchema.extend({
  type: z.literal("barcode"),
  value: z.string().min(1),
  format: z.enum(["CODE128", "EAN13"]),
  showHumanReadable: z.boolean()
});

const qrCodeElementSchema = elementBaseSchema.extend({
  type: z.literal("qrcode"),
  value: z.string().min(1),
  errorCorrection: z.enum(["L", "M", "Q", "H"])
});

const lineElementSchema = elementBaseSchema.extend({
  type: z.literal("line"),
  stroke: z.string().min(1),
  strokeWidth: z.number().positive()
});

const shapeElementSchema = elementBaseSchema.extend({
  type: z.literal("shape"),
  shape: z.literal("rectangle"),
  fill: z.string().min(1),
  stroke: z.string().min(1),
  strokeWidth: z.number().positive(),
  borderRadius: z.number().min(0)
});

const imageElementSchema = elementBaseSchema.extend({
  type: z.literal("image"),
  assetId: z.string().optional(),
  src: z.string().optional(),
  fit: z.enum(["contain", "cover", "stretch"]),
  opacity: z.number().min(0).max(1)
});

export const labelDocumentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.number().int().positive(),
  status: templateStatusSchema,
  document: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    unit: labelUnitSchema,
    orientation: orientationSchema,
    background: z.string().min(1),
    dpi: z.number().int().positive()
  }),
  settings: z.record(z.unknown()),
  dataSchema: z.array(
    z.object({
      key: z.string().min(1),
      label: z.string().min(1),
      type: z.enum(["text", "number", "date", "boolean"]),
      required: z.boolean(),
      description: z.string().optional(),
      sampleValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
      fallbackValue: z.string().optional(),
      formatType: z
        .enum(["text", "date", "currency", "uppercase", "lowercase"])
        .optional(),
      formatConfig: z.record(z.unknown()).optional()
    })
  ),
  elements: z.array(
    z.discriminatedUnion("type", [
      textElementSchema,
      barcodeElementSchema,
      qrCodeElementSchema,
      lineElementSchema,
      shapeElementSchema,
      imageElementSchema
    ])
  ),
  metadata: z.record(z.unknown())
});

export type LabelDocumentInput = z.infer<typeof labelDocumentSchema>;
