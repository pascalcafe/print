import type { LabelDocument } from "@easyprint/shared/template/document";

type TemplateCategoryCandidate = {
  name: string;
  category?: string | null;
};

type PrinterRouteCandidate = {
  id: string;
  name: string;
  isActive: boolean;
};

type PrintProfileRouteCandidate = {
  id: string;
  name: string;
  printerId: string;
};

export const MODEL_CATEGORIES = ["doces", "salgados", "bebidas", "refeicao"] as const;
export type ModelCategory = (typeof MODEL_CATEGORIES)[number];

type CategoryDefinition = {
  label: string;
  description: string;
  accent: string;
  soft: string;
  defaultResponsible: string;
  keywords: string[];
};

export const MODEL_CATEGORY_CONFIG: Record<ModelCategory, CategoryDefinition> = {
  doces: {
    label: "Doces",
    description: "Confeitaria, sobremesas e itens delicados.",
    accent: "#db2777",
    soft: "rgba(219, 39, 119, 0.10)",
    defaultResponsible: "Equipe Confeitaria",
    keywords: ["doce", "bolo", "sobremesa", "confeitaria", "brigadeiro", "torta"]
  },
  salgados: {
    label: "Salgados",
    description: "Lanches, snacks e itens de preparo rapido.",
    accent: "#ea580c",
    soft: "rgba(234, 88, 12, 0.10)",
    defaultResponsible: "Equipe Salgados",
    keywords: ["salgado", "lanche", "snack", "coxinha", "empada", "esfiha"]
  },
  bebidas: {
    label: "Bebidas",
    description: "Sucos, cafes, chas e bebidas embaladas.",
    accent: "#0284c7",
    soft: "rgba(2, 132, 199, 0.10)",
    defaultResponsible: "Equipe Bebidas",
    keywords: ["bebida", "suco", "cafe", "chá", "cha", "drink", "agua", "refrigerante"]
  },
  refeicao: {
    label: "Refeição",
    description: "Refeicoes completas, marmitas e pratos principais.",
    accent: "#16a34a",
    soft: "rgba(22, 163, 74, 0.10)",
    defaultResponsible: "Equipe Cozinha",
    keywords: ["refeicao", "refeição", "almoco", "almoço", "jantar", "marmita", "prato"]
  }
};

const FIELD_MATCHERS = {
  productName: [
    "produto",
    "product",
    "item",
    "descricao",
    "descrição",
    "nome produto",
    "nome do produto"
  ],
  responsibleName: [
    "responsavel",
    "responsável",
    "responsible",
    "manipulador",
    "preparado por"
  ],
  manufacturedAt: [
    "fabricacao",
    "fabricação",
    "fabricado",
    "manufact",
    "producao",
    "produção"
  ],
  expiresAt: [
    "validade",
    "vencimento",
    "expire",
    "expiration",
    "expira"
  ],
  quantity: ["quantidade", "quantity", "qtd", "qtde", "etiquetas", "labels"]
} as const;

export type QuickPrintFormValues = {
  productName: string;
  responsibleName: string;
  manufacturedAt: string;
  expiresAt: string;
  quantity: number;
};

const removeAccents = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const normalizeText = (value: string) =>
  removeAccents(value)
    .toLowerCase()
    .trim();

export const normalizeModelCategory = (value: unknown): ModelCategory | null => {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = normalizeText(value);
  if (normalized === "refeicao" || normalized === "refeição") {
    return "refeicao";
  }

  return MODEL_CATEGORIES.includes(normalized as ModelCategory)
    ? (normalized as ModelCategory)
    : null;
};

export function inferTemplateCategory(
  template: TemplateCategoryCandidate
): ModelCategory {
  const explicit = normalizeModelCategory(template.category);
  if (explicit) {
    return explicit;
  }

  const normalizedName = normalizeText(template.name);
  const match =
    MODEL_CATEGORIES.find((category) =>
      MODEL_CATEGORY_CONFIG[category].keywords.some((keyword) =>
        normalizedName.includes(normalizeText(keyword))
      )
    ) ?? "doces";

  return match;
}

export const getCategoryDefinition = (category: ModelCategory) =>
  MODEL_CATEGORY_CONFIG[category];

export const formatDateInputLocal = (date: Date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

export const addDaysToDateInput = (dateInput: string, days: number) => {
  const base = new Date(`${dateInput}T00:00:00`);
  base.setDate(base.getDate() + days);
  return formatDateInputLocal(base);
};

export const buildInitialQuickPrintForm = (category: ModelCategory): QuickPrintFormValues => {
  const manufacturedAt = formatDateInputLocal(new Date());

  return {
    productName: "",
    responsibleName: MODEL_CATEGORY_CONFIG[category].defaultResponsible,
    manufacturedAt,
    expiresAt: addDaysToDateInput(manufacturedAt, 2),
    quantity: 1
  };
};

const findMatchingFieldKey = (document: LabelDocument, matcherKey: keyof typeof FIELD_MATCHERS) => {
  const keywords = FIELD_MATCHERS[matcherKey];

  return document.dataSchema.find((field) => {
    const haystack = normalizeText(
      `${field.key} ${field.label} ${field.description ?? ""}`
    );
    return keywords.some((keyword) => haystack.includes(normalizeText(keyword)));
  })?.key;
};

export function buildQuickPrintPayload(
  document: LabelDocument,
  category: ModelCategory,
  values: QuickPrintFormValues
) {
  const payload: Record<string, unknown> = {
    category,
    categoria: category,
    quantity: values.quantity,
    quantidade: values.quantity,
    labelCount: values.quantity,
    labels: values.quantity,
    productName: values.productName,
    product: values.productName,
    produto: values.productName,
    nomeProduto: values.productName,
    responsibleName: values.responsibleName,
    responsible: values.responsibleName,
    responsavel: values.responsibleName,
    nomeResponsavel: values.responsibleName,
    manufacturedAt: values.manufacturedAt,
    manufacturingDate: values.manufacturedAt,
    dataFabricacao: values.manufacturedAt,
    fabricacao: values.manufacturedAt,
    expiresAt: values.expiresAt,
    expirationDate: values.expiresAt,
    dataValidade: values.expiresAt,
    validade: values.expiresAt
  };

  const mappedFieldValues = {
    productName: values.productName,
    responsibleName: values.responsibleName,
    manufacturedAt: values.manufacturedAt,
    expiresAt: values.expiresAt,
    quantity: values.quantity
  } as const;

  (Object.keys(mappedFieldValues) as Array<keyof typeof mappedFieldValues>).forEach((key) => {
    const documentFieldKey = findMatchingFieldKey(document, key);
    if (documentFieldKey) {
      payload[documentFieldKey] = mappedFieldValues[key];
    }
  });

  return payload;
}

export const getPreferredPrinterRoute = (
  printers: PrinterRouteCandidate[],
  profiles: PrintProfileRouteCandidate[]
) => {
  const preferredPrinter = printers.find((printer) => printer.isActive) ?? printers[0];
  const preferredProfile =
    profiles.find((profile) => profile.printerId === preferredPrinter?.id) ?? profiles[0];

  return {
    printer: preferredPrinter,
    profile: preferredProfile
  };
};
