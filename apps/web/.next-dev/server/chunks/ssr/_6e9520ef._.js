module.exports = [
"[project]/packages/shared/src/template/document.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_DOCUMENT",
    ()=>DEFAULT_DOCUMENT
]);
const DEFAULT_DOCUMENT = {
    width: 100,
    height: 50,
    unit: "mm",
    orientation: "landscape",
    background: "#ffffff",
    dpi: 203
};
}),
"[project]/packages/shared/src/template/factories.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBarcodeElement",
    ()=>createBarcodeElement,
    "createDynamicFieldElement",
    ()=>createDynamicFieldElement,
    "createImageElement",
    ()=>createImageElement,
    "createInitialDocument",
    ()=>createInitialDocument,
    "createLineElement",
    ()=>createLineElement,
    "createQrCodeElement",
    ()=>createQrCodeElement,
    "createShapeElement",
    ()=>createShapeElement,
    "createTextElement",
    ()=>createTextElement,
    "normalizeLabelDocument",
    ()=>normalizeLabelDocument,
    "normalizeLabelElement",
    ()=>normalizeLabelElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$document$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/document.ts [app-ssr] (ecmascript)");
;
const DEFAULT_TEXT_FONT = "IBM Plex Sans";
const DEFAULT_TEXT_SIZE = 10.5;
const DEFAULT_TEXT_WEIGHT = 600;
const DEFAULT_TEXT_LINE_HEIGHT = 1.2;
const DEFAULT_TEXT_LETTER_SPACING = 0;
const DEFAULT_TEXT_WORD_SPACING = 0;
const DEFAULT_TEXT_INDENT = 0;
const DEFAULT_TEXT_PADDING = 0;
const createElementBase = (id, name, type, x, y, width, height, zIndex)=>({
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
const createInitialDocument = (overrides)=>({
        id: overrides?.id ?? "template-new",
        name: overrides?.name ?? "Nova etiqueta",
        version: overrides?.version ?? 1,
        status: overrides?.status ?? "draft",
        document: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$document$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_DOCUMENT"],
            ...overrides?.document
        },
        settings: overrides?.settings ?? {},
        dataSchema: overrides?.dataSchema ?? [],
        elements: (overrides?.elements ?? []).map(normalizeLabelElement),
        metadata: overrides?.metadata ?? {}
    });
const normalizeLabelElement = (element)=>{
    if (element.type === "text") {
        return {
            ...element,
            fontSize: element.fontSize ?? DEFAULT_TEXT_SIZE,
            fontFamily: element.fontFamily ?? DEFAULT_TEXT_FONT,
            fontWeight: element.fontWeight ?? DEFAULT_TEXT_WEIGHT,
            fontStyle: element.fontStyle ?? "normal",
            textDecoration: element.textDecoration ?? "none",
            lineHeight: element.lineHeight ?? DEFAULT_TEXT_LINE_HEIGHT,
            letterSpacing: element.letterSpacing ?? DEFAULT_TEXT_LETTER_SPACING,
            wordSpacing: element.wordSpacing ?? DEFAULT_TEXT_WORD_SPACING,
            textIndent: element.textIndent ?? DEFAULT_TEXT_INDENT,
            paddingTop: element.paddingTop ?? DEFAULT_TEXT_PADDING,
            paddingRight: element.paddingRight ?? DEFAULT_TEXT_PADDING,
            paddingBottom: element.paddingBottom ?? DEFAULT_TEXT_PADDING,
            paddingLeft: element.paddingLeft ?? DEFAULT_TEXT_PADDING,
            wrapMode: element.wrapMode ?? "wrap",
            overflowMode: element.overflowMode ?? "hidden",
            color: element.color ?? "#111827",
            align: element.align ?? "left"
        };
    }
    if (element.type === "line") {
        return {
            ...element,
            height: element.height > 0 ? element.height : 0.2,
            strokeWidth: element.strokeWidth > 0 ? element.strokeWidth : 0.2,
            stroke: element.stroke || "#1f2937"
        };
    }
    if (element.type === "shape") {
        return {
            ...element,
            strokeWidth: element.strokeWidth > 0 ? element.strokeWidth : 0.2,
            borderRadius: element.borderRadius >= 0 ? element.borderRadius : 0,
            fill: element.fill || "transparent",
            stroke: element.stroke || "#2563eb"
        };
    }
    if (element.type === "image") {
        return {
            ...element,
            fit: element.fit ?? "contain",
            objectFit: element.objectFit ?? (element.fit === "stretch" ? "fill" : element.fit ?? "contain"),
            maintainAspectRatio: element.maintainAspectRatio ?? true,
            opacity: element.opacity ?? 1
        };
    }
    return element;
};
const normalizeLabelDocument = (document)=>({
        ...document,
        document: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$document$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_DOCUMENT"],
            ...document.document
        },
        elements: document.elements.map(normalizeLabelElement)
    });
const createTextElement = (id, zIndex)=>({
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
        letterSpacing: DEFAULT_TEXT_LETTER_SPACING,
        wordSpacing: DEFAULT_TEXT_WORD_SPACING,
        textIndent: DEFAULT_TEXT_INDENT,
        paddingTop: DEFAULT_TEXT_PADDING,
        paddingRight: DEFAULT_TEXT_PADDING,
        paddingBottom: DEFAULT_TEXT_PADDING,
        paddingLeft: DEFAULT_TEXT_PADDING,
        wrapMode: "wrap",
        overflowMode: "hidden",
        color: "#111827",
        align: "left"
    });
const createDynamicFieldElement = (id, zIndex)=>({
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
        letterSpacing: DEFAULT_TEXT_LETTER_SPACING,
        wordSpacing: DEFAULT_TEXT_WORD_SPACING,
        textIndent: DEFAULT_TEXT_INDENT,
        paddingTop: DEFAULT_TEXT_PADDING,
        paddingRight: DEFAULT_TEXT_PADDING,
        paddingBottom: DEFAULT_TEXT_PADDING,
        paddingLeft: DEFAULT_TEXT_PADDING,
        wrapMode: "wrap",
        overflowMode: "hidden",
        color: "#0f172a",
        align: "left"
    });
const createBarcodeElement = (id, zIndex)=>({
        ...createElementBase(id, "Codigo de barras", "barcode", 12, 28, 48, 18, zIndex),
        value: "123456789012",
        bindingKey: undefined,
        format: "CODE128",
        showHumanReadable: true
    });
const createQrCodeElement = (id, zIndex)=>({
        ...createElementBase(id, "QR Code", "qrcode", 12, 12, 24, 24, zIndex),
        value: "https://easyprint.local/template",
        errorCorrection: "M"
    });
const createLineElement = (id, zIndex)=>({
        ...createElementBase(id, "Linha", "line", 12, 16, 50, 1, zIndex),
        stroke: "#1f2937",
        strokeWidth: 1
    });
const createShapeElement = (id, zIndex)=>({
        ...createElementBase(id, "Retangulo", "shape", 18, 18, 30, 16, zIndex),
        shape: "rectangle",
        fill: "transparent",
        stroke: "#2563eb",
        strokeWidth: 1,
        borderRadius: 2
    });
const createImageElement = (id, zIndex)=>({
        ...createElementBase(id, "Imagem", "image", 18, 18, 24, 24, zIndex),
        assetId: undefined,
        src: undefined,
        fit: "contain",
        objectFit: "contain",
        maintainAspectRatio: true,
        opacity: 1
    });
}),
"[project]/apps/web/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assignPrinterAgent",
    ()=>assignPrinterAgent,
    "cancelJob",
    ()=>cancelJob,
    "compareTemplateVersions",
    ()=>compareTemplateVersions,
    "confirmProductImport",
    ()=>confirmProductImport,
    "createAgent",
    ()=>createAgent,
    "createIdentityProvider",
    ()=>createIdentityProvider,
    "createPrintJob",
    ()=>createPrintJob,
    "createPrintJobEvent",
    ()=>createPrintJobEvent,
    "createPrintProfile",
    ()=>createPrintProfile,
    "createPrinter",
    ()=>createPrinter,
    "createProduct",
    ()=>createProduct,
    "createTemplateVersion",
    ()=>createTemplateVersion,
    "createTestPrintJob",
    ()=>createTestPrintJob,
    "decideTemplateApproval",
    ()=>decideTemplateApproval,
    "exchangeOidcLogin",
    ()=>exchangeOidcLogin,
    "fetchAgents",
    ()=>fetchAgents,
    "fetchAssets",
    ()=>fetchAssets,
    "fetchAuditLog",
    ()=>fetchAuditLog,
    "fetchIdentityProviders",
    ()=>fetchIdentityProviders,
    "fetchMe",
    ()=>fetchMe,
    "fetchMetrics",
    ()=>fetchMetrics,
    "fetchPrintJob",
    ()=>fetchPrintJob,
    "fetchPrintJobs",
    ()=>fetchPrintJobs,
    "fetchPrintProfiles",
    ()=>fetchPrintProfiles,
    "fetchPrinters",
    ()=>fetchPrinters,
    "fetchProductImports",
    ()=>fetchProductImports,
    "fetchProducts",
    ()=>fetchProducts,
    "fetchSsoProviders",
    ()=>fetchSsoProviders,
    "fetchTemplateApprovals",
    ()=>fetchTemplateApprovals,
    "fetchTemplateDocument",
    ()=>fetchTemplateDocument,
    "fetchTemplateVersions",
    ()=>fetchTemplateVersions,
    "fetchTemplates",
    ()=>fetchTemplates,
    "inactivateProduct",
    ()=>inactivateProduct,
    "login",
    ()=>login,
    "previewProductImport",
    ()=>previewProductImport,
    "publishTemplate",
    ()=>publishTemplate,
    "reprintJob",
    ()=>reprintJob,
    "retryJob",
    ()=>retryJob,
    "rollbackTemplateVersion",
    ()=>rollbackTemplateVersion,
    "rotateAgentToken",
    ()=>rotateAgentToken,
    "saveTemplate",
    ()=>saveTemplate,
    "startOidcLogin",
    ()=>startOidcLogin,
    "submitTemplateReview",
    ()=>submitTemplateReview,
    "updatePrinterStatus",
    ()=>updatePrinterStatus,
    "updateProduct",
    ()=>updateProduct,
    "uploadAsset",
    ()=>uploadAsset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/factories.ts [app-ssr] (ecmascript)");
;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const withQuery = (path, query)=>{
    if (!query) {
        return path;
    }
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (typeof value === "number") {
            params.set(key, String(value));
        } else if (value) {
            params.set(key, value);
        }
    }
    const queryString = params.toString();
    return queryString ? `${path}?${queryString}` : path;
};
async function apiFetch(path, session, init) {
    const response = await fetch(`${API_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
            ...init?.headers ?? {}
        }
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
}
async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    if (!response.ok) {
        throw new Error("Falha no login");
    }
    return response.json();
}
async function fetchSsoProviders(tenantSlug) {
    const response = await fetch(`${API_URL}/identity/public/providers?tenantSlug=${encodeURIComponent(tenantSlug)}`);
    if (!response.ok) {
        throw new Error("Falha ao carregar providers corporativos");
    }
    return response.json();
}
async function startOidcLogin(providerSlug, payload) {
    const response = await fetch(`${API_URL}/identity/public/oidc/${providerSlug}/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error("Falha ao iniciar autenticacao corporativa");
    }
    return response.json();
}
async function exchangeOidcLogin(providerSlug, payload) {
    const response = await fetch(`${API_URL}/identity/public/oidc/${providerSlug}/exchange`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error("Falha ao concluir autenticacao corporativa");
    }
    return response.json();
}
async function fetchMe(session) {
    return apiFetch("/auth/me", session);
}
async function fetchProducts(session, filters) {
    return apiFetch(withQuery("/products", filters), session);
}
async function createProduct(payload, session) {
    return apiFetch("/products", session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function updateProduct(id, payload, session) {
    return apiFetch(`/products/${id}`, session, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}
async function inactivateProduct(id, session) {
    return apiFetch(`/products/${id}`, session, {
        method: "DELETE"
    });
}
async function previewProductImport(file, session) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_URL}/products/import/preview`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        },
        body: formData
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
}
async function confirmProductImport(batchId, mapping, session) {
    return apiFetch(`/products/import/${batchId}/confirm`, session, {
        method: "POST",
        body: JSON.stringify({
            mapping
        })
    });
}
async function fetchProductImports(session) {
    return apiFetch("/products/imports", session);
}
async function fetchTemplates(session, filters) {
    return apiFetch(withQuery("/templates", filters), session);
}
async function fetchTemplateDocument(id, session) {
    if (id === "new") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInitialDocument"])();
    }
    const template = await apiFetch(`/templates/${id}`, session);
    const latestSnapshot = template.versions?.[0]?.snapshotJson;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInitialDocument"])({
        id: template.id,
        name: template.name,
        version: template.currentVersion,
        status: String(template.status).toLowerCase(),
        document: latestSnapshot?.document ?? template.documentJson,
        settings: latestSnapshot?.settings ?? template.settingsJson ?? {},
        dataSchema: latestSnapshot?.dataSchema ?? template.dataSchemaJson ?? template.dataFields?.map((field)=>({
                key: field.key,
                label: field.label,
                type: field.type,
                required: field.required,
                description: field.description,
                sampleValue: field.sampleValue,
                fallbackValue: field.fallbackValue,
                formatType: field.formatType,
                formatConfig: field.formatConfigJson ?? {}
            })) ?? [],
        metadata: latestSnapshot?.metadata ?? template.metadataJson ?? {},
        elements: latestSnapshot?.elements ?? []
    });
}
async function fetchTemplateVersions(id, session) {
    return apiFetch(`/templates/${id}/versions`, session);
}
async function fetchTemplateApprovals(id, session) {
    return apiFetch(`/templates/${id}/approvals`, session);
}
async function saveTemplate(document, session, options) {
    const payload = {
        name: document.name,
        status: document.status,
        document: document.document,
        elements: document.elements,
        dataSchema: document.dataSchema,
        settings: document.settings,
        metadata: document.metadata,
        versionNotes: options?.versionNotes ?? "Salvo pelo editor web"
    };
    const isNew = document.id === "template-new";
    return apiFetch(isNew ? "/templates" : `/templates/${document.id}`, session, {
        method: isNew ? "POST" : "PUT",
        body: JSON.stringify(payload)
    });
}
async function submitTemplateReview(id, payload, session) {
    return apiFetch(`/templates/${id}/review`, session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function decideTemplateApproval(id, payload, session) {
    return apiFetch(`/templates/${id}/approval`, session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function publishTemplate(id, session, payload) {
    return apiFetch(`/templates/${id}/publish`, session, {
        method: "POST",
        body: JSON.stringify(payload ?? {})
    });
}
async function createTemplateVersion(id, payload, session) {
    return apiFetch(`/templates/${id}/versions`, session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function compareTemplateVersions(id, version, againstVersion, session) {
    return apiFetch(`/templates/${id}/versions/${version}/compare/${againstVersion}`, session);
}
async function rollbackTemplateVersion(id, version, payload, session) {
    return apiFetch(`/templates/${id}/versions/${version}/rollback`, session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function fetchIdentityProviders(session) {
    return apiFetch("/identity/providers", session);
}
async function createIdentityProvider(payload, session) {
    return apiFetch("/identity/providers", session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function fetchAgents(session) {
    return apiFetch("/agents", session);
}
async function createAgent(payload, session) {
    return apiFetch("/agents", session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function rotateAgentToken(id, session) {
    return apiFetch(`/agents/${id}/rotate-token`, session, {
        method: "POST"
    });
}
async function fetchPrinters(session, filters) {
    return apiFetch(withQuery("/printers", filters), session);
}
async function createPrinter(payload, session) {
    return apiFetch("/printers", session, {
        method: "POST",
        body: JSON.stringify({
            ...payload,
            isActive: true
        })
    });
}
async function assignPrinterAgent(id, agentNodeId, session) {
    return apiFetch(`/printers/${id}/agent`, session, {
        method: "POST",
        body: JSON.stringify({
            agentNodeId
        })
    });
}
async function updatePrinterStatus(id, isActive, session) {
    return apiFetch(`/printers/${id}/status`, session, {
        method: "POST",
        body: JSON.stringify({
            isActive
        })
    });
}
async function fetchPrintJobs(session, filters) {
    return apiFetch(withQuery("/print-jobs", filters), session);
}
async function fetchPrintJob(id, session) {
    return apiFetch(`/print-jobs/${id}`, session);
}
async function fetchPrintProfiles(session) {
    return apiFetch("/print-profiles", session);
}
async function createPrintProfile(payload, session) {
    return apiFetch("/print-profiles", session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function createPrintJob(payload, session) {
    return apiFetch("/print-jobs", session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function createTestPrintJob(payload, session) {
    return apiFetch("/print-jobs/test", session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function createPrintJobEvent(id, payload, session) {
    return apiFetch(`/print-jobs/${id}/events`, session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function reprintJob(id, payload, session) {
    return apiFetch(`/print-jobs/${id}/reprint`, session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function retryJob(id, payload, session) {
    return apiFetch(`/print-jobs/${id}/retry`, session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function cancelJob(id, session) {
    return apiFetch(`/print-jobs/${id}/cancel`, session, {
        method: "POST"
    });
}
async function fetchAssets(session) {
    return apiFetch("/file-assets", session);
}
async function uploadAsset(file, session) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_URL}/file-assets/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        },
        body: formData
    });
    if (!response.ok) {
        throw new Error("Falha ao enviar asset");
    }
    return response.json();
}
async function fetchAuditLog(session, filters) {
    return apiFetch(withQuery("/audit", filters), session);
}
async function fetchMetrics(session) {
    return apiFetch("/observability/metrics", session);
}
}),
"[project]/packages/shared/src/editor/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addDataField",
    ()=>addDataField,
    "addElement",
    ()=>addElement,
    "alignElement",
    ()=>alignElement,
    "createEditorHistory",
    ()=>createEditorHistory,
    "duplicateElement",
    ()=>duplicateElement,
    "moveElementLayer",
    ()=>moveElementLayer,
    "redo",
    ()=>redo,
    "removeDataField",
    ()=>removeDataField,
    "removeElement",
    ()=>removeElement,
    "rotateElement",
    ()=>rotateElement,
    "selectDocument",
    ()=>selectDocument,
    "toggleElementLock",
    ()=>toggleElementLock,
    "undo",
    ()=>undo,
    "updateDataField",
    ()=>updateDataField,
    "updateDocumentSettings",
    ()=>updateDocumentSettings,
    "updateElement",
    ()=>updateElement,
    "updateTemplateDocumentMetadata",
    ()=>updateTemplateDocumentMetadata,
    "updateTemplateMetadata",
    ()=>updateTemplateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/factories.ts [app-ssr] (ecmascript)");
;
const createEditorHistory = (document)=>({
        past: [],
        present: document,
        future: []
    });
const cloneDocument = (document)=>JSON.parse(JSON.stringify(document));
const commit = (state, next)=>({
        past: [
            ...state.past,
            cloneDocument(state.present)
        ],
        present: next,
        future: []
    });
const reindexZOrder = (elements)=>[
        ...elements
    ].sort((left, right)=>left.zIndex - right.zIndex).map((element, index)=>({
            ...element,
            zIndex: index + 1
        }));
const nextElementId = (state)=>`el_${state.present.elements.length + 1}`;
const nextZIndex = (state)=>state.present.elements.reduce((max, element)=>Math.max(max, element.zIndex), 0) + 1;
const addElement = (state, type, options)=>{
    const id = nextElementId(state);
    const zIndex = nextZIndex(state);
    const newElement = type === "text" ? options?.variant === "dynamic" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicFieldElement"])(id, zIndex) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTextElement"])(id, zIndex) : type === "barcode" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBarcodeElement"])(id, zIndex) : type === "qrcode" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createQrCodeElement"])(id, zIndex) : type === "line" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLineElement"])(id, zIndex) : type === "shape" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createShapeElement"])(id, zIndex) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createImageElement"])(id, zIndex);
    return commit(state, {
        ...state.present,
        elements: [
            ...state.present.elements,
            newElement
        ]
    });
};
const updateElement = (state, patch)=>commit(state, {
        ...state.present,
        elements: state.present.elements.map((element)=>element.id === patch.id ? {
                ...element,
                ...patch
            } : element)
    });
const duplicateElement = (state, elementId)=>{
    const source = state.present.elements.find((element)=>element.id === elementId);
    if (!source) {
        return state;
    }
    const duplicated = {
        ...cloneDocument({
            ...state.present,
            elements: [
                source
            ]
        }).elements[0],
        id: nextElementId(state),
        name: `${source.name} copia`,
        x: source.x + 4,
        y: source.y + 4,
        zIndex: nextZIndex(state)
    };
    return commit(state, {
        ...state.present,
        elements: [
            ...state.present.elements,
            duplicated
        ]
    });
};
const removeElement = (state, elementId)=>{
    const exists = state.present.elements.some((element)=>element.id === elementId);
    if (!exists) {
        return state;
    }
    return commit(state, {
        ...state.present,
        elements: reindexZOrder(state.present.elements.filter((element)=>element.id !== elementId))
    });
};
const toggleElementLock = (state, elementId)=>{
    const target = state.present.elements.find((element)=>element.id === elementId);
    if (!target) {
        return state;
    }
    return updateElement(state, {
        id: elementId,
        locked: !target.locked
    });
};
const rotateElement = (state, elementId, delta)=>{
    const target = state.present.elements.find((element)=>element.id === elementId);
    if (!target) {
        return state;
    }
    const rotation = ((target.rotation + delta) % 360 + 360) % 360;
    return updateElement(state, {
        id: elementId,
        rotation
    });
};
const alignElement = (state, elementId, alignment)=>{
    const target = state.present.elements.find((element)=>element.id === elementId);
    if (!target) {
        return state;
    }
    const nextPatch = {};
    if (alignment === "left") nextPatch.x = 0;
    if (alignment === "center") nextPatch.x = Math.max(0, (state.present.document.width - target.width) / 2);
    if (alignment === "right") nextPatch.x = Math.max(0, state.present.document.width - target.width);
    if (alignment === "top") nextPatch.y = 0;
    if (alignment === "middle") nextPatch.y = Math.max(0, (state.present.document.height - target.height) / 2);
    if (alignment === "bottom") nextPatch.y = Math.max(0, state.present.document.height - target.height);
    return updateElement(state, {
        id: elementId,
        ...nextPatch
    });
};
const moveElementLayer = (state, elementId, direction)=>{
    const ordered = [
        ...state.present.elements
    ].sort((left, right)=>left.zIndex - right.zIndex);
    const index = ordered.findIndex((element)=>element.id === elementId);
    if (index === -1) {
        return state;
    }
    const next = [
        ...ordered
    ];
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
const selectDocument = (state, document)=>createEditorHistory(document);
const updateDocumentSettings = (state, patch)=>commit(state, {
        ...state.present,
        document: {
            ...state.present.document,
            ...patch
        }
    });
const updateTemplateMetadata = (state, patch)=>commit(state, {
        ...state.present,
        ...patch
    });
const updateTemplateDocumentMetadata = (state, patch)=>commit(state, {
        ...state.present,
        metadata: {
            ...state.present.metadata,
            ...patch
        }
    });
const addDataField = (state, field)=>{
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
const updateDataField = (state, key, patch)=>commit(state, {
        ...state.present,
        dataSchema: state.present.dataSchema.map((field)=>field.key === key ? {
                ...field,
                ...patch
            } : field)
    });
const removeDataField = (state, key)=>commit(state, {
        ...state.present,
        dataSchema: state.present.dataSchema.filter((field)=>field.key !== key),
        elements: state.present.elements.map((element)=>element.type === "text" && element.contentMode === "dynamic" && element.bindingKey === key ? {
                ...element,
                bindingKey: undefined,
                text: element.placeholder ?? element.text
            } : element)
    });
const undo = (state)=>{
    const previous = state.past.at(-1);
    if (!previous) {
        return state;
    }
    return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [
            cloneDocument(state.present),
            ...state.future
        ]
    };
};
const redo = (state)=>{
    const next = state.future[0];
    if (!next) {
        return state;
    }
    return {
        past: [
            ...state.past,
            cloneDocument(state.present)
        ],
        present: next,
        future: state.future.slice(1)
    };
};
}),
"[project]/apps/web/lib/editor-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEditorStore",
    ()=>useEditorStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$12_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.12_@types+react@19.2.14_react@19.2.4/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/factories.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/editor/store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const emptyDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEditorHistory"])({
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
const useEditorStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$12_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        history: emptyDocument,
        selectedElementId: undefined,
        zoom: 1,
        unit: "mm",
        statusMessage: "Pronto",
        savingState: "idle",
        gridEnabled: false,
        snapEnabled: false,
        gridSize: 4,
        loadDocument: (document)=>{
            const normalizedDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeLabelDocument"])(document);
            return set({
                history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEditorHistory"])(normalizedDocument),
                selectedElementId: normalizedDocument.elements[0]?.id,
                unit: normalizedDocument.document.unit,
                statusMessage: "Template carregado",
                savingState: "idle"
            });
        },
        selectElement: (elementId)=>set({
                selectedElementId: elementId
            }),
        addCanvasElement: (type, options)=>set((state)=>{
                const nextHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addElement"])(state.history, type, options);
                return {
                    history: nextHistory,
                    selectedElementId: nextHistory.present.elements.at(-1)?.id,
                    statusMessage: `Elemento ${type} adicionado`
                };
            }),
        patchElement: (elementId, patch)=>set((state)=>({
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElement"])(state.history, {
                        id: elementId,
                        ...patch
                    }),
                    statusMessage: "Elemento atualizado"
                })),
        addTemplateDataField: ()=>set((state)=>({
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDataField"])(state.history),
                    statusMessage: "Campo dinamico adicionado"
                })),
        patchTemplateDataField: (key, patch)=>set((state)=>({
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDataField"])(state.history, key, patch),
                    statusMessage: "Campo dinamico atualizado"
                })),
        removeTemplateDataField: (key)=>set((state)=>({
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeDataField"])(state.history, key),
                    statusMessage: "Campo dinamico removido"
                })),
        duplicateSelectedElement: ()=>set((state)=>{
                if (!state.selectedElementId) return state;
                const nextHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["duplicateElement"])(state.history, state.selectedElementId);
                const nextElement = nextHistory.present.elements.at(-1);
                return {
                    history: nextHistory,
                    selectedElementId: nextElement?.id,
                    statusMessage: "Elemento duplicado"
                };
            }),
        removeSelectedElement: ()=>set((state)=>{
                if (!state.selectedElementId) return state;
                const currentIndex = state.history.present.elements.findIndex((element)=>element.id === state.selectedElementId);
                if (currentIndex === -1) return state;
                const nextHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeElement"])(state.history, state.selectedElementId);
                const nextSelection = nextHistory.present.elements[Math.min(currentIndex, nextHistory.present.elements.length - 1)]?.id;
                return {
                    history: nextHistory,
                    selectedElementId: nextSelection,
                    statusMessage: "Elemento removido"
                };
            }),
        toggleSelectedLock: ()=>set((state)=>{
                if (!state.selectedElementId) return state;
                const current = state.history.present.elements.find((element)=>element.id === state.selectedElementId);
                return {
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toggleElementLock"])(state.history, state.selectedElementId),
                    statusMessage: current?.locked ? "Elemento desbloqueado" : "Elemento bloqueado"
                };
            }),
        rotateSelectedElement: (delta)=>set((state)=>{
                if (!state.selectedElementId) return state;
                return {
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotateElement"])(state.history, state.selectedElementId, delta),
                    statusMessage: "Rotacao atualizada"
                };
            }),
        moveSelectedLayer: (direction)=>set((state)=>{
                if (!state.selectedElementId) return state;
                return {
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["moveElementLayer"])(state.history, state.selectedElementId, direction),
                    statusMessage: "Camada atualizada"
                };
            }),
        alignSelectedElement: (alignment)=>set((state)=>{
                if (!state.selectedElementId) return state;
                return {
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alignElement"])(state.history, state.selectedElementId, alignment),
                    statusMessage: `Alinhamento ${alignment}`
                };
            }),
        patchDocument: (patch)=>set((state)=>({
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDocumentSettings"])(state.history, patch),
                    unit: patch.unit ?? state.unit,
                    statusMessage: "Configuracao da etiqueta atualizada"
                })),
        patchTemplate: (patch)=>set((state)=>({
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateTemplateMetadata"])(state.history, patch),
                    statusMessage: "Template atualizado"
                })),
        patchMetadata: (patch)=>set((state)=>({
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateTemplateDocumentMetadata"])(state.history, patch),
                    statusMessage: "Metadados do template atualizados"
                })),
        syncPersistedTemplate: (patch)=>set((state)=>({
                    history: {
                        ...state.history,
                        present: {
                            ...state.history.present,
                            ...patch
                        }
                    }
                })),
        setZoom: (zoom)=>{
            const nextZoom = Math.min(3, Math.max(0.35, zoom));
            set({
                zoom: nextZoom,
                statusMessage: `Zoom ${Math.round(nextZoom * 100)}%`
            });
        },
        markStatus: (statusMessage)=>set({
                statusMessage
            }),
        setSavingState: (savingState)=>set({
                savingState
            }),
        toggleGrid: ()=>set((state)=>({
                    gridEnabled: !state.gridEnabled,
                    snapEnabled: !state.gridEnabled,
                    statusMessage: state.gridEnabled ? "Grade desativada: movimento livre" : "Grade ativada: snap tecnico habilitado"
                })),
        toggleSnap: ()=>set((state)=>state.gridEnabled ? {
                    snapEnabled: true,
                    statusMessage: "O snap acompanha a grade ativa"
                } : {
                    snapEnabled: false,
                    statusMessage: "Ative a grade para usar snap tecnico"
                }),
        setGridSize: (gridSize)=>set((state)=>({
                    gridSize,
                    statusMessage: `Grade ${gridSize}${state.unit}`
                })),
        undoAction: ()=>set((state)=>({
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["undo"])(state.history),
                    statusMessage: "Desfazer"
                })),
        redoAction: ()=>set((state)=>({
                    history: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$editor$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["redo"])(state.history),
                    statusMessage: "Refazer"
                }))
    }));
}),
"[project]/apps/web/lib/editor-draft.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearEditorDraft",
    ()=>clearEditorDraft,
    "loadEditorDraft",
    ()=>loadEditorDraft,
    "saveEditorDraft",
    ()=>saveEditorDraft,
    "serializeTemplatePayload",
    ()=>serializeTemplatePayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/factories.ts [app-ssr] (ecmascript)");
;
const DRAFT_PREFIX = "easyprint:editor-draft:";
const getDraftKey = (id)=>`${DRAFT_PREFIX}${id}`;
const serializeTemplatePayload = (document)=>JSON.stringify({
        name: document.name,
        status: document.status,
        document: document.document,
        settings: document.settings,
        dataSchema: document.dataSchema,
        elements: document.elements,
        metadata: document.metadata
    });
function loadEditorDraft(id) {
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
    const raw = undefined;
}
function saveEditorDraft(document) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
    const payload = undefined;
}
function clearEditorDraft(id) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
}),
"[project]/packages/shared/src/auth/permissions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasPermission",
    ()=>hasPermission,
    "permissionCatalog",
    ()=>permissionCatalog,
    "permissionsByRole",
    ()=>permissionsByRole,
    "roleCatalog",
    ()=>roleCatalog
]);
const roleCatalog = {
    admin: "Admin",
    editor: "Editor",
    operator: "Operador"
};
const permissionCatalog = {
    "identity.view": "Visualizar configuracoes de identidade corporativa",
    "identity.manage": "Gerenciar configuracoes de identidade corporativa",
    "observability.view": "Visualizar saude, metricas e sinais operacionais",
    "template.view": "Visualizar templates",
    "template.edit": "Criar e editar templates",
    "template.publish": "Publicar templates",
    "template.rollback": "Restaurar versoes de template",
    "template.version.create": "Criar nova versao de template",
    "template.review": "Enviar templates para revisao",
    "template.approve": "Aprovar ou rejeitar templates",
    "template.sign": "Assinar eletronicamente acoes criticas de template",
    "product.view": "Visualizar catalogo de produtos",
    "product.manage": "Gerenciar catalogo de produtos",
    "product.import": "Importar produtos por planilha",
    "asset.view": "Visualizar assets",
    "asset.manage": "Gerenciar assets",
    "agent.view": "Visualizar agentes locais",
    "agent.manage": "Gerenciar agentes locais",
    "printer.view": "Visualizar impressoras",
    "printer.manage": "Gerenciar impressoras",
    "print-profile.view": "Visualizar perfis de impressao",
    "print-profile.manage": "Gerenciar perfis de impressao",
    "print-job.view": "Visualizar jobs de impressao",
    "print-job.test": "Executar impressao teste",
    "print-job.reprint": "Reimprimir jobs",
    "print-job.retry": "Reenviar jobs com falha",
    "print-job.cancel": "Cancelar jobs",
    "audit.view": "Visualizar auditoria"
};
const permissionsByRole = {
    admin: Object.keys(permissionCatalog),
    editor: [
        "identity.view",
        "observability.view",
        "template.view",
        "template.edit",
        "template.publish",
        "template.rollback",
        "template.version.create",
        "template.review",
        "template.approve",
        "template.sign",
        "product.view",
        "product.manage",
        "product.import",
        "asset.view",
        "asset.manage",
        "agent.view",
        "printer.view",
        "print-profile.view",
        "print-job.view",
        "print-job.test",
        "print-job.reprint",
        "print-job.retry"
    ],
    operator: [
        "template.view",
        "template.review",
        "product.view",
        "printer.view",
        "agent.view",
        "print-profile.view",
        "print-job.view",
        "print-job.test",
        "print-job.reprint",
        "print-job.retry",
        "print-job.cancel"
    ]
};
function hasPermission(permissions, permission) {
    return permissions?.includes(permission) ?? false;
}
}),
"[project]/apps/web/lib/session.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSession",
    ()=>clearSession,
    "loadStoredSession",
    ()=>loadStoredSession,
    "sessionHasPermission",
    ()=>sessionHasPermission,
    "storeSession",
    ()=>storeSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$auth$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/auth/permissions.ts [app-ssr] (ecmascript)");
"use client";
;
const STORAGE_KEY = "easyprint:session";
function loadStoredSession() {
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
    const raw = undefined;
}
function storeSession(session) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}
function clearSession() {
    window.localStorage.removeItem(STORAGE_KEY);
}
function sessionHasPermission(session, permission) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$auth$2f$permissions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasPermission"])(session?.session.permissions, permission);
}
}),
"[project]/packages/shared/src/template/render.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildPreviewPayload",
    ()=>buildPreviewPayload,
    "formatFieldValue",
    ()=>formatFieldValue,
    "getMissingRequiredFields",
    ()=>getMissingRequiredFields,
    "resolveFieldPreviewValue",
    ()=>resolveFieldPreviewValue,
    "resolveTextElementContent",
    ()=>resolveTextElementContent
]);
const hasValue = (value)=>value !== undefined && value !== null && !(typeof value === "string" && value.trim() === "");
const toText = (value)=>{
    if (value === undefined || value === null) {
        return "";
    }
    return String(value);
};
function buildPreviewPayload(document) {
    return document.dataSchema.reduce((accumulator, field)=>{
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
function getMissingRequiredFields(document, previewPayload = buildPreviewPayload(document)) {
    return document.dataSchema.filter((field)=>field.required && !hasValue(previewPayload[field.key]) && !hasValue(field.fallbackValue));
}
function formatFieldValue(field, value) {
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
        const numericValue = typeof value === "number" ? value : Number(toText(value).replace(/\./g, "").replace(",", "."));
        if (Number.isNaN(numericValue)) {
            return toText(value);
        }
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: typeof field.formatConfig?.currency === "string" ? field.formatConfig.currency : "BRL"
        }).format(numericValue);
    }
    return toText(value);
}
function resolveFieldPreviewValue(document, key, previewPayload = buildPreviewPayload(document)) {
    if (!key) {
        return "";
    }
    const field = document.dataSchema.find((entry)=>entry.key === key);
    const rawValue = hasValue(previewPayload[key]) ? previewPayload[key] : field?.fallbackValue;
    return formatFieldValue(field, rawValue);
}
function resolveTextElementContent(document, element, previewPayload = buildPreviewPayload(document)) {
    if (element.contentMode !== "dynamic") {
        return element.text;
    }
    const resolvedValue = resolveFieldPreviewValue(document, element.bindingKey, previewPayload);
    if (hasValue(resolvedValue)) {
        return resolvedValue;
    }
    return element.placeholder ?? element.bindingKey ?? element.text;
}
}),
"[project]/packages/shared/src/template/barcode.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBarcodeMinimumSize",
    ()=>getBarcodeMinimumSize,
    "normalizeBarcodeText",
    ()=>normalizeBarcodeText,
    "validateBarcodeValue",
    ()=>validateBarcodeValue,
    "validateQrCodeValue",
    ()=>validateQrCodeValue
]);
const onlyDigits = (value)=>/^\d+$/.test(value);
function validateBarcodeValue(format, value) {
    const trimmed = value.trim();
    if (!trimmed) {
        return {
            valid: false,
            message: "Informe um valor para o codigo de barras."
        };
    }
    if (format === "EAN13") {
        return /^\d{13}$/.test(trimmed) ? {
            valid: true
        } : {
            valid: false,
            message: "EAN13 exige exatamente 13 digitos."
        };
    }
    if (format === "EAN8") {
        return /^\d{8}$/.test(trimmed) ? {
            valid: true
        } : {
            valid: false,
            message: "EAN8 exige exatamente 8 digitos."
        };
    }
    if (format === "CODE128") {
        return trimmed.length <= 80 ? {
            valid: true
        } : {
            valid: false,
            message: "CODE128 aceita ate 80 caracteres nesta etiqueta."
        };
    }
    return {
        valid: false,
        message: "Formato de codigo de barras nao suportado."
    };
}
function validateQrCodeValue(value) {
    return value.trim() ? {
        valid: true
    } : {
        valid: false,
        message: "Informe um valor para gerar o QR Code."
    };
}
function getBarcodeMinimumSize(format) {
    if (format === "EAN13") {
        return {
            widthMm: 30,
            heightMm: 12
        };
    }
    if (format === "EAN8") {
        return {
            widthMm: 22,
            heightMm: 10
        };
    }
    return {
        widthMm: 24,
        heightMm: 10
    };
}
function normalizeBarcodeText(format, value) {
    const trimmed = value.trim();
    return onlyDigits(trimmed) || format === "CODE128" ? trimmed : trimmed.replace(/\s+/g, "");
}
}),
"[project]/apps/web/lib/barcode-validation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getScannableValidationErrors",
    ()=>getScannableValidationErrors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/barcode.ts [app-ssr] (ecmascript)");
;
;
function getScannableValidationErrors(document, previewPayload) {
    return document.elements.flatMap((element)=>{
        if (element.type === "barcode") {
            const rawValue = element.bindingKey ? String((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveFieldPreviewValue"])(document, element.bindingKey, previewPayload) || element.value) : element.value;
            const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeBarcodeText"])(element.format, rawValue);
            const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateBarcodeValue"])(element.format, value);
            return validation.valid ? [] : [
                `${element.name}: ${validation.message ?? "codigo de barras invalido"}`
            ];
        }
        if (element.type === "qrcode") {
            const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateQrCodeValue"])(element.value);
            return validation.valid ? [] : [
                `${element.name}: ${validation.message ?? "QR Code invalido"}`
            ];
        }
        return [];
    });
}
}),
"[project]/apps/web/lib/editor-text.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EDITOR_UNIT_SCALE",
    ()=>EDITOR_UNIT_SCALE,
    "MILLIMETERS_PER_POINT",
    ()=>MILLIMETERS_PER_POINT,
    "POINTS_PER_MILLIMETER",
    ()=>POINTS_PER_MILLIMETER,
    "TEXT_FONT_OPTIONS",
    ()=>TEXT_FONT_OPTIONS,
    "getScaledTextFontSize",
    ()=>getScaledTextFontSize,
    "getTextElementStyle",
    ()=>getTextElementStyle,
    "measureTextElementHeight",
    ()=>measureTextElementHeight,
    "millimetersToPoints",
    ()=>millimetersToPoints,
    "pointsToMillimeters",
    ()=>pointsToMillimeters
]);
"use client";
const EDITOR_UNIT_SCALE = 6;
const MILLIMETERS_PER_POINT = 25.4 / 72;
const POINTS_PER_MILLIMETER = 72 / 25.4;
const TEXT_FONT_OPTIONS = [
    {
        value: "\"IBM Plex Sans\", \"Segoe UI\", sans-serif",
        label: "IBM Plex Sans"
    },
    {
        value: "\"IBM Plex Serif\", Georgia, serif",
        label: "IBM Plex Serif"
    },
    {
        value: "\"Segoe UI\", Arial, sans-serif",
        label: "Segoe UI"
    },
    {
        value: "Arial, Helvetica, sans-serif",
        label: "Arial"
    },
    {
        value: "\"Trebuchet MS\", sans-serif",
        label: "Trebuchet"
    },
    {
        value: "\"Times New Roman\", Times, serif",
        label: "Times New Roman"
    },
    {
        value: "Georgia, serif",
        label: "Georgia"
    },
    {
        value: "\"Courier New\", monospace",
        label: "Courier New"
    },
    {
        value: "\"IBM Plex Mono\", \"Courier New\", monospace",
        label: "IBM Plex Mono"
    }
];
const MIN_TEXT_HEIGHT_UNITS = 6;
let measurementCanvas = null;
const pointsToMillimeters = (points)=>points * MILLIMETERS_PER_POINT;
const millimetersToPoints = (millimeters)=>millimeters * POINTS_PER_MILLIMETER;
const getScaledTextFontSize = (points, pixelsPerMillimeter)=>pointsToMillimeters(points) * pixelsPerMillimeter;
const normalizeContent = (value)=>value.replace(/\r\n/g, "\n");
const countOccurrences = (value, pattern)=>(value.match(pattern) ?? []).length;
const getMeasurementContext = ()=>{
    if (typeof document === "undefined") {
        return null;
    }
    if (!measurementCanvas) {
        measurementCanvas = document.createElement("canvas");
    }
    return measurementCanvas.getContext("2d");
};
const buildFontDescriptor = (element, fontSizePx)=>`${element.fontStyle} ${element.fontWeight} ${fontSizePx}px ${element.fontFamily}`;
const getBlockUnitSize = (value, scale, physical)=>physical ? `${value ?? 0}mm` : (value ?? 0) * scale;
const getSpacingUnitSize = (value, scale, physical)=>physical ? `${pointsToMillimeters(value ?? 0)}mm` : getScaledTextFontSize(value ?? 0, scale);
const getHorizontalPaddingUnits = (element)=>(element.paddingLeft ?? 0) + (element.paddingRight ?? 0);
const getVerticalPaddingUnits = (element)=>(element.paddingTop ?? 0) + (element.paddingBottom ?? 0);
const measureTextWidth = (value, context, element, letterSpacingPx, wordSpacingPx)=>{
    const rawWidth = context.measureText(value).width;
    const letterSpacingWidth = Math.max(0, value.length - 1) * letterSpacingPx;
    const wordSpacingWidth = countOccurrences(value, /\s/g) * wordSpacingPx;
    return rawWidth + letterSpacingWidth + wordSpacingWidth;
};
const breakLongToken = (token, maxWidthPx, context, element, letterSpacingPx, wordSpacingPx)=>{
    if (measureTextWidth(token, context, element, letterSpacingPx, wordSpacingPx) <= maxWidthPx) {
        return [
            token
        ];
    }
    const pieces = [];
    let current = "";
    for (const character of token){
        const next = `${current}${character}`;
        if (current && measureTextWidth(next, context, element, letterSpacingPx, wordSpacingPx) > maxWidthPx) {
            pieces.push(current);
            current = character;
            continue;
        }
        current = next;
    }
    if (current) {
        pieces.push(current);
    }
    return pieces;
};
const wrapLine = (line, maxWidthPx, context, element, letterSpacingPx, wordSpacingPx)=>{
    if (!line) {
        return [
            ""
        ];
    }
    const tokens = line.split(/(\s+)/).filter((token)=>token.length > 0);
    const wrapped = [];
    let current = "";
    for (const token of tokens){
        const segments = measureTextWidth(token, context, element, letterSpacingPx, wordSpacingPx) > maxWidthPx && !/^\s+$/.test(token) ? breakLongToken(token, maxWidthPx, context, element, letterSpacingPx, wordSpacingPx) : [
            token
        ];
        for (const segment of segments){
            const next = `${current}${segment}`;
            if (current && measureTextWidth(next, context, element, letterSpacingPx, wordSpacingPx) > maxWidthPx) {
                wrapped.push(current.trimEnd());
                current = segment.trimStart();
                continue;
            }
            current = next;
        }
    }
    wrapped.push(current.trimEnd());
    return wrapped.filter((entry, index)=>entry.length > 0 || index === 0);
};
const getTextElementStyle = (element, scale = 1, options)=>{
    const physical = Boolean(options?.physical);
    const isJustified = element.align === "justify";
    const wrapMode = element.wrapMode ?? "wrap";
    return {
        width: "100%",
        height: "100%",
        overflow: element.overflowMode ?? "hidden",
        boxSizing: "border-box",
        paddingTop: getBlockUnitSize(element.paddingTop, scale, physical),
        paddingRight: getBlockUnitSize(element.paddingRight, scale, physical),
        paddingBottom: getBlockUnitSize(element.paddingBottom, scale, physical),
        paddingLeft: getBlockUnitSize(element.paddingLeft, scale, physical),
        color: element.color,
        fontFamily: element.fontFamily,
        fontSize: physical ? `${pointsToMillimeters(element.fontSize)}mm` : getScaledTextFontSize(element.fontSize, scale),
        fontWeight: element.fontWeight,
        fontStyle: element.fontStyle,
        textDecoration: element.textDecoration,
        lineHeight: element.lineHeight,
        letterSpacing: getSpacingUnitSize(element.letterSpacing, scale, physical),
        wordSpacing: getSpacingUnitSize(element.wordSpacing, scale, physical),
        textAlign: element.align,
        textAlignLast: isJustified ? "left" : undefined,
        textJustify: isJustified ? "inter-word" : undefined,
        hyphens: isJustified ? "auto" : undefined,
        textIndent: getBlockUnitSize(element.textIndent, scale, physical),
        whiteSpace: wrapMode === "nowrap" ? "pre" : "pre-wrap",
        overflowWrap: wrapMode === "nowrap" ? "normal" : isJustified ? "break-word" : "anywhere",
        wordBreak: wrapMode === "nowrap" ? "normal" : isJustified ? "normal" : "break-word",
        display: "block"
    };
};
const measureTextElementHeight = (element, content, widthUnits = element.width, unitScale = EDITOR_UNIT_SCALE)=>{
    const context = getMeasurementContext();
    if (!context) {
        return Math.max(element.height, MIN_TEXT_HEIGHT_UNITS);
    }
    const fontSizePx = Math.max(1, getScaledTextFontSize(element.fontSize, unitScale));
    const horizontalPaddingPx = getHorizontalPaddingUnits(element) * unitScale;
    const verticalPaddingPx = getVerticalPaddingUnits(element) * unitScale;
    const maxWidthPx = Math.max(fontSizePx, widthUnits * unitScale - horizontalPaddingPx);
    const letterSpacingPx = getScaledTextFontSize(element.letterSpacing ?? 0, unitScale);
    const wordSpacingPx = getScaledTextFontSize(element.wordSpacing ?? 0, unitScale);
    context.font = buildFontDescriptor(element, fontSizePx);
    const wrappedLines = (element.wrapMode ?? "wrap") === "nowrap" ? normalizeContent(content).split("\n") : normalizeContent(content).split("\n").flatMap((line, index)=>wrapLine(line, index === 0 ? Math.max(fontSizePx, maxWidthPx - (element.textIndent ?? 0) * unitScale) : maxWidthPx, context, element, letterSpacingPx, wordSpacingPx));
    const lineCount = Math.max(1, wrappedLines.length);
    const heightPx = lineCount * fontSizePx * element.lineHeight + fontSizePx * 0.35 + verticalPaddingPx;
    const heightUnits = Number((heightPx / unitScale).toFixed(2));
    return Math.max(MIN_TEXT_HEIGHT_UNITS, heightUnits);
};
}),
"[project]/apps/web/lib/element-movement-bounds.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clampElementPositionToDocument",
    ()=>clampElementPositionToDocument,
    "getElementMovementBounds",
    ()=>getElementMovementBounds
]);
const normalizeRotation = (rotation)=>{
    if (!Number.isFinite(rotation)) {
        return 0;
    }
    const normalized = rotation % 360;
    return normalized < 0 ? normalized + 360 : normalized;
};
const collapseRange = (min, max)=>{
    if (min <= max) {
        return {
            min,
            max
        };
    }
    // If the element is larger than the document for the current rotation,
    // keep it centered on the axis instead of producing an invalid range.
    const center = (min + max) / 2;
    return {
        min: center,
        max: center
    };
};
const getRotatedHalfExtents = (width, height, rotation)=>{
    const radians = normalizeRotation(rotation) * Math.PI / 180;
    const absCos = Math.abs(Math.cos(radians));
    const absSin = Math.abs(Math.sin(radians));
    return {
        halfWidth: (width * absCos + height * absSin) / 2,
        halfHeight: (width * absSin + height * absCos) / 2
    };
};
const getElementMovementBounds = (element, documentWidth, documentHeight)=>{
    const width = Math.max(0, element.width);
    const height = Math.max(0, element.height);
    const docWidth = Math.max(0, documentWidth);
    const docHeight = Math.max(0, documentHeight);
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const rotatedHalf = getRotatedHalfExtents(width, height, element.rotation);
    const xRange = collapseRange(rotatedHalf.halfWidth - halfWidth, docWidth - rotatedHalf.halfWidth - halfWidth);
    const yRange = collapseRange(rotatedHalf.halfHeight - halfHeight, docHeight - rotatedHalf.halfHeight - halfHeight);
    return {
        minX: xRange.min,
        maxX: xRange.max,
        minY: yRange.min,
        maxY: yRange.max
    };
};
const clampElementPositionToDocument = (x, y, element, documentWidth, documentHeight)=>{
    const bounds = getElementMovementBounds(element, documentWidth, documentHeight);
    return {
        x: Math.min(bounds.maxX, Math.max(bounds.minX, x)),
        y: Math.min(bounds.maxY, Math.max(bounds.minY, y))
    };
};
}),
"[project]/apps/web/components/editor/barcode-symbol.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BarcodeSymbol",
    ()=>BarcodeSymbol
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
;
"use client";
;
;
const DynamicBarcodeSymbolRenderer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/web/components/editor/barcode-symbol-renderer.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-hidden": "true",
            style: {
                width: "100%",
                height: "100%",
                background: "repeating-linear-gradient(90deg, #111827 0 2px, #ffffff 2px 5px)"
            }
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/barcode-symbol.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
});
function BarcodeSymbol(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DynamicBarcodeSymbolRenderer, {
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/components/editor/barcode-symbol.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, this);
}
}),
"[project]/apps/web/components/editor/qr-symbol.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QrSymbol",
    ()=>QrSymbol
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
;
"use client";
;
;
const DynamicQrSymbolRenderer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/web/components/editor/qr-symbol-renderer.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-hidden": "true",
            style: {
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center",
                background: "repeating-linear-gradient(45deg, rgba(17,24,39,0.08) 0 6px, rgba(255,255,255,0.9) 6px 12px)"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "72%",
                    height: "72%",
                    border: "1px solid rgba(17,24,39,0.14)",
                    background: "#ffffff"
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/qr-symbol.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/qr-symbol.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
});
function QrSymbol(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DynamicQrSymbolRenderer, {
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/components/editor/qr-symbol.tsx",
        lineNumber: 36,
        columnNumber: 10
    }, this);
}
}),
"[project]/apps/web/components/editor/document-renderer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelDocumentSurface",
    ()=>LabelDocumentSurface,
    "LabelElementContent",
    ()=>LabelElementContent,
    "getElementFrameStyle",
    ()=>getElementFrameStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/barcode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-text.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$barcode$2d$symbol$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/barcode-symbol.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$qr$2d$symbol$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/qr-symbol.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const sizeValue = (value, scale, useMm)=>useMm ? `${value}mm` : value * scale;
const getElementFrameStyle = (element, scale, usePhysicalUnits, extra)=>({
        position: "absolute",
        left: sizeValue(element.x, scale, usePhysicalUnits),
        top: sizeValue(element.y, scale, usePhysicalUnits),
        width: sizeValue(element.width, scale, usePhysicalUnits),
        height: sizeValue(element.height, scale, usePhysicalUnits),
        transform: `rotate(${element.rotation}deg)`,
        transformOrigin: "center center",
        display: element.visible ? "block" : "none",
        ...extra
    });
function LabelElementContent({ document, element, scale = 1, previewPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildPreviewPayload"])(document), usePhysicalUnits = false, textOverride, textChildren }) {
    if (element.type === "text") {
        const content = textOverride ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTextElementContent"])(document, element, previewPayload);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTextElementStyle"])(element, scale, {
                physical: usePhysicalUnits
            }),
            children: textChildren ?? content
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this);
    }
    if (element.type === "shape") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                background: element.fill,
                border: `${Math.max(1, element.strokeWidth * scale)}px solid ${element.stroke}`,
                borderRadius: element.borderRadius * scale
            }
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this);
    }
    if (element.type === "line") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: Math.max(1, element.strokeWidth * scale),
                background: element.stroke,
                marginTop: Math.max(0, element.height * scale / 2 - Math.max(1, element.strokeWidth * scale) / 2)
            }
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, this);
    }
    if (element.type === "barcode") {
        const rawValue = element.bindingKey ? String((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveFieldPreviewValue"])(document, element.bindingKey, previewPayload) || element.value) : element.value;
        const resolvedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeBarcodeText"])(element.format, rawValue);
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateBarcodeValue"])(element.format, resolvedValue);
        const minimumSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBarcodeMinimumSize"])(element.format);
        const sizeWarning = element.width < minimumSize.widthMm || element.height < minimumSize.heightMm ? `Minimo recomendado: ${minimumSize.widthMm} x ${minimumSize.heightMm} mm.` : null;
        if (!validation.valid) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    padding: usePhysicalUnits ? "1mm" : Math.max(4, scale * 0.6),
                    border: `${usePhysicalUnits ? "0.25mm" : Math.max(1, scale * 0.3)} solid #b91c1c`,
                    background: "#fff5f5",
                    color: "#991b1b",
                    fontSize: usePhysicalUnits ? "2.2mm" : Math.max(8, scale * 1.2),
                    fontWeight: 700,
                    lineHeight: 1.15,
                    textAlign: "center",
                    boxSizing: "border-box"
                },
                children: validation.message
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                display: "block",
                background: "#ffffff",
                border: sizeWarning ? `${usePhysicalUnits ? "0.2mm" : Math.max(1, scale * 0.25)} solid #d97706` : "none",
                boxSizing: "border-box"
            },
            title: sizeWarning ?? undefined,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$barcode$2d$symbol$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarcodeSymbol"], {
                value: resolvedValue,
                format: element.format,
                showHumanReadable: element.showHumanReadable,
                physical: usePhysicalUnits
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
                lineNumber: 150,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
            lineNumber: 137,
            columnNumber: 7
        }, this);
    }
    if (element.type === "qrcode") {
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateQrCodeValue"])(element.value);
        if (!validation.valid) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    padding: usePhysicalUnits ? "1mm" : Math.max(4, scale * 0.6),
                    border: `${usePhysicalUnits ? "0.25mm" : Math.max(1, scale * 0.3)} solid #b91c1c`,
                    background: "#fff5f5",
                    color: "#991b1b",
                    fontSize: usePhysicalUnits ? "2.2mm" : Math.max(8, scale * 1.2),
                    fontWeight: 700,
                    textAlign: "center",
                    boxSizing: "border-box"
                },
                children: validation.message
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
                lineNumber: 164,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                padding: Math.max(2, scale * 0.4),
                background: "#ffffff",
                border: `${Math.max(1, scale * 0.35)}px solid #111827`
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$qr$2d$symbol$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QrSymbol"], {
                value: element.value,
                level: element.errorCorrection
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
                lineNumber: 195,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
            lineNumber: 186,
            columnNumber: 7
        }, this);
    }
    if (element.type === "image") {
        const objectFit = element.objectFit ?? (element.fit === "stretch" ? "fill" : element.fit);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                border: element.src ? "none" : `${Math.max(1, scale * 0.35)}px dashed #94a3b8`,
                display: "grid",
                placeItems: "center",
                color: "#64748b",
                background: element.src ? "transparent" : "rgba(148, 163, 184, 0.08)",
                opacity: element.opacity,
                overflow: "hidden",
                boxSizing: "border-box"
            },
            children: element.src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: element.src,
                alt: element.name,
                draggable: false,
                style: {
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit,
                    userSelect: "none",
                    pointerEvents: "none"
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
                lineNumber: 220,
                columnNumber: 11
            }, this) : "Imagem"
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
            lineNumber: 205,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%",
            height: "100%",
            border: `${Math.max(1, scale * 0.35)}px dashed #94a3b8`,
            display: "grid",
            placeItems: "center",
            color: "#64748b",
            background: "rgba(148, 163, 184, 0.08)"
        },
        children: "Elemento"
    }, void 0, false, {
        fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
        lineNumber: 241,
        columnNumber: 5
    }, this);
}
function LabelDocumentSurface({ document, scale, previewPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildPreviewPayload"])(document), containerStyle, surfaceStyle, renderElement, mode = "screen" }) {
    const usePhysicalUnits = mode === "physical" && document.document.unit === "mm";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: usePhysicalUnits ? `${document.document.width}mm` : document.document.width * scale,
            height: usePhysicalUnits ? `${document.document.height}mm` : document.document.height * scale,
            ...containerStyle
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                position: "absolute",
                inset: 0,
                background: document.document.background,
                overflow: "hidden",
                ...surfaceStyle
            },
            children: [
                ...document.elements
            ].sort((left, right)=>left.zIndex - right.zIndex).map((element)=>{
                const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: getElementFrameStyle(element, scale, usePhysicalUnits),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LabelElementContent, {
                        document: document,
                        element: element,
                        scale: scale,
                        previewPayload: previewPayload,
                        usePhysicalUnits: usePhysicalUnits
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
                        lineNumber: 299,
                        columnNumber: 17
                    }, this)
                }, element.id, false, {
                    fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
                    lineNumber: 298,
                    columnNumber: 15
                }, this);
                return renderElement ? renderElement(element, content) : content;
            })
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
            lineNumber: 285,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
        lineNumber: 277,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/editor/canvas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorCanvas",
    ()=>EditorCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/barcode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-text.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$element$2d$movement$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/element-movement-bounds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$document$2d$renderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/document-renderer.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 3;
const IMAGE_MIN_SIZE = 3;
const QRCODE_MIN_SIZE = 8;
const clamp = (value, min, max)=>Math.min(max, Math.max(min, value));
const toFreeMovementValue = (value)=>Number(value.toFixed(3));
const isTextElement = (element)=>Boolean(element && element.type === "text");
const isImageElement = (element)=>Boolean(element && element.type === "image");
const getElementMinimumSize = (element)=>{
    if (element.type === "barcode") {
        const barcodeMinimum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBarcodeMinimumSize"])(element.format);
        return {
            minWidth: barcodeMinimum.widthMm,
            minHeight: barcodeMinimum.heightMm
        };
    }
    if (element.type === "qrcode") {
        return {
            minWidth: QRCODE_MIN_SIZE,
            minHeight: QRCODE_MIN_SIZE
        };
    }
    if (element.type === "image") {
        return {
            minWidth: IMAGE_MIN_SIZE,
            minHeight: IMAGE_MIN_SIZE
        };
    }
    if (element.type === "line") {
        return {
            minWidth: 4,
            minHeight: Math.max(0.2, element.strokeWidth || 0.2)
        };
    }
    return {
        minWidth: 4,
        minHeight: 4
    };
};
const resizeHandles = [
    {
        handle: "nw",
        cursor: "nwse-resize",
        style: {
            left: -6,
            top: -6
        }
    },
    {
        handle: "n",
        cursor: "ns-resize",
        style: {
            left: "50%",
            top: -6,
            transform: "translateX(-50%)"
        }
    },
    {
        handle: "ne",
        cursor: "nesw-resize",
        style: {
            right: -6,
            top: -6
        }
    },
    {
        handle: "e",
        cursor: "ew-resize",
        style: {
            right: -6,
            top: "50%",
            transform: "translateY(-50%)"
        }
    },
    {
        handle: "se",
        cursor: "nwse-resize",
        style: {
            right: -6,
            bottom: -6
        }
    },
    {
        handle: "s",
        cursor: "ns-resize",
        style: {
            left: "50%",
            bottom: -6,
            transform: "translateX(-50%)"
        }
    },
    {
        handle: "sw",
        cursor: "nesw-resize",
        style: {
            left: -6,
            bottom: -6
        }
    },
    {
        handle: "w",
        cursor: "ew-resize",
        style: {
            left: -6,
            top: "50%",
            transform: "translateY(-50%)"
        }
    }
];
function EditorCanvas({ readOnly = false }) {
    const { history, selectedElementId, selectElement, patchElement, zoom, setZoom, gridEnabled, snapEnabled, gridSize, markStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"])();
    const document = history.present;
    const previewPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildPreviewPayload"])(document), [
        document
    ]);
    const viewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textEditorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastZoomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(zoom);
    const [spacePressed, setSpacePressed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragState, setDragState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [panState, setPanState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [textEditor, setTextEditor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const stageScale = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EDITOR_UNIT_SCALE"] * zoom;
    const autosizeTextarea = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!textEditorRef.current) {
            return;
        }
        textEditorRef.current.style.height = "auto";
        textEditorRef.current.style.height = `${textEditorRef.current.scrollHeight}px`;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!textEditorRef.current) {
            return;
        }
        textEditorRef.current.focus();
        textEditorRef.current.setSelectionRange(textEditorRef.current.value.length, textEditorRef.current.value.length);
        autosizeTextarea();
    }, [
        autosizeTextarea,
        textEditor
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (event)=>{
            if (event.code === "Space" && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement) && !(event.target instanceof HTMLSelectElement)) {
                event.preventDefault();
                setSpacePressed(true);
            }
        };
        const handleKeyUp = (event)=>{
            if (event.code === "Space") {
                setSpacePressed(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return ()=>{
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedElementId !== textEditor?.id) {
            setTextEditor(null);
        }
    }, [
        selectedElementId,
        textEditor?.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const viewport = viewportRef.current;
        const previousZoom = lastZoomRef.current;
        if (!viewport || previousZoom === zoom) {
            lastZoomRef.current = zoom;
            return;
        }
        const ratioX = viewport.scrollWidth > viewport.clientWidth ? viewport.scrollLeft / Math.max(1, viewport.scrollWidth - viewport.clientWidth) : 0.5;
        const ratioY = viewport.scrollHeight > viewport.clientHeight ? viewport.scrollTop / Math.max(1, viewport.scrollHeight - viewport.clientHeight) : 0.5;
        requestAnimationFrame(()=>{
            viewport.scrollLeft = Math.max(0, ratioX * Math.max(0, viewport.scrollWidth - viewport.clientWidth));
            viewport.scrollTop = Math.max(0, ratioY * Math.max(0, viewport.scrollHeight - viewport.clientHeight));
        });
        lastZoomRef.current = zoom;
    }, [
        zoom
    ]);
    const commitTextEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!textEditor) {
            return;
        }
        const target = document.elements.find((element)=>element.id === textEditor.id);
        if (!isTextElement(target) || target.contentMode !== "static") {
            setTextEditor(null);
            return;
        }
        const nextHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["measureTextElementHeight"])(target, textEditor.value, target.width);
        patchElement(target.id, {
            text: textEditor.value,
            height: nextHeight
        });
        markStatus("Texto atualizado");
        setTextEditor(null);
    }, [
        document.elements,
        markStatus,
        patchElement,
        textEditor
    ]);
    const cancelTextEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setTextEditor(null);
        markStatus("Edicao de texto cancelada");
    }, [
        markStatus
    ]);
    const handleViewportWheel = (event)=>{
        if (!(event.ctrlKey || event.metaKey)) {
            return;
        }
        event.preventDefault();
        const nextZoom = clamp(Number((zoom * (event.deltaY < 0 ? 1.08 : 0.92)).toFixed(2)), MIN_ZOOM, MAX_ZOOM);
        if (nextZoom === zoom) {
            return;
        }
        const viewport = viewportRef.current;
        if (!viewport) {
            setZoom(nextZoom);
            return;
        }
        const rect = viewport.getBoundingClientRect();
        const pointerX = event.clientX - rect.left;
        const pointerY = event.clientY - rect.top;
        const anchorX = viewport.scrollLeft + pointerX;
        const anchorY = viewport.scrollTop + pointerY;
        const ratio = nextZoom / zoom;
        setZoom(nextZoom);
        requestAnimationFrame(()=>{
            viewport.scrollLeft = anchorX * ratio - pointerX;
            viewport.scrollTop = anchorY * ratio - pointerY;
        });
    };
    const startInteraction = (event, element, mode, handle)=>{
        event.stopPropagation();
        event.preventDefault();
        selectElement(element.id);
        if (readOnly || element.locked || event.button !== 0) {
            return;
        }
        const viewport = viewportRef.current;
        if (viewport) {
            viewport.setPointerCapture(event.pointerId);
        }
        const surface = viewport?.querySelector(".editor-canvas-surface");
        const surfaceRect = surface?.getBoundingClientRect();
        const centerClientX = surfaceRect ? surfaceRect.left + (element.x + element.width / 2) * stageScale : event.clientX;
        const centerClientY = surfaceRect ? surfaceRect.top + (element.y + element.height / 2) * stageScale : event.clientY;
        setDragState({
            id: element.id,
            mode,
            handle,
            pointerId: event.pointerId,
            startClientX: event.clientX,
            startClientY: event.clientY,
            startElementX: element.x,
            startElementY: element.y,
            startElementWidth: element.width,
            startElementHeight: element.height,
            startRotation: element.rotation,
            startPointerAngle: Math.atan2(event.clientY - centerClientY, event.clientX - centerClientX),
            centerClientX,
            centerClientY,
            maintainAspectRatio: isImageElement(element) ? element.maintainAspectRatio ?? true : false
        });
    };
    const startTextEditing = (element)=>{
        if (readOnly || element.locked || element.type !== "text" || element.contentMode !== "static") {
            return;
        }
        selectElement(element.id);
        setTextEditor({
            id: element.id,
            value: element.text
        });
    };
    const handleViewportPointerDown = (event)=>{
        if (event.button === 1 || spacePressed && event.button === 0) {
            const viewport = viewportRef.current;
            if (!viewport) {
                return;
            }
            event.preventDefault();
            setPanState({
                startX: event.clientX,
                startY: event.clientY,
                scrollLeft: viewport.scrollLeft,
                scrollTop: viewport.scrollTop
            });
            return;
        }
        if (event.target === event.currentTarget) {
            selectElement(undefined);
        }
    };
    const handlePointerMove = (event)=>{
        if (panState) {
            event.preventDefault();
            const viewport = viewportRef.current;
            if (!viewport) {
                return;
            }
            viewport.scrollLeft = panState.scrollLeft - (event.clientX - panState.startX);
            viewport.scrollTop = panState.scrollTop - (event.clientY - panState.startY);
            return;
        }
        if (!dragState) {
            return;
        }
        const dx = (event.clientX - dragState.startClientX) / stageScale;
        const dy = (event.clientY - dragState.startClientY) / stageScale;
        const effectiveSnapSize = gridEnabled && snapEnabled ? event.altKey ? Math.max(0.25, gridSize / 4) : Math.max(1, gridSize) : null;
        const resolveDelta = (value)=>effectiveSnapSize ? Math.round(value / effectiveSnapSize) * effectiveSnapSize : toFreeMovementValue(value);
        if (dragState.mode === "move") {
            const nextX = dragState.startElementX + resolveDelta(dx);
            const nextY = dragState.startElementY + resolveDelta(dy);
            const boundedPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$element$2d$movement$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampElementPositionToDocument"])(nextX, nextY, {
                width: dragState.startElementWidth,
                height: dragState.startElementHeight,
                rotation: dragState.startRotation
            }, document.document.width, document.document.height);
            patchElement(dragState.id, {
                x: toFreeMovementValue(boundedPosition.x),
                y: toFreeMovementValue(boundedPosition.y)
            });
            return;
        }
        const selectedElement = document.elements.find((element)=>element.id === dragState.id);
        if (dragState.mode === "rotate") {
            const currentAngle = Math.atan2(event.clientY - dragState.centerClientY, event.clientX - dragState.centerClientX);
            const deltaDegrees = (currentAngle - dragState.startPointerAngle) * (180 / Math.PI);
            const rawRotation = dragState.startRotation + deltaDegrees;
            const nextRotation = event.shiftKey ? Math.round(rawRotation / 15) * 15 : rawRotation;
            patchElement(dragState.id, {
                rotation: Number(nextRotation.toFixed(2))
            });
            return;
        }
        if (!selectedElement) {
            return;
        }
        const { minWidth, minHeight } = getElementMinimumSize(selectedElement);
        const handle = dragState.handle ?? "se";
        const deltaX = resolveDelta(dx);
        const deltaY = resolveDelta(dy);
        let left = dragState.startElementX;
        let top = dragState.startElementY;
        let right = dragState.startElementX + dragState.startElementWidth;
        let bottom = dragState.startElementY + dragState.startElementHeight;
        if (handle.includes("w")) left += deltaX;
        if (handle.includes("e")) right += deltaX;
        if (handle.includes("n")) top += deltaY;
        if (handle.includes("s")) bottom += deltaY;
        const isCornerResize = handle.length === 2;
        const shouldKeepAspect = selectedElement.type === "image" && isCornerResize && (dragState.maintainAspectRatio ? !event.shiftKey : event.shiftKey);
        if (shouldKeepAspect) {
            const startAspect = dragState.startElementWidth / Math.max(minHeight, dragState.startElementHeight);
            const nextWidth = Math.max(minWidth, right - left);
            const nextHeight = Math.max(minHeight, bottom - top);
            const widthDriven = Math.abs(nextWidth - dragState.startElementWidth) >= Math.abs(nextHeight - dragState.startElementHeight);
            const adjustedWidth = widthDriven ? nextWidth : nextHeight * startAspect;
            const adjustedHeight = widthDriven ? nextWidth / startAspect : nextHeight;
            if (handle.includes("w")) left = right - adjustedWidth;
            else right = left + adjustedWidth;
            if (handle.includes("n")) top = bottom - adjustedHeight;
            else bottom = top + adjustedHeight;
        }
        if (right - left < minWidth) {
            if (handle.includes("w")) left = right - minWidth;
            else right = left + minWidth;
        }
        if (bottom - top < minHeight) {
            if (handle.includes("n")) top = bottom - minHeight;
            else bottom = top + minHeight;
        }
        left = clamp(left, 0, Math.max(0, document.document.width - minWidth));
        top = clamp(top, 0, Math.max(0, document.document.height - minHeight));
        right = clamp(right, left + minWidth, document.document.width);
        bottom = clamp(bottom, top + minHeight, document.document.height);
        patchElement(dragState.id, {
            x: toFreeMovementValue(left),
            y: toFreeMovementValue(top),
            width: toFreeMovementValue(right - left),
            height: toFreeMovementValue(bottom - top)
        });
    };
    const handlePointerFinish = ()=>{
        if (dragState) {
            const viewport = viewportRef.current;
            if (viewport?.hasPointerCapture(dragState.pointerId)) {
                viewport.releasePointerCapture(dragState.pointerId);
            }
        }
        setDragState(null);
        setPanState(null);
    };
    const selectedElement = document.elements.find((element)=>element.id === selectedElementId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: viewportRef,
        className: "editor-canvas-viewport",
        onWheel: handleViewportWheel,
        onPointerDown: handleViewportPointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerFinish,
        onPointerLeave: handlePointerFinish,
        onClick: (event)=>{
            if (!panState && event.target === event.currentTarget) {
                selectElement(undefined);
            }
        },
        style: {
            minHeight: 0,
            height: "100%",
            overflow: "auto",
            overscrollBehavior: "contain",
            cursor: panState ? "grabbing" : spacePressed ? "grab" : "default"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "editor-canvas-workspace",
                style: {
                    minWidth: "100%",
                    minHeight: "100%",
                    display: "grid",
                    justifyItems: "center",
                    alignItems: "start",
                    alignContent: "start",
                    padding: "18px 48px 64px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "editor-canvas-surface",
                    style: {
                        position: "relative",
                        width: document.document.width * stageScale,
                        height: document.document.height * stageScale,
                        background: document.document.background,
                        borderRadius: 14,
                        boxShadow: "0 22px 48px rgba(15, 23, 42, 0.16)",
                        overflow: "hidden",
                        backgroundImage: gridEnabled ? "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)" : undefined,
                        backgroundSize: gridEnabled ? `${gridSize * stageScale}px ${gridSize * stageScale}px` : undefined
                    },
                    children: [
                        ...document.elements
                    ].sort((left, right)=>left.zIndex - right.zIndex).map((element)=>{
                        const selected = element.id === selectedElementId;
                        const isEditing = textEditor?.id === element.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$document$2d$renderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElementFrameStyle"])(element, stageScale, false, {
                                border: selected ? "1px solid #0f766e" : "1px solid transparent",
                                outline: selected ? "2px solid rgba(15, 118, 110, 0.18)" : "none",
                                borderRadius: 10,
                                cursor: readOnly ? "default" : element.locked ? "not-allowed" : "move",
                                userSelect: "none"
                            }),
                            onPointerDown: (event)=>startInteraction(event, element, "move"),
                            onClick: (event)=>{
                                event.stopPropagation();
                                selectElement(element.id);
                            },
                            onDoubleClick: ()=>startTextEditing(element),
                            children: [
                                isEditing && isTextElement(element) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ref: textEditorRef,
                                    value: textEditor.value,
                                    onChange: (event)=>{
                                        setTextEditor({
                                            id: element.id,
                                            value: event.target.value
                                        });
                                        autosizeTextarea();
                                    },
                                    onBlur: commitTextEditor,
                                    onClick: (event)=>event.stopPropagation(),
                                    onPointerDown: (event)=>event.stopPropagation(),
                                    onKeyDown: (event)=>{
                                        if (event.key === "Escape") {
                                            event.preventDefault();
                                            cancelTextEditor();
                                        }
                                        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                                            event.preventDefault();
                                            commitTextEditor();
                                        }
                                    },
                                    style: {
                                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTextElementStyle"])(element, stageScale),
                                        minHeight: "100%",
                                        resize: "none",
                                        border: "none",
                                        outline: "none",
                                        padding: 0,
                                        background: "rgba(255,255,255,0.86)",
                                        overflow: "hidden"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/editor/canvas.tsx",
                                    lineNumber: 599,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$document$2d$renderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LabelElementContent"], {
                                    document: document,
                                    element: element,
                                    scale: stageScale,
                                    previewPayload: previewPayload
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/editor/canvas.tsx",
                                    lineNumber: 632,
                                    columnNumber: 21
                                }, this),
                                element.locked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        top: -12,
                                        right: -12,
                                        padding: "3px 8px",
                                        borderRadius: 999,
                                        background: "#0f172a",
                                        color: "#fff",
                                        fontSize: 10,
                                        fontWeight: 600
                                    },
                                    children: "Lock"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/editor/canvas.tsx",
                                    lineNumber: 641,
                                    columnNumber: 21
                                }, this) : null,
                                selected && !readOnly && !element.locked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                left: "50%",
                                                top: -36,
                                                width: 1,
                                                height: 28,
                                                background: "rgba(15, 118, 110, 0.58)",
                                                transform: "translateX(-50%)",
                                                pointerEvents: "none"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/canvas.tsx",
                                            lineNumber: 660,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onPointerDown: (event)=>startInteraction(event, element, "rotate"),
                                            title: `${Math.round(element.rotation)} graus`,
                                            style: {
                                                position: "absolute",
                                                left: "50%",
                                                top: -46,
                                                width: 18,
                                                height: 18,
                                                background: "#ffffff",
                                                border: "2px solid #0f766e",
                                                boxShadow: "0 5px 14px rgba(15, 23, 42, 0.22)",
                                                borderRadius: 999,
                                                cursor: "grab",
                                                transform: "translateX(-50%)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/canvas.tsx",
                                            lineNumber: 672,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                left: "50%",
                                                top: -68,
                                                transform: "translateX(-50%)",
                                                padding: "2px 6px",
                                                borderRadius: 999,
                                                background: "#0f172a",
                                                color: "#ffffff",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 1,
                                                pointerEvents: "none",
                                                whiteSpace: "nowrap"
                                            },
                                            children: [
                                                Math.round(element.rotation),
                                                " graus"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/canvas.tsx",
                                            lineNumber: 689,
                                            columnNumber: 23
                                        }, this),
                                        resizeHandles.map((resizeHandle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onPointerDown: (event)=>startInteraction(event, element, "resize", resizeHandle.handle),
                                                style: {
                                                    position: "absolute",
                                                    width: 13,
                                                    height: 13,
                                                    background: "#ffffff",
                                                    border: "2px solid #0f766e",
                                                    boxShadow: "0 4px 10px rgba(15, 23, 42, 0.18)",
                                                    borderRadius: resizeHandle.handle.length === 2 ? 999 : 4,
                                                    cursor: resizeHandle.cursor,
                                                    ...resizeHandle.style
                                                }
                                            }, resizeHandle.handle, false, {
                                                fileName: "[project]/apps/web/components/editor/canvas.tsx",
                                                lineNumber: 709,
                                                columnNumber: 25
                                            }, this))
                                    ]
                                }, void 0, true) : null
                            ]
                        }, element.id, true, {
                            fileName: "[project]/apps/web/components/editor/canvas.tsx",
                            lineNumber: 582,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/editor/canvas.tsx",
                    lineNumber: 557,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/canvas.tsx",
                lineNumber: 545,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "muted",
                style: {
                    position: "sticky",
                    left: 20,
                    bottom: 20,
                    width: "fit-content",
                    padding: "7px 11px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.76)",
                    border: "1px solid var(--line)",
                    backdropFilter: "blur(10px)",
                    margin: "0 0 20px 20px",
                    fontSize: 12
                },
                children: selectedElement ? `Duplo clique para editar texto, Ctrl/Cmd + roda para zoom, Space + arrastar para pan, Alt para ajuste fino com grade` : "Ctrl/Cmd + roda para zoom, Space + arrastar para pan, Alt para ajuste fino"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/canvas.tsx",
                lineNumber: 735,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/editor/canvas.tsx",
        lineNumber: 524,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/editor/library.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorLibrary",
    ()=>EditorLibrary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Box/Box.mjs [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Button/Button.mjs [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Stack/Stack.mjs [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Typography/Typography.mjs [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const items = [
    {
        type: "text",
        label: "Texto",
        description: "Titulos, blocos e conteudo livre"
    },
    {
        type: "text",
        label: "Campo dinamico",
        description: "Texto vinculado ao schema de dados",
        variant: "dynamic"
    },
    {
        type: "barcode",
        label: "Codigo de barras",
        description: "Identificacao escaneavel"
    },
    {
        type: "qrcode",
        label: "QR Code",
        description: "Leitura 2D para links e dados"
    },
    {
        type: "line",
        label: "Linha",
        description: "Separacao e guias visuais"
    },
    {
        type: "shape",
        label: "Retangulo",
        description: "Areas, bordas e blocos"
    },
    {
        type: "image",
        label: "Imagem",
        description: "Logo e elementos graficos"
    }
];
function EditorLibrary({ readOnly = false }) {
    const addCanvasElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"])((state)=>state.addCanvasElement);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "editor-sidebar editor-sidebar--library",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                className: "editor-sidebar__header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        variant: "overline",
                        color: "text.secondary",
                        children: "Inserir"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/library.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        variant: "h6",
                        children: "Biblioteca de elementos"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/library.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/editor/library.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                className: "editor-sidebar__body",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                    spacing: 1.25,
                    children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                            variant: "outlined",
                            color: "inherit",
                            disabled: readOnly,
                            onClick: ()=>addCanvasElement(item.type, {
                                    variant: item.variant
                                }),
                            sx: {
                                justifyContent: "flex-start",
                                textAlign: "left",
                                px: 1.5,
                                py: 1.2,
                                borderRadius: 2.5,
                                bgcolor: "#fff",
                                opacity: readOnly ? 0.6 : 1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                spacing: 0.4,
                                sx: {
                                    alignItems: "flex-start"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "subtitle2",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/editor/library.tsx",
                                        lineNumber: 59,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        children: item.description
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/editor/library.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/editor/library.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this)
                        }, `${item.type}-${item.label}`, false, {
                            fileName: "[project]/apps/web/components/editor/library.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/editor/library.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/library.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/editor/library.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/editor/label-preview-surface.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelPreviewSurface",
    ()=>LabelPreviewSurface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$document$2d$renderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/document-renderer.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const PRESET_STYLES = {
    editor: {
        containerStyle: {
            marginInline: "auto"
        },
        surfaceStyle: {
            borderRadius: 16,
            border: "1px solid var(--line)",
            boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)"
        }
    },
    modal: {
        containerStyle: {
            marginInline: "auto"
        },
        surfaceStyle: {
            borderRadius: 18,
            border: "1px solid var(--line)",
            boxShadow: "0 18px 34px rgba(15, 23, 42, 0.10)"
        }
    },
    preview: {
        containerStyle: {},
        surfaceStyle: {
            borderRadius: 20,
            border: "1px solid var(--line)",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)"
        }
    },
    print: {
        containerStyle: {
            display: "block"
        },
        surfaceStyle: {
            borderRadius: 0,
            border: "none",
            boxShadow: "none"
        }
    }
};
function LabelPreviewSurface({ document, scale, previewPayload, preset = "editor", containerStyle, surfaceStyle, mode = "screen" }) {
    const presetStyles = PRESET_STYLES[preset];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$document$2d$renderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LabelDocumentSurface"], {
        document: document,
        scale: scale,
        previewPayload: previewPayload ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildPreviewPayload"])(document),
        containerStyle: {
            ...presetStyles.containerStyle,
            ...containerStyle
        },
        surfaceStyle: {
            ...presetStyles.surfaceStyle,
            ...surfaceStyle
        },
        mode: mode
    }, void 0, false, {
        fileName: "[project]/apps/web/components/editor/label-preview-surface.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/lib/label-format-registry.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LABEL_FORMATS",
    ()=>LABEL_FORMATS,
    "LABEL_FORMAT_CATEGORIES",
    ()=>LABEL_FORMAT_CATEGORIES,
    "findLabelFormatByDimensions",
    ()=>findLabelFormatByDimensions,
    "getDefaultLabelFormat",
    ()=>getDefaultLabelFormat,
    "getLabelFormatById",
    ()=>getLabelFormatById,
    "listFormats",
    ()=>listFormats,
    "listFormatsByCategory",
    ()=>listFormatsByCategory
]);
const LABEL_FORMATS = [
    {
        id: "rect_40x60",
        name: "40 x 60 mm",
        shape: "rect",
        widthMm: 60,
        heightMm: 40,
        category: "retangular",
        description: "Versao classica 60x40 para balcao e informacoes gerais."
    },
    {
        id: "rect_60x40",
        name: "60 x 40 mm",
        shape: "rect",
        widthMm: 40,
        heightMm: 60,
        category: "retangular",
        description: "Orientacao retrato para listas curtas e validade."
    },
    {
        id: "rect_100x60",
        name: "100 x 60 mm",
        shape: "rect",
        widthMm: 100,
        heightMm: 60,
        category: "retangular",
        description: "Etiqueta ampla para ingredientes, alergicos e instrucoes."
    },
    {
        id: "rect_50x30",
        name: "50 x 30 mm",
        shape: "rect",
        widthMm: 50,
        heightMm: 30,
        category: "retangular",
        description: "Compacta para preparo rapido e frente de loja."
    },
    {
        id: "rect_100x30",
        name: "100 x 30 mm",
        shape: "strip",
        widthMm: 100,
        heightMm: 30,
        category: "faixa",
        description: "Faixa horizontal para bandejas e lacres simples."
    },
    {
        id: "rect_150x30",
        name: "150 x 30 mm",
        shape: "strip",
        widthMm: 150,
        heightMm: 30,
        category: "faixa",
        description: "Faixa longa para envolver recipientes."
    },
    {
        id: "square_40x40",
        name: "40 x 40 mm",
        shape: "square",
        widthMm: 40,
        heightMm: 40,
        category: "quadrada"
    },
    {
        id: "square_50x50",
        name: "50 x 50 mm",
        shape: "square",
        widthMm: 50,
        heightMm: 50,
        category: "quadrada"
    },
    {
        id: "round_30",
        name: "Redonda 30 mm",
        shape: "round",
        widthMm: 30,
        heightMm: 30,
        diameterMm: 30,
        category: "redonda"
    },
    {
        id: "round_40",
        name: "Redonda 40 mm",
        shape: "round",
        widthMm: 40,
        heightMm: 40,
        diameterMm: 40,
        category: "redonda"
    },
    {
        id: "round_50",
        name: "Redonda 50 mm",
        shape: "round",
        widthMm: 50,
        heightMm: 50,
        diameterMm: 50,
        category: "redonda"
    },
    {
        id: "oval_80x50",
        name: "Oval 80 x 50 mm",
        shape: "oval",
        widthMm: 80,
        heightMm: 50,
        category: "oval"
    },
    {
        id: "seal_100x30",
        name: "Lacre 100 x 30 mm",
        shape: "seal",
        widthMm: 100,
        heightMm: 30,
        category: "lacre"
    },
    {
        id: "scale_60x40",
        name: "Balanca 60 x 40 mm",
        shape: "scale",
        widthMm: 60,
        heightMm: 40,
        category: "balanca"
    },
    {
        id: "internal_60x30",
        name: "Producao 60 x 30 mm",
        shape: "internal",
        widthMm: 60,
        heightMm: 30,
        category: "producao"
    },
    {
        id: "tag_80x50",
        name: "Tag 80 x 50 mm (com furo)",
        shape: "tag",
        widthMm: 80,
        heightMm: 50,
        category: "tag",
        description: "Espaco para furo superior central."
    },
    {
        id: "sleeve_120x50",
        name: "Sleeve 120 x 50 mm",
        shape: "sleeve",
        widthMm: 120,
        heightMm: 50,
        category: "sleeve",
        description: "Envolvente para copos ou potes."
    }
];
const LABEL_FORMAT_CATEGORIES = [
    {
        id: "retangular",
        label: "Retangulares",
        shapes: [
            "rect",
            "strip",
            "seal"
        ]
    },
    {
        id: "quadrada",
        label: "Quadradas",
        shapes: [
            "square"
        ]
    },
    {
        id: "redonda",
        label: "Redondas",
        shapes: [
            "round"
        ]
    },
    {
        id: "oval",
        label: "Ovais",
        shapes: [
            "oval"
        ]
    },
    {
        id: "faixa",
        label: "Faixa / Tira",
        shapes: [
            "strip"
        ]
    },
    {
        id: "lacre",
        label: "Lacre",
        shapes: [
            "seal"
        ]
    },
    {
        id: "balanca",
        label: "Balanca / Pesagem",
        shapes: [
            "scale"
        ]
    },
    {
        id: "producao",
        label: "Producao / Validade",
        shapes: [
            "internal"
        ]
    },
    {
        id: "tag",
        label: "Tags com furo",
        shapes: [
            "tag"
        ]
    },
    {
        id: "sleeve",
        label: "Sleeves / Envolventes",
        shapes: [
            "sleeve"
        ]
    }
];
const getDefaultLabelFormat = ()=>LABEL_FORMATS[0];
const getLabelFormatById = (id)=>LABEL_FORMATS.find((format)=>format.id === id);
const findLabelFormatByDimensions = (widthMm, heightMm)=>LABEL_FORMATS.find((format)=>format.widthMm === widthMm && format.heightMm === heightMm) ?? LABEL_FORMATS.find((format)=>format.widthMm === heightMm && format.heightMm === widthMm);
const listFormatsByCategory = (categoryId)=>LABEL_FORMATS.filter((format)=>format.category === categoryId);
const listFormats = ()=>LABEL_FORMATS;
}),
"[project]/apps/web/lib/template-library.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MODEL_CATEGORIES",
    ()=>MODEL_CATEGORIES,
    "MODEL_CATEGORY_CONFIG",
    ()=>MODEL_CATEGORY_CONFIG,
    "addDaysToDateInput",
    ()=>addDaysToDateInput,
    "buildInitialQuickPrintForm",
    ()=>buildInitialQuickPrintForm,
    "buildQuickPrintPayload",
    ()=>buildQuickPrintPayload,
    "formatDateInputLocal",
    ()=>formatDateInputLocal,
    "getCategoryDefinition",
    ()=>getCategoryDefinition,
    "getPreferredPrinterRoute",
    ()=>getPreferredPrinterRoute,
    "inferTemplateCategory",
    ()=>inferTemplateCategory,
    "normalizeModelCategory",
    ()=>normalizeModelCategory
]);
const MODEL_CATEGORIES = [
    "doces",
    "salgados",
    "bebidas",
    "refeicao"
];
const MODEL_CATEGORY_CONFIG = {
    doces: {
        label: "Doces",
        description: "Confeitaria, sobremesas e itens delicados.",
        accent: "#db2777",
        soft: "rgba(219, 39, 119, 0.10)",
        defaultResponsible: "Equipe Confeitaria",
        keywords: [
            "doce",
            "bolo",
            "sobremesa",
            "confeitaria",
            "brigadeiro",
            "torta"
        ]
    },
    salgados: {
        label: "Salgados",
        description: "Lanches, snacks e itens de preparo rapido.",
        accent: "#ea580c",
        soft: "rgba(234, 88, 12, 0.10)",
        defaultResponsible: "Equipe Salgados",
        keywords: [
            "salgado",
            "lanche",
            "snack",
            "coxinha",
            "empada",
            "esfiha"
        ]
    },
    bebidas: {
        label: "Bebidas",
        description: "Sucos, cafes, chas e bebidas embaladas.",
        accent: "#0284c7",
        soft: "rgba(2, 132, 199, 0.10)",
        defaultResponsible: "Equipe Bebidas",
        keywords: [
            "bebida",
            "suco",
            "cafe",
            "cha",
            "drink",
            "agua",
            "refrigerante"
        ]
    },
    refeicao: {
        label: "Refeicao",
        description: "Refeicoes completas, marmitas e pratos principais.",
        accent: "#16a34a",
        soft: "rgba(22, 163, 74, 0.10)",
        defaultResponsible: "Equipe Cozinha",
        keywords: [
            "refeicao",
            "almoco",
            "jantar",
            "marmita",
            "prato"
        ]
    }
};
const FIELD_MATCHERS = {
    productName: [
        "produto",
        "product",
        "item",
        "descricao",
        "nome produto",
        "nome do produto"
    ],
    responsibleName: [
        "responsavel",
        "responsible",
        "manipulador",
        "preparado por"
    ],
    manufacturedAt: [
        "fabricacao",
        "fabricado",
        "manufact",
        "producao"
    ],
    expiresAt: [
        "validade",
        "vencimento",
        "expire",
        "expiration",
        "expira"
    ],
    quantity: [
        "quantidade",
        "quantity",
        "qtd",
        "qtde",
        "etiquetas",
        "labels"
    ]
};
const removeAccents = (value)=>value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const normalizeText = (value)=>removeAccents(value).toLowerCase().trim();
const normalizeModelCategory = (value)=>{
    if (typeof value !== "string") {
        return null;
    }
    const normalized = normalizeText(value);
    if (normalized === "refeicao") {
        return "refeicao";
    }
    return MODEL_CATEGORIES.includes(normalized) ? normalized : null;
};
function inferTemplateCategory(template) {
    const explicit = normalizeModelCategory(template.category);
    if (explicit) {
        return explicit;
    }
    const normalizedName = normalizeText(template.name);
    const match = MODEL_CATEGORIES.find((category)=>MODEL_CATEGORY_CONFIG[category].keywords.some((keyword)=>normalizedName.includes(normalizeText(keyword)))) ?? "doces";
    return match;
}
const getCategoryDefinition = (category)=>MODEL_CATEGORY_CONFIG[category];
const formatDateInputLocal = (date)=>{
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
};
const addDaysToDateInput = (dateInput, days)=>{
    const base = new Date(`${dateInput}T00:00:00`);
    base.setDate(base.getDate() + days);
    return formatDateInputLocal(base);
};
const buildInitialQuickPrintForm = (category)=>{
    const manufacturedAt = formatDateInputLocal(new Date());
    return {
        productName: "",
        responsibleName: MODEL_CATEGORY_CONFIG[category].defaultResponsible,
        manufacturedAt,
        expiresAt: addDaysToDateInput(manufacturedAt, 2),
        quantity: 1
    };
};
const findMatchingFieldKey = (document, matcherKey)=>{
    const keywords = FIELD_MATCHERS[matcherKey];
    return document.dataSchema.find((field)=>{
        const haystack = normalizeText(`${field.key} ${field.label} ${field.description ?? ""}`);
        return keywords.some((keyword)=>haystack.includes(normalizeText(keyword)));
    })?.key;
};
function buildQuickPrintPayload(document, category, values) {
    const responsibleLabel = "Resp. Equipe:";
    const payload = {
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
        responsibleLabel,
        responsavelLabel: responsibleLabel,
        labelResponsavel: responsibleLabel,
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
    };
    Object.keys(mappedFieldValues).forEach((key)=>{
        const documentFieldKey = findMatchingFieldKey(document, key);
        if (documentFieldKey) {
            payload[documentFieldKey] = mappedFieldValues[key];
        }
    });
    return payload;
}
const getPreferredPrinterRoute = (printers, profiles)=>{
    const preferredPrinter = printers.find((printer)=>printer.isActive) ?? printers[0];
    const preferredProfile = profiles.find((profile)=>profile.printerId === preferredPrinter?.id) ?? profiles[0];
    return {
        printer: preferredPrinter,
        profile: preferredProfile
    };
};
}),
"[project]/apps/web/components/editor/properties.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorProperties",
    ()=>EditorProperties
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/barcode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-text.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$element$2d$movement$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/element-movement-bounds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/label-format-registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/template-library.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
function EditorProperties({ readOnly = false, canManageAssets = false, versions = [], approvals = [], onRollback, rollbackPending = false, onCreateVersion, createVersionPending = false }) {
    const { history, selectedElementId, patchElement, patchDocument, patchTemplate, patchMetadata, addTemplateDataField, patchTemplateDataField, removeTemplateDataField, duplicateSelectedElement, toggleSelectedLock, rotateSelectedElement, moveSelectedLayer, alignSelectedElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"])();
    const document = history.present;
    const selectedElement = document.elements.find((element)=>element.id === selectedElementId);
    const elementReadOnly = readOnly || selectedElement?.locked;
    const missingRequiredFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMissingRequiredFields"])(document);
    const selectedCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeModelCategory"])(document.metadata.category) ?? "doces";
    const metadataFormatId = typeof document.metadata.formatId === "string" ? document.metadata.formatId : undefined;
    const selectedLabelFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLabelFormatById"])(metadataFormatId) ?? (document.document.unit === "mm" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findLabelFormatByDimensions"])(document.document.width, document.document.height) : undefined);
    const selectedBarcodeValue = selectedElement?.type === "barcode" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeBarcodeText"])(selectedElement.format, selectedElement.value) : "";
    const selectedBarcodeValidation = selectedElement?.type === "barcode" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateBarcodeValue"])(selectedElement.format, selectedBarcodeValue) : undefined;
    const selectedBarcodeMinimumSize = selectedElement?.type === "barcode" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBarcodeMinimumSize"])(selectedElement.format) : undefined;
    const selectedBarcodeSizeWarning = selectedElement?.type === "barcode" && selectedBarcodeMinimumSize && (selectedElement.width < selectedBarcodeMinimumSize.widthMm || selectedElement.height < selectedBarcodeMinimumSize.heightMm) ? `Use pelo menos ${selectedBarcodeMinimumSize.widthMm} x ${selectedBarcodeMinimumSize.heightMm} mm para leitura confiavel.` : undefined;
    const selectedQrValidation = selectedElement?.type === "qrcode" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateQrCodeValue"])(selectedElement.value) : undefined;
    const patchSelectedElement = (patch)=>{
        if (!selectedElement) return;
        if (selectedElement.type === "text") {
            const textPatch = patch;
            const nextElement = {
                ...selectedElement,
                ...patch
            };
            const shouldReflowText = textPatch.text !== undefined || textPatch.width !== undefined || textPatch.fontSize !== undefined || textPatch.fontFamily !== undefined || textPatch.fontWeight !== undefined || textPatch.fontStyle !== undefined || textPatch.textDecoration !== undefined || textPatch.lineHeight !== undefined || textPatch.align !== undefined || textPatch.letterSpacing !== undefined || textPatch.wordSpacing !== undefined || textPatch.textIndent !== undefined || textPatch.paddingTop !== undefined || textPatch.paddingRight !== undefined || textPatch.paddingBottom !== undefined || textPatch.paddingLeft !== undefined || textPatch.wrapMode !== undefined || textPatch.overflowMode !== undefined;
            patchElement(selectedElement.id, {
                ...patch,
                ...!("height" in patch) && shouldReflowText ? {
                    height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["measureTextElementHeight"])(nextElement, nextElement.text, nextElement.width)
                } : {}
            });
            return;
        }
        patchElement(selectedElement.id, patch);
    };
    const handleNumericField = (key, value)=>{
        if (!selectedElement) return;
        const numericValue = Number(value);
        if (!Number.isFinite(numericValue)) {
            return;
        }
        const getMinimumElementSize = ()=>{
            if (selectedElement.type === "barcode") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBarcodeMinimumSize"])(selectedElement.format);
            }
            if (selectedElement.type === "qrcode") {
                return {
                    widthMm: 8,
                    heightMm: 8
                };
            }
            if (selectedElement.type === "line") {
                return {
                    widthMm: 4,
                    heightMm: Math.max(0.2, selectedElement.strokeWidth || 0.2)
                };
            }
            if (selectedElement.type === "image") {
                return {
                    widthMm: 3,
                    heightMm: 3
                };
            }
            return {
                widthMm: 4,
                heightMm: 4
            };
        };
        const minSize = getMinimumElementSize();
        const nextPatch = {};
        if (key === "x") {
            const boundedPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$element$2d$movement$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampElementPositionToDocument"])(numericValue, selectedElement.y, selectedElement, document.document.width, document.document.height);
            nextPatch.x = Number(boundedPosition.x.toFixed(3));
        } else if (key === "y") {
            const boundedPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$element$2d$movement$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampElementPositionToDocument"])(selectedElement.x, numericValue, selectedElement, document.document.width, document.document.height);
            nextPatch.y = Number(boundedPosition.y.toFixed(3));
        } else if (key === "width") {
            const boundedWidth = Math.min(Math.max(minSize.widthMm, numericValue), Math.max(minSize.widthMm, document.document.width - selectedElement.x));
            nextPatch.width = Number(boundedWidth.toFixed(3));
            const boundedPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$element$2d$movement$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampElementPositionToDocument"])(selectedElement.x, selectedElement.y, {
                width: nextPatch.width,
                height: selectedElement.height,
                rotation: selectedElement.rotation
            }, document.document.width, document.document.height);
            nextPatch.x = Number(boundedPosition.x.toFixed(3));
            nextPatch.y = Number(boundedPosition.y.toFixed(3));
        } else if (key === "height") {
            const boundedHeight = Math.min(Math.max(minSize.heightMm, numericValue), Math.max(minSize.heightMm, document.document.height - selectedElement.y));
            nextPatch.height = Number(boundedHeight.toFixed(3));
            const boundedPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$element$2d$movement$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampElementPositionToDocument"])(selectedElement.x, selectedElement.y, {
                width: selectedElement.width,
                height: nextPatch.height,
                rotation: selectedElement.rotation
            }, document.document.width, document.document.height);
            nextPatch.x = Number(boundedPosition.x.toFixed(3));
            nextPatch.y = Number(boundedPosition.y.toFixed(3));
        } else {
            nextPatch[key] = numericValue;
        }
        patchSelectedElement(nextPatch);
    };
    const syncDocumentFormatMetadata = (nextWidth, nextHeight, nextUnit)=>{
        const inferredFormat = nextUnit === "mm" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findLabelFormatByDimensions"])(nextWidth, nextHeight) : undefined;
        patchMetadata({
            formatId: inferredFormat?.id
        });
    };
    const handleDocumentWidthChange = (value)=>{
        const nextWidth = Number(value);
        patchDocument({
            width: nextWidth
        });
        syncDocumentFormatMetadata(nextWidth, document.document.height, document.document.unit);
    };
    const handleDocumentHeightChange = (value)=>{
        const nextHeight = Number(value);
        patchDocument({
            height: nextHeight
        });
        syncDocumentFormatMetadata(document.document.width, nextHeight, document.document.unit);
    };
    const handleDocumentUnitChange = (value)=>{
        const nextUnit = value;
        patchDocument({
            unit: nextUnit
        });
        syncDocumentFormatMetadata(document.document.width, document.document.height, nextUnit);
    };
    const handleLabelFormatChange = (value)=>{
        const nextFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLabelFormatById"])(value);
        if (!nextFormat) {
            syncDocumentFormatMetadata(document.document.width, document.document.height, document.document.unit);
            return;
        }
        const nextOrientation = nextFormat.widthMm === nextFormat.heightMm ? document.document.orientation : nextFormat.widthMm > nextFormat.heightMm ? "landscape" : "portrait";
        patchDocument({
            width: nextFormat.widthMm,
            height: nextFormat.heightMm,
            unit: "mm",
            orientation: nextOrientation
        });
        patchMetadata({
            formatId: nextFormat.id
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "editor-sidebar editor-sidebar--inspector",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "editor-sidebar__header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "muted",
                        style: {
                            fontSize: 12,
                            marginBottom: 8
                        },
                        children: "Propriedades"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: selectedElement ? selectedElement.name : "Documento"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/editor/properties.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "editor-sidebar__body",
                style: {
                    display: "grid",
                    gap: 18,
                    alignContent: "start"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel",
                        style: {
                            padding: 16,
                            borderRadius: 18,
                            boxShadow: "none"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gap: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Etiqueta / formato oficial"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 312,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedLabelFormat?.id ?? "",
                                            disabled: readOnly,
                                            onChange: (event)=>handleLabelFormatChange(event.target.value),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Tamanho manual"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 15
                                                }, this),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LABEL_FORMAT_CATEGORIES"].map((category)=>{
                                                    const formats = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LABEL_FORMATS"].filter((format)=>format.category === category.id);
                                                    if (formats.length === 0) return null;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("optgroup", {
                                                        label: category.label,
                                                        children: formats.map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: format.id,
                                                                children: [
                                                                    format.name,
                                                                    " (",
                                                                    format.widthMm,
                                                                    " x ",
                                                                    format.heightMm,
                                                                    " mm)"
                                                                ]
                                                            }, format.id, true, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, category.id, false, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 19
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 315,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 311,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: 12,
                                        borderRadius: 14,
                                        background: "rgba(15, 118, 110, 0.08)",
                                        border: "1px solid rgba(15, 118, 110, 0.12)",
                                        fontSize: 13,
                                        color: "var(--text)"
                                    },
                                    children: selectedLabelFormat ? `Etiqueta ativa: ${selectedLabelFormat.name}. Ao escolher um formato oficial, o editor aplica largura, altura e orientacao automaticamente.` : "Este documento esta em tamanho manual. Escolha uma etiqueta oficial para padronizar medidas e orientacao no editor."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 337,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Nome do template"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 352,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: document.name,
                                            disabled: readOnly,
                                            onChange: (event)=>patchTemplate({
                                                    name: event.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 355,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 351,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Largura"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 362,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: document.document.width,
                                            type: "number",
                                            disabled: readOnly,
                                            onChange: (event)=>handleDocumentWidthChange(event.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 365,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 361,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Altura"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 373,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: document.document.height,
                                            type: "number",
                                            disabled: readOnly,
                                            onChange: (event)=>handleDocumentHeightChange(event.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 376,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 372,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Unidade"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 384,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: document.document.unit,
                                            disabled: readOnly,
                                            onChange: (event)=>handleDocumentUnitChange(event.target.value),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "mm",
                                                    children: "mm"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 392,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "cm",
                                                    children: "cm"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "in",
                                                    children: "in"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "px",
                                                    children: "px"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 387,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 383,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 399,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: document.status,
                                            disabled: true,
                                            onChange: ()=>undefined,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "draft",
                                                    children: "draft"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "in_review",
                                                    children: "in_review"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "approved",
                                                    children: "approved"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "published",
                                                    children: "published"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "archived",
                                                    children: "archived"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 402,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 398,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Categoria do modelo"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 415,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedCategory,
                                            disabled: readOnly,
                                            onChange: (event)=>patchMetadata({
                                                    category: event.target.value
                                                }),
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MODEL_CATEGORIES"].map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: category,
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryDefinition"])(category).label
                                                }, category, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 426,
                                                    columnNumber: 17
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 418,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 414,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: 12,
                                        borderRadius: 14,
                                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryDefinition"])(selectedCategory).soft,
                                        color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryDefinition"])(selectedCategory).accent,
                                        fontSize: 13,
                                        fontWeight: 600
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryDefinition"])(selectedCategory).description
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 432,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                            lineNumber: 310,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                        lineNumber: 309,
                        columnNumber: 7
                    }, this),
                    !selectedElement ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "panel",
                                style: {
                                    padding: 16,
                                    borderRadius: 18,
                                    boxShadow: "none"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "muted",
                                                            style: {
                                                                fontSize: 12,
                                                                marginBottom: 6
                                                            },
                                                            children: "Campos dinamicos"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 453,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Data schema"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: readOnly,
                                                    onClick: ()=>addTemplateDataField(),
                                                    children: "Novo campo"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 451,
                                            columnNumber: 15
                                        }, this),
                                        missingRequiredFields.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "grid",
                                                gap: 6,
                                                padding: 12,
                                                borderRadius: 14,
                                                background: "rgba(245, 158, 11, 0.08)",
                                                border: "1px solid rgba(245, 158, 11, 0.18)"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        fontSize: 13
                                                    },
                                                    children: "Campos obrigatorios sem preview completo"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 474,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12
                                                    },
                                                    children: missingRequiredFields.map((field)=>field.label).join(", ")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 464,
                                            columnNumber: 17
                                        }, this) : null,
                                        document.dataSchema.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 13
                                            },
                                            children: "Nenhum campo dinamico configurado ainda."
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 482,
                                            columnNumber: 17
                                        }, this) : null,
                                        document.dataSchema.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "grid",
                                                    gap: 10,
                                                    padding: 12,
                                                    borderRadius: 14,
                                                    border: "1px solid var(--line)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            gap: 10
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: field.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 499,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                disabled: readOnly,
                                                                onClick: ()=>removeTemplateDataField(field.key),
                                                                children: "Remover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 500,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 498,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "muted",
                                                                style: {
                                                                    fontSize: 12,
                                                                    marginBottom: 6
                                                                },
                                                                children: "Chave"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: field.key,
                                                                disabled: readOnly,
                                                                onChange: (event)=>patchTemplateDataField(field.key, {
                                                                        key: event.target.value.trim() || field.key
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "muted",
                                                                style: {
                                                                    fontSize: 12,
                                                                    marginBottom: 6
                                                                },
                                                                children: "Rotulo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 517,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: field.label,
                                                                disabled: readOnly,
                                                                onChange: (event)=>patchTemplateDataField(field.key, {
                                                                        label: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 520,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "muted",
                                                                style: {
                                                                    fontSize: 12,
                                                                    marginBottom: 6
                                                                },
                                                                children: "Descricao"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: field.description ?? "",
                                                                disabled: readOnly,
                                                                onChange: (event)=>patchTemplateDataField(field.key, {
                                                                        description: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 532,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "grid",
                                                            gridTemplateColumns: "1fr 1fr",
                                                            gap: 10
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "muted",
                                                                        style: {
                                                                            fontSize: 12,
                                                                            marginBottom: 6
                                                                        },
                                                                        children: "Tipo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                        lineNumber: 542,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: field.type,
                                                                        disabled: readOnly,
                                                                        onChange: (event)=>patchTemplateDataField(field.key, {
                                                                                type: event.target.value
                                                                            }),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "text",
                                                                                children: "text"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                lineNumber: 554,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "number",
                                                                                children: "number"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                lineNumber: 555,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "date",
                                                                                children: "date"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                lineNumber: 556,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "boolean",
                                                                                children: "boolean"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                lineNumber: 557,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                        lineNumber: 545,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 541,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "muted",
                                                                        style: {
                                                                            fontSize: 12,
                                                                            marginBottom: 6
                                                                        },
                                                                        children: "Formato"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                        lineNumber: 561,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: field.formatType ?? "text",
                                                                        disabled: readOnly,
                                                                        onChange: (event)=>patchTemplateDataField(field.key, {
                                                                                formatType: event.target.value
                                                                            }),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "text",
                                                                                children: "text"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                lineNumber: 573,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "date",
                                                                                children: "date"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                lineNumber: 574,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "currency",
                                                                                children: "currency"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                lineNumber: 575,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "uppercase",
                                                                                children: "uppercase"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                lineNumber: 576,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "lowercase",
                                                                                children: "lowercase"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                lineNumber: 577,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                        lineNumber: 564,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 560,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "grid",
                                                            gridTemplateColumns: "1fr 1fr",
                                                            gap: 10
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "muted",
                                                                        style: {
                                                                            fontSize: 12,
                                                                            marginBottom: 6
                                                                        },
                                                                        children: "Exemplo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                        lineNumber: 583,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: field.sampleValue === undefined ? "" : String(field.sampleValue),
                                                                        disabled: readOnly,
                                                                        onChange: (event)=>patchTemplateDataField(field.key, {
                                                                                sampleValue: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                        lineNumber: 586,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "muted",
                                                                        style: {
                                                                            fontSize: 12,
                                                                            marginBottom: 6
                                                                        },
                                                                        children: "Fallback"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                        lineNumber: 595,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: field.fallbackValue ?? "",
                                                                        disabled: readOnly,
                                                                        onChange: (event)=>patchTemplateDataField(field.key, {
                                                                                fallbackValue: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                        lineNumber: 598,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 594,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 581,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            display: "flex",
                                                            gap: 8,
                                                            alignItems: "center"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: field.required,
                                                                disabled: readOnly,
                                                                onChange: (event)=>patchTemplateDataField(field.key, {
                                                                        required: event.target.checked
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 608,
                                                                columnNumber: 21
                                                            }, this),
                                                            "Obrigatorio no preview"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, field.key, true, {
                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                lineNumber: 488,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                lineNumber: 449,
                                columnNumber: 11
                            }, this),
                            versions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "panel",
                                style: {
                                    padding: 16,
                                    borderRadius: 18,
                                    boxShadow: "none"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "muted",
                                                            style: {
                                                                fontSize: 12,
                                                                marginBottom: 6
                                                            },
                                                            children: "Historico de versoes"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 628,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Versoes recentes"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 627,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: readOnly || createVersionPending || !onCreateVersion,
                                                    onClick: ()=>onCreateVersion?.(),
                                                    children: "Nova versao"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 633,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 626,
                                            columnNumber: 17
                                        }, this),
                                        versions.slice(0, 6).map((version)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "grid",
                                                    gap: 8,
                                                    padding: 12,
                                                    borderRadius: 14,
                                                    border: "1px solid var(--line)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            gap: 10
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    "v",
                                                                    version.version
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 650,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "muted",
                                                                style: {
                                                                    fontSize: 12
                                                                },
                                                                children: version.status.toLowerCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 651,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "muted",
                                                        style: {
                                                            fontSize: 12
                                                        },
                                                        children: new Date(version.createdAt).toLocaleString("pt-BR")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 655,
                                                        columnNumber: 21
                                                    }, this),
                                                    version.notes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "muted",
                                                        style: {
                                                            fontSize: 12
                                                        },
                                                        children: version.notes
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 659,
                                                        columnNumber: 23
                                                    }, this) : null,
                                                    version.compareSummary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "muted",
                                                        style: {
                                                            fontSize: 12
                                                        },
                                                        children: [
                                                            "delta elementos ",
                                                            version.compareSummary.elementsDelta >= 0 ? "+" : "",
                                                            version.compareSummary.elementsDelta,
                                                            " | delta campos",
                                                            " ",
                                                            version.compareSummary.dataFieldsDelta >= 0 ? "+" : "",
                                                            version.compareSummary.dataFieldsDelta,
                                                            version.compareSummary.sizeChanged ? " | tamanho alterado" : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 23
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            disabled: readOnly || rollbackPending || !onRollback,
                                                            onClick: ()=>onRollback?.(version.version),
                                                            children: "Restaurar esta versao"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 673,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 672,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, version.id, true, {
                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                lineNumber: 639,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 625,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                lineNumber: 624,
                                columnNumber: 13
                            }, this) : null,
                            approvals.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "panel",
                                style: {
                                    padding: 16,
                                    borderRadius: 18,
                                    boxShadow: "none"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12,
                                                        marginBottom: 6
                                                    },
                                                    children: "Governanca"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Aprovacoes recentes"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 693,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 689,
                                            columnNumber: 17
                                        }, this),
                                        approvals.slice(0, 5).map((approval)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "grid",
                                                    gap: 8,
                                                    padding: 12,
                                                    borderRadius: 14,
                                                    border: "1px solid var(--line)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            gap: 10
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: approval.status.toLowerCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 708,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "muted",
                                                                style: {
                                                                    fontSize: 12
                                                                },
                                                                children: new Date(approval.requestedAt).toLocaleString("pt-BR")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 709,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 707,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "muted",
                                                        style: {
                                                            fontSize: 12
                                                        },
                                                        children: [
                                                            "solicitado por ",
                                                            approval.requestedBy?.name ?? "usuario"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 713,
                                                        columnNumber: 21
                                                    }, this),
                                                    approval.requestNotes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "muted",
                                                        style: {
                                                            fontSize: 12
                                                        },
                                                        children: approval.requestNotes
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 717,
                                                        columnNumber: 23
                                                    }, this) : null,
                                                    approval.decisionNotes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "muted",
                                                        style: {
                                                            fontSize: 12
                                                        },
                                                        children: [
                                                            "decisao: ",
                                                            approval.decisionNotes
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 722,
                                                        columnNumber: 23
                                                    }, this) : null,
                                                    approval.signatures?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "muted",
                                                        style: {
                                                            fontSize: 12
                                                        },
                                                        children: [
                                                            "assinatura: ",
                                                            approval.signatures[0]?.action
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                        lineNumber: 727,
                                                        columnNumber: 23
                                                    }, this) : null
                                                ]
                                            }, approval.id, true, {
                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                lineNumber: 697,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 688,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                lineNumber: 687,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true) : null,
                    selectedElement ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel",
                        style: {
                            padding: 16,
                            borderRadius: 18,
                            boxShadow: "none"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gap: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gap: 8,
                                        padding: 12,
                                        borderRadius: 14,
                                        background: "rgba(15,23,42,0.03)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12
                                            },
                                            children: "Acoes rapidas"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 751,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 8,
                                                flexWrap: "wrap"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: readOnly,
                                                    onClick: ()=>duplicateSelectedElement(),
                                                    children: "Duplicar"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 755,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: readOnly,
                                                    onClick: ()=>toggleSelectedLock(),
                                                    children: selectedElement.locked ? "Desbloquear" : "Bloquear"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 758,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 754,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 8,
                                                flexWrap: "wrap"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>moveSelectedLayer("backward"),
                                                    children: "Camada -"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 763,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>moveSelectedLayer("forward"),
                                                    children: "Camada +"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 766,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>moveSelectedLayer("back"),
                                                    children: "Para tras"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 769,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>moveSelectedLayer("front"),
                                                    children: "Para frente"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 772,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 762,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 742,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Posicao X"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 779,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: selectedElement.x,
                                            type: "number",
                                            step: 0.1,
                                            disabled: elementReadOnly,
                                            onChange: (event)=>handleNumericField("x", event.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 782,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 778,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Posicao Y"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 791,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: selectedElement.y,
                                            type: "number",
                                            step: 0.1,
                                            disabled: elementReadOnly,
                                            onChange: (event)=>handleNumericField("y", event.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 794,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 790,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Largura"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 803,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: selectedElement.width,
                                            type: "number",
                                            step: 0.1,
                                            min: 0,
                                            disabled: elementReadOnly,
                                            onChange: (event)=>handleNumericField("width", event.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 806,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 802,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Altura"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 816,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: selectedElement.height,
                                            type: "number",
                                            step: 0.1,
                                            min: 0,
                                            disabled: elementReadOnly,
                                            onChange: (event)=>handleNumericField("height", event.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 819,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 815,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Rotacao"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 829,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "grid",
                                                gridTemplateColumns: "44px 1fr 44px",
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>rotateSelectedElement(-15),
                                                    children: "-15"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 833,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: selectedElement.rotation,
                                                    type: "number",
                                                    disabled: elementReadOnly,
                                                    onChange: (event)=>patchElement(selectedElement.id, {
                                                            rotation: Number(event.target.value)
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 836,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>rotateSelectedElement(15),
                                                    children: "+15"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 847,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 832,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 828,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gap: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12
                                            },
                                            children: "Alinhamento no canvas"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 853,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 8,
                                                flexWrap: "wrap"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>alignSelectedElement("left"),
                                                    children: "Esq"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 857,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>alignSelectedElement("center"),
                                                    children: "Centro H"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>alignSelectedElement("right"),
                                                    children: "Dir"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 863,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>alignSelectedElement("top"),
                                                    children: "Topo"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 866,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>alignSelectedElement("middle"),
                                                    children: "Centro V"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 869,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>alignSelectedElement("bottom"),
                                                    children: "Base"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 872,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 856,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 852,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: selectedElement.visible,
                                            disabled: elementReadOnly,
                                            onChange: (event)=>patchSelectedElement({
                                                    visible: event.target.checked
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 878,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Visivel"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 886,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 877,
                                    columnNumber: 13
                                }, this),
                                selectedElement.type === "text" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12,
                                                        marginBottom: 6
                                                    },
                                                    children: "Conteudo"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 892,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: selectedElement.text,
                                                    rows: 4,
                                                    disabled: elementReadOnly,
                                                    onChange: (event)=>patchSelectedElement({
                                                            text: event.target.value
                                                        }),
                                                    style: {
                                                        minHeight: 108
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 895,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 891,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            style: {
                                                display: "grid",
                                                gap: 12,
                                                padding: 12,
                                                borderRadius: 14,
                                                background: "rgba(15,23,42,0.03)"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12
                                                    },
                                                    children: "Tipografia basica"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 914,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "muted",
                                                            style: {
                                                                fontSize: 12,
                                                                marginBottom: 6
                                                            },
                                                            children: "Fonte"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 919,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedElement.fontFamily,
                                                            disabled: elementReadOnly,
                                                            onChange: (event)=>patchSelectedElement({
                                                                    fontFamily: event.target.value
                                                                }),
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEXT_FONT_OPTIONS"].map((font)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: font.value,
                                                                    children: font.label
                                                                }, font.value, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 930,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 922,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 918,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "grid",
                                                        gridTemplateColumns: "1fr 1fr 1fr",
                                                        gap: 10
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "muted",
                                                                    style: {
                                                                        fontSize: 12,
                                                                        marginBottom: 6
                                                                    },
                                                                    children: "Tamanho (pt)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 939,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    min: 6,
                                                                    max: 96,
                                                                    value: selectedElement.fontSize,
                                                                    disabled: elementReadOnly,
                                                                    onChange: (event)=>patchSelectedElement({
                                                                            fontSize: Number(event.target.value)
                                                                        })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 942,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 938,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "muted",
                                                                    style: {
                                                                        fontSize: 12,
                                                                        marginBottom: 6
                                                                    },
                                                                    children: "Entrelinhamento"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 954,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    min: 0.8,
                                                                    max: 2.4,
                                                                    step: 0.05,
                                                                    value: selectedElement.lineHeight,
                                                                    disabled: elementReadOnly,
                                                                    onChange: (event)=>patchSelectedElement({
                                                                            lineHeight: Number(event.target.value)
                                                                        })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 957,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 953,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "muted",
                                                                    style: {
                                                                        fontSize: 12,
                                                                        marginBottom: 6
                                                                    },
                                                                    children: "Cor"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 970,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "color",
                                                                    value: selectedElement.color,
                                                                    disabled: elementReadOnly,
                                                                    onChange: (event)=>patchSelectedElement({
                                                                            color: event.target.value
                                                                        }),
                                                                    style: {
                                                                        minHeight: 44,
                                                                        padding: 6
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 973,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 969,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 937,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "grid",
                                                        gridTemplateColumns: "repeat(3, 1fr)",
                                                        gap: 8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            disabled: elementReadOnly,
                                                            onClick: ()=>patchSelectedElement({
                                                                    fontWeight: selectedElement.fontWeight >= 700 ? 500 : 700
                                                                }),
                                                            style: {
                                                                fontWeight: 700,
                                                                background: selectedElement.fontWeight >= 700 ? "var(--primary-soft)" : "#ffffff"
                                                            },
                                                            children: "B"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 986,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            disabled: elementReadOnly,
                                                            onClick: ()=>patchSelectedElement({
                                                                    fontStyle: selectedElement.fontStyle === "italic" ? "normal" : "italic"
                                                                }),
                                                            style: {
                                                                fontStyle: "italic",
                                                                background: selectedElement.fontStyle === "italic" ? "var(--primary-soft)" : "#ffffff"
                                                            },
                                                            children: "I"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1002,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            disabled: elementReadOnly,
                                                            onClick: ()=>patchSelectedElement({
                                                                    textDecoration: selectedElement.textDecoration === "underline" ? "none" : "underline"
                                                                }),
                                                            style: {
                                                                textDecoration: "underline",
                                                                background: selectedElement.textDecoration === "underline" ? "var(--primary-soft)" : "#ffffff"
                                                            },
                                                            children: "U"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1018,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 985,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "grid",
                                                        gridTemplateColumns: "repeat(4, 1fr)",
                                                        gap: 8
                                                    },
                                                    children: [
                                                        {
                                                            value: "left",
                                                            label: "Esq"
                                                        },
                                                        {
                                                            value: "center",
                                                            label: "Centro"
                                                        },
                                                        {
                                                            value: "right",
                                                            label: "Dir"
                                                        },
                                                        {
                                                            value: "justify",
                                                            label: "Just"
                                                        }
                                                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            disabled: elementReadOnly,
                                                            onClick: ()=>patchSelectedElement({
                                                                    align: item.value
                                                                }),
                                                            style: {
                                                                background: selectedElement.align === item.value ? "var(--primary-soft)" : "#ffffff"
                                                            },
                                                            children: item.label
                                                        }, item.value, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1046,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1039,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                                    style: {
                                                        border: "1px solid var(--line)",
                                                        borderRadius: 12,
                                                        background: "#ffffff",
                                                        padding: 10
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                                            style: {
                                                                cursor: "pointer",
                                                                fontWeight: 600
                                                            },
                                                            children: "Tipografia avancada"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1071,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "grid",
                                                                gap: 12,
                                                                marginTop: 12
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "grid",
                                                                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                                                        gap: 10
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "muted",
                                                                                    style: {
                                                                                        fontSize: 12,
                                                                                        marginBottom: 6
                                                                                    },
                                                                                    children: "Espaco entre letras (pt)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1084,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    step: 0.1,
                                                                                    value: selectedElement.letterSpacing ?? 0,
                                                                                    disabled: elementReadOnly,
                                                                                    onChange: (event)=>patchSelectedElement({
                                                                                            letterSpacing: Number(event.target.value)
                                                                                        })
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1087,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                            lineNumber: 1083,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "muted",
                                                                                    style: {
                                                                                        fontSize: 12,
                                                                                        marginBottom: 6
                                                                                    },
                                                                                    children: "Espaco entre palavras (pt)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1101,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    step: 0.1,
                                                                                    value: selectedElement.wordSpacing ?? 0,
                                                                                    disabled: elementReadOnly,
                                                                                    onChange: (event)=>patchSelectedElement({
                                                                                            wordSpacing: Number(event.target.value)
                                                                                        })
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1104,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                            lineNumber: 1100,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "muted",
                                                                                    style: {
                                                                                        fontSize: 12,
                                                                                        marginBottom: 6
                                                                                    },
                                                                                    children: "Recuo da primeira linha (mm)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1118,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    step: 0.1,
                                                                                    value: selectedElement.textIndent ?? 0,
                                                                                    disabled: elementReadOnly,
                                                                                    onChange: (event)=>patchSelectedElement({
                                                                                            textIndent: Number(event.target.value)
                                                                                        })
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1121,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                            lineNumber: 1117,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "muted",
                                                                                    style: {
                                                                                        fontSize: 12,
                                                                                        marginBottom: 6
                                                                                    },
                                                                                    children: "Quebra de linha"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1135,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                    value: selectedElement.wrapMode ?? "wrap",
                                                                                    disabled: elementReadOnly,
                                                                                    onChange: (event)=>patchSelectedElement({
                                                                                            wrapMode: event.target.value
                                                                                        }),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "wrap",
                                                                                            children: "Quebrar linhas"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1147,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "nowrap",
                                                                                            children: "Manter em linha unica"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1148,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1138,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                            lineNumber: 1134,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "muted",
                                                                                    style: {
                                                                                        fontSize: 12,
                                                                                        marginBottom: 6
                                                                                    },
                                                                                    children: "Overflow do bloco"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1153,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                    value: selectedElement.overflowMode ?? "hidden",
                                                                                    disabled: elementReadOnly,
                                                                                    onChange: (event)=>patchSelectedElement({
                                                                                            overflowMode: event.target.value
                                                                                        }),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "hidden",
                                                                                            children: "Cortar no bloco"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1165,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "visible",
                                                                                            children: "Permitir exceder"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1166,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1156,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                            lineNumber: 1152,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 1076,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "grid",
                                                                        gap: 8
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "muted",
                                                                            style: {
                                                                                fontSize: 12
                                                                            },
                                                                            children: "Padding interno do texto (mm)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                            lineNumber: 1172,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: "grid",
                                                                                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                                                                                gap: 10
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "muted",
                                                                                            style: {
                                                                                                fontSize: 12,
                                                                                                marginBottom: 6
                                                                                            },
                                                                                            children: "Topo"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1183,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "number",
                                                                                            step: 0.1,
                                                                                            min: 0,
                                                                                            value: selectedElement.paddingTop ?? 0,
                                                                                            disabled: elementReadOnly,
                                                                                            onChange: (event)=>patchSelectedElement({
                                                                                                    paddingTop: Number(event.target.value)
                                                                                                })
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1186,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1182,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "muted",
                                                                                            style: {
                                                                                                fontSize: 12,
                                                                                                marginBottom: 6
                                                                                            },
                                                                                            children: "Direita"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1200,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "number",
                                                                                            step: 0.1,
                                                                                            min: 0,
                                                                                            value: selectedElement.paddingRight ?? 0,
                                                                                            disabled: elementReadOnly,
                                                                                            onChange: (event)=>patchSelectedElement({
                                                                                                    paddingRight: Number(event.target.value)
                                                                                                })
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1203,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1199,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "muted",
                                                                                            style: {
                                                                                                fontSize: 12,
                                                                                                marginBottom: 6
                                                                                            },
                                                                                            children: "Base"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1217,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "number",
                                                                                            step: 0.1,
                                                                                            min: 0,
                                                                                            value: selectedElement.paddingBottom ?? 0,
                                                                                            disabled: elementReadOnly,
                                                                                            onChange: (event)=>patchSelectedElement({
                                                                                                    paddingBottom: Number(event.target.value)
                                                                                                })
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1220,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1216,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "muted",
                                                                                            style: {
                                                                                                fontSize: 12,
                                                                                                marginBottom: 6
                                                                                            },
                                                                                            children: "Esquerda"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1234,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "number",
                                                                                            step: 0.1,
                                                                                            min: 0,
                                                                                            value: selectedElement.paddingLeft ?? 0,
                                                                                            disabled: elementReadOnly,
                                                                                            onChange: (event)=>patchSelectedElement({
                                                                                                    paddingLeft: Number(event.target.value)
                                                                                                })
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                            lineNumber: 1237,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                                    lineNumber: 1233,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                            lineNumber: 1175,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 1171,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1075,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1063,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: elementReadOnly,
                                                    onClick: ()=>patchSelectedElement({
                                                            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["measureTextElementHeight"])(selectedElement, selectedElement.text, selectedElement.width)
                                                        }),
                                                    children: "Ajustar caixa ao conteudo"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1255,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 905,
                                            columnNumber: 17
                                        }, this),
                                        selectedElement.contentMode === "dynamic" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "muted",
                                                            style: {
                                                                fontSize: 12,
                                                                marginBottom: 6
                                                            },
                                                            children: "Binding"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1274,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedElement.bindingKey ?? "",
                                                            disabled: elementReadOnly,
                                                            onChange: (event)=>patchSelectedElement({
                                                                    bindingKey: event.target.value || undefined,
                                                                    text: event.target.value ? `{{${event.target.value}}}` : selectedElement.text
                                                                }),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Selecione um campo"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 1289,
                                                                    columnNumber: 25
                                                                }, this),
                                                                document.dataSchema.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: field.key,
                                                                        children: [
                                                                            field.label,
                                                                            " (",
                                                                            field.key,
                                                                            ")"
                                                                        ]
                                                                    }, field.key, true, {
                                                                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                        lineNumber: 1291,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1277,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1273,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "muted",
                                                            style: {
                                                                fontSize: 12,
                                                                marginBottom: 6
                                                            },
                                                            children: "Placeholder"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1298,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: selectedElement.placeholder ?? "",
                                                            disabled: elementReadOnly,
                                                            onChange: (event)=>patchSelectedElement({
                                                                    placeholder: event.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1301,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1297,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true) : null
                                    ]
                                }, void 0, true) : null,
                                selectedElement.type === "barcode" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12,
                                                        marginBottom: 6
                                                    },
                                                    children: "Valor"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1317,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: selectedElement.value,
                                                    disabled: elementReadOnly,
                                                    onChange: (event)=>patchElement(selectedElement.id, {
                                                            value: event.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1316,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12,
                                                        marginBottom: 6
                                                    },
                                                    children: "Formato"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1332,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: selectedElement.format,
                                                    disabled: elementReadOnly,
                                                    onChange: (event)=>patchElement(selectedElement.id, {
                                                            format: event.target.value
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "CODE128",
                                                            children: "CODE128"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1345,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "EAN13",
                                                            children: "EAN13"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1346,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "EAN8",
                                                            children: "EAN8"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1347,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1335,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1331,
                                            columnNumber: 17
                                        }, this),
                                        selectedBarcodeValidation && !selectedBarcodeValidation.valid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: 10,
                                                borderRadius: 12,
                                                border: "1px solid rgba(185, 28, 28, 0.22)",
                                                background: "rgba(254, 242, 242, 0.92)",
                                                color: "#991b1b",
                                                fontSize: 12,
                                                fontWeight: 700
                                            },
                                            children: selectedBarcodeValidation.message
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1351,
                                            columnNumber: 19
                                        }, this) : null,
                                        selectedBarcodeSizeWarning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: 10,
                                                borderRadius: 12,
                                                border: "1px solid rgba(217, 119, 6, 0.22)",
                                                background: "rgba(255, 251, 235, 0.92)",
                                                color: "#92400e",
                                                fontSize: 12,
                                                fontWeight: 700
                                            },
                                            children: selectedBarcodeSizeWarning
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1366,
                                            columnNumber: 19
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12,
                                                        marginBottom: 6
                                                    },
                                                    children: "Binding"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1381,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: selectedElement.bindingKey ?? "",
                                                    disabled: elementReadOnly,
                                                    onChange: (event)=>patchElement(selectedElement.id, {
                                                            bindingKey: event.target.value || undefined
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Valor fixo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1396,
                                                            columnNumber: 21
                                                        }, this),
                                                        document.dataSchema.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: field.key,
                                                                children: [
                                                                    field.label,
                                                                    " (",
                                                                    field.key,
                                                                    ")"
                                                                ]
                                                            }, field.key, true, {
                                                                fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                lineNumber: 1398,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1384,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1380,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : null,
                                selectedElement.type === "qrcode" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12,
                                                        marginBottom: 6
                                                    },
                                                    children: "Valor"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1410,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: selectedElement.value,
                                                    disabled: elementReadOnly,
                                                    onChange: (event)=>patchElement(selectedElement.id, {
                                                            value: event.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1413,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1409,
                                            columnNumber: 17
                                        }, this),
                                        selectedQrValidation && !selectedQrValidation.valid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: 10,
                                                borderRadius: 12,
                                                border: "1px solid rgba(185, 28, 28, 0.22)",
                                                background: "rgba(254, 242, 242, 0.92)",
                                                color: "#991b1b",
                                                fontSize: 12,
                                                fontWeight: 700
                                            },
                                            children: selectedQrValidation.message
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1425,
                                            columnNumber: 19
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12,
                                                        marginBottom: 6
                                                    },
                                                    children: "Correcao"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1440,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: selectedElement.errorCorrection,
                                                    disabled: elementReadOnly,
                                                    onChange: (event)=>patchElement(selectedElement.id, {
                                                            errorCorrection: event.target.value
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "L",
                                                            children: "L"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1453,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "M",
                                                            children: "M"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1454,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Q",
                                                            children: "Q"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1455,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "H",
                                                            children: "H"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1456,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1443,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1439,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : null,
                                selectedElement.type === "shape" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12,
                                                marginBottom: 6
                                            },
                                            children: "Borda"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1464,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: selectedElement.stroke,
                                            disabled: elementReadOnly,
                                            onChange: (event)=>patchElement(selectedElement.id, {
                                                    stroke: event.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1467,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 1463,
                                    columnNumber: 15
                                }, this) : null,
                                selectedElement.type === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    style: {
                                        display: "grid",
                                        gap: 12,
                                        padding: 12,
                                        borderRadius: 14,
                                        background: "rgba(15,23,42,0.03)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "muted",
                                            style: {
                                                fontSize: 12
                                            },
                                            children: "Imagem"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1487,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                gap: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "muted",
                                                            style: {
                                                                fontSize: 12,
                                                                marginBottom: 6
                                                            },
                                                            children: "Opacidade"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1493,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: 0,
                                                            max: 1,
                                                            step: 0.05,
                                                            value: selectedElement.opacity,
                                                            disabled: elementReadOnly,
                                                            onChange: (event)=>patchSelectedElement({
                                                                    opacity: Math.min(1, Math.max(0, Number(event.target.value)))
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1496,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1492,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "muted",
                                                            style: {
                                                                fontSize: 12,
                                                                marginBottom: 6
                                                            },
                                                            children: "Ajuste"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1512,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedElement.objectFit ?? (selectedElement.fit === "stretch" ? "fill" : selectedElement.fit),
                                                            disabled: elementReadOnly,
                                                            onChange: (event)=>{
                                                                const objectFit = event.target.value;
                                                                patchSelectedElement({
                                                                    objectFit,
                                                                    fit: objectFit === "fill" ? "stretch" : objectFit
                                                                });
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "contain",
                                                                    children: "Contain"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 1526,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "cover",
                                                                    children: "Cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 1527,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "fill",
                                                                    children: "Fill"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                                    lineNumber: 1528,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                            lineNumber: 1515,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1511,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1491,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: selectedElement.maintainAspectRatio ?? true,
                                                    disabled: elementReadOnly,
                                                    onChange: (event)=>patchSelectedElement({
                                                            maintainAspectRatio: event.target.checked
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1534,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Manter proporcao ao redimensionar pelos cantos"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1544,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1533,
                                            columnNumber: 17
                                        }, this),
                                        canManageAssets && !readOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    style: {
                                                        fontSize: 12,
                                                        marginBottom: 6
                                                    },
                                                    children: "Upload"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1549,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    accept: "image/*",
                                                    disabled: elementReadOnly,
                                                    onChange: async (event)=>{
                                                        const file = event.target.files?.[0];
                                                        const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadStoredSession"])();
                                                        if (!file || !session) return;
                                                        const uploaded = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadAsset"])(file, session);
                                                        patchElement(selectedElement.id, {
                                                            assetId: uploaded.id,
                                                            src: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}${uploaded.url}`
                                                        });
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                                    lineNumber: 1552,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                                            lineNumber: 1548,
                                            columnNumber: 19
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/properties.tsx",
                                    lineNumber: 1478,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/editor/properties.tsx",
                            lineNumber: 741,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/properties.tsx",
                        lineNumber: 740,
                        columnNumber: 9
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/editor/properties.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/editor/properties.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/editor/status-bar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorStatusBar",
    ()=>EditorStatusBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Box/Box.mjs [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Button/Button.mjs [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Chip/Chip.mjs [app-ssr] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Stack/Stack.mjs [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Typography/Typography.mjs [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function EditorStatusBar() {
    const { history, selectedElementId, zoom, setZoom, unit, statusMessage, savingState, gridEnabled, toggleGrid } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"])();
    const selectedElement = history.present.elements.find((element)=>element.id === selectedElementId);
    const savingStateLabel = savingState === "saving" ? "salvando" : savingState === "saved" ? "sincronizado" : savingState === "error" ? "erro" : "pronto";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        component: "footer",
        sx: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
                xs: "flex-start",
                md: "center"
            },
            gap: 1.5,
            flexDirection: {
                xs: "column",
                md: "row"
            },
            px: 2.25,
            py: 0.75,
            borderTop: "1px solid rgba(15, 23, 42, 0.08)",
            bgcolor: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(12px)",
            "& .MuiButton-root": {
                minWidth: 30,
                minHeight: 26,
                px: 0.75,
                py: 0.2,
                fontSize: 12,
                borderRadius: 1.5
            },
            "& .MuiChip-root": {
                height: 24
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                variant: "body2",
                color: "text.secondary",
                children: statusMessage
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                direction: "row",
                spacing: 1,
                useFlexGap: true,
                sx: {
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        size: "small",
                        variant: "outlined",
                        onClick: ()=>setZoom(Math.max(0.35, Number((zoom - 0.1).toFixed(2)))),
                        children: "-"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                        size: "small",
                        variant: "outlined",
                        label: `${Math.round(zoom * 100)}%`
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        size: "small",
                        variant: "outlined",
                        onClick: ()=>setZoom(Math.min(3, Number((zoom + 0.1).toFixed(2)))),
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        size: "small",
                        variant: gridEnabled ? "contained" : "outlined",
                        color: gridEnabled ? "primary" : "inherit",
                        onClick: toggleGrid,
                        children: "Grade"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                        size: "small",
                        variant: "outlined",
                        label: gridEnabled ? "snap tecnico" : "movimento livre"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                        size: "small",
                        variant: "outlined",
                        label: unit
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                        size: "small",
                        variant: "outlined",
                        label: selectedElement ? `x:${selectedElement.x} y:${selectedElement.y} w:${selectedElement.width} h:${selectedElement.height} r:${selectedElement.rotation}` : "sem selecao"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                        size: "small",
                        color: savingState === "error" ? "error" : savingState === "saved" ? "success" : "default",
                        variant: savingState === "idle" ? "outlined" : "filled",
                        label: savingStateLabel
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/editor/status-bar.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/editor/status-bar.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/editor/topbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorTopbar",
    ()=>EditorTopbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Box/Box.mjs [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Button/Button.mjs [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Chip/Chip.mjs [app-ssr] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/MenuItem/MenuItem.mjs [app-ssr] (ecmascript) <export default as MenuItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Stack/Stack.mjs [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/TextField/TextField.mjs [app-ssr] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Typography/Typography.mjs [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-text.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const isTextElement = (element)=>Boolean(element && element.type === "text");
function ToolbarCluster({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
        direction: "row",
        spacing: 0.75,
        sx: {
            alignItems: "center",
            px: 0.75,
            py: 0.5,
            borderRadius: 1.5,
            border: "1px solid rgba(15, 23, 42, 0.055)",
            background: "rgba(255,255,255,0.56)",
            minHeight: 40
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                variant: "caption",
                color: "text.secondary",
                sx: {
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                direction: "row",
                spacing: 0.5,
                useFlexGap: true,
                sx: {
                    flexWrap: "wrap",
                    alignItems: "center"
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/editor/topbar.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
function EditorTopbar({ editorReadOnly, canUndo, canRedo, canReview, canApprove, canPublish, canCreateVersion, canPrintTest, showLibrary, showInspector, onToggleLibrary, onToggleInspector, onBack, onSave, onPrintTest, onPublish, onSubmitReview, onApprovalDecision, onCreateVersion }) {
    const { history, selectedElementId, addCanvasElement, patchElement, patchTemplate, duplicateSelectedElement, toggleSelectedLock, rotateSelectedElement, moveSelectedLayer, alignSelectedElement, undoAction, redoAction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"])();
    const document = history.present;
    const selectedElement = document.elements.find((element)=>element.id === selectedElementId);
    const selectionReadOnly = editorReadOnly || selectedElement?.locked;
    const previewHref = document.id === "template-new" ? undefined : `/preview/${document.id}`;
    const patchSelectedText = (patch)=>{
        if (!isTextElement(selectedElement) || selectionReadOnly) {
            return;
        }
        const nextElement = {
            ...selectedElement,
            ...patch
        };
        const shouldReflow = patch.fontFamily !== undefined || patch.fontSize !== undefined || patch.fontWeight !== undefined || patch.fontStyle !== undefined || patch.textDecoration !== undefined || patch.align !== undefined || patch.lineHeight !== undefined || patch.letterSpacing !== undefined || patch.wordSpacing !== undefined || patch.textIndent !== undefined || patch.paddingTop !== undefined || patch.paddingRight !== undefined || patch.paddingBottom !== undefined || patch.paddingLeft !== undefined || patch.wrapMode !== undefined || patch.overflowMode !== undefined || patch.text !== undefined;
        patchElement(selectedElement.id, {
            ...patch,
            ...!("height" in patch) && shouldReflow ? {
                height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["measureTextElementHeight"])(nextElement, nextElement.text, nextElement.width)
            } : {}
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            display: "grid",
            gap: 0.75,
            px: 1.25,
            py: 0.75,
            borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
            background: "rgba(255, 255, 255, 0.84)",
            backdropFilter: "blur(14px)",
            "& .MuiButton-root": {
                minHeight: 30,
                px: 1,
                py: 0.35,
                fontSize: 12,
                borderRadius: 1.5
            },
            "& .MuiInputBase-root": {
                minHeight: 32,
                fontSize: 13
            },
            "& .MuiChip-root": {
                height: 24
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                direction: {
                    xs: "column",
                    xl: "row"
                },
                spacing: 1,
                sx: {
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "stretch",
                        xl: "center"
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                        direction: "row",
                        spacing: 1,
                        sx: {
                            alignItems: "center",
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                size: "small",
                                variant: "outlined",
                                onClick: onBack,
                                children: "Voltar"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                spacing: 0.25,
                                sx: {
                                    minWidth: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    direction: "row",
                                    spacing: 0.75,
                                    useFlexGap: true,
                                    sx: {
                                        flexWrap: "wrap",
                                        alignItems: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                            value: document.name,
                                            disabled: editorReadOnly,
                                            onChange: (event)=>patchTemplate({
                                                    name: event.target.value
                                                }),
                                            size: "small",
                                            sx: {
                                                minWidth: {
                                                    xs: 190,
                                                    md: 260
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                            size: "small",
                                            variant: "outlined",
                                            label: `v${document.version}`
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                            size: "small",
                                            color: "primary",
                                            variant: "outlined",
                                            label: document.status
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                            size: "small",
                                            variant: "outlined",
                                            label: `${document.document.width} x ${document.document.height} ${document.document.unit}`
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/editor/topbar.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                        direction: "row",
                        spacing: 0.75,
                        useFlexGap: true,
                        sx: {
                            flexWrap: "wrap",
                            justifyContent: "flex-end"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: showLibrary ? "contained" : "outlined",
                                color: showLibrary ? "primary" : "inherit",
                                onClick: onToggleLibrary,
                                children: "Biblioteca"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: showInspector ? "contained" : "outlined",
                                color: showInspector ? "primary" : "inherit",
                                onClick: onToggleInspector,
                                children: "Propriedades"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            !editorReadOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "contained",
                                onClick: onSave,
                                children: "Salvar"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this) : null,
                            previewHref ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                                href: previewHref,
                                variant: "outlined",
                                children: "Preview"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: true,
                                children: "Preview"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this),
                            canPrintTest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                onClick: onPrintTest,
                                children: "Imprimir"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this) : null,
                            canPublish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "contained",
                                color: "secondary",
                                disabled: document.status !== "approved",
                                onClick: onPublish,
                                children: "Publicar"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/editor/topbar.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                direction: "row",
                spacing: 0.75,
                useFlexGap: true,
                sx: {
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarCluster, {
                        label: "Documento",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: !canUndo,
                                onClick: undoAction,
                                children: "Desfazer"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: !canRedo,
                                onClick: redoAction,
                                children: "Refazer"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            canCreateVersion && document.id !== "template-new" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                onClick: onCreateVersion,
                                children: "Nova versao"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this) : null,
                            canReview && document.status === "draft" && document.id !== "template-new" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                onClick: onSubmitReview,
                                children: "Enviar revisao"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this) : null,
                            canApprove && document.status === "in_review" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        variant: "outlined",
                                        onClick: ()=>onApprovalDecision("rejected"),
                                        children: "Rejeitar"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                        lineNumber: 297,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        variant: "outlined",
                                        onClick: ()=>onApprovalDecision("approved"),
                                        children: "Aprovar"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/editor/topbar.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarCluster, {
                        label: "Inserir",
                        children: [
                            [
                                {
                                    type: "text",
                                    label: "Texto"
                                },
                                {
                                    type: "barcode",
                                    label: "Codigo"
                                },
                                {
                                    type: "qrcode",
                                    label: "QR"
                                },
                                {
                                    type: "shape",
                                    label: "Retangulo"
                                },
                                {
                                    type: "line",
                                    label: "Linha"
                                },
                                {
                                    type: "image",
                                    label: "Imagem"
                                }
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: "outlined",
                                    disabled: editorReadOnly,
                                    onClick: ()=>addCanvasElement(item.type),
                                    children: item.label
                                }, item.label, false, {
                                    fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                    lineNumber: 316,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: editorReadOnly,
                                onClick: ()=>addCanvasElement("text", {
                                        variant: "dynamic"
                                    }),
                                children: "Campo"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/editor/topbar.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this),
                    selectedElement ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarCluster, {
                        label: selectedElement.type === "text" ? "Texto" : "Layout",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: editorReadOnly,
                                onClick: duplicateSelectedElement,
                                children: "Duplicar"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 336,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: selectedElement.locked ? "contained" : "outlined",
                                disabled: editorReadOnly,
                                onClick: toggleSelectedLock,
                                children: selectedElement.locked ? "Bloqueado" : "Bloquear"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>rotateSelectedElement(-15),
                                children: "-15 deg"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>rotateSelectedElement(15),
                                children: "+15 deg"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 349,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>moveSelectedLayer("backward"),
                                children: "Camada -"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>moveSelectedLayer("forward"),
                                children: "Camada +"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 355,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>alignSelectedElement("center"),
                                children: "Centro H"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 358,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>alignSelectedElement("middle"),
                                children: "Centro V"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 361,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/editor/topbar.tsx",
                        lineNumber: 335,
                        columnNumber: 11
                    }, this) : null,
                    isTextElement(selectedElement) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarCluster, {
                        label: "Tipografia",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                select: true,
                                size: "small",
                                value: selectedElement.fontFamily,
                                disabled: selectionReadOnly,
                                onChange: (event)=>patchSelectedText({
                                        fontFamily: event.target.value
                                    }),
                                sx: {
                                    minWidth: 170
                                },
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEXT_FONT_OPTIONS"].map((font)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                        value: font.value,
                                        children: font.label
                                    }, font.value, false, {
                                        fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                        lineNumber: 380,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 369,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                type: "number",
                                size: "small",
                                slotProps: {
                                    htmlInput: {
                                        min: 6,
                                        max: 96
                                    }
                                },
                                value: selectedElement.fontSize,
                                disabled: selectionReadOnly,
                                onChange: (event)=>patchSelectedText({
                                        fontSize: Number(event.target.value)
                                    }),
                                sx: {
                                    width: 86
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: selectedElement.fontWeight >= 700 ? "contained" : "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>patchSelectedText({
                                        fontWeight: selectedElement.fontWeight >= 700 ? 500 : 700
                                    }),
                                children: "B"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: selectedElement.fontStyle === "italic" ? "contained" : "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>patchSelectedText({
                                        fontStyle: selectedElement.fontStyle === "italic" ? "normal" : "italic"
                                    }),
                                children: "I"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: selectedElement.align === "left" ? "contained" : "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>patchSelectedText({
                                        align: "left"
                                    }),
                                children: "Esq"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 418,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: selectedElement.align === "center" ? "contained" : "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>patchSelectedText({
                                        align: "center"
                                    }),
                                children: "Centro"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 425,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: selectedElement.align === "right" ? "contained" : "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>patchSelectedText({
                                        align: "right"
                                    }),
                                children: "Dir"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 432,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: selectedElement.align === "justify" ? "contained" : "outlined",
                                disabled: selectionReadOnly,
                                onClick: ()=>patchSelectedText({
                                        align: "justify"
                                    }),
                                children: "Just"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                                lineNumber: 439,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/editor/topbar.tsx",
                        lineNumber: 368,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/editor/topbar.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/editor/topbar.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/print/label-print-portal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelPrintPortal",
    ()=>LabelPrintPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
"use client";
;
;
function LabelPrintPortal({ children }) {
    const [host, setHost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const node = document.createElement("div");
        node.className = "label-print-portal-host";
        document.body.appendChild(node);
        setHost(node);
        return ()=>{
            node.remove();
            setHost(null);
        };
    }, []);
    if (!host) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(children, host);
}
}),
"[project]/apps/web/components/editor/editor-shell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorShell",
    ()=>EditorShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-draft.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$barcode$2d$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/barcode-validation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$canvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/canvas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$library$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/library.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$label$2d$preview$2d$surface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/label-preview-surface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$properties$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/properties.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$status$2d$bar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/status-bar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$topbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/topbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$print$2f$label$2d$print$2d$portal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/print/label-print-portal.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function EditorShell({ initialDocument }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [session] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadStoredSession"])());
    const [showLibrary, setShowLibrary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showInspector, setShowInspector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const canEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "template.edit");
    const canReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "template.review");
    const canApprove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "template.approve");
    const canPublish = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "template.publish");
    const canRollback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "template.rollback");
    const canCreateVersion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "template.version.create");
    const canPrintTest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "print-job.test");
    const canManageAssets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "asset.manage");
    const [versions, setVersions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [approvals, setApprovals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rollbackPending, setRollbackPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [createVersionPending, setCreateVersionPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [recoverableDraft, setRecoverableDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [printDocument, setPrintDocument] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [printPayload, setPrintPayload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [printJobId, setPrintJobId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const lastSavedPayloadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTemplatePayload"])(initialDocument));
    const didHydrateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const autosaveInFlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const autosaveQueuedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const previousDraftKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(initialDocument.id);
    const { history, selectedElementId, loadDocument, undoAction, redoAction, removeSelectedElement, markStatus, patchTemplate, setSavingState, syncPersistedTemplate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"])();
    const selectedElement = history.present.elements.find((element)=>element.id === selectedElementId);
    const lifecycleReadOnly = history.present.id !== "template-new" && history.present.status !== "draft";
    const editorReadOnly = !canEdit || lifecycleReadOnly;
    const canUndo = history.past.length > 0;
    const canRedo = history.future.length > 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const serverPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTemplatePayload"])(initialDocument);
        const localDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadEditorDraft"])(initialDocument.id);
        lastSavedPayloadRef.current = serverPayload;
        didHydrateRef.current = false;
        previousDraftKeyRef.current = initialDocument.id;
        loadDocument(initialDocument);
        setRecoverableDraft(localDraft && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTemplatePayload"])(localDraft.document) !== serverPayload ? localDraft : null);
        const timeout = window.setTimeout(()=>{
            didHydrateRef.current = true;
        }, 0);
        return ()=>window.clearTimeout(timeout);
    }, [
        initialDocument,
        loadDocument
    ]);
    const refreshVersions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (templateId)=>{
        const activeTemplateId = templateId ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"].getState().history.present.id;
        if (!session || activeTemplateId === "template-new") {
            setVersions([]);
            return;
        }
        try {
            const nextVersions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTemplateVersions"])(activeTemplateId, session);
            setVersions(nextVersions);
        } catch  {
            setVersions([]);
        }
    }, [
        session
    ]);
    const refreshApprovals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (templateId)=>{
        const activeTemplateId = templateId ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"].getState().history.present.id;
        if (!session || activeTemplateId === "template-new") {
            setApprovals([]);
            return;
        }
        try {
            const nextApprovals = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTemplateApprovals"])(activeTemplateId, session);
            setApprovals(nextApprovals);
        } catch  {
            setApprovals([]);
        }
    }, [
        session
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void refreshVersions();
        void refreshApprovals();
    }, [
        refreshApprovals,
        refreshVersions
    ]);
    const handleSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!session || editorReadOnly) return false;
        const currentDocument = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"].getState().history.present;
        const wasNew = currentDocument.id === "template-new";
        setSavingState("saving");
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveTemplate"])(currentDocument, session, {
                versionNotes: "Salvo pelo editor web"
            });
            lastSavedPayloadRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTemplatePayload"])(currentDocument);
            syncPersistedTemplate({
                id: response.id,
                version: response.currentVersion,
                status: String(response.status).toLowerCase()
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearEditorDraft"])(currentDocument.id);
            if (wasNew) {
                router.replace(`/editor/${response.id}`);
            }
            setSavingState("saved");
            markStatus("Template salvo");
            void refreshVersions(response.id);
            return true;
        } catch  {
            setSavingState("error");
            markStatus("Falha ao salvar");
            return false;
        }
    }, [
        editorReadOnly,
        markStatus,
        refreshVersions,
        router,
        session,
        setSavingState,
        syncPersistedTemplate
    ]);
    const handleAutosave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (documentSnapshot, payloadSnapshot)=>{
        if (!session || editorReadOnly || documentSnapshot.id === "template-new") {
            return;
        }
        if (autosaveInFlightRef.current) {
            autosaveQueuedRef.current = true;
            return;
        }
        autosaveInFlightRef.current = true;
        setSavingState("saving");
        markStatus("Autosave remoto em andamento");
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveTemplate"])(documentSnapshot, session, {
                versionNotes: "Autosave do editor"
            });
            lastSavedPayloadRef.current = payloadSnapshot;
            syncPersistedTemplate({
                id: response.id,
                version: response.currentVersion,
                status: String(response.status).toLowerCase()
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearEditorDraft"])(documentSnapshot.id);
            setSavingState("saved");
            markStatus(`Autosave sincronizado ${new Date().toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit"
            })}`);
            void refreshVersions(response.id);
        } catch  {
            setSavingState("error");
            markStatus("Falha no autosave remoto");
        } finally{
            autosaveInFlightRef.current = false;
            if (autosaveQueuedRef.current) {
                autosaveQueuedRef.current = false;
                const latestDocument = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"].getState().history.present;
                const latestPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTemplatePayload"])(latestDocument);
                if (latestDocument.id !== "template-new" && latestPayload !== lastSavedPayloadRef.current) {
                    void handleAutosave(latestDocument, latestPayload);
                }
            }
        }
    }, [
        editorReadOnly,
        markStatus,
        refreshVersions,
        session,
        setSavingState,
        syncPersistedTemplate
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!didHydrateRef.current) {
            return;
        }
        const currentDocument = history.present;
        const previousDraftKey = previousDraftKeyRef.current;
        if (previousDraftKey !== currentDocument.id) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearEditorDraft"])(previousDraftKey);
            previousDraftKeyRef.current = currentDocument.id;
        }
        const localTimeout = window.setTimeout(()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveEditorDraft"])(currentDocument);
        }, 700);
        const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTemplatePayload"])(currentDocument);
        if (!session || editorReadOnly || currentDocument.id === "template-new" || payload === lastSavedPayloadRef.current) {
            return ()=>window.clearTimeout(localTimeout);
        }
        const remoteTimeout = window.setTimeout(()=>{
            void handleAutosave(currentDocument, payload);
        }, 1800);
        return ()=>{
            window.clearTimeout(localTimeout);
            window.clearTimeout(remoteTimeout);
        };
    }, [
        editorReadOnly,
        handleAutosave,
        history.present,
        session
    ]);
    const handlePublish = async ()=>{
        if (!session || !canPublish || history.present.id === "template-new") return;
        const password = window.prompt("Confirme sua senha para publicar este template");
        if (!password) return;
        const reason = window.prompt("Motivo da publicacao (opcional)") ?? undefined;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishTemplate"])(history.present.id, session, {
            password,
            reason
        });
        const nextStatus = String(response.status).toLowerCase();
        patchTemplate({
            status: nextStatus
        });
        lastSavedPayloadRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTemplatePayload"])({
            ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"].getState().history.present,
            status: nextStatus
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearEditorDraft"])(history.present.id);
        markStatus("Template publicado");
        void refreshVersions();
        void refreshApprovals();
    };
    const handlePrintTest = async ()=>{
        if (!session || !canPrintTest) return;
        let templateId = history.present.id;
        if (templateId === "template-new") {
            const saved = await handleSave();
            if (!saved) {
                markStatus("Salve o template antes de imprimir");
                return;
            }
            templateId = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"].getState().history.present.id;
        }
        if (!templateId || templateId === "template-new") return;
        const activeDocument = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"].getState().history.present;
        const nextPrintPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildPreviewPayload"])(activeDocument);
        const scannableErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$barcode$2d$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getScannableValidationErrors"])(activeDocument, nextPrintPayload);
        if (scannableErrors.length > 0) {
            markStatus(scannableErrors[0] ?? "Corrija o codigo antes de imprimir");
            window.alert(`Corrija antes de imprimir:\n${scannableErrors.join("\n")}`);
            return;
        }
        try {
            const createdJob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPrintJob"])({
                templateId,
                copies: 1,
                source: "EDITOR_PREVIEW",
                mode: "BROWSER",
                payload: nextPrintPayload,
                resolvedData: nextPrintPayload
            }, session);
            setPrintJobId(createdJob.id);
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPrintJobEvent"])(createdJob.id, {
                    type: "job.started",
                    message: "Impressao iniciada a partir do editor visual.",
                    status: "RUNNING",
                    payload: {
                        delivery: "browser-window.print",
                        source: "EDITOR_PREVIEW",
                        quantity: 1
                    },
                    result: {
                        browserPrint: {
                            dispatchedAt: new Date().toISOString(),
                            source: "EDITOR_PREVIEW"
                        }
                    }
                }, session);
            } catch  {
            // Mantemos a impressao local mesmo se a trilha complementar falhar.
            }
            setPrintPayload(nextPrintPayload);
            setPrintDocument(activeDocument);
            markStatus("Impressao local preparada no editor");
        } catch  {
            markStatus("Falha ao registrar a impressao do editor");
        }
    };
    const handleRollback = async (version)=>{
        if (!session || !canRollback || history.present.id === "template-new") return;
        const password = window.prompt("Confirme sua senha para restaurar esta versao");
        if (!password) return;
        const reason = window.prompt("Motivo do rollback (opcional)") ?? undefined;
        setRollbackPending(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rollbackTemplateVersion"])(history.present.id, version, {
                password,
                reason
            }, session);
            const refreshed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTemplateDocument"])(history.present.id, session);
            lastSavedPayloadRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTemplatePayload"])(refreshed);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearEditorDraft"])(refreshed.id);
            loadDocument(refreshed);
            setRecoverableDraft(null);
            markStatus(`Template restaurado da versao ${version}`);
            void refreshVersions();
            void refreshApprovals();
        } catch  {
            markStatus("Falha ao restaurar versao");
        } finally{
            setRollbackPending(false);
        }
    };
    const handleCreateVersion = async ()=>{
        if (!session || !canCreateVersion || history.present.id === "template-new") return;
        setCreateVersionPending(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTemplateVersion"])(history.present.id, {
                notes: `Nova versao de trabalho a partir da v${history.present.version}`
            }, session);
            const refreshed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTemplateDocument"])(history.present.id, session);
            lastSavedPayloadRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTemplatePayload"])(refreshed);
            loadDocument(refreshed);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearEditorDraft"])(refreshed.id);
            setRecoverableDraft(null);
            markStatus(`Nova versao criada a partir da v${history.present.version}`);
            void refreshVersions();
            void refreshApprovals();
        } catch  {
            markStatus("Falha ao criar nova versao");
        } finally{
            setCreateVersionPending(false);
        }
    };
    const handleSubmitReview = async ()=>{
        if (!session || !canReview || history.present.id === "template-new") return;
        const notes = window.prompt("Observacoes para a revisao (opcional)") ?? undefined;
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["submitTemplateReview"])(history.present.id, {
                notes
            }, session);
            patchTemplate({
                status: String(response.status).toLowerCase()
            });
            markStatus("Template enviado para revisao");
            void refreshVersions();
            void refreshApprovals();
        } catch  {
            markStatus("Falha ao enviar template para revisao");
        }
    };
    const handleApprovalDecision = async (decision)=>{
        if (!session || !canApprove || history.present.id === "template-new") return;
        const password = window.prompt(decision === "approved" ? "Confirme sua senha para aprovar este template" : "Confirme sua senha para rejeitar este template");
        if (!password) return;
        const notes = window.prompt(decision === "approved" ? "Observacoes da aprovacao (opcional)" : "Motivo da rejeicao (opcional)") ?? undefined;
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decideTemplateApproval"])(history.present.id, {
                decision,
                password,
                notes
            }, session);
            patchTemplate({
                status: String(response.status).toLowerCase()
            });
            markStatus(decision === "approved" ? "Template aprovado formalmente" : "Template devolvido para draft");
            void refreshVersions();
            void refreshApprovals();
        } catch  {
            markStatus("Falha ao registrar decisao de aprovacao");
        }
    };
    const handleRestoreDraft = ()=>{
        if (!recoverableDraft) return;
        loadDocument(recoverableDraft.document);
        markStatus("Rascunho local restaurado");
        setRecoverableDraft(null);
        didHydrateRef.current = true;
    };
    const handleDiscardDraft = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$draft$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearEditorDraft"])(initialDocument.id);
        setRecoverableDraft(null);
        markStatus("Rascunho local descartado");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const isEditableTarget = (target)=>target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target instanceof HTMLElement && target.isContentEditable;
        const handleKeydown = (event)=>{
            if (isEditableTarget(event.target)) {
                return;
            }
            const modifier = event.metaKey || event.ctrlKey;
            if (!modifier && event.key === "Delete") {
                if (!editorReadOnly && selectedElement && !selectedElement.locked) {
                    event.preventDefault();
                    removeSelectedElement();
                }
                return;
            }
            if (!modifier) return;
            const key = event.key.toLowerCase();
            if (key === "s") {
                event.preventDefault();
                void handleSave();
                return;
            }
            if (key === "z" && !event.shiftKey) {
                event.preventDefault();
                undoAction();
                return;
            }
            if (key === "z" && event.shiftKey || key === "y") {
                event.preventDefault();
                redoAction();
            }
        };
        window.addEventListener("keydown", handleKeydown);
        return ()=>window.removeEventListener("keydown", handleKeydown);
    }, [
        editorReadOnly,
        handleSave,
        redoAction,
        removeSelectedElement,
        selectedElement,
        undoAction
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!printDocument) {
            return;
        }
        let frameId = 0;
        let nestedFrameId = 0;
        frameId = window.requestAnimationFrame(()=>{
            nestedFrameId = window.requestAnimationFrame(()=>{
                try {
                    window.print();
                } catch  {
                    const failedJobId = printJobId;
                    setPrintDocument(null);
                    setPrintPayload({});
                    setPrintJobId(null);
                    markStatus("Falha ao abrir o dialogo de impressao");
                    void (async ()=>{
                        if (session && failedJobId) {
                            try {
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPrintJobEvent"])(failedJobId, {
                                    type: "job.failed",
                                    message: "Falha ao abrir o dialogo de impressao do navegador.",
                                    status: "FAILED",
                                    failureReason: "Falha ao abrir o dialogo de impressao do navegador.",
                                    payload: {
                                        delivery: "browser-window.print",
                                        source: "EDITOR_PREVIEW"
                                    }
                                }, session);
                            } catch  {
                            // O erro principal ja foi refletido no editor.
                            }
                        }
                    })();
                }
            });
        });
        return ()=>{
            window.cancelAnimationFrame(frameId);
            window.cancelAnimationFrame(nestedFrameId);
        };
    }, [
        markStatus,
        printDocument,
        printJobId,
        session
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!printDocument) {
            return;
        }
        const handleAfterPrint = ()=>{
            const completedJobId = printJobId;
            setPrintDocument(null);
            setPrintPayload({});
            setPrintJobId(null);
            markStatus("Dialogo de impressao finalizado");
            void (async ()=>{
                if (session && completedJobId) {
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPrintJobEvent"])(completedJobId, {
                            type: "job.browser-print.dialog-closed",
                            message: "Dialogo de impressao do navegador finalizado a partir do editor.",
                            payload: {
                                delivery: "browser-window.print",
                                source: "EDITOR_PREVIEW",
                                quantity: 1,
                                dialogClosedAt: new Date().toISOString()
                            },
                            result: {
                                browserPrint: {
                                    source: "EDITOR_PREVIEW",
                                    dialogClosedAt: new Date().toISOString()
                                }
                            }
                        }, session);
                    } catch  {
                    // Mantemos o fluxo local mesmo se o evento complementar falhar.
                    }
                }
            })();
        };
        window.addEventListener("afterprint", handleAfterPrint);
        return ()=>{
            window.removeEventListener("afterprint", handleAfterPrint);
        };
    }, [
        markStatus,
        printDocument,
        printJobId,
        session
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "shell editor-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "panel editor-shell__frame",
                style: {
                    display: "grid",
                    gridTemplateRows: "auto auto minmax(0, 1fr) auto",
                    height: "100%",
                    minHeight: 0,
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$topbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorTopbar"], {
                        editorReadOnly: editorReadOnly,
                        canUndo: canUndo,
                        canRedo: canRedo,
                        canReview: canReview,
                        canApprove: canApprove,
                        canPublish: canPublish,
                        canCreateVersion: canCreateVersion,
                        canPrintTest: canPrintTest,
                        showLibrary: showLibrary,
                        showInspector: showInspector,
                        onToggleLibrary: ()=>setShowLibrary((current)=>!current),
                        onToggleInspector: ()=>setShowInspector((current)=>!current),
                        onBack: ()=>router.push("/"),
                        onSave: ()=>void handleSave(),
                        onPrintTest: ()=>void handlePrintTest(),
                        onPublish: ()=>void handlePublish(),
                        onSubmitReview: ()=>void handleSubmitReview(),
                        onApprovalDecision: (decision)=>void handleApprovalDecision(decision),
                        onCreateVersion: ()=>void handleCreateVersion()
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                        lineNumber: 621,
                        columnNumber: 9
                    }, this),
                    recoverableDraft ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "editor-shell__draft-banner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gap: 4
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        style: {
                                            fontSize: 14
                                        },
                                        children: "Rascunho local encontrado"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                        lineNumber: 646,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "muted",
                                        style: {
                                            fontSize: 12
                                        },
                                        children: [
                                            "Existe uma versao local mais recente salva em",
                                            " ",
                                            new Date(recoverableDraft.savedAt).toLocaleString("pt-BR"),
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                        lineNumber: 647,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                lineNumber: 645,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 10,
                                    flexWrap: "wrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDiscardDraft,
                                        children: "Descartar"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                        lineNumber: 653,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleRestoreDraft,
                                        children: "Restaurar rascunho"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                        lineNumber: 654,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                lineNumber: 652,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                        lineNumber: 644,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "editor-shell__body",
                        style: {
                            display: "grid",
                            gridTemplateColumns: `${showLibrary ? "184px" : "0px"} minmax(0, 1fr) ${showInspector ? "280px" : "0px"}`,
                            minHeight: 0,
                            overflow: "hidden"
                        },
                        children: [
                            showLibrary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$library$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorLibrary"], {
                                readOnly: editorReadOnly
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                lineNumber: 668,
                                columnNumber: 26
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                lineNumber: 668,
                                columnNumber: 72
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "editor-shell__stage",
                                style: {
                                    minWidth: 0,
                                    background: "linear-gradient(180deg, rgba(241,246,247,0.78), rgba(232,239,240,0.9))",
                                    borderLeft: showLibrary ? "1px solid var(--line)" : "none",
                                    borderRight: showInspector ? "1px solid var(--line)" : "none"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "editor-shell__stage-header",
                                        "data-print-chrome": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "editor-shell__stage-title",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Documento"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                                        lineNumber: 681,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "muted",
                                                        children: "Documento principal em foco, com ferramentas tecnicas distribuídas na barra superior."
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                                        lineNumber: 682,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                                lineNumber: 680,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "editor-shell__stage-meta",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "editor-toolbar__tag",
                                                        children: [
                                                            history.present.document.width,
                                                            " x ",
                                                            history.present.document.height,
                                                            " ",
                                                            history.present.document.unit
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                                        lineNumber: 687,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "editor-toolbar__tag",
                                                        children: [
                                                            history.present.elements.length,
                                                            " elementos"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                                        lineNumber: 690,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                                lineNumber: 686,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                        lineNumber: 679,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "editor-shell__stage-canvas editor-scrollarea",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$canvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCanvas"], {
                                            readOnly: editorReadOnly
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                            lineNumber: 696,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                        lineNumber: 695,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                lineNumber: 669,
                                columnNumber: 11
                            }, this),
                            showInspector ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$properties$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorProperties"], {
                                readOnly: editorReadOnly,
                                canManageAssets: canManageAssets,
                                versions: versions,
                                approvals: approvals,
                                rollbackPending: rollbackPending,
                                createVersionPending: createVersionPending,
                                onCreateVersion: canCreateVersion ? handleCreateVersion : undefined,
                                onRollback: canRollback ? handleRollback : undefined
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                lineNumber: 700,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                lineNumber: 711,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                        lineNumber: 659,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$status$2d$bar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorStatusBar"], {}, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                        lineNumber: 715,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                lineNumber: 611,
                columnNumber: 7
            }, this),
            printDocument ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$print$2f$label$2d$print$2d$portal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LabelPrintPortal"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "label-print-portal",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-print-root": true,
                        className: "label-print-root",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "label-print-root__page",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "label-print-root__item",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "label-print-surface",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$label$2d$preview$2d$surface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LabelPreviewSurface"], {
                                        document: printDocument,
                                        previewPayload: printPayload,
                                        scale: 1,
                                        preset: "print",
                                        mode: "physical"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                        lineNumber: 725,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                    lineNumber: 724,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                                lineNumber: 723,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                            lineNumber: 722,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                        lineNumber: 721,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                    lineNumber: 720,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
                lineNumber: 719,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/editor/editor-shell.tsx",
        lineNumber: 610,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/app/session-guard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SessionGuard",
    ()=>SessionGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/session.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function SessionGuard({ children, onSession }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let active = true;
        const bootstrapSession = async ()=>{
            const storedSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadStoredSession"])();
            if (!storedSession) {
                router.replace("/login");
                return;
            }
            try {
                const refreshedSession = {
                    accessToken: storedSession.accessToken,
                    session: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchMe"])(storedSession)
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storeSession"])(refreshedSession);
                if (!active) return;
                onSession?.(refreshedSession);
                setReady(true);
            } catch  {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearSession"])();
                if (!active) return;
                router.replace("/login");
            }
        };
        void bootstrapSession();
        return ()=>{
            active = false;
        };
    }, [
        onSession,
        router
    ]);
    if (!ready) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "shell",
            style: {
                display: "grid",
                placeItems: "center"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel",
                style: {
                    padding: 24
                },
                children: "Carregando sessao..."
            }, void 0, false, {
                fileName: "[project]/apps/web/components/app/session-guard.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/app/session-guard.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/apps/web/app/editor/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$editor$2d$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/editor-shell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$app$2f$session$2d$guard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/app/session-guard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/session.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function EditorPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [document, setDocument] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const canViewTemplates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "template.view");
    const canEditTemplates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, "template.edit");
    const isNewTemplate = params?.id === "new";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!session || !params?.id || !canViewTemplates) return;
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTemplateDocument"])(params.id, session).then(setDocument);
    }, [
        canViewTemplates,
        params?.id,
        session
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$app$2f$session$2d$guard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionGuard"], {
        onSession: setSession,
        children: !canViewTemplates || isNewTemplate && !canEditTemplates ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "shell",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel",
                style: {
                    padding: 24
                },
                children: "Seu papel atual nao possui acesso a esta tela do editor."
            }, void 0, false, {
                fileName: "[project]/apps/web/app/editor/[id]/page.tsx",
                lineNumber: 28,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/app/editor/[id]/page.tsx",
            lineNumber: 27,
            columnNumber: 9
        }, this) : document ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$editor$2d$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorShell"], {
            initialDocument: document
        }, void 0, false, {
            fileName: "[project]/apps/web/app/editor/[id]/page.tsx",
            lineNumber: 33,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "shell",
            children: "Carregando editor..."
        }, void 0, false, {
            fileName: "[project]/apps/web/app/editor/[id]/page.tsx",
            lineNumber: 35,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/app/editor/[id]/page.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_6e9520ef._.js.map