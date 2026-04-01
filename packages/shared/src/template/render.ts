import type {
  LabelDataField,
  LabelDocument,
  TextElement
} from "./document";

export type PreviewPayload = Record<string, unknown>;

const hasValue = (value: unknown) =>
  value !== undefined && value !== null && !(typeof value === "string" && value.trim() === "");

const toText = (value: unknown) => {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value);
};

export function buildPreviewPayload(document: LabelDocument): PreviewPayload {
  return document.dataSchema.reduce<PreviewPayload>((accumulator, field) => {
    if (hasValue(field.sampleValue)) {
      accumulator[field.key] = field.sampleValue;
      return accumulator;
    }

    if (hasValue(field.fallbackValue)) {
      accumulator[field.key] = field.fallbackValue;
    }

    return accumulator;
  }, {});
}

export function getMissingRequiredFields(
  document: LabelDocument,
  previewPayload: PreviewPayload = buildPreviewPayload(document)
) {
  return document.dataSchema.filter(
    (field) => field.required && !hasValue(previewPayload[field.key]) && !hasValue(field.fallbackValue)
  );
}

export function formatFieldValue(field: LabelDataField | undefined, value: unknown) {
  if (!field) {
    return toText(value);
  }

  if (!hasValue(value)) {
    return field.fallbackValue ?? "";
  }

  if (field.formatType === "uppercase") {
    return toText(value).toUpperCase();
  }

  if (field.formatType === "lowercase") {
    return toText(value).toLowerCase();
  }

  if (field.formatType === "date") {
    const dateValue = new Date(toText(value));
    if (Number.isNaN(dateValue.getTime())) {
      return toText(value);
    }

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(dateValue);
  }

  if (field.formatType === "currency") {
    const numericValue =
      typeof value === "number"
        ? value
        : Number(toText(value).replace(/\./g, "").replace(",", "."));

    if (Number.isNaN(numericValue)) {
      return toText(value);
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency:
        typeof field.formatConfig?.currency === "string" ? field.formatConfig.currency : "BRL"
    }).format(numericValue);
  }

  return toText(value);
}

export function resolveFieldPreviewValue(
  document: LabelDocument,
  key: string | undefined,
  previewPayload: PreviewPayload = buildPreviewPayload(document)
) {
  if (!key) {
    return "";
  }

  const field = document.dataSchema.find((entry) => entry.key === key);
  const rawValue = hasValue(previewPayload[key]) ? previewPayload[key] : field?.fallbackValue;
  return formatFieldValue(field, rawValue);
}

export function resolveTextElementContent(
  document: LabelDocument,
  element: TextElement,
  previewPayload: PreviewPayload = buildPreviewPayload(document)
) {
  if (element.contentMode !== "dynamic") {
    return element.text;
  }

  const resolvedValue = resolveFieldPreviewValue(document, element.bindingKey, previewPayload);
  if (hasValue(resolvedValue)) {
    return resolvedValue;
  }

  return element.placeholder ?? element.bindingKey ?? element.text;
}
