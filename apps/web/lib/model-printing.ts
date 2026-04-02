import type { LabelDocument } from "@easyprint/shared/template/document";
import {
  buildPreviewPayload,
  type PreviewPayload
} from "@easyprint/shared/template/render";
import {
  buildQuickPrintPayload,
  type ModelCategory,
  type QuickPrintFormValues
} from "./template-library";

export type PreparedModelPrint = {
  templateId: string;
  templateName: string;
  category: ModelCategory;
  quantity: number;
  mode: "browser-print";
  requestedAt: string;
  document: LabelDocument;
  payload: PreviewPayload;
  route: {
    printerId?: string;
    printerName?: string;
    printProfileId?: string;
    printProfileName?: string;
  };
};

export type ModelPrintJobRequest = {
  templateId: string;
  copies: number;
  source: "MODEL_LIBRARY";
  printerId?: string;
  printProfileId?: string;
  mode: "browser-print";
  payload: Record<string, unknown>;
  resolvedData: PreviewPayload;
};

export function prepareModelPrintExecution({
  templateId,
  templateName,
  category,
  document,
  values,
  route
}: {
  templateId: string;
  templateName: string;
  category: ModelCategory;
  document: LabelDocument;
  values: QuickPrintFormValues;
  route?: {
    printerId?: string;
    printerName?: string;
    printProfileId?: string;
    printProfileName?: string;
  };
}): PreparedModelPrint {
  const payload = {
    ...buildPreviewPayload(document),
    ...buildQuickPrintPayload(document, category, values)
  };

  return {
    templateId,
    templateName,
    category,
    quantity: values.quantity,
    mode: "browser-print",
    requestedAt: new Date().toISOString(),
    document,
    payload,
    route: route ?? {}
  };
}

export function buildModelPrintJobRequest(
  execution: PreparedModelPrint,
  values: QuickPrintFormValues
): ModelPrintJobRequest {
  return {
    templateId: execution.templateId,
    copies: execution.quantity,
    source: "MODEL_LIBRARY",
    printerId: execution.route.printerId,
    printProfileId: execution.route.printProfileId,
    mode: execution.mode,
    payload: {
      templateName: execution.templateName,
      category: execution.category,
      route: execution.route,
      requestedAt: execution.requestedAt,
      formValues: {
        productName: values.productName,
        responsibleName: values.responsibleName,
        manufacturedAt: values.manufacturedAt,
        expiresAt: values.expiresAt,
        quantity: values.quantity
      }
    },
    resolvedData: execution.payload
  };
}
