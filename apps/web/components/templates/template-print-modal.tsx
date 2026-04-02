"use client";

import { useEffect, useMemo, useState } from "react";
import type { LabelDocument } from "@easyprint/shared/template/document";
import {
  createPrintJob,
  createPrintJobEvent,
  fetchTemplateDocument,
  type PrintProfileItem,
  type PrinterItem,
  type TemplateListItem
} from "../../lib/api";
import type { ApiSession } from "../../lib/session";
import {
  addDaysToDateInput,
  buildInitialQuickPrintForm,
  getCategoryDefinition,
  getPreferredPrinterRoute,
  type ModelCategory,
  type QuickPrintFormValues
} from "../../lib/template-library";
import {
  buildModelPrintJobRequest,
  prepareModelPrintExecution,
  type PreparedModelPrint
} from "../../lib/model-printing";
import { ModalActionBar } from "./modal-action-bar";
import { ModelPrintForm } from "./model-print-form";
import { ModelPrintPreview } from "./model-print-preview";
import { ModelPrintSheet } from "./model-print-sheet";

export function TemplatePrintModal({
  open,
  template,
  category,
  session,
  printers,
  profiles,
  canPrint,
  onClose,
  onPrinted
}: {
  open: boolean;
  template: TemplateListItem | null;
  category: ModelCategory | null;
  session: ApiSession | null;
  printers: PrinterItem[];
  profiles: PrintProfileItem[];
  canPrint: boolean;
  onClose: () => void;
  onPrinted: (message: string) => void;
}) {
  const [document, setDocument] = useState<LabelDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [printExecution, setPrintExecution] = useState<PreparedModelPrint | null>(null);
  const [printJobId, setPrintJobId] = useState<string | null>(null);
  const [responsibleLocked, setResponsibleLocked] = useState(true);
  const [manufacturedLocked, setManufacturedLocked] = useState(true);
  const [expiresLocked, setExpiresLocked] = useState(true);
  const [form, setForm] = useState<QuickPrintFormValues>(
    buildInitialQuickPrintForm("doces")
  );

  const resolvedCategory = category ?? "doces";
  const categoryConfig = getCategoryDefinition(resolvedCategory);
  const preferredRoute = useMemo(
    () => getPreferredPrinterRoute(printers, profiles),
    [printers, profiles]
  );
  const routeDescription = preferredRoute.printer
    ? `Impressao local no navegador, com rota preferencial preparada para ${preferredRoute.printer.name}${preferredRoute.profile ? ` / ${preferredRoute.profile.name}` : ""}`
    : "Impressao local no navegador";
  const routeHint =
    "O modal registra um PrintJob real antes da impressao local e preserva a etiqueta como unica area imprimivel do navegador.";

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, open]);

  useEffect(() => {
    if (!open || !template || !session) {
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);
    setDocument(null);
    setForm(buildInitialQuickPrintForm(resolvedCategory));
    setPrintExecution(null);
    setPrintJobId(null);
    setResponsibleLocked(true);
    setManufacturedLocked(true);
    setExpiresLocked(true);

    void fetchTemplateDocument(template.id, session)
      .then((nextDocument) => {
        if (!active) return;
        setDocument(nextDocument);
      })
      .catch(() => {
        if (!active) return;
        setError("Nao foi possivel carregar o modelo selecionado.");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [open, resolvedCategory, session, template]);

  const previewPayload = useMemo(() => {
    if (!document || !template) {
      return {};
    }

    return prepareModelPrintExecution({
      templateId: template.id,
      templateName: template.name,
      category: resolvedCategory,
      document,
      values: form,
      route: {
        printerId: preferredRoute.printer?.id,
        printerName: preferredRoute.printer?.name,
        printProfileId: preferredRoute.profile?.id,
        printProfileName: preferredRoute.profile?.name
      }
    }).payload;
  }, [
    document,
    form,
    preferredRoute.printer?.id,
    preferredRoute.printer?.name,
    preferredRoute.profile?.id,
    preferredRoute.profile?.name,
    resolvedCategory,
    template
  ]);

  useEffect(() => {
    if (!printExecution) {
      return;
    }

    let frameId = 0;
    let nestedFrameId = 0;

    const runPrint = () => {
      frameId = window.requestAnimationFrame(() => {
        nestedFrameId = window.requestAnimationFrame(() => {
          try {
            window.print();
          } catch {
            const failedJobId = printJobId;
            const failureReason = "Falha ao abrir o dialogo de impressao do navegador.";
            setError("Nao foi possivel abrir o dialogo de impressao do navegador.");
            setPrinting(false);
            setPrintExecution(null);
            setPrintJobId(null);

            void (async () => {
              if (session && failedJobId) {
                try {
                  await createPrintJobEvent(
                    failedJobId,
                    {
                      type: "job.failed",
                      message: failureReason,
                      status: "FAILED",
                      failureReason,
                      payload: {
                        delivery: "browser-window.print"
                      },
                      result: {
                        browserPrint: {
                          failedAt: new Date().toISOString()
                        }
                      }
                    },
                    session
                  );
                } catch {
                  // O erro principal ja foi apresentado ao usuario.
                }
              }
            })();
          }
        });
      });
    };

    runPrint();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(nestedFrameId);
    };
  }, [printExecution, printJobId, session]);

  useEffect(() => {
    if (!printExecution) {
      return;
    }

    const handleAfterPrint = () => {
      const printedQuantity = printExecution.quantity;
      const completedJobId = printJobId;
      const resultPayload = {
        delivery: "browser-window.print",
        dialogClosedAt: new Date().toISOString(),
        quantity: printedQuantity,
        route: printExecution.route
      };
      setPrintExecution(null);
      setPrinting(false);
      setPrintJobId(null);

      void (async () => {
        if (session && completedJobId) {
          try {
            await createPrintJobEvent(
              completedJobId,
              {
                type: "job.browser-print.dialog-closed",
                message:
                  "Dialogo de impressao do navegador finalizado; conclusao fisica depende do ambiente local.",
                payload: resultPayload,
                result: {
                  browserPrint: resultPayload
                }
              },
              session
            );
          } catch {
            // Mantemos o fluxo local mesmo se a trilha complementar falhar.
          }
        }

        onPrinted(
          completedJobId
            ? `Job ${completedJobId} registrado e ${printedQuantity} etiqueta${printedQuantity > 1 ? "s" : ""} enviada${printedQuantity > 1 ? "s" : ""} para a impressao local do navegador.`
            : `${printedQuantity} etiqueta${printedQuantity > 1 ? "s" : ""} enviada${printedQuantity > 1 ? "s" : ""} para a impressao local do navegador.`
        );
        onClose();
      })();
    };

    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [onClose, onPrinted, printExecution, printJobId, session]);

  if (!open || !template) {
    return null;
  }

  const handleFieldChange = <TKey extends keyof QuickPrintFormValues>(
    key: TKey,
    value: QuickPrintFormValues[TKey]
  ) => {
    setForm((current) => {
      if (key === "manufacturedAt") {
        const nextManufacturedAt = String(value);

        return {
          ...current,
          manufacturedAt: nextManufacturedAt,
          expiresAt: expiresLocked
            ? addDaysToDateInput(nextManufacturedAt, 2)
            : current.expiresAt
        };
      }

      return {
        ...current,
        [key]: value
      };
    });
  };

  const toggleResponsibleLock = () => {
    setResponsibleLocked((current) => !current);
  };

  const toggleManufacturedLock = () => {
    setManufacturedLocked((current) => {
      const nextLocked = !current;

      if (nextLocked) {
        setForm((currentForm) => ({
          ...currentForm,
          expiresAt: expiresLocked
            ? addDaysToDateInput(currentForm.manufacturedAt, 2)
            : currentForm.expiresAt
        }));
      }

      return nextLocked;
    });
  };

  const toggleExpiresLock = () => {
    setExpiresLocked((current) => {
      const nextLocked = !current;

      if (nextLocked) {
        setForm((currentForm) => ({
          ...currentForm,
          expiresAt: addDaysToDateInput(currentForm.manufacturedAt, 2)
        }));
      }

      return nextLocked;
    });
  };

  const canSubmit =
    canPrint &&
    !printing &&
    !loading &&
    Boolean(document) &&
    form.productName.trim().length > 0 &&
    form.responsibleName.trim().length > 0 &&
    form.manufacturedAt.length > 0 &&
    form.expiresAt.length > 0 &&
    form.quantity >= 1;

  const handlePrint = async () => {
    if (!document || !canSubmit) {
      return;
    }

    if (!session) {
      setError("Sua sessao expirou. Entre novamente para registrar a impressao.");
      return;
    }

    setPrinting(true);
    setError(null);

    try {
      const execution = prepareModelPrintExecution({
        templateId: template.id,
        templateName: template.name,
        category: resolvedCategory,
        document,
        values: form,
        route: {
          printerId: preferredRoute.printer?.id,
          printerName: preferredRoute.printer?.name,
          printProfileId: preferredRoute.profile?.id,
          printProfileName: preferredRoute.profile?.name
        }
      });

      const createdJob = await createPrintJob(buildModelPrintJobRequest(execution, form), session);

      setPrintJobId(createdJob.id);

      try {
        await createPrintJobEvent(
          createdJob.id,
          {
            type: "job.started",
            message: "Impressao local enviada ao dialogo do navegador.",
            status: "RUNNING",
            payload: {
              delivery: "browser-window.print",
              quantity: execution.quantity,
              route: execution.route
            },
            result: {
              browserPrint: {
                dispatchedAt: new Date().toISOString(),
                route: execution.route
              }
            }
          },
          session
        );
      } catch {
        // O job principal ja foi criado; seguimos com a impressao local.
      }

      setPrintExecution(execution);
    } catch {
      setError("Nao foi possivel registrar o PrintJob antes da impressao.");
      setPrintJobId(null);
      setPrinting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal-card model-print-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="model-print-modal__header">
          <div className="model-print-modal__header-content">
            <div className="model-print-modal__eyebrow">Fluxo operacional do modelo</div>
            <div
              className="model-print-modal__category"
              style={{
                background: categoryConfig.soft,
                color: categoryConfig.accent
              }}
            >
              {categoryConfig.label}
            </div>
            <div>
              <h2 className="model-print-modal__title">{template.name}</h2>
              <p className="model-print-modal__subtitle">
                Preencha rapidamente os dados operacionais, revise o preview e confirme a
                impressao no mesmo fluxo.
              </p>
            </div>
          </div>

          <button type="button" className="model-print-modal__dismiss" onClick={onClose}>
            Fechar
          </button>
        </header>

        <div className="model-print-modal__body">
          <div className="model-print-modal__form-column">
            <div className="model-print-modal__scroll">
              <ModelPrintForm
                form={form}
                templateId={template.id}
                categoryLabel={categoryConfig.label}
                responsibleLocked={responsibleLocked}
                manufacturedLocked={manufacturedLocked}
                expiresLocked={expiresLocked}
                routeDescription={routeDescription}
                routeHint={routeHint}
                error={error}
                onFieldChange={handleFieldChange}
                onToggleResponsible={toggleResponsibleLock}
                onToggleManufactured={toggleManufacturedLock}
                onToggleExpires={toggleExpiresLock}
              />
            </div>

            <ModalActionBar
              canPrint={canPrint}
              canSubmit={canSubmit}
              printing={printing}
              onClose={onClose}
              onPrint={() => void handlePrint()}
            />
          </div>

          <ModelPrintPreview
            document={document}
            previewPayload={previewPayload}
            loading={loading}
          />
        </div>
      </section>

      <ModelPrintSheet printExecution={printExecution} />
    </div>
  );
}
