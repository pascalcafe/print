(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/shared/src/template/render.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
function getMissingRequiredFields(document) {
    let previewPayload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : buildPreviewPayload(document);
    return document.dataSchema.filter((field)=>field.required && !hasValue(previewPayload[field.key]) && !hasValue(field.fallbackValue));
}
function formatFieldValue(field, value) {
    if (!field) {
        return toText(value);
    }
    if (!hasValue(value)) {
        var _field_fallbackValue;
        return (_field_fallbackValue = field.fallbackValue) !== null && _field_fallbackValue !== void 0 ? _field_fallbackValue : "";
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
        var _field_formatConfig;
        const numericValue = typeof value === "number" ? value : Number(toText(value).replace(/\./g, "").replace(",", "."));
        if (Number.isNaN(numericValue)) {
            return toText(value);
        }
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: typeof ((_field_formatConfig = field.formatConfig) === null || _field_formatConfig === void 0 ? void 0 : _field_formatConfig.currency) === "string" ? field.formatConfig.currency : "BRL"
        }).format(numericValue);
    }
    return toText(value);
}
function resolveFieldPreviewValue(document, key) {
    let previewPayload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : buildPreviewPayload(document);
    if (!key) {
        return "";
    }
    const field = document.dataSchema.find((entry)=>entry.key === key);
    const rawValue = hasValue(previewPayload[key]) ? previewPayload[key] : field === null || field === void 0 ? void 0 : field.fallbackValue;
    return formatFieldValue(field, rawValue);
}
function resolveTextElementContent(document, element) {
    let previewPayload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : buildPreviewPayload(document);
    if (element.contentMode !== "dynamic") {
        return element.text;
    }
    const resolvedValue = resolveFieldPreviewValue(document, element.bindingKey, previewPayload);
    if (hasValue(resolvedValue)) {
        return resolvedValue;
    }
    var _element_placeholder, _ref;
    return (_ref = (_element_placeholder = element.placeholder) !== null && _element_placeholder !== void 0 ? _element_placeholder : element.bindingKey) !== null && _ref !== void 0 ? _ref : element.text;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/auth/permissions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    var _permissions_includes;
    return (_permissions_includes = permissions === null || permissions === void 0 ? void 0 : permissions.includes(permission)) !== null && _permissions_includes !== void 0 ? _permissions_includes : false;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/session.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$auth$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/auth/permissions.ts [app-client] (ecmascript)");
"use client";
;
const STORAGE_KEY = "easyprint:session";
function loadStoredSession() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}
function storeSession(session) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}
function clearSession() {
    window.localStorage.removeItem(STORAGE_KEY);
}
function sessionHasPermission(session, permission) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$auth$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasPermission"])(session === null || session === void 0 ? void 0 : session.session.permissions, permission);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/app/dashboard-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardShell",
    ()=>DashboardShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Button/Button.mjs [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Container$2f$Container$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Container/Container.mjs [app-client] (ecmascript) <export default as Container>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Paper/Paper.mjs [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Stack/Stack.mjs [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/session.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const items = [
    {
        href: "/home",
        label: "Operacao",
        permission: "template.view"
    },
    {
        href: "/",
        label: "Templates",
        permission: "template.view"
    },
    {
        href: "/products",
        label: "Produtos",
        permission: "product.view"
    },
    {
        href: "/identity",
        label: "Identidade",
        permission: "identity.view"
    },
    {
        href: "/agents",
        label: "Agentes",
        permission: "agent.view"
    },
    {
        href: "/printers",
        label: "Impressoras",
        permission: "printer.view"
    },
    {
        href: "/print-profiles",
        label: "Perfis",
        permission: "print-profile.view"
    },
    {
        href: "/jobs",
        label: "Jobs",
        permission: "print-job.view"
    },
    {
        href: "/audit",
        label: "Auditoria",
        permission: "audit.view"
    },
    {
        href: "/observability",
        label: "Observabilidade",
        permission: "observability.view"
    }
];
function DashboardShell(param) {
    let { title, subtitle, action, children } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadStoredSession"])();
    const visibleItems = items.filter((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sessionHasPermission"])(session, item.permission));
    var _session_session_name, _session_session_roleName, _session_session_tenantSlug, _session_session_externalProviderName;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        component: "main",
        className: "shell",
        sx: {
            p: {
                xs: 2,
                md: 3.5
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Container$2f$Container$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__["Container"], {
            maxWidth: false,
            disableGutters: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                sx: {
                    p: {
                        xs: 2,
                        md: 3
                    },
                    display: "grid",
                    gap: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                        direction: {
                            xs: "column",
                            xl: "row"
                        },
                        spacing: 3,
                        sx: {
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "stretch",
                                xl: "flex-start"
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                spacing: 2,
                                sx: {
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        component: "nav",
                                        sx: {
                                            display: "flex",
                                            gap: 1,
                                            flexWrap: "wrap"
                                        },
                                        children: visibleItems.map((item)=>{
                                            const active = pathname === item.href;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                                href: item.href,
                                                variant: active ? "contained" : "text",
                                                color: active ? "primary" : "inherit",
                                                sx: {
                                                    borderRadius: 999,
                                                    px: 1.75,
                                                    color: active ? undefined : "text.secondary",
                                                    backgroundColor: active ? undefined : "rgba(255,255,255,0.52)"
                                                },
                                                children: item.label
                                            }, item.href, false, {
                                                fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                                lineNumber: 74,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "overline",
                                                color: "text.secondary",
                                                children: "EasyPrint / Marco 4"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                                lineNumber: 94,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "h3",
                                                component: "h1",
                                                sx: {
                                                    mt: 0.5
                                                },
                                                children: title
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                                lineNumber: 97,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "body1",
                                                color: "text.secondary",
                                                sx: {
                                                    mt: 1.25,
                                                    maxWidth: 820
                                                },
                                                children: subtitle
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                                lineNumber: 100,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                spacing: 1.5,
                                sx: {
                                    alignItems: {
                                        xs: "flex-start",
                                        xl: "flex-end"
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        sx: {
                                            textAlign: {
                                                xl: "right"
                                            }
                                        },
                                        children: [
                                            (_session_session_name = session === null || session === void 0 ? void 0 : session.session.name) !== null && _session_session_name !== void 0 ? _session_session_name : "Usuario",
                                            " | ",
                                            (_session_session_roleName = session === null || session === void 0 ? void 0 : session.session.roleName) !== null && _session_session_roleName !== void 0 ? _session_session_roleName : "Papel",
                                            " |",
                                            " ",
                                            (_session_session_tenantSlug = session === null || session === void 0 ? void 0 : session.session.tenantSlug) !== null && _session_session_tenantSlug !== void 0 ? _session_session_tenantSlug : "tenant",
                                            " |",
                                            " ",
                                            (session === null || session === void 0 ? void 0 : session.session.authMethod) === "oidc" ? (_session_session_externalProviderName = session === null || session === void 0 ? void 0 : session.session.externalProviderName) !== null && _session_session_externalProviderName !== void 0 ? _session_session_externalProviderName : "SSO" : "Local"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                        direction: "row",
                                        spacing: 1,
                                        useFlexGap: true,
                                        sx: {
                                            flexWrap: "wrap"
                                        },
                                        children: [
                                            action,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                variant: "outlined",
                                                onClick: ()=>{
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSession"])();
                                                    router.replace("/login");
                                                },
                                                children: "Sair"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/app/dashboard-shell.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(DashboardShell, "gA9e4WsoP6a20xDgQgrFkfMP8lc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = DashboardShell;
var _c;
__turbopack_context__.k.register(_c, "DashboardShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/template/document.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/template/factories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$document$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/document.ts [app-client] (ecmascript)");
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
const createInitialDocument = (overrides)=>{
    var _overrides_id, _overrides_name, _overrides_version, _overrides_status, _overrides_settings, _overrides_dataSchema, _overrides_elements, _overrides_metadata;
    return {
        id: (_overrides_id = overrides === null || overrides === void 0 ? void 0 : overrides.id) !== null && _overrides_id !== void 0 ? _overrides_id : "template-new",
        name: (_overrides_name = overrides === null || overrides === void 0 ? void 0 : overrides.name) !== null && _overrides_name !== void 0 ? _overrides_name : "Nova etiqueta",
        version: (_overrides_version = overrides === null || overrides === void 0 ? void 0 : overrides.version) !== null && _overrides_version !== void 0 ? _overrides_version : 1,
        status: (_overrides_status = overrides === null || overrides === void 0 ? void 0 : overrides.status) !== null && _overrides_status !== void 0 ? _overrides_status : "draft",
        document: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$document$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DOCUMENT"],
            ...overrides === null || overrides === void 0 ? void 0 : overrides.document
        },
        settings: (_overrides_settings = overrides === null || overrides === void 0 ? void 0 : overrides.settings) !== null && _overrides_settings !== void 0 ? _overrides_settings : {},
        dataSchema: (_overrides_dataSchema = overrides === null || overrides === void 0 ? void 0 : overrides.dataSchema) !== null && _overrides_dataSchema !== void 0 ? _overrides_dataSchema : [],
        elements: ((_overrides_elements = overrides === null || overrides === void 0 ? void 0 : overrides.elements) !== null && _overrides_elements !== void 0 ? _overrides_elements : []).map(normalizeLabelElement),
        metadata: (_overrides_metadata = overrides === null || overrides === void 0 ? void 0 : overrides.metadata) !== null && _overrides_metadata !== void 0 ? _overrides_metadata : {}
    };
};
const normalizeLabelElement = (element)=>{
    if (element.type === "text") {
        var _element_fontSize, _element_fontFamily, _element_fontWeight, _element_fontStyle, _element_textDecoration, _element_lineHeight, _element_letterSpacing, _element_wordSpacing, _element_textIndent, _element_paddingTop, _element_paddingRight, _element_paddingBottom, _element_paddingLeft, _element_wrapMode, _element_overflowMode, _element_color, _element_align;
        return {
            ...element,
            fontSize: (_element_fontSize = element.fontSize) !== null && _element_fontSize !== void 0 ? _element_fontSize : DEFAULT_TEXT_SIZE,
            fontFamily: (_element_fontFamily = element.fontFamily) !== null && _element_fontFamily !== void 0 ? _element_fontFamily : DEFAULT_TEXT_FONT,
            fontWeight: (_element_fontWeight = element.fontWeight) !== null && _element_fontWeight !== void 0 ? _element_fontWeight : DEFAULT_TEXT_WEIGHT,
            fontStyle: (_element_fontStyle = element.fontStyle) !== null && _element_fontStyle !== void 0 ? _element_fontStyle : "normal",
            textDecoration: (_element_textDecoration = element.textDecoration) !== null && _element_textDecoration !== void 0 ? _element_textDecoration : "none",
            lineHeight: (_element_lineHeight = element.lineHeight) !== null && _element_lineHeight !== void 0 ? _element_lineHeight : DEFAULT_TEXT_LINE_HEIGHT,
            letterSpacing: (_element_letterSpacing = element.letterSpacing) !== null && _element_letterSpacing !== void 0 ? _element_letterSpacing : DEFAULT_TEXT_LETTER_SPACING,
            wordSpacing: (_element_wordSpacing = element.wordSpacing) !== null && _element_wordSpacing !== void 0 ? _element_wordSpacing : DEFAULT_TEXT_WORD_SPACING,
            textIndent: (_element_textIndent = element.textIndent) !== null && _element_textIndent !== void 0 ? _element_textIndent : DEFAULT_TEXT_INDENT,
            paddingTop: (_element_paddingTop = element.paddingTop) !== null && _element_paddingTop !== void 0 ? _element_paddingTop : DEFAULT_TEXT_PADDING,
            paddingRight: (_element_paddingRight = element.paddingRight) !== null && _element_paddingRight !== void 0 ? _element_paddingRight : DEFAULT_TEXT_PADDING,
            paddingBottom: (_element_paddingBottom = element.paddingBottom) !== null && _element_paddingBottom !== void 0 ? _element_paddingBottom : DEFAULT_TEXT_PADDING,
            paddingLeft: (_element_paddingLeft = element.paddingLeft) !== null && _element_paddingLeft !== void 0 ? _element_paddingLeft : DEFAULT_TEXT_PADDING,
            wrapMode: (_element_wrapMode = element.wrapMode) !== null && _element_wrapMode !== void 0 ? _element_wrapMode : "wrap",
            overflowMode: (_element_overflowMode = element.overflowMode) !== null && _element_overflowMode !== void 0 ? _element_overflowMode : "hidden",
            color: (_element_color = element.color) !== null && _element_color !== void 0 ? _element_color : "#111827",
            align: (_element_align = element.align) !== null && _element_align !== void 0 ? _element_align : "left"
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
        var _element_fit, _element_fit1, _element_objectFit, _element_maintainAspectRatio, _element_opacity;
        return {
            ...element,
            fit: (_element_fit = element.fit) !== null && _element_fit !== void 0 ? _element_fit : "contain",
            objectFit: (_element_objectFit = element.objectFit) !== null && _element_objectFit !== void 0 ? _element_objectFit : element.fit === "stretch" ? "fill" : (_element_fit1 = element.fit) !== null && _element_fit1 !== void 0 ? _element_fit1 : "contain",
            maintainAspectRatio: (_element_maintainAspectRatio = element.maintainAspectRatio) !== null && _element_maintainAspectRatio !== void 0 ? _element_maintainAspectRatio : true,
            opacity: (_element_opacity = element.opacity) !== null && _element_opacity !== void 0 ? _element_opacity : 1
        };
    }
    return element;
};
const normalizeLabelDocument = (document)=>({
        ...document,
        document: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$document$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DOCUMENT"],
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/factories.ts [app-client] (ecmascript)");
;
var _process_env_NEXT_PUBLIC_API_URL;
const API_URL = (_process_env_NEXT_PUBLIC_API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL) !== null && _process_env_NEXT_PUBLIC_API_URL !== void 0 ? _process_env_NEXT_PUBLIC_API_URL : "http://localhost:4000/api";
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
    return queryString ? "".concat(path, "?").concat(queryString) : path;
};
async function apiFetch(path, session, init) {
    var _init_headers;
    const response = await fetch("".concat(API_URL).concat(path), {
        ...init,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(session.accessToken),
            ...(_init_headers = init === null || init === void 0 ? void 0 : init.headers) !== null && _init_headers !== void 0 ? _init_headers : {}
        }
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
}
async function login(email, password) {
    const response = await fetch("".concat(API_URL, "/auth/login"), {
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
    const response = await fetch("".concat(API_URL, "/identity/public/providers?tenantSlug=").concat(encodeURIComponent(tenantSlug)));
    if (!response.ok) {
        throw new Error("Falha ao carregar providers corporativos");
    }
    return response.json();
}
async function startOidcLogin(providerSlug, payload) {
    const response = await fetch("".concat(API_URL, "/identity/public/oidc/").concat(providerSlug, "/start"), {
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
    const response = await fetch("".concat(API_URL, "/identity/public/oidc/").concat(providerSlug, "/exchange"), {
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
    return apiFetch("/products/".concat(id), session, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}
async function inactivateProduct(id, session) {
    return apiFetch("/products/".concat(id), session, {
        method: "DELETE"
    });
}
async function previewProductImport(file, session) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("".concat(API_URL, "/products/import/preview"), {
        method: "POST",
        headers: {
            Authorization: "Bearer ".concat(session.accessToken)
        },
        body: formData
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
}
async function confirmProductImport(batchId, mapping, session) {
    return apiFetch("/products/import/".concat(batchId, "/confirm"), session, {
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
    var _template_versions_, _template_versions, _template_dataFields;
    if (id === "new") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInitialDocument"])();
    }
    const template = await apiFetch("/templates/".concat(id), session);
    const latestSnapshot = (_template_versions = template.versions) === null || _template_versions === void 0 ? void 0 : (_template_versions_ = _template_versions[0]) === null || _template_versions_ === void 0 ? void 0 : _template_versions_.snapshotJson;
    var _latestSnapshot_document, _latestSnapshot_settings, _ref, _latestSnapshot_dataSchema, _ref1, _ref2, _latestSnapshot_metadata, _ref3, _latestSnapshot_elements;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInitialDocument"])({
        id: template.id,
        name: template.name,
        version: template.currentVersion,
        status: String(template.status).toLowerCase(),
        document: (_latestSnapshot_document = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.document) !== null && _latestSnapshot_document !== void 0 ? _latestSnapshot_document : template.documentJson,
        settings: (_ref = (_latestSnapshot_settings = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.settings) !== null && _latestSnapshot_settings !== void 0 ? _latestSnapshot_settings : template.settingsJson) !== null && _ref !== void 0 ? _ref : {},
        dataSchema: (_ref2 = (_ref1 = (_latestSnapshot_dataSchema = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.dataSchema) !== null && _latestSnapshot_dataSchema !== void 0 ? _latestSnapshot_dataSchema : template.dataSchemaJson) !== null && _ref1 !== void 0 ? _ref1 : (_template_dataFields = template.dataFields) === null || _template_dataFields === void 0 ? void 0 : _template_dataFields.map((field)=>{
            var _field_formatConfigJson;
            return {
                key: field.key,
                label: field.label,
                type: field.type,
                required: field.required,
                description: field.description,
                sampleValue: field.sampleValue,
                fallbackValue: field.fallbackValue,
                formatType: field.formatType,
                formatConfig: (_field_formatConfigJson = field.formatConfigJson) !== null && _field_formatConfigJson !== void 0 ? _field_formatConfigJson : {}
            };
        })) !== null && _ref2 !== void 0 ? _ref2 : [],
        metadata: (_ref3 = (_latestSnapshot_metadata = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.metadata) !== null && _latestSnapshot_metadata !== void 0 ? _latestSnapshot_metadata : template.metadataJson) !== null && _ref3 !== void 0 ? _ref3 : {},
        elements: (_latestSnapshot_elements = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.elements) !== null && _latestSnapshot_elements !== void 0 ? _latestSnapshot_elements : []
    });
}
async function fetchTemplateVersions(id, session) {
    return apiFetch("/templates/".concat(id, "/versions"), session);
}
async function fetchTemplateApprovals(id, session) {
    return apiFetch("/templates/".concat(id, "/approvals"), session);
}
async function saveTemplate(document, session, options) {
    var _options_versionNotes;
    const payload = {
        name: document.name,
        status: document.status,
        document: document.document,
        elements: document.elements,
        dataSchema: document.dataSchema,
        settings: document.settings,
        metadata: document.metadata,
        versionNotes: (_options_versionNotes = options === null || options === void 0 ? void 0 : options.versionNotes) !== null && _options_versionNotes !== void 0 ? _options_versionNotes : "Salvo pelo editor web"
    };
    const isNew = document.id === "template-new";
    return apiFetch(isNew ? "/templates" : "/templates/".concat(document.id), session, {
        method: isNew ? "POST" : "PUT",
        body: JSON.stringify(payload)
    });
}
async function submitTemplateReview(id, payload, session) {
    return apiFetch("/templates/".concat(id, "/review"), session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function decideTemplateApproval(id, payload, session) {
    return apiFetch("/templates/".concat(id, "/approval"), session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function publishTemplate(id, session, payload) {
    return apiFetch("/templates/".concat(id, "/publish"), session, {
        method: "POST",
        body: JSON.stringify(payload !== null && payload !== void 0 ? payload : {})
    });
}
async function createTemplateVersion(id, payload, session) {
    return apiFetch("/templates/".concat(id, "/versions"), session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function compareTemplateVersions(id, version, againstVersion, session) {
    return apiFetch("/templates/".concat(id, "/versions/").concat(version, "/compare/").concat(againstVersion), session);
}
async function rollbackTemplateVersion(id, version, payload, session) {
    return apiFetch("/templates/".concat(id, "/versions/").concat(version, "/rollback"), session, {
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
    return apiFetch("/agents/".concat(id, "/rotate-token"), session, {
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
    return apiFetch("/printers/".concat(id, "/agent"), session, {
        method: "POST",
        body: JSON.stringify({
            agentNodeId
        })
    });
}
async function updatePrinterStatus(id, isActive, session) {
    return apiFetch("/printers/".concat(id, "/status"), session, {
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
    return apiFetch("/print-jobs/".concat(id), session);
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
    return apiFetch("/print-jobs/".concat(id, "/events"), session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function reprintJob(id, payload, session) {
    return apiFetch("/print-jobs/".concat(id, "/reprint"), session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function retryJob(id, payload, session) {
    return apiFetch("/print-jobs/".concat(id, "/retry"), session, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
async function cancelJob(id, session) {
    return apiFetch("/print-jobs/".concat(id, "/cancel"), session, {
        method: "POST"
    });
}
async function fetchAssets(session) {
    return apiFetch("/file-assets", session);
}
async function uploadAsset(file, session) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("".concat(API_URL, "/file-assets/upload"), {
        method: "POST",
        headers: {
            Authorization: "Bearer ".concat(session.accessToken)
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/app/session-guard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SessionGuard",
    ()=>SessionGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/session.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function SessionGuard(param) {
    let { children, onSession } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SessionGuard.useEffect": ()=>{
            let active = true;
            const bootstrapSession = {
                "SessionGuard.useEffect.bootstrapSession": async ()=>{
                    const storedSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadStoredSession"])();
                    if (!storedSession) {
                        router.replace("/login");
                        return;
                    }
                    try {
                        const refreshedSession = {
                            accessToken: storedSession.accessToken,
                            session: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMe"])(storedSession)
                        };
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storeSession"])(refreshedSession);
                        if (!active) return;
                        onSession === null || onSession === void 0 ? void 0 : onSession(refreshedSession);
                        setReady(true);
                    } catch (e) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSession"])();
                        if (!active) return;
                        router.replace("/login");
                    }
                }
            }["SessionGuard.useEffect.bootstrapSession"];
            void bootstrapSession();
            return ({
                "SessionGuard.useEffect": ()=>{
                    active = false;
                }
            })["SessionGuard.useEffect"];
        }
    }["SessionGuard.useEffect"], [
        onSession,
        router
    ]);
    if (!ready) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "shell",
            style: {
                display: "grid",
                placeItems: "center"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(SessionGuard, "Y1I7BYRoEDptsXuBAVTFZEyapYQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SessionGuard;
var _c;
__turbopack_context__.k.register(_c, "SessionGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/template/barcode.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/editor-text.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
const countOccurrences = (value, pattern)=>{
    var _value_match;
    return ((_value_match = value.match(pattern)) !== null && _value_match !== void 0 ? _value_match : []).length;
};
const getMeasurementContext = ()=>{
    if (typeof document === "undefined") {
        return null;
    }
    if (!measurementCanvas) {
        measurementCanvas = document.createElement("canvas");
    }
    return measurementCanvas.getContext("2d");
};
const buildFontDescriptor = (element, fontSizePx)=>"".concat(element.fontStyle, " ").concat(element.fontWeight, " ").concat(fontSizePx, "px ").concat(element.fontFamily);
const getBlockUnitSize = (value, scale, physical)=>physical ? "".concat(value !== null && value !== void 0 ? value : 0, "mm") : (value !== null && value !== void 0 ? value : 0) * scale;
const getSpacingUnitSize = (value, scale, physical)=>physical ? "".concat(pointsToMillimeters(value !== null && value !== void 0 ? value : 0), "mm") : getScaledTextFontSize(value !== null && value !== void 0 ? value : 0, scale);
const getHorizontalPaddingUnits = (element)=>{
    var _element_paddingLeft, _element_paddingRight;
    return ((_element_paddingLeft = element.paddingLeft) !== null && _element_paddingLeft !== void 0 ? _element_paddingLeft : 0) + ((_element_paddingRight = element.paddingRight) !== null && _element_paddingRight !== void 0 ? _element_paddingRight : 0);
};
const getVerticalPaddingUnits = (element)=>{
    var _element_paddingTop, _element_paddingBottom;
    return ((_element_paddingTop = element.paddingTop) !== null && _element_paddingTop !== void 0 ? _element_paddingTop : 0) + ((_element_paddingBottom = element.paddingBottom) !== null && _element_paddingBottom !== void 0 ? _element_paddingBottom : 0);
};
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
        const next = "".concat(current).concat(character);
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
            const next = "".concat(current).concat(segment);
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
const getTextElementStyle = function(element) {
    let scale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, options = arguments.length > 2 ? arguments[2] : void 0;
    const physical = Boolean(options === null || options === void 0 ? void 0 : options.physical);
    const isJustified = element.align === "justify";
    var _element_wrapMode;
    const wrapMode = (_element_wrapMode = element.wrapMode) !== null && _element_wrapMode !== void 0 ? _element_wrapMode : "wrap";
    var _element_overflowMode;
    return {
        width: "100%",
        height: "100%",
        overflow: (_element_overflowMode = element.overflowMode) !== null && _element_overflowMode !== void 0 ? _element_overflowMode : "hidden",
        boxSizing: "border-box",
        paddingTop: getBlockUnitSize(element.paddingTop, scale, physical),
        paddingRight: getBlockUnitSize(element.paddingRight, scale, physical),
        paddingBottom: getBlockUnitSize(element.paddingBottom, scale, physical),
        paddingLeft: getBlockUnitSize(element.paddingLeft, scale, physical),
        color: element.color,
        fontFamily: element.fontFamily,
        fontSize: physical ? "".concat(pointsToMillimeters(element.fontSize), "mm") : getScaledTextFontSize(element.fontSize, scale),
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
const measureTextElementHeight = function(element, content) {
    let widthUnits = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : element.width, unitScale = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : EDITOR_UNIT_SCALE;
    const context = getMeasurementContext();
    if (!context) {
        return Math.max(element.height, MIN_TEXT_HEIGHT_UNITS);
    }
    const fontSizePx = Math.max(1, getScaledTextFontSize(element.fontSize, unitScale));
    const horizontalPaddingPx = getHorizontalPaddingUnits(element) * unitScale;
    const verticalPaddingPx = getVerticalPaddingUnits(element) * unitScale;
    const maxWidthPx = Math.max(fontSizePx, widthUnits * unitScale - horizontalPaddingPx);
    var _element_letterSpacing;
    const letterSpacingPx = getScaledTextFontSize((_element_letterSpacing = element.letterSpacing) !== null && _element_letterSpacing !== void 0 ? _element_letterSpacing : 0, unitScale);
    var _element_wordSpacing;
    const wordSpacingPx = getScaledTextFontSize((_element_wordSpacing = element.wordSpacing) !== null && _element_wordSpacing !== void 0 ? _element_wordSpacing : 0, unitScale);
    context.font = buildFontDescriptor(element, fontSizePx);
    var _element_wrapMode;
    const wrappedLines = ((_element_wrapMode = element.wrapMode) !== null && _element_wrapMode !== void 0 ? _element_wrapMode : "wrap") === "nowrap" ? normalizeContent(content).split("\n") : normalizeContent(content).split("\n").flatMap((line, index)=>{
        var _element_textIndent;
        return wrapLine(line, index === 0 ? Math.max(fontSizePx, maxWidthPx - ((_element_textIndent = element.textIndent) !== null && _element_textIndent !== void 0 ? _element_textIndent : 0) * unitScale) : maxWidthPx, context, element, letterSpacingPx, wordSpacingPx);
    });
    const lineCount = Math.max(1, wrappedLines.length);
    const heightPx = lineCount * fontSizePx * element.lineHeight + fontSizePx * 0.35 + verticalPaddingPx;
    const heightUnits = Number((heightPx / unitScale).toFixed(2));
    return Math.max(MIN_TEXT_HEIGHT_UNITS, heightUnits);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/editor/barcode-symbol.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BarcodeSymbol",
    ()=>BarcodeSymbol
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
"use client";
;
;
const DynamicBarcodeSymbolRenderer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/apps/web/components/editor/barcode-symbol-renderer.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((module)=>module.BarcodeSymbolRenderer), {
    loadableGenerated: {
        modules: [
            "[project]/apps/web/components/editor/barcode-symbol-renderer.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c = DynamicBarcodeSymbolRenderer;
function BarcodeSymbol(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DynamicBarcodeSymbolRenderer, {
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/components/editor/barcode-symbol.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, this);
}
_c1 = BarcodeSymbol;
var _c, _c1;
__turbopack_context__.k.register(_c, "DynamicBarcodeSymbolRenderer");
__turbopack_context__.k.register(_c1, "BarcodeSymbol");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/editor/qr-symbol.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QrSymbol",
    ()=>QrSymbol
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
"use client";
;
;
const DynamicQrSymbolRenderer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/apps/web/components/editor/qr-symbol-renderer.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((module)=>module.QrSymbolRenderer), {
    loadableGenerated: {
        modules: [
            "[project]/apps/web/components/editor/qr-symbol-renderer.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-hidden": "true",
            style: {
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center",
                background: "repeating-linear-gradient(45deg, rgba(17,24,39,0.08) 0 6px, rgba(255,255,255,0.9) 6px 12px)"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c = DynamicQrSymbolRenderer;
function QrSymbol(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DynamicQrSymbolRenderer, {
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/components/editor/qr-symbol.tsx",
        lineNumber: 36,
        columnNumber: 10
    }, this);
}
_c1 = QrSymbol;
var _c, _c1;
__turbopack_context__.k.register(_c, "DynamicQrSymbolRenderer");
__turbopack_context__.k.register(_c1, "QrSymbol");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/editor/document-renderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelDocumentSurface",
    ()=>LabelDocumentSurface,
    "LabelElementContent",
    ()=>LabelElementContent,
    "getElementFrameStyle",
    ()=>getElementFrameStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/barcode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/editor-text.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$barcode$2d$symbol$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/barcode-symbol.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$qr$2d$symbol$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/qr-symbol.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const sizeValue = (value, scale, useMm)=>useMm ? "".concat(value, "mm") : value * scale;
const getElementFrameStyle = (element, scale, usePhysicalUnits, extra)=>({
        position: "absolute",
        left: sizeValue(element.x, scale, usePhysicalUnits),
        top: sizeValue(element.y, scale, usePhysicalUnits),
        width: sizeValue(element.width, scale, usePhysicalUnits),
        height: sizeValue(element.height, scale, usePhysicalUnits),
        transform: "rotate(".concat(element.rotation, "deg)"),
        transformOrigin: "center center",
        display: element.visible ? "block" : "none",
        ...extra
    });
function LabelElementContent(param) {
    let { document, element, scale = 1, previewPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildPreviewPayload"])(document), usePhysicalUnits = false, textOverride, textChildren } = param;
    if (element.type === "text") {
        const content = textOverride !== null && textOverride !== void 0 ? textOverride : (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveTextElementContent"])(document, element, previewPayload);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$editor$2d$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTextElementStyle"])(element, scale, {
                physical: usePhysicalUnits
            }),
            children: textChildren !== null && textChildren !== void 0 ? textChildren : content
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this);
    }
    if (element.type === "shape") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                background: element.fill,
                border: "".concat(Math.max(1, element.strokeWidth * scale), "px solid ").concat(element.stroke),
                borderRadius: element.borderRadius * scale
            }
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/document-renderer.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this);
    }
    if (element.type === "line") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
        const rawValue = element.bindingKey ? String((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveFieldPreviewValue"])(document, element.bindingKey, previewPayload) || element.value) : element.value;
        const resolvedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeBarcodeText"])(element.format, rawValue);
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateBarcodeValue"])(element.format, resolvedValue);
        const minimumSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBarcodeMinimumSize"])(element.format);
        const sizeWarning = element.width < minimumSize.widthMm || element.height < minimumSize.heightMm ? "Minimo recomendado: ".concat(minimumSize.widthMm, " x ").concat(minimumSize.heightMm, " mm.") : null;
        if (!validation.valid) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    padding: usePhysicalUnits ? "1mm" : Math.max(4, scale * 0.6),
                    border: "".concat(usePhysicalUnits ? "0.25mm" : Math.max(1, scale * 0.3), " solid #b91c1c"),
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                display: "block",
                background: "#ffffff",
                border: sizeWarning ? "".concat(usePhysicalUnits ? "0.2mm" : Math.max(1, scale * 0.25), " solid #d97706") : "none",
                boxSizing: "border-box"
            },
            title: sizeWarning !== null && sizeWarning !== void 0 ? sizeWarning : undefined,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$barcode$2d$symbol$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarcodeSymbol"], {
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
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateQrCodeValue"])(element.value);
        if (!validation.valid) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    padding: usePhysicalUnits ? "1mm" : Math.max(4, scale * 0.6),
                    border: "".concat(usePhysicalUnits ? "0.25mm" : Math.max(1, scale * 0.3), " solid #b91c1c"),
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                padding: Math.max(2, scale * 0.4),
                background: "#ffffff",
                border: "".concat(Math.max(1, scale * 0.35), "px solid #111827")
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$qr$2d$symbol$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QrSymbol"], {
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
        var _element_objectFit;
        const objectFit = (_element_objectFit = element.objectFit) !== null && _element_objectFit !== void 0 ? _element_objectFit : element.fit === "stretch" ? "fill" : element.fit;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                border: element.src ? "none" : "".concat(Math.max(1, scale * 0.35), "px dashed #94a3b8"),
                display: "grid",
                placeItems: "center",
                color: "#64748b",
                background: element.src ? "transparent" : "rgba(148, 163, 184, 0.08)",
                opacity: element.opacity,
                overflow: "hidden",
                boxSizing: "border-box"
            },
            children: element.src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%",
            height: "100%",
            border: "".concat(Math.max(1, scale * 0.35), "px dashed #94a3b8"),
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
_c = LabelElementContent;
function LabelDocumentSurface(param) {
    let { document, scale, previewPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildPreviewPayload"])(document), containerStyle, surfaceStyle, renderElement, mode = "screen" } = param;
    const usePhysicalUnits = mode === "physical" && document.document.unit === "mm";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: usePhysicalUnits ? "".concat(document.document.width, "mm") : document.document.width * scale,
            height: usePhysicalUnits ? "".concat(document.document.height, "mm") : document.document.height * scale,
            ...containerStyle
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: getElementFrameStyle(element, scale, usePhysicalUnits),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LabelElementContent, {
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
_c1 = LabelDocumentSurface;
var _c, _c1;
__turbopack_context__.k.register(_c, "LabelElementContent");
__turbopack_context__.k.register(_c1, "LabelDocumentSurface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/editor/label-preview-surface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelPreviewSurface",
    ()=>LabelPreviewSurface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$document$2d$renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/document-renderer.tsx [app-client] (ecmascript)");
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
function LabelPreviewSurface(param) {
    let { document, scale, previewPayload, preset = "editor", containerStyle, surfaceStyle, mode = "screen" } = param;
    const presetStyles = PRESET_STYLES[preset];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$document$2d$renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelDocumentSurface"], {
        document: document,
        scale: scale,
        previewPayload: previewPayload !== null && previewPayload !== void 0 ? previewPayload : (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildPreviewPayload"])(document),
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
_c = LabelPreviewSurface;
var _c;
__turbopack_context__.k.register(_c, "LabelPreviewSurface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/print/label-print-portal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelPrintPortal",
    ()=>LabelPrintPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function LabelPrintPortal(param) {
    let { children } = param;
    _s();
    const [host, setHost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LabelPrintPortal.useEffect": ()=>{
            const node = document.createElement("div");
            node.className = "label-print-portal-host";
            document.body.appendChild(node);
            setHost(node);
            return ({
                "LabelPrintPortal.useEffect": ()=>{
                    node.remove();
                    setHost(null);
                }
            })["LabelPrintPortal.useEffect"];
        }
    }["LabelPrintPortal.useEffect"], []);
    if (!host) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(children, host);
}
_s(LabelPrintPortal, "3jQ5s649gL97MFLh66PbFYA2Jbc=");
_c = LabelPrintPortal;
var _c;
__turbopack_context__.k.register(_c, "LabelPrintPortal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/barcode-validation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getScannableValidationErrors",
    ()=>getScannableValidationErrors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/barcode.ts [app-client] (ecmascript)");
;
;
function getScannableValidationErrors(document, previewPayload) {
    return document.elements.flatMap((element)=>{
        if (element.type === "barcode") {
            const rawValue = element.bindingKey ? String((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveFieldPreviewValue"])(document, element.bindingKey, previewPayload) || element.value) : element.value;
            const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeBarcodeText"])(element.format, rawValue);
            const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateBarcodeValue"])(element.format, value);
            var _validation_message;
            return validation.valid ? [] : [
                "".concat(element.name, ": ").concat((_validation_message = validation.message) !== null && _validation_message !== void 0 ? _validation_message : "codigo de barras invalido")
            ];
        }
        if (element.type === "qrcode") {
            const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$barcode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateQrCodeValue"])(element.value);
            var _validation_message1;
            return validation.valid ? [] : [
                "".concat(element.name, ": ").concat((_validation_message1 = validation.message) !== null && _validation_message1 !== void 0 ? _validation_message1 : "QR Code invalido")
            ];
        }
        return [];
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/ui/label-format-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelFormatSelector",
    ()=>LabelFormatSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$CardActionArea$2f$CardActionArea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardActionArea$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/CardActionArea/CardActionArea.mjs [app-client] (ecmascript) <export default as CardActionArea>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Chip/Chip.mjs [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Stack/Stack.mjs [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Tab/Tab.mjs [app-client] (ecmascript) <export default as Tab>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Tabs$2f$Tabs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Tabs/Tabs.mjs [app-client] (ecmascript) <export default as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function LabelFormatSelector(param) {
    let { categories, formats, value, onChange } = param;
    var _categories_;
    _s();
    const selectedFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LabelFormatSelector.useMemo[selectedFormat]": ()=>{
            var _formats_find, _ref;
            return (_ref = (_formats_find = formats.find({
                "LabelFormatSelector.useMemo[selectedFormat]": (format)=>format.id === value
            }["LabelFormatSelector.useMemo[selectedFormat]"])) !== null && _formats_find !== void 0 ? _formats_find : formats[0]) !== null && _ref !== void 0 ? _ref : null;
        }
    }["LabelFormatSelector.useMemo[selectedFormat]"], [
        formats,
        value
    ]);
    var _selectedFormat_category, _ref;
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((_ref = (_selectedFormat_category = selectedFormat === null || selectedFormat === void 0 ? void 0 : selectedFormat.category) !== null && _selectedFormat_category !== void 0 ? _selectedFormat_category : (_categories_ = categories[0]) === null || _categories_ === void 0 ? void 0 : _categories_.id) !== null && _ref !== void 0 ? _ref : "all");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LabelFormatSelector.useEffect": ()=>{
            if (selectedFormat === null || selectedFormat === void 0 ? void 0 : selectedFormat.category) {
                setActiveCategory(selectedFormat.category);
            }
        }
    }["LabelFormatSelector.useEffect"], [
        selectedFormat === null || selectedFormat === void 0 ? void 0 : selectedFormat.category
    ]);
    const visibleFormats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LabelFormatSelector.useMemo[visibleFormats]": ()=>formats.filter({
                "LabelFormatSelector.useMemo[visibleFormats]": (format)=>format.category === activeCategory
            }["LabelFormatSelector.useMemo[visibleFormats]"])
    }["LabelFormatSelector.useMemo[visibleFormats]"], [
        activeCategory,
        formats
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
        spacing: 2,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Tabs$2f$Tabs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__["Tabs"], {
                value: activeCategory,
                onChange: (_, nextValue)=>setActiveCategory(nextValue),
                variant: "scrollable",
                scrollButtons: "auto",
                allowScrollButtonsMobile: true,
                children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                        value: category.id,
                        label: category.label
                    }, category.id, false, {
                        fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(1, minmax(0, 1fr))",
                        sm: "repeat(2, minmax(0, 1fr))"
                    },
                    gap: 1.5
                },
                children: visibleFormats.map((format)=>{
                    const active = format.id === value;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            borderRadius: 2.5,
                            overflow: "hidden",
                            border: active ? "1px solid rgba(15, 118, 110, 0.24)" : "1px solid rgba(15, 23, 42, 0.08)",
                            background: active ? "rgba(15, 118, 110, 0.08)" : "#fff"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$CardActionArea$2f$CardActionArea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardActionArea$3e$__["CardActionArea"], {
                            onClick: ()=>onChange(format.id),
                            sx: {
                                p: 1.75
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                spacing: 0.9,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                        direction: "row",
                                        spacing: 1,
                                        sx: {
                                            justifyContent: "space-between"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle2",
                                                sx: {
                                                    color: active ? "primary.main" : "text.primary"
                                                },
                                                children: format.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                                                lineNumber: 92,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                size: "small",
                                                variant: active ? "filled" : "outlined",
                                                color: active ? "primary" : "default",
                                                label: format.shape
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                                                lineNumber: 95,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                                        lineNumber: 91,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: [
                                            format.widthMm,
                                            " x ",
                                            format.heightMm,
                                            " mm"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this),
                                    format.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        children: format.description
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                                        lineNumber: 106,
                                        columnNumber: 21
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                                lineNumber: 90,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                            lineNumber: 89,
                            columnNumber: 15
                        }, this)
                    }, format.id, false, {
                        fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                        lineNumber: 78,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/ui/label-format-selector.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(LabelFormatSelector, "RD+F3/uZ6FdolOJoMhSg9WJeDKM=");
_c = LabelFormatSelector;
var _c;
__turbopack_context__.k.register(_c, "LabelFormatSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/ui/page-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageSection",
    ()=>PageSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Paper/Paper.mjs [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Stack/Stack.mjs [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
;
;
function PageSection(param) {
    let { title, description, action, children, contentSx, ...paperProps } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
        ...paperProps,
        sx: {
            p: {
                xs: 2,
                md: 2.5
            },
            ...paperProps.sx
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
            spacing: 2.25,
            children: [
                title || description || action ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                    direction: {
                        xs: "column",
                        md: "row"
                    },
                    spacing: 2,
                    sx: {
                        alignItems: {
                            xs: "flex-start",
                            md: "center"
                        },
                        justifyContent: "space-between"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            children: [
                                title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "h5",
                                    component: "h2",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/ui/page-section.tsx",
                                    lineNumber: 38,
                                    columnNumber: 17
                                }, this) : null,
                                description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "body2",
                                    color: "text.secondary",
                                    sx: {
                                        mt: 0.5,
                                        maxWidth: 820
                                    },
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/ui/page-section.tsx",
                                    lineNumber: 43,
                                    columnNumber: 17
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/ui/page-section.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this),
                        action
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/ui/page-section.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: contentSx,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/ui/page-section.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/ui/page-section.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/ui/page-section.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = PageSection;
var _c;
__turbopack_context__.k.register(_c, "PageSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/label-format-registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
const findLabelFormatByDimensions = (widthMm, heightMm)=>{
    var _LABEL_FORMATS_find;
    return (_LABEL_FORMATS_find = LABEL_FORMATS.find((format)=>format.widthMm === widthMm && format.heightMm === heightMm)) !== null && _LABEL_FORMATS_find !== void 0 ? _LABEL_FORMATS_find : LABEL_FORMATS.find((format)=>format.widthMm === heightMm && format.heightMm === widthMm);
};
const listFormatsByCategory = (categoryId)=>LABEL_FORMATS.filter((format)=>format.category === categoryId);
const listFormats = ()=>LABEL_FORMATS;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/label-typography.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LABEL_TYPOGRAPHY",
    ()=>LABEL_TYPOGRAPHY,
    "getTypography",
    ()=>getTypography
]);
const LABEL_TYPOGRAPHY = {
    title: {
        fontSize: 10.5,
        fontWeight: 700
    },
    product: {
        fontSize: 9,
        fontWeight: 700
    },
    price: {
        fontSize: 12,
        fontWeight: 700
    },
    responsibleLabel: {
        fontSize: 8.25,
        fontWeight: 600
    },
    responsibleName: {
        fontSize: 10.5,
        fontWeight: 600
    }
};
const getTypography = (key)=>LABEL_TYPOGRAPHY[key];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/quick-label-builder.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildQuickLabelDocument",
    ()=>buildQuickLabelDocument,
    "buildQuickPreviewPayload",
    ()=>buildQuickPreviewPayload,
    "getDefaultQuickForm",
    ()=>getDefaultQuickForm,
    "listFormatOptions",
    ()=>listFormatOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/label-format-registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/label-typography.ts [app-client] (ecmascript)");
;
;
const FOOTER_LINES = [
    "Pascal Fast Food.",
    "Rua Victorio Viezzer, 588. Vista Alegre. Curitiba - Parana."
];
const baseText = (overrides)=>{
    var _overrides_id, _overrides_name, _overrides_x, _overrides_y, _overrides_width, _overrides_height, _overrides_zIndex, _overrides_contentMode, _overrides_text, _overrides_fontSize, _overrides_fontFamily, _overrides_fontWeight, _ref, _overrides_fontStyle, _overrides_textDecoration, _overrides_lineHeight, _overrides_color, _overrides_align;
    return {
        id: (_overrides_id = overrides.id) !== null && _overrides_id !== void 0 ? _overrides_id : "text",
        type: "text",
        name: (_overrides_name = overrides.name) !== null && _overrides_name !== void 0 ? _overrides_name : "text",
        x: (_overrides_x = overrides.x) !== null && _overrides_x !== void 0 ? _overrides_x : 0,
        y: (_overrides_y = overrides.y) !== null && _overrides_y !== void 0 ? _overrides_y : 0,
        width: (_overrides_width = overrides.width) !== null && _overrides_width !== void 0 ? _overrides_width : 20,
        height: (_overrides_height = overrides.height) !== null && _overrides_height !== void 0 ? _overrides_height : 6,
        rotation: 0,
        visible: true,
        locked: false,
        zIndex: (_overrides_zIndex = overrides.zIndex) !== null && _overrides_zIndex !== void 0 ? _overrides_zIndex : 1,
        contentMode: (_overrides_contentMode = overrides.contentMode) !== null && _overrides_contentMode !== void 0 ? _overrides_contentMode : "static",
        text: (_overrides_text = overrides.text) !== null && _overrides_text !== void 0 ? _overrides_text : "",
        bindingKey: overrides.bindingKey,
        placeholder: overrides.placeholder,
        fontSize: (_overrides_fontSize = overrides.fontSize) !== null && _overrides_fontSize !== void 0 ? _overrides_fontSize : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("product").fontSize,
        fontFamily: (_overrides_fontFamily = overrides.fontFamily) !== null && _overrides_fontFamily !== void 0 ? _overrides_fontFamily : "Inter",
        fontWeight: (_ref = (_overrides_fontWeight = overrides.fontWeight) !== null && _overrides_fontWeight !== void 0 ? _overrides_fontWeight : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("product").fontWeight) !== null && _ref !== void 0 ? _ref : 600,
        fontStyle: (_overrides_fontStyle = overrides.fontStyle) !== null && _overrides_fontStyle !== void 0 ? _overrides_fontStyle : "normal",
        textDecoration: (_overrides_textDecoration = overrides.textDecoration) !== null && _overrides_textDecoration !== void 0 ? _overrides_textDecoration : "none",
        lineHeight: (_overrides_lineHeight = overrides.lineHeight) !== null && _overrides_lineHeight !== void 0 ? _overrides_lineHeight : 1.2,
        color: (_overrides_color = overrides.color) !== null && _overrides_color !== void 0 ? _overrides_color : "#0f172a",
        align: (_overrides_align = overrides.align) !== null && _overrides_align !== void 0 ? _overrides_align : "left"
    };
};
const baseBarcode = (overrides)=>{
    var _overrides_id, _overrides_name, _overrides_x, _overrides_y, _overrides_width, _overrides_height, _overrides_zIndex, _overrides_value, _overrides_format, _overrides_showHumanReadable;
    return {
        id: (_overrides_id = overrides.id) !== null && _overrides_id !== void 0 ? _overrides_id : "barcode",
        type: "barcode",
        name: (_overrides_name = overrides.name) !== null && _overrides_name !== void 0 ? _overrides_name : "barcode",
        x: (_overrides_x = overrides.x) !== null && _overrides_x !== void 0 ? _overrides_x : 0,
        y: (_overrides_y = overrides.y) !== null && _overrides_y !== void 0 ? _overrides_y : 0,
        width: (_overrides_width = overrides.width) !== null && _overrides_width !== void 0 ? _overrides_width : 30,
        height: (_overrides_height = overrides.height) !== null && _overrides_height !== void 0 ? _overrides_height : 14,
        rotation: 0,
        visible: true,
        locked: false,
        zIndex: (_overrides_zIndex = overrides.zIndex) !== null && _overrides_zIndex !== void 0 ? _overrides_zIndex : 5,
        value: (_overrides_value = overrides.value) !== null && _overrides_value !== void 0 ? _overrides_value : "123456789012",
        format: (_overrides_format = overrides.format) !== null && _overrides_format !== void 0 ? _overrides_format : "CODE128",
        showHumanReadable: (_overrides_showHumanReadable = overrides.showHumanReadable) !== null && _overrides_showHumanReadable !== void 0 ? _overrides_showHumanReadable : true
    };
};
const computeLayout = (format)=>{
    const margin = 3;
    const width = format.widthMm;
    const height = format.heightMm;
    const halfWidth = Math.max(22, (width - margin * 3) / 2);
    const titleY = margin;
    const productY = titleY + 8.5;
    const infoY = productY + 11.5;
    const valueY = infoY + 6;
    const datesY = valueY + 9;
    const barcodeHeight = 14;
    const barcodeY = Math.max(datesY + 10, height - barcodeHeight - 13);
    const footerY = Math.min(height - 9, barcodeY + barcodeHeight + 3);
    return {
        width,
        height,
        title: {
            x: margin,
            y: titleY,
            width: width - margin * 2,
            height: 7.5
        },
        product: {
            x: margin,
            y: productY,
            width: width - margin * 2,
            height: 9.5
        },
        responsibleLabel: {
            x: margin,
            y: infoY,
            width: halfWidth,
            height: 4.5
        },
        responsible: {
            x: margin,
            y: valueY,
            width: halfWidth,
            height: 7.5
        },
        quantityLabel: {
            x: margin * 2 + halfWidth,
            y: infoY,
            width: width - halfWidth - margin * 3,
            height: 4.5
        },
        quantity: {
            x: margin * 2 + halfWidth,
            y: valueY,
            width: width - halfWidth - margin * 3,
            height: 7.5
        },
        manufactured: {
            x: margin,
            y: datesY,
            width: halfWidth,
            height: 7
        },
        expires: {
            x: margin * 2 + halfWidth,
            y: datesY,
            width: width - halfWidth - margin * 3,
            height: 7
        },
        barcode: {
            x: margin,
            y: barcodeY,
            width: width - margin * 2,
            height: barcodeHeight
        },
        footerY
    };
};
function buildQuickLabelDocument(form) {
    let format = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultLabelFormat"])();
    const layout = computeLayout(format);
    const elements = [
        baseText({
            id: "title",
            name: "Titulo",
            text: "Etiqueta",
            x: layout.title.x,
            y: layout.title.y,
            width: layout.title.width,
            height: layout.title.height,
            fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("title").fontSize,
            fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("title").fontWeight,
            zIndex: 1
        }),
        baseText({
            id: "product",
            name: "Produto",
            contentMode: "dynamic",
            bindingKey: "product",
            text: "Item",
            x: layout.product.x,
            y: layout.product.y,
            width: layout.product.width,
            height: layout.product.height,
            fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("product").fontSize,
            fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("product").fontWeight,
            zIndex: 2
        }),
        baseText({
            id: "responsible-label",
            name: "Responsavel label",
            text: "Responsavel",
            x: layout.responsibleLabel.x,
            y: layout.responsibleLabel.y,
            width: layout.responsibleLabel.width,
            height: layout.responsibleLabel.height,
            fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleLabel").fontSize,
            fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleLabel").fontWeight,
            zIndex: 3
        }),
        baseText({
            id: "responsible",
            name: "Responsavel",
            contentMode: "dynamic",
            bindingKey: "responsible",
            text: "Responsavel",
            x: layout.responsible.x,
            y: layout.responsible.y,
            width: layout.responsible.width,
            height: layout.responsible.height,
            fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleName").fontSize,
            fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleName").fontWeight,
            zIndex: 4
        }),
        baseText({
            id: "quantity-label",
            name: "Quantidade label",
            text: "Quantidade",
            x: layout.quantityLabel.x,
            y: layout.quantityLabel.y,
            width: layout.quantityLabel.width,
            height: layout.quantityLabel.height,
            fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleLabel").fontSize,
            fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleLabel").fontWeight,
            align: "right",
            zIndex: 3
        }),
        baseText({
            id: "quantity",
            name: "Quantidade",
            contentMode: "dynamic",
            bindingKey: "quantity",
            text: "1",
            x: layout.quantity.x,
            y: layout.quantity.y,
            width: layout.quantity.width,
            height: layout.quantity.height,
            fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleName").fontSize,
            fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleName").fontWeight,
            align: "right",
            zIndex: 4
        }),
        baseText({
            id: "manufactured",
            name: "Fabricacao",
            contentMode: "dynamic",
            bindingKey: "manufacturedAt",
            text: "Fabricacao",
            x: layout.manufactured.x,
            y: layout.manufactured.y,
            width: layout.manufactured.width,
            height: layout.manufactured.height,
            fontSize: 8,
            fontWeight: 600,
            zIndex: 4
        }),
        baseText({
            id: "expires",
            name: "Validade",
            contentMode: "dynamic",
            bindingKey: "expiresAt",
            text: "Validade",
            x: layout.expires.x,
            y: layout.expires.y,
            width: layout.expires.width,
            height: layout.expires.height,
            fontSize: 8,
            fontWeight: 600,
            align: "right",
            zIndex: 4
        }),
        baseBarcode({
            id: "barcode",
            name: "Codigo de barras",
            value: form.barcode || "123456789012",
            x: layout.barcode.x,
            y: layout.barcode.y,
            width: layout.barcode.width,
            height: layout.barcode.height
        }),
        baseText({
            id: "footer-1",
            name: "Origem linha 1",
            text: FOOTER_LINES[0],
            x: 3,
            y: layout.footerY,
            width: layout.width - 6,
            height: 5,
            fontSize: 6.2,
            fontWeight: 600
        }),
        baseText({
            id: "footer-2",
            name: "Origem linha 2",
            text: FOOTER_LINES[1],
            x: 3,
            y: layout.footerY + 5.8,
            width: layout.width - 6,
            height: 5,
            fontSize: 6,
            fontWeight: 600
        })
    ];
    const dataSchema = [
        {
            key: "product",
            label: "Produto",
            type: "text",
            required: true
        },
        {
            key: "responsible",
            label: "Responsavel",
            type: "text",
            required: true
        },
        {
            key: "quantity",
            label: "Quantidade",
            type: "number",
            required: true
        },
        {
            key: "manufacturedAt",
            label: "Fabricacao",
            type: "date",
            required: true
        },
        {
            key: "expiresAt",
            label: "Validade",
            type: "date",
            required: true
        },
        {
            key: "barcode",
            label: "Codigo de barras",
            type: "text",
            required: true
        }
    ];
    return {
        id: "quick-".concat(format.id),
        name: "Etiqueta ".concat(format.name),
        version: 1,
        status: "draft",
        document: {
            width: format.widthMm,
            height: format.heightMm,
            unit: "mm",
            orientation: format.widthMm >= format.heightMm ? "landscape" : "portrait",
            background: "#ffffff",
            dpi: 203
        },
        settings: {},
        dataSchema,
        elements,
        metadata: {
            formatId: format.id,
            shape: format.shape,
            category: format.category
        }
    };
}
function buildQuickPreviewPayload(form) {
    return {
        product: form.product,
        responsible: form.responsible,
        quantity: String(form.quantity),
        manufacturedAt: form.manufacturedAt,
        expiresAt: form.expiresAt,
        barcode: form.barcode
    };
}
const getDefaultQuickForm = ()=>{
    const defaultFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultLabelFormat"])();
    const today = new Date();
    const manufactured = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const expires = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    expires.setDate(expires.getDate() + 2);
    const expiresStr = expires.toISOString().slice(0, 10);
    return {
        formatId: defaultFormat.id,
        responsible: "",
        product: "",
        quantity: 1,
        manufacturedAt: manufactured,
        expiresAt: expiresStr,
        barcode: "123456789012"
    };
};
const listFormatOptions = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listFormats"])().map((format)=>({
            value: format.id,
            label: format.name,
            category: format.category,
            description: format.description
        }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/official-template-catalog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OFFICIAL_TEMPLATE_CATALOG",
    ()=>OFFICIAL_TEMPLATE_CATALOG,
    "OFFICIAL_TEMPLATE_FIELDS",
    ()=>OFFICIAL_TEMPLATE_FIELDS,
    "OFFICIAL_TEMPLATE_ORDER",
    ()=>OFFICIAL_TEMPLATE_ORDER,
    "getOfficialTemplateById",
    ()=>getOfficialTemplateById,
    "getOfficialTemplateDefaultFormat",
    ()=>getOfficialTemplateDefaultFormat,
    "getOfficialTemplateRecommendedFormats",
    ()=>getOfficialTemplateRecommendedFormats,
    "listOfficialTemplateFields",
    ()=>listOfficialTemplateFields,
    "listOfficialTemplates",
    ()=>listOfficialTemplates,
    "listOfficialTemplatesByOperationKind",
    ()=>listOfficialTemplatesByOperationKind,
    "listOfficialTemplatesByOrientation",
    ()=>listOfficialTemplatesByOrientation,
    "listSystemOfficialTemplateFields",
    ()=>listSystemOfficialTemplateFields,
    "listVisibleOfficialTemplateFields",
    ()=>listVisibleOfficialTemplateFields
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/label-format-registry.ts [app-client] (ecmascript)");
;
const OFFICIAL_TEMPLATE_FIELDS = {
    productName: {
        key: "productName",
        label: "Nome do produto",
        group: "core",
        type: "text",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "textarea",
        description: "Nome principal do produto usado no template oficial 60x40 de producao diaria.",
        sampleValue: "Sanduiche natural",
        schemaCompat: {
            type: "text"
        }
    },
    productDescription: {
        key: "productDescription",
        label: "Descricao do produto",
        group: "core",
        type: "text",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "textarea",
        description: "Nome comercial ou descricao curta do item impresso.",
        sampleValue: "Torta de frango cremosa",
        schemaCompat: {
            type: "text"
        }
    },
    manufacturingDate: {
        key: "manufacturingDate",
        label: "Data de fabricacao",
        group: "core",
        type: "date",
        required: true,
        source: "calculated",
        defaultStrategy: "today",
        editable: true,
        visibleInForm: true,
        inputControl: "date",
        description: "Data local atual aplicada automaticamente e ajustavel quando necessario.",
        sampleValue: "2026-04-07",
        schemaCompat: {
            type: "date",
            formatType: "date"
        }
    },
    expirationDate: {
        key: "expirationDate",
        label: "Data de validade",
        group: "core",
        type: "date",
        required: true,
        source: "calculated",
        defaultStrategy: "today_plus_2_days",
        editable: true,
        visibleInForm: true,
        inputControl: "date",
        description: "Nasce como fabricacao + 2 dias, mas pode ser alterada no fluxo rapido ou no modal.",
        sampleValue: "2026-04-09",
        schemaCompat: {
            type: "date",
            formatType: "date"
        }
    },
    time: {
        key: "time",
        label: "Hora",
        group: "core",
        type: "time",
        required: true,
        source: "calculated",
        defaultStrategy: "current_time",
        editable: true,
        visibleInForm: true,
        inputControl: "time",
        description: "Hora operacional da montagem ou impressao da etiqueta.",
        sampleValue: "14:30",
        schemaCompat: {
            type: "text"
        }
    },
    quantity: {
        key: "quantity",
        label: "Quantidade",
        group: "unit_pricing",
        type: "number",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "number",
        description: "Quantidade de unidades do produto quando o calculo nao e por peso.",
        sampleValue: 2,
        schemaCompat: {
            type: "number"
        }
    },
    unitPrice: {
        key: "unitPrice",
        label: "Preco por unidade",
        group: "unit_pricing",
        type: "currency",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "currency",
        description: "Preco unitario para etiquetas vendidas por unidade.",
        sampleValue: 12.9,
        schemaCompat: {
            type: "number",
            formatType: "currency",
            formatConfig: {
                currency: "BRL"
            }
        }
    },
    barcodeText: {
        key: "barcodeText",
        label: "Texto do codigo de barras",
        group: "code",
        type: "text",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: false,
        inputControl: "hidden",
        description: "Texto legivel associado ao codigo de barras no layout 60x40.",
        sampleValue: "7891234567890",
        schemaCompat: {
            type: "text"
        }
    },
    responsibleLabel: {
        key: "responsibleLabel",
        label: "Rotulo do responsavel",
        group: "system",
        type: "text",
        required: true,
        source: "system",
        defaultStrategy: "fixed_responsible_label",
        editable: false,
        visibleInForm: false,
        inputControl: "hidden",
        description: "Rotulo fixo usado antes do nome do responsavel na etiqueta 60x40.",
        sampleValue: "Resp. Equipe:",
        schemaCompat: {
            type: "text"
        }
    },
    responsibleName: {
        key: "responsibleName",
        label: "Nome do responsavel",
        group: "core",
        type: "text",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "text",
        description: "Nome do responsavel exibido na secao operacional da etiqueta 60x40.",
        sampleValue: "Equipe A",
        schemaCompat: {
            type: "text"
        }
    },
    weight: {
        key: "weight",
        label: "Peso",
        group: "weight_pricing",
        type: "number",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "number",
        description: "Peso liquido ou informado pela balanca.",
        sampleValue: 0.435,
        schemaCompat: {
            type: "number"
        }
    },
    tare: {
        key: "tare",
        label: "Tara",
        group: "weight_pricing",
        type: "number",
        required: false,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "number",
        description: "Peso da embalagem para operacoes por peso.",
        sampleValue: 0.02,
        schemaCompat: {
            type: "number"
        }
    },
    pricePerKg: {
        key: "pricePerKg",
        label: "Preco por kg",
        group: "weight_pricing",
        type: "currency",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "currency",
        description: "Preco base por quilograma para calculos por peso.",
        sampleValue: 48.9,
        schemaCompat: {
            type: "number",
            formatType: "currency",
            formatConfig: {
                currency: "BRL"
            }
        }
    },
    totalPrice: {
        key: "totalPrice",
        label: "Preco total",
        group: "unit_pricing",
        type: "currency",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "currency",
        description: "Valor total que aparece na faixa principal da etiqueta.",
        sampleValue: 25.8,
        schemaCompat: {
            type: "number",
            formatType: "currency",
            formatConfig: {
                currency: "BRL"
            }
        }
    },
    barcode: {
        key: "barcode",
        label: "Codigo de barras",
        group: "code",
        type: "barcode",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "barcode",
        description: "Valor usado pelo elemento barcode independente dentro do layout.",
        sampleValue: "7891234567890",
        schemaCompat: {
            type: "text"
        }
    },
    recipeLines: {
        key: "recipeLines",
        label: "Linhas de receita",
        group: "content",
        type: "list",
        required: false,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "list",
        description: "Lista de itens, ingredientes ou modo de preparo curto.",
        sampleValue: [
            "Farinha de trigo",
            "Frango desfiado",
            "Requeijao"
        ],
        schemaCompat: {
            type: "text"
        }
    },
    specialMessages: {
        key: "specialMessages",
        label: "Mensagens especiais",
        group: "content",
        type: "list",
        required: false,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "list",
        description: "Avisos extras como consumo preferencial, refrigeracao ou campanha.",
        sampleValue: [
            "Manter refrigerado",
            "Consumir em ate 24h apos aberto"
        ],
        schemaCompat: {
            type: "text"
        }
    },
    nutritionTable: {
        key: "nutritionTable",
        label: "Tabela nutricional",
        group: "nutrition",
        type: "table",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "nutrition-table",
        description: "Estrutura tabular com nutrientes, quantidade por porcao e percentual diario.",
        sampleValue: [
            {
                nutrient: "Valor energetico",
                amount: "120 kcal",
                dailyValue: "6%"
            },
            {
                nutrient: "Proteinas",
                amount: "5 g",
                dailyValue: "10%"
            }
        ],
        schemaCompat: {
            type: "text"
        }
    },
    portionDescription: {
        key: "portionDescription",
        label: "Descricao da porcao",
        group: "nutrition",
        type: "text",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "text",
        description: "Texto que explica a porcao considerada na tabela nutricional.",
        sampleValue: "Porcao de 60 g (1 fatia media)",
        schemaCompat: {
            type: "text"
        }
    },
    servingsPerPackage: {
        key: "servingsPerPackage",
        label: "Porcoes por embalagem",
        group: "nutrition",
        type: "text",
        required: true,
        source: "user",
        defaultStrategy: "none",
        editable: true,
        visibleInForm: true,
        inputControl: "text",
        description: "Quantidade de porcoes usadas no cabecalho nutricional.",
        sampleValue: "Cerca de 4 porcoes",
        schemaCompat: {
            type: "text"
        }
    },
    originFooter: {
        key: "originFooter",
        label: "Rodape de origem",
        group: "system",
        type: "text",
        required: true,
        source: "system",
        defaultStrategy: "fixed_origin_footer",
        editable: false,
        visibleInForm: false,
        inputControl: "hidden",
        description: "Origem fixa da etiqueta aplicada pelo sistema em preview e impressao.",
        sampleValue: "Pascal Fast Food. Rua Victorio Viezzer, 588. Vista Alegre. Curitiba - Parana.",
        schemaCompat: {
            type: "text"
        }
    },
    originVerticalText: {
        key: "originVerticalText",
        label: "Origem lateral vertical",
        group: "system",
        type: "text",
        required: true,
        source: "system",
        defaultStrategy: "fixed_origin_vertical_text",
        editable: false,
        visibleInForm: false,
        inputControl: "hidden",
        description: "Texto vertical fixo na lateral esquerda da etiqueta 60x40.",
        sampleValue: "Pascal Fast Food.\nRua Victorio Viezzer, 588.\nVista Alegre.\nCuritiba-Paraná.",
        schemaCompat: {
            type: "text"
        }
    }
};
const baseBlocks = {
    header: {
        id: "header",
        label: "Cabecalho do produto",
        kind: "header",
        description: "Area com descricao principal do produto e hierarquia tipografica base.",
        required: true
    },
    datesRow: {
        id: "dates-row",
        label: "Linha de datas",
        kind: "data_row",
        description: "Bloco com data de fabricacao, validade e hora operacional.",
        required: true
    },
    pricingBand: {
        id: "pricing-band",
        label: "Faixa de total",
        kind: "pricing_band",
        description: "Faixa de alto contraste com o valor total em destaque.",
        required: true
    },
    barcodeArea: {
        id: "barcode-area",
        label: "Area do codigo de barras",
        kind: "barcode_area",
        description: "Regiao reservada para barcode, mantendo o elemento livre no editor.",
        required: true
    },
    responsibleArea: {
        id: "responsible-area",
        label: "Area do responsavel",
        kind: "responsible_area",
        description: "Bloco operacional com rotulo fixo e nome dinamico do responsavel.",
        required: true
    },
    totalEmphasis: {
        id: "total-emphasis",
        label: "Destaque numerico do total",
        kind: "total_emphasis",
        description: "Zona de alta prioridade visual para o valor total final da etiqueta.",
        required: true
    },
    recipeArea: {
        id: "recipe-area",
        label: "Area de receita",
        kind: "recipe_area",
        description: "Bloco de linhas operacionais, ingredientes ou receita curta.",
        required: false
    },
    messageArea: {
        id: "message-area",
        label: "Area de mensagens especiais",
        kind: "message_area",
        description: "Zona para alertas, campanhas ou instrucoes especiais.",
        required: false
    },
    nutritionPanel: {
        id: "nutrition-panel",
        label: "Quadro nutricional",
        kind: "nutrition_panel",
        description: "Tabela com nutrientes, porcao e porcoes por embalagem.",
        required: false
    },
    originSideLabel: {
        id: "origin-side-label",
        label: "Origem lateral vertical",
        kind: "origin_side_label",
        description: "Marca fixa aplicada na lateral esquerda do template 60x40 de producao diaria.",
        required: true
    },
    footer: {
        id: "footer",
        label: "Rodape de origem",
        kind: "footer",
        description: "Origem fixa do produto e informacoes institucionais.",
        required: true
    },
    divider: {
        id: "divider",
        label: "Separadores estruturais",
        kind: "divider",
        description: "Linhas e blocos de apoio para dar ordem visual ao layout.",
        required: true
    }
};
const OFFICIAL_TEMPLATE_CATALOG = {
    template_60x40_unidade_vertical: {
        id: "template_60x40_unidade_vertical",
        name: "60x40 unidade vertical",
        family: "vertical_unit",
        orientation: "landscape",
        operationKind: "unit",
        summary: "Etiqueta oficial 60x40 de producao diaria, compacta e com total destacado.",
        operationalUse: "Producao diaria, etiqueta rapida por unidade, frente de loja e operacao compacta em 60x40.",
        defaultFormatId: "rect_40x60",
        recommendedFormatIds: [
            "rect_40x60",
            "scale_60x40"
        ],
        tags: [
            "unit",
            "vertical",
            "60x40",
            "production-daily",
            "quick-label"
        ],
        supports: {
            recipeLines: false,
            specialMessages: false,
            nutritionTable: false
        },
        fieldKeys: [
            "productName",
            "manufacturingDate",
            "expirationDate",
            "time",
            "barcode",
            "barcodeText",
            "responsibleLabel",
            "responsibleName",
            "quantity",
            "unitPrice",
            "totalPrice",
            "originVerticalText"
        ],
        fixedBlocks: [
            baseBlocks.originSideLabel,
            baseBlocks.header,
            baseBlocks.datesRow,
            baseBlocks.barcodeArea,
            baseBlocks.responsibleArea,
            baseBlocks.pricingBand,
            baseBlocks.totalEmphasis,
            baseBlocks.divider
        ],
        dynamicZones: [
            {
                id: "product-zone",
                label: "Produto",
                fieldKeys: [
                    "productName"
                ],
                description: "Nome do produto em destaque no topo direito da etiqueta."
            },
            {
                id: "meta-info-zone",
                label: "Dados operacionais",
                fieldKeys: [
                    "manufacturingDate",
                    "expirationDate",
                    "time",
                    "quantity",
                    "unitPrice"
                ],
                description: "Linha compacta com data, validade, hora, quantidade e preco unitario."
            },
            {
                id: "barcode-zone",
                label: "Codigo de barras",
                fieldKeys: [
                    "barcode",
                    "barcodeText"
                ],
                description: "Codigo de barras dinamico com numero legivel associado."
            },
            {
                id: "responsible-zone",
                label: "Responsavel",
                fieldKeys: [
                    "responsibleLabel",
                    "responsibleName"
                ],
                description: "Secao operacional do responsavel pela equipe ou producao."
            },
            {
                id: "total-zone",
                label: "Total",
                fieldKeys: [
                    "totalPrice"
                ],
                description: "Faixa de TOTAL R$ com valor numerico de alta prioridade visual."
            },
            {
                id: "origin-side-zone",
                label: "Marca lateral",
                fieldKeys: [
                    "originVerticalText"
                ],
                description: "Texto vertical fixo com a marca/origem lateral da etiqueta."
            }
        ]
    },
    vertical_unit_basic: {
        id: "vertical_unit_basic",
        name: "Vertical por unidade",
        family: "vertical_unit",
        orientation: "portrait",
        operationKind: "unit",
        summary: "Etiqueta vertical enxuta para itens vendidos por unidade.",
        operationalUse: "Padaria, confeitaria, frente de loja e operacao rapida por unidade.",
        defaultFormatId: "rect_60x40",
        recommendedFormatIds: [
            "rect_60x40",
            "rect_40x60",
            "scale_60x40",
            "square_50x50"
        ],
        tags: [
            "unit",
            "vertical",
            "quick-print",
            "food-service"
        ],
        supports: {
            recipeLines: false,
            specialMessages: false,
            nutritionTable: false
        },
        fieldKeys: [
            "productDescription",
            "manufacturingDate",
            "expirationDate",
            "time",
            "quantity",
            "unitPrice",
            "totalPrice",
            "barcode",
            "originFooter"
        ],
        fixedBlocks: [
            baseBlocks.header,
            baseBlocks.datesRow,
            baseBlocks.pricingBand,
            baseBlocks.barcodeArea,
            baseBlocks.divider,
            baseBlocks.footer
        ],
        dynamicZones: [
            {
                id: "product-zone",
                label: "Produto",
                fieldKeys: [
                    "productDescription"
                ],
                description: "Descricao em destaque no topo da etiqueta."
            },
            {
                id: "unit-pricing-zone",
                label: "Dados por unidade",
                fieldKeys: [
                    "quantity",
                    "unitPrice",
                    "totalPrice"
                ],
                description: "Quantidade e precificacao basica por unidade."
            },
            {
                id: "production-zone",
                label: "Datas operacionais",
                fieldKeys: [
                    "manufacturingDate",
                    "expirationDate",
                    "time"
                ],
                description: "Linha curta para controle de producao e validade."
            },
            {
                id: "code-zone",
                label: "Codigo",
                fieldKeys: [
                    "barcode"
                ],
                description: "Barcode posicionado livremente dentro da area reservada."
            }
        ]
    },
    vertical_weight_basic: {
        id: "vertical_weight_basic",
        name: "Vertical por peso",
        family: "vertical_weight",
        orientation: "portrait",
        operationKind: "weight",
        summary: "Etiqueta vertical focada em pesagem, tara e preco por kg.",
        operationalUse: "Acougue, frios, buffet, balanca e operacao por peso.",
        defaultFormatId: "scale_60x40",
        recommendedFormatIds: [
            "scale_60x40",
            "rect_60x40",
            "rect_40x60",
            "rect_100x60"
        ],
        tags: [
            "weight",
            "vertical",
            "scale",
            "food-service"
        ],
        supports: {
            recipeLines: false,
            specialMessages: false,
            nutritionTable: false
        },
        fieldKeys: [
            "productDescription",
            "manufacturingDate",
            "expirationDate",
            "time",
            "weight",
            "tare",
            "pricePerKg",
            "totalPrice",
            "barcode",
            "originFooter"
        ],
        fixedBlocks: [
            baseBlocks.header,
            baseBlocks.datesRow,
            baseBlocks.pricingBand,
            baseBlocks.barcodeArea,
            baseBlocks.divider,
            baseBlocks.footer
        ],
        dynamicZones: [
            {
                id: "product-zone",
                label: "Produto",
                fieldKeys: [
                    "productDescription"
                ],
                description: "Descricao principal do item pesado."
            },
            {
                id: "weight-pricing-zone",
                label: "Dados de peso",
                fieldKeys: [
                    "weight",
                    "tare",
                    "pricePerKg",
                    "totalPrice"
                ],
                description: "Peso, tara e preco por kg para calculo do total."
            },
            {
                id: "production-zone",
                label: "Datas operacionais",
                fieldKeys: [
                    "manufacturingDate",
                    "expirationDate",
                    "time"
                ],
                description: "Controle de producao e validade com foco operacional."
            },
            {
                id: "code-zone",
                label: "Codigo",
                fieldKeys: [
                    "barcode"
                ],
                description: "Barcode livre dentro da zona de codigo."
            }
        ]
    },
    horizontal_unit_basic: {
        id: "horizontal_unit_basic",
        name: "Horizontal por unidade",
        family: "horizontal_unit",
        orientation: "landscape",
        operationKind: "unit",
        summary: "Etiqueta horizontal com area extra para receita ou composicao.",
        operationalUse: "Bandejas, vitrines refrigeradas e rotulos com texto auxiliar.",
        defaultFormatId: "rect_100x60",
        recommendedFormatIds: [
            "rect_100x60",
            "rect_100x30",
            "rect_150x30",
            "sleeve_120x50"
        ],
        tags: [
            "unit",
            "horizontal",
            "recipe",
            "food-service"
        ],
        supports: {
            recipeLines: true,
            specialMessages: false,
            nutritionTable: false
        },
        fieldKeys: [
            "productDescription",
            "manufacturingDate",
            "expirationDate",
            "time",
            "quantity",
            "unitPrice",
            "totalPrice",
            "barcode",
            "recipeLines",
            "originFooter"
        ],
        fixedBlocks: [
            baseBlocks.header,
            baseBlocks.datesRow,
            baseBlocks.pricingBand,
            baseBlocks.barcodeArea,
            baseBlocks.recipeArea,
            baseBlocks.divider,
            baseBlocks.footer
        ],
        dynamicZones: [
            {
                id: "product-zone",
                label: "Produto",
                fieldKeys: [
                    "productDescription"
                ],
                description: "Cabecalho do item em orientacao horizontal."
            },
            {
                id: "unit-pricing-zone",
                label: "Dados por unidade",
                fieldKeys: [
                    "quantity",
                    "unitPrice",
                    "totalPrice"
                ],
                description: "Faixa principal de quantidade e valor."
            },
            {
                id: "production-zone",
                label: "Datas operacionais",
                fieldKeys: [
                    "manufacturingDate",
                    "expirationDate",
                    "time"
                ],
                description: "Linha compacta de data, validade e hora."
            },
            {
                id: "recipe-zone",
                label: "Receita",
                fieldKeys: [
                    "recipeLines"
                ],
                description: "Linhas auxiliares de receita ou ingredientes.",
                repeatable: true
            },
            {
                id: "code-zone",
                label: "Codigo",
                fieldKeys: [
                    "barcode"
                ],
                description: "Barcode posicionado pela estrutura base, sem fixar o elemento."
            }
        ]
    },
    horizontal_weight_basic: {
        id: "horizontal_weight_basic",
        name: "Horizontal por peso",
        family: "horizontal_weight",
        orientation: "landscape",
        operationKind: "weight",
        summary: "Etiqueta horizontal para pesagem com espaco de receita ou conteudo tecnico.",
        operationalUse: "Frios, buffet, marmitas e processos de balanca com mais informacao visual.",
        defaultFormatId: "rect_100x60",
        recommendedFormatIds: [
            "rect_100x60",
            "rect_100x30",
            "rect_150x30",
            "scale_60x40"
        ],
        tags: [
            "weight",
            "horizontal",
            "scale",
            "recipe"
        ],
        supports: {
            recipeLines: true,
            specialMessages: false,
            nutritionTable: false
        },
        fieldKeys: [
            "productDescription",
            "manufacturingDate",
            "expirationDate",
            "time",
            "weight",
            "tare",
            "pricePerKg",
            "totalPrice",
            "barcode",
            "recipeLines",
            "originFooter"
        ],
        fixedBlocks: [
            baseBlocks.header,
            baseBlocks.datesRow,
            baseBlocks.pricingBand,
            baseBlocks.barcodeArea,
            baseBlocks.recipeArea,
            baseBlocks.divider,
            baseBlocks.footer
        ],
        dynamicZones: [
            {
                id: "product-zone",
                label: "Produto",
                fieldKeys: [
                    "productDescription"
                ],
                description: "Descricao principal do item pesado."
            },
            {
                id: "weight-pricing-zone",
                label: "Dados de peso",
                fieldKeys: [
                    "weight",
                    "tare",
                    "pricePerKg",
                    "totalPrice"
                ],
                description: "Bloco com peso, tara, preco por kg e total."
            },
            {
                id: "production-zone",
                label: "Datas operacionais",
                fieldKeys: [
                    "manufacturingDate",
                    "expirationDate",
                    "time"
                ],
                description: "Controle rapido de producao."
            },
            {
                id: "recipe-zone",
                label: "Receita",
                fieldKeys: [
                    "recipeLines"
                ],
                description: "Linhas auxiliares da receita ou ingredientes.",
                repeatable: true
            },
            {
                id: "code-zone",
                label: "Codigo",
                fieldKeys: [
                    "barcode"
                ],
                description: "Barcode na area reservada com posicionamento flexivel."
            }
        ]
    },
    horizontal_unit_with_messages: {
        id: "horizontal_unit_with_messages",
        name: "Horizontal por unidade com mensagens",
        family: "horizontal_unit",
        orientation: "landscape",
        operationKind: "unit",
        summary: "Variacao horizontal por unidade com espaco proprio para mensagens especiais.",
        operationalUse: "Campanhas, avisos de consumo e comunicacoes operacionais em itens unitarios.",
        defaultFormatId: "rect_100x60",
        recommendedFormatIds: [
            "rect_100x60",
            "rect_150x30",
            "sleeve_120x50"
        ],
        tags: [
            "unit",
            "horizontal",
            "messages",
            "campaign"
        ],
        supports: {
            recipeLines: true,
            specialMessages: true,
            nutritionTable: false
        },
        fieldKeys: [
            "productDescription",
            "manufacturingDate",
            "expirationDate",
            "time",
            "quantity",
            "unitPrice",
            "totalPrice",
            "barcode",
            "recipeLines",
            "specialMessages",
            "originFooter"
        ],
        fixedBlocks: [
            baseBlocks.header,
            baseBlocks.datesRow,
            baseBlocks.pricingBand,
            baseBlocks.barcodeArea,
            baseBlocks.recipeArea,
            baseBlocks.messageArea,
            baseBlocks.divider,
            baseBlocks.footer
        ],
        dynamicZones: [
            {
                id: "product-zone",
                label: "Produto",
                fieldKeys: [
                    "productDescription"
                ],
                description: "Descricao principal do item."
            },
            {
                id: "unit-pricing-zone",
                label: "Dados por unidade",
                fieldKeys: [
                    "quantity",
                    "unitPrice",
                    "totalPrice"
                ],
                description: "Quantidade, preco unitario e total."
            },
            {
                id: "production-zone",
                label: "Datas operacionais",
                fieldKeys: [
                    "manufacturingDate",
                    "expirationDate",
                    "time"
                ],
                description: "Linha de data, validade e hora."
            },
            {
                id: "recipe-zone",
                label: "Receita",
                fieldKeys: [
                    "recipeLines"
                ],
                description: "Linhas auxiliares de composicao.",
                repeatable: true
            },
            {
                id: "message-zone",
                label: "Mensagens especiais",
                fieldKeys: [
                    "specialMessages"
                ],
                description: "Avisos adicionais e chamadas operacionais.",
                repeatable: true
            },
            {
                id: "code-zone",
                label: "Codigo",
                fieldKeys: [
                    "barcode"
                ],
                description: "Barcode dentro da area de codigo."
            }
        ]
    },
    horizontal_weight_with_messages: {
        id: "horizontal_weight_with_messages",
        name: "Horizontal por peso com mensagens",
        family: "horizontal_weight",
        orientation: "landscape",
        operationKind: "weight",
        summary: "Variacao horizontal por peso com mensagens especiais e comunicacao adicional.",
        operationalUse: "Pesagem com observacoes de consumo, refrigeracao ou campanha.",
        defaultFormatId: "rect_100x60",
        recommendedFormatIds: [
            "rect_100x60",
            "rect_150x30",
            "scale_60x40"
        ],
        tags: [
            "weight",
            "horizontal",
            "messages",
            "scale"
        ],
        supports: {
            recipeLines: true,
            specialMessages: true,
            nutritionTable: false
        },
        fieldKeys: [
            "productDescription",
            "manufacturingDate",
            "expirationDate",
            "time",
            "weight",
            "tare",
            "pricePerKg",
            "totalPrice",
            "barcode",
            "recipeLines",
            "specialMessages",
            "originFooter"
        ],
        fixedBlocks: [
            baseBlocks.header,
            baseBlocks.datesRow,
            baseBlocks.pricingBand,
            baseBlocks.barcodeArea,
            baseBlocks.recipeArea,
            baseBlocks.messageArea,
            baseBlocks.divider,
            baseBlocks.footer
        ],
        dynamicZones: [
            {
                id: "product-zone",
                label: "Produto",
                fieldKeys: [
                    "productDescription"
                ],
                description: "Descricao principal do item pesado."
            },
            {
                id: "weight-pricing-zone",
                label: "Dados de peso",
                fieldKeys: [
                    "weight",
                    "tare",
                    "pricePerKg",
                    "totalPrice"
                ],
                description: "Bloco central de pesagem e valor."
            },
            {
                id: "production-zone",
                label: "Datas operacionais",
                fieldKeys: [
                    "manufacturingDate",
                    "expirationDate",
                    "time"
                ],
                description: "Controle de hora, fabricacao e validade."
            },
            {
                id: "recipe-zone",
                label: "Receita",
                fieldKeys: [
                    "recipeLines"
                ],
                description: "Linhas auxiliares de preparo ou ingredientes.",
                repeatable: true
            },
            {
                id: "message-zone",
                label: "Mensagens especiais",
                fieldKeys: [
                    "specialMessages"
                ],
                description: "Alertas operacionais e avisos extras.",
                repeatable: true
            },
            {
                id: "code-zone",
                label: "Codigo",
                fieldKeys: [
                    "barcode"
                ],
                description: "Barcode inserido na mesma base visual do preview."
            }
        ]
    },
    vertical_unit_with_nutrition: {
        id: "vertical_unit_with_nutrition",
        name: "Vertical por unidade com nutricional",
        family: "vertical_unit",
        orientation: "portrait",
        operationKind: "unit",
        summary: "Etiqueta vertical mais alta com dados operacionais e quadro nutricional.",
        operationalUse: "Produtos embalados com exigencia de informacao nutricional por unidade.",
        defaultFormatId: "rect_100x60",
        recommendedFormatIds: [
            "rect_100x60",
            "tag_80x50",
            "sleeve_120x50"
        ],
        tags: [
            "unit",
            "vertical",
            "nutrition",
            "compliance"
        ],
        supports: {
            recipeLines: true,
            specialMessages: false,
            nutritionTable: true
        },
        fieldKeys: [
            "productDescription",
            "manufacturingDate",
            "expirationDate",
            "time",
            "quantity",
            "unitPrice",
            "totalPrice",
            "barcode",
            "recipeLines",
            "nutritionTable",
            "portionDescription",
            "servingsPerPackage",
            "originFooter"
        ],
        fixedBlocks: [
            baseBlocks.header,
            baseBlocks.datesRow,
            baseBlocks.pricingBand,
            baseBlocks.barcodeArea,
            baseBlocks.recipeArea,
            baseBlocks.nutritionPanel,
            baseBlocks.divider,
            baseBlocks.footer
        ],
        dynamicZones: [
            {
                id: "product-zone",
                label: "Produto",
                fieldKeys: [
                    "productDescription"
                ],
                description: "Cabecalho do item com foco comercial."
            },
            {
                id: "unit-pricing-zone",
                label: "Dados por unidade",
                fieldKeys: [
                    "quantity",
                    "unitPrice",
                    "totalPrice"
                ],
                description: "Quantidade e precificacao principal."
            },
            {
                id: "production-zone",
                label: "Datas operacionais",
                fieldKeys: [
                    "manufacturingDate",
                    "expirationDate",
                    "time"
                ],
                description: "Linha curta de controle."
            },
            {
                id: "recipe-zone",
                label: "Receita",
                fieldKeys: [
                    "recipeLines"
                ],
                description: "Linhas auxiliares acima do quadro nutricional.",
                repeatable: true
            },
            {
                id: "nutrition-zone",
                label: "Quadro nutricional",
                fieldKeys: [
                    "portionDescription",
                    "servingsPerPackage",
                    "nutritionTable"
                ],
                description: "Dados completos da tabela nutricional."
            },
            {
                id: "code-zone",
                label: "Codigo",
                fieldKeys: [
                    "barcode"
                ],
                description: "Barcode livre na area reservada para codigo."
            }
        ]
    },
    vertical_weight_with_nutrition: {
        id: "vertical_weight_with_nutrition",
        name: "Vertical por peso com nutricional",
        family: "vertical_weight",
        orientation: "portrait",
        operationKind: "weight",
        summary: "Etiqueta vertical alta para itens por peso com informacao nutricional.",
        operationalUse: "Produtos por peso embalados com rotulagem mais completa.",
        defaultFormatId: "rect_100x60",
        recommendedFormatIds: [
            "rect_100x60",
            "tag_80x50",
            "scale_60x40"
        ],
        tags: [
            "weight",
            "vertical",
            "nutrition",
            "scale"
        ],
        supports: {
            recipeLines: true,
            specialMessages: false,
            nutritionTable: true
        },
        fieldKeys: [
            "productDescription",
            "manufacturingDate",
            "expirationDate",
            "time",
            "weight",
            "tare",
            "pricePerKg",
            "totalPrice",
            "barcode",
            "recipeLines",
            "nutritionTable",
            "portionDescription",
            "servingsPerPackage",
            "originFooter"
        ],
        fixedBlocks: [
            baseBlocks.header,
            baseBlocks.datesRow,
            baseBlocks.pricingBand,
            baseBlocks.barcodeArea,
            baseBlocks.recipeArea,
            baseBlocks.nutritionPanel,
            baseBlocks.divider,
            baseBlocks.footer
        ],
        dynamicZones: [
            {
                id: "product-zone",
                label: "Produto",
                fieldKeys: [
                    "productDescription"
                ],
                description: "Descricao principal do item pesado."
            },
            {
                id: "weight-pricing-zone",
                label: "Dados de peso",
                fieldKeys: [
                    "weight",
                    "tare",
                    "pricePerKg",
                    "totalPrice"
                ],
                description: "Peso, tara e preco por kg em destaque."
            },
            {
                id: "production-zone",
                label: "Datas operacionais",
                fieldKeys: [
                    "manufacturingDate",
                    "expirationDate",
                    "time"
                ],
                description: "Data, validade e hora operacional."
            },
            {
                id: "recipe-zone",
                label: "Receita",
                fieldKeys: [
                    "recipeLines"
                ],
                description: "Ingredientes ou linhas de receita acima do quadro nutricional.",
                repeatable: true
            },
            {
                id: "nutrition-zone",
                label: "Quadro nutricional",
                fieldKeys: [
                    "portionDescription",
                    "servingsPerPackage",
                    "nutritionTable"
                ],
                description: "Quadro completo de nutricional e porcoes."
            },
            {
                id: "code-zone",
                label: "Codigo",
                fieldKeys: [
                    "barcode"
                ],
                description: "Barcode inserido na mesma base visual compartilhada."
            }
        ]
    }
};
const OFFICIAL_TEMPLATE_ORDER = [
    "template_60x40_unidade_vertical",
    "vertical_unit_basic",
    "vertical_weight_basic",
    "horizontal_unit_basic",
    "horizontal_weight_basic",
    "horizontal_unit_with_messages",
    "horizontal_weight_with_messages",
    "vertical_unit_with_nutrition",
    "vertical_weight_with_nutrition"
];
function listOfficialTemplates() {
    return OFFICIAL_TEMPLATE_ORDER.map((id)=>OFFICIAL_TEMPLATE_CATALOG[id]);
}
function getOfficialTemplateById(id) {
    return OFFICIAL_TEMPLATE_CATALOG[id];
}
function listOfficialTemplateFields(templateId) {
    const template = getOfficialTemplateById(templateId);
    if (!template) {
        return [];
    }
    return template.fieldKeys.map((key)=>OFFICIAL_TEMPLATE_FIELDS[key]);
}
function listVisibleOfficialTemplateFields(templateId) {
    return listOfficialTemplateFields(templateId).filter((field)=>field.visibleInForm);
}
function listSystemOfficialTemplateFields(templateId) {
    return listOfficialTemplateFields(templateId).filter((field)=>field.source !== "user");
}
function getOfficialTemplateRecommendedFormats(templateId) {
    const template = getOfficialTemplateById(templateId);
    if (!template) {
        return [];
    }
    return template.recommendedFormatIds.map((formatId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLabelFormatById"])(formatId)).filter((format)=>Boolean(format));
}
function getOfficialTemplateDefaultFormat(templateId) {
    const template = getOfficialTemplateById(templateId);
    if (!template) {
        return undefined;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLabelFormatById"])(template.defaultFormatId);
}
function listOfficialTemplatesByOperationKind(kind) {
    return listOfficialTemplates().filter((template)=>template.operationKind === kind);
}
function listOfficialTemplatesByOrientation(kind) {
    return listOfficialTemplates().filter((template)=>template.orientation === kind);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/official-template-presets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildOfficialTemplateDocument",
    ()=>buildOfficialTemplateDocument,
    "buildOfficialTemplatePreviewPayload",
    ()=>buildOfficialTemplatePreviewPayload,
    "listOfficialTemplatePresetOptions",
    ()=>listOfficialTemplatePresetOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/factories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/label-typography.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/official-template-catalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/label-format-registry.ts [app-client] (ecmascript)");
;
;
;
;
const FONT_FAMILY = "\"IBM Plex Sans\", \"Segoe UI\", sans-serif";
const NUTRITION_FONT_FAMILY = "\"IBM Plex Sans\", \"Segoe UI\", sans-serif";
const ORIGIN_FOOTER = "Pascal Fast Food.\nRua Victorio Viezzer, 588.\nVista Alegre.\nCuritiba - Parana.";
const ORIGIN_VERTICAL_TEXT = "Pascal Fast Food.\nRua Victorio Viezzer, 588.\nVista Alegre.\nCuritiba-Paraná.";
const normalizeSampleValue = (field)=>{
    if (field.key === "recipeLines" && Array.isArray(field.sampleValue)) {
        return field.sampleValue.join("\n");
    }
    if (field.key === "specialMessages" && Array.isArray(field.sampleValue)) {
        return field.sampleValue.join("\n");
    }
    if (field.key === "nutritionTable" && Array.isArray(field.sampleValue)) {
        return field.sampleValue.map((entry)=>{
            var _nutrient, _amount, _dailyValue;
            return typeof entry === "object" && entry ? "".concat(String((_nutrient = entry.nutrient) !== null && _nutrient !== void 0 ? _nutrient : ""), ": ").concat(String((_amount = entry.amount) !== null && _amount !== void 0 ? _amount : ""), " | ").concat(String((_dailyValue = entry.dailyValue) !== null && _dailyValue !== void 0 ? _dailyValue : "")) : String(entry);
        }).join("\n");
    }
    if (field.key === "originFooter") {
        return ORIGIN_FOOTER;
    }
    return field.sampleValue;
};
const toDataField = (field)=>{
    var _field_schemaCompat, _field_schemaCompat1, _field_schemaCompat2;
    var _field_schemaCompat_type;
    return {
        key: field.key,
        label: field.label,
        type: (_field_schemaCompat_type = (_field_schemaCompat = field.schemaCompat) === null || _field_schemaCompat === void 0 ? void 0 : _field_schemaCompat.type) !== null && _field_schemaCompat_type !== void 0 ? _field_schemaCompat_type : "text",
        required: field.required,
        description: field.description,
        sampleValue: normalizeSampleValue(field),
        fallbackValue: field.key === "originFooter" ? ORIGIN_FOOTER : undefined,
        formatType: (_field_schemaCompat1 = field.schemaCompat) === null || _field_schemaCompat1 === void 0 ? void 0 : _field_schemaCompat1.formatType,
        formatConfig: (_field_schemaCompat2 = field.schemaCompat) === null || _field_schemaCompat2 === void 0 ? void 0 : _field_schemaCompat2.formatConfig
    };
};
const createText = (id, name, x, y, width, height, zIndex, overrides)=>{
    var _overrides_rotation, _overrides_locked, _overrides_contentMode, _overrides_text, _overrides_fontSize, _overrides_fontFamily, _overrides_fontWeight, _overrides_fontStyle, _overrides_textDecoration, _overrides_lineHeight, _overrides_color, _overrides_align;
    return {
        id,
        type: "text",
        name,
        x,
        y,
        width,
        height,
        rotation: (_overrides_rotation = overrides.rotation) !== null && _overrides_rotation !== void 0 ? _overrides_rotation : 0,
        visible: true,
        locked: (_overrides_locked = overrides.locked) !== null && _overrides_locked !== void 0 ? _overrides_locked : false,
        zIndex,
        contentMode: (_overrides_contentMode = overrides.contentMode) !== null && _overrides_contentMode !== void 0 ? _overrides_contentMode : "static",
        text: (_overrides_text = overrides.text) !== null && _overrides_text !== void 0 ? _overrides_text : "",
        bindingKey: overrides.bindingKey,
        placeholder: overrides.placeholder,
        fontSize: (_overrides_fontSize = overrides.fontSize) !== null && _overrides_fontSize !== void 0 ? _overrides_fontSize : 9,
        fontFamily: (_overrides_fontFamily = overrides.fontFamily) !== null && _overrides_fontFamily !== void 0 ? _overrides_fontFamily : FONT_FAMILY,
        fontWeight: (_overrides_fontWeight = overrides.fontWeight) !== null && _overrides_fontWeight !== void 0 ? _overrides_fontWeight : 600,
        fontStyle: (_overrides_fontStyle = overrides.fontStyle) !== null && _overrides_fontStyle !== void 0 ? _overrides_fontStyle : "normal",
        textDecoration: (_overrides_textDecoration = overrides.textDecoration) !== null && _overrides_textDecoration !== void 0 ? _overrides_textDecoration : "none",
        lineHeight: (_overrides_lineHeight = overrides.lineHeight) !== null && _overrides_lineHeight !== void 0 ? _overrides_lineHeight : 1.2,
        color: (_overrides_color = overrides.color) !== null && _overrides_color !== void 0 ? _overrides_color : "#111827",
        align: (_overrides_align = overrides.align) !== null && _overrides_align !== void 0 ? _overrides_align : "left"
    };
};
const createShape = (id, name, x, y, width, height, zIndex, overrides)=>{
    var _overrides_locked, _overrides_fill, _overrides_stroke, _overrides_strokeWidth, _overrides_borderRadius;
    return {
        id,
        type: "shape",
        name,
        x,
        y,
        width,
        height,
        rotation: 0,
        visible: true,
        locked: (_overrides_locked = overrides.locked) !== null && _overrides_locked !== void 0 ? _overrides_locked : false,
        zIndex,
        shape: "rectangle",
        fill: (_overrides_fill = overrides.fill) !== null && _overrides_fill !== void 0 ? _overrides_fill : "#ffffff",
        stroke: (_overrides_stroke = overrides.stroke) !== null && _overrides_stroke !== void 0 ? _overrides_stroke : "#111827",
        strokeWidth: (_overrides_strokeWidth = overrides.strokeWidth) !== null && _overrides_strokeWidth !== void 0 ? _overrides_strokeWidth : 0.4,
        borderRadius: (_overrides_borderRadius = overrides.borderRadius) !== null && _overrides_borderRadius !== void 0 ? _overrides_borderRadius : 0
    };
};
const createLine = (id, name, x, y, width, zIndex, overrides)=>{
    var _overrides_height, _overrides_rotation, _overrides_locked, _overrides_stroke, _overrides_strokeWidth;
    return {
        id,
        type: "line",
        name,
        x,
        y,
        width,
        height: (_overrides_height = overrides === null || overrides === void 0 ? void 0 : overrides.height) !== null && _overrides_height !== void 0 ? _overrides_height : 0.2,
        rotation: (_overrides_rotation = overrides === null || overrides === void 0 ? void 0 : overrides.rotation) !== null && _overrides_rotation !== void 0 ? _overrides_rotation : 0,
        visible: true,
        locked: (_overrides_locked = overrides === null || overrides === void 0 ? void 0 : overrides.locked) !== null && _overrides_locked !== void 0 ? _overrides_locked : false,
        zIndex,
        stroke: (_overrides_stroke = overrides === null || overrides === void 0 ? void 0 : overrides.stroke) !== null && _overrides_stroke !== void 0 ? _overrides_stroke : "#d1d5db",
        strokeWidth: (_overrides_strokeWidth = overrides === null || overrides === void 0 ? void 0 : overrides.strokeWidth) !== null && _overrides_strokeWidth !== void 0 ? _overrides_strokeWidth : 0.2
    };
};
const createBarcode = function(id, x, y, width, height, zIndex) {
    let bindingKey = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : "barcode", overrides = arguments.length > 7 ? arguments[7] : void 0;
    var _overrides_name, _overrides_rotation, _overrides_locked, _overrides_value, _overrides_format, _overrides_showHumanReadable;
    return {
        id,
        type: "barcode",
        name: (_overrides_name = overrides === null || overrides === void 0 ? void 0 : overrides.name) !== null && _overrides_name !== void 0 ? _overrides_name : "Codigo de barras",
        x,
        y,
        width,
        height,
        rotation: (_overrides_rotation = overrides === null || overrides === void 0 ? void 0 : overrides.rotation) !== null && _overrides_rotation !== void 0 ? _overrides_rotation : 0,
        visible: true,
        locked: (_overrides_locked = overrides === null || overrides === void 0 ? void 0 : overrides.locked) !== null && _overrides_locked !== void 0 ? _overrides_locked : false,
        zIndex,
        value: (_overrides_value = overrides === null || overrides === void 0 ? void 0 : overrides.value) !== null && _overrides_value !== void 0 ? _overrides_value : "7891234567890",
        bindingKey,
        format: (_overrides_format = overrides === null || overrides === void 0 ? void 0 : overrides.format) !== null && _overrides_format !== void 0 ? _overrides_format : "CODE128",
        showHumanReadable: (_overrides_showHumanReadable = overrides === null || overrides === void 0 ? void 0 : overrides.showHumanReadable) !== null && _overrides_showHumanReadable !== void 0 ? _overrides_showHumanReadable : true
    };
};
const resolveFormat = (template, requestedFormatId, requestedOrientation)=>{
    var _ref, _ref1;
    const baseFormat = (_ref1 = (_ref = requestedFormatId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLabelFormatById"])(requestedFormatId) : undefined) !== null && _ref !== void 0 ? _ref : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOfficialTemplateDefaultFormat"])(template.id)) !== null && _ref1 !== void 0 ? _ref1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLabelFormatById"])(template.defaultFormatId);
    if (!baseFormat) {
        throw new Error("Formato base nao encontrado para ".concat(template.id));
    }
    const orientation = requestedOrientation !== null && requestedOrientation !== void 0 ? requestedOrientation : template.orientation;
    const isSymmetric = baseFormat.widthMm === baseFormat.heightMm || baseFormat.shape === "round";
    const shouldSwap = !isSymmetric && (orientation === "portrait" && baseFormat.widthMm > baseFormat.heightMm || orientation === "landscape" && baseFormat.heightMm > baseFormat.widthMm);
    return {
        ...baseFormat,
        resolvedWidthMm: shouldSwap ? baseFormat.heightMm : baseFormat.widthMm,
        resolvedHeightMm: shouldSwap ? baseFormat.widthMm : baseFormat.heightMm,
        resolvedOrientation: orientation
    };
};
const getMetrics = (format)=>{
    const margin = Math.max(2.6, Math.min(format.resolvedWidthMm, format.resolvedHeightMm) * 0.06);
    return {
        width: format.resolvedWidthMm,
        height: format.resolvedHeightMm,
        margin,
        innerWidth: format.resolvedWidthMm - margin * 2,
        innerHeight: format.resolvedHeightMm - margin * 2
    };
};
const addRecipeBlock = (elements, metrics, y, height, zIndexStart)=>{
    elements.push(createText("recipe_title", "Receita titulo", metrics.margin, y, metrics.innerWidth, 4.4, zIndexStart, {
        text: "RECEITA / COMPOSICAO",
        fontSize: 7.6,
        fontWeight: 700
    }), createText("recipe_lines", "Receita", metrics.margin, y + 4.9, metrics.innerWidth, Math.max(8, height - 5), zIndexStart + 1, {
        contentMode: "dynamic",
        bindingKey: "recipeLines",
        placeholder: "Linha 1\nLinha 2",
        text: "",
        fontSize: 7.6,
        lineHeight: 1.18
    }));
};
const addMessagesBlock = (elements, metrics, y, height, zIndexStart)=>{
    elements.push(createText("messages_title", "Mensagens titulo", metrics.margin, y, metrics.innerWidth, 4.4, zIndexStart, {
        text: "MENSAGENS ESPECIAIS",
        fontSize: 7.4,
        fontWeight: 700
    }), createText("messages_text", "Mensagens", metrics.margin, y + 4.9, metrics.innerWidth, Math.max(8, height - 5), zIndexStart + 1, {
        contentMode: "dynamic",
        bindingKey: "specialMessages",
        placeholder: "Mensagem 1\nMensagem 2",
        text: "",
        fontSize: 7.3,
        lineHeight: 1.18
    }));
};
const addNutritionBlock = (elements, metrics, y, height, zIndexStart)=>{
    elements.push(createShape("nutrition_box", "Quadro nutricional", metrics.margin, y, metrics.innerWidth, height, zIndexStart, {
        fill: "#ffffff",
        stroke: "#111827",
        strokeWidth: 0.35
    }), createText("nutrition_title", "Titulo nutricional", metrics.margin + 1.2, y + 1.2, metrics.innerWidth - 2.4, 5.2, zIndexStart + 1, {
        text: "INFORMACAO NUTRICIONAL",
        fontFamily: NUTRITION_FONT_FAMILY,
        fontSize: 8.2,
        fontWeight: 700
    }), createText("nutrition_portion", "Porcao", metrics.margin + 1.2, y + 6.4, metrics.innerWidth - 2.4, 4.8, zIndexStart + 2, {
        contentMode: "dynamic",
        bindingKey: "portionDescription",
        placeholder: "Porcao de 60 g",
        text: "",
        fontFamily: NUTRITION_FONT_FAMILY,
        fontSize: 7.1
    }), createText("nutrition_servings", "Porcoes", metrics.margin + 1.2, y + 10.6, metrics.innerWidth - 2.4, 4.8, zIndexStart + 3, {
        contentMode: "dynamic",
        bindingKey: "servingsPerPackage",
        placeholder: "Cerca de 4 porcoes",
        text: "",
        fontFamily: NUTRITION_FONT_FAMILY,
        fontSize: 7.1
    }), createText("nutrition_table_text", "Tabela nutricional", metrics.margin + 1.2, y + 15.6, metrics.innerWidth - 2.4, Math.max(12, height - 17), zIndexStart + 4, {
        contentMode: "dynamic",
        bindingKey: "nutritionTable",
        placeholder: "Valor energetico: 120 kcal | 6%\nProteinas: 5 g | 10%",
        text: "",
        fontFamily: NUTRITION_FONT_FAMILY,
        fontSize: 6.8,
        lineHeight: 1.16
    }));
};
const addFooter = (elements, metrics, y, zIndexStart)=>{
    elements.push(createText("origin_footer", "Rodape de origem", metrics.margin, y, metrics.innerWidth, Math.max(8, metrics.height - y - metrics.margin), zIndexStart, {
        contentMode: "dynamic",
        bindingKey: "originFooter",
        text: ORIGIN_FOOTER,
        fontSize: 6.4,
        fontWeight: 600,
        lineHeight: 1.12
    }));
};
const buildTemplate60x40UnitVerticalElements = (format)=>{
    const metrics = getMetrics(format);
    const elements = [];
    const sideStripX = 0.9;
    const sideStripWidth = 5.4;
    const mainX = metrics.margin + sideStripWidth + 1.2;
    const barcodeLaneWidth = 13.2;
    const barcodeLaneRightInset = Math.max(6.4, metrics.margin + 3.8);
    const barcodeLaneX = metrics.width - barcodeLaneWidth - barcodeLaneRightInset;
    const contentGapToBarcodeLane = 1.2;
    const mainWidth = Math.max(24, barcodeLaneX - contentGapToBarcodeLane - mainX);
    const productHeight = 8.2;
    const dividerColor = "#d1d5db";
    const barcodeSymbolOccupiedWidth = 10.4;
    const barcodeTextOccupiedWidth = 2.6;
    const barcodeLaneGap = 0.6;
    const barcodeOccupiedHeight = 22;
    const barcodeOccupiedY = metrics.margin + productHeight + 0.6;
    const barcodeTextOccupiedX = barcodeLaneX;
    const barcodeSymbolOccupiedX = barcodeTextOccupiedX + barcodeTextOccupiedWidth + barcodeLaneGap;
    const barcodeWidth = barcodeOccupiedHeight;
    const barcodeHeight = barcodeSymbolOccupiedWidth;
    const barcodeX = barcodeSymbolOccupiedX + barcodeHeight / 2 - barcodeWidth / 2;
    const barcodeY = barcodeOccupiedY + barcodeWidth / 2 - barcodeHeight / 2;
    const barcodeTextWidth = barcodeOccupiedHeight;
    const barcodeTextHeight = barcodeTextOccupiedWidth;
    const barcodeTextX = barcodeTextOccupiedX + barcodeTextHeight / 2 - barcodeTextWidth / 2;
    const barcodeTextY = barcodeOccupiedY + barcodeTextWidth / 2 - barcodeTextHeight / 2;
    const metaWidth = mainWidth;
    const metaLabelFontSize = 5.2;
    const metaValueFontSize = 6.2;
    const bottomBandWidth = 16.8;
    elements.push(createShape("origin_side_strip", "Faixa lateral", sideStripX, 1.1, sideStripWidth, metrics.height - 2.2, 1, {
        fill: "#f8fafc",
        stroke: "#111827",
        strokeWidth: 0.25,
        borderRadius: 1.2
    }), createText("origin_side_label", "Origem lateral", -10.6, metrics.height / 2 - 3.3, 28.5, 6.6, 2, {
        contentMode: "dynamic",
        bindingKey: "originVerticalText",
        text: "",
        placeholder: ORIGIN_VERTICAL_TEXT,
        rotation: -90,
        fontSize: 4.4,
        fontWeight: 700,
        lineHeight: 1.05,
        align: "center",
        color: "#0f172a"
    }), createText("product_name", "Nome do produto", mainX, metrics.margin, mainWidth, productHeight, 3, {
        contentMode: "dynamic",
        bindingKey: "productName",
        text: "",
        placeholder: "Sanduiche natural",
        fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("title").fontSize,
        fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("title").fontWeight,
        lineHeight: 1.04
    }), createLine("product_divider", "Divisor do produto", mainX, metrics.margin + productHeight + 0.5, mainWidth, 4, {
        stroke: dividerColor,
        strokeWidth: 0.2,
        height: 0.2
    }));
    const metaY = metrics.margin + productHeight + 1.6;
    const topColWidth = (metaWidth - 1.4) / 3;
    const bottomColWidth = (metaWidth - 0.8) / 2;
    elements.push(createText("meta_label_date", "Label data", mainX, metaY, topColWidth, 2.4, 10, {
        text: "DATA",
        fontSize: metaLabelFontSize,
        fontWeight: 700
    }), createText("meta_label_expiration", "Label validade", mainX + topColWidth + 0.7, metaY, topColWidth, 2.4, 11, {
        text: "VALID",
        fontSize: metaLabelFontSize,
        fontWeight: 700
    }), createText("meta_label_time", "Label hora", mainX + (topColWidth + 0.7) * 2, metaY, topColWidth, 2.4, 12, {
        text: "HORA",
        fontSize: metaLabelFontSize,
        fontWeight: 700
    }), createText("meta_date_value", "Data", mainX, metaY + 2.4, topColWidth, 3.3, 13, {
        contentMode: "dynamic",
        bindingKey: "manufacturingDate",
        text: "",
        placeholder: "08/04/2026",
        fontSize: metaValueFontSize,
        fontWeight: 600
    }), createText("meta_expiration_value", "Validade", mainX + topColWidth + 0.7, metaY + 2.4, topColWidth, 3.3, 14, {
        contentMode: "dynamic",
        bindingKey: "expirationDate",
        text: "",
        placeholder: "10/04/2026",
        fontSize: metaValueFontSize,
        fontWeight: 600
    }), createText("meta_time_value", "Hora", mainX + (topColWidth + 0.7) * 2, metaY + 2.4, topColWidth, 3.3, 15, {
        contentMode: "dynamic",
        bindingKey: "time",
        text: "",
        placeholder: "14:30",
        fontSize: metaValueFontSize,
        fontWeight: 600
    }), createText("meta_label_quantity", "Label quantidade", mainX, metaY + 6.4, bottomColWidth, 2.4, 16, {
        text: "QTD",
        fontSize: metaLabelFontSize,
        fontWeight: 700
    }), createText("meta_label_unit_price", "Label preco unitario", mainX + bottomColWidth + 0.8, metaY + 6.4, bottomColWidth, 2.4, 17, {
        text: "PRECO/un",
        fontSize: 4.9,
        fontWeight: 700
    }), createText("meta_quantity_value", "Quantidade", mainX, metaY + 8.8, bottomColWidth, 3.5, 18, {
        contentMode: "dynamic",
        bindingKey: "quantity",
        text: "",
        placeholder: "1",
        fontSize: metaValueFontSize,
        fontWeight: 600
    }), createText("meta_unit_price_value", "Preco unitario", mainX + bottomColWidth + 0.8, metaY + 8.8, bottomColWidth, 3.5, 19, {
        contentMode: "dynamic",
        bindingKey: "unitPrice",
        text: "",
        placeholder: "R$ 12,90",
        fontSize: metaValueFontSize,
        fontWeight: 600
    }));
    elements.push(createBarcode("barcode", barcodeX, barcodeY, barcodeWidth, barcodeHeight, 30, "barcode", {
        showHumanReadable: false,
        rotation: 90
    }), createText("barcode_text", "Texto do codigo", barcodeTextX, barcodeTextY, barcodeTextWidth, barcodeTextHeight, 31, {
        contentMode: "dynamic",
        bindingKey: "barcodeText",
        text: "",
        placeholder: "7891234567890",
        rotation: 90,
        fontSize: 4.8,
        fontWeight: 700,
        lineHeight: 1,
        align: "center"
    }));
    const responsibleY = 27;
    elements.push(createLine("responsible_divider", "Divisor do responsavel", mainX, responsibleY - 1, mainWidth, 39, {
        stroke: dividerColor,
        strokeWidth: 0.2,
        height: 0.2
    }), createText("responsible_label", "Rotulo do responsavel", mainX, responsibleY, mainWidth, 2.6, 40, {
        contentMode: "dynamic",
        bindingKey: "responsibleLabel",
        text: "",
        placeholder: "Resp. Equipe:",
        fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleLabel").fontSize,
        fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleLabel").fontWeight
    }), createText("responsible_name", "Nome do responsavel", mainX, responsibleY + 2.4, mainWidth, 3.6, 41, {
        contentMode: "dynamic",
        bindingKey: "responsibleName",
        text: "",
        placeholder: "Equipe A",
        fontSize: 8.8,
        fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleName").fontWeight,
        lineHeight: 1.02
    }));
    elements.push(createShape("total_band", "Faixa total", mainX, 33.2, bottomBandWidth, 4.2, 50, {
        fill: "#111827",
        stroke: "#111827",
        strokeWidth: 0.2,
        borderRadius: 0.9
    }), createText("total_label", "Rotulo do total", mainX + 1, 34, bottomBandWidth - 2, 2.2, 51, {
        text: "TOTAL R$",
        fontSize: 6.4,
        fontWeight: 700,
        color: "#ffffff"
    }), createText("total_value", "Valor total", mainX + bottomBandWidth + 1.2, 32.2, mainWidth - bottomBandWidth - 1.2, 5.6, 52, {
        contentMode: "dynamic",
        bindingKey: "totalPrice",
        text: "",
        placeholder: "R$ 25,80",
        fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("price").fontSize,
        fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("price").fontWeight,
        align: "right",
        lineHeight: 1,
        color: "#111827"
    }));
    return elements;
};
const buildVerticalPresetElements = (template, format)=>{
    const metrics = getMetrics(format);
    const elements = [];
    const titleHeight = 4.8;
    const productHeight = Math.max(8, metrics.innerHeight * 0.14);
    const metaLabelWidth = metrics.innerWidth * 0.42;
    const barcodeHeight = Math.max(11, Math.min(18, metrics.height * 0.23));
    const priceBandHeight = 9.5;
    let y = metrics.margin;
    elements.push(createText("product_title", "Titulo do produto", metrics.margin, y, metrics.innerWidth, titleHeight, 1, {
        text: "DESCRICAO DO PRODUTO",
        fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("responsibleLabel").fontSize,
        fontWeight: 700
    }));
    y += titleHeight + 1.3;
    elements.push(createText("product_description", "Descricao do produto", metrics.margin, y, metrics.innerWidth, productHeight, 2, {
        contentMode: "dynamic",
        bindingKey: "productDescription",
        placeholder: "Descricao do produto",
        text: "",
        fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("product").fontSize,
        fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("product").fontWeight,
        lineHeight: 1.12
    }));
    y += productHeight + 1.6;
    elements.push(createText("manufacturing_label", "Fabricacao label", metrics.margin, y, metaLabelWidth, 4.2, 3, {
        text: "FABRICACAO",
        fontSize: 7.2,
        fontWeight: 700
    }), createText("expiration_label", "Validade label", metrics.margin + metaLabelWidth + 2, y, metrics.innerWidth - metaLabelWidth - 2, 4.2, 4, {
        text: "VALIDADE",
        fontSize: 7.2,
        fontWeight: 700
    }));
    y += 4.4;
    elements.push(createText("manufacturing_date", "Fabricacao", metrics.margin, y, metaLabelWidth, 5.4, 5, {
        contentMode: "dynamic",
        bindingKey: "manufacturingDate",
        placeholder: "07/04/2026",
        text: "",
        fontSize: 8.2,
        fontWeight: 600
    }), createText("expiration_date", "Validade", metrics.margin + metaLabelWidth + 2, y, metrics.innerWidth - metaLabelWidth - 2, 5.4, 6, {
        contentMode: "dynamic",
        bindingKey: "expirationDate",
        placeholder: "09/04/2026",
        text: "",
        fontSize: 8.2,
        fontWeight: 600
    }));
    y += 7.2;
    elements.push(createText("time_label", "Hora label", metrics.margin, y, metaLabelWidth, 4.2, 7, {
        text: "HORA",
        fontSize: 7.2,
        fontWeight: 700
    }), createText("time_value", "Hora", metrics.margin + metaLabelWidth + 2, y, metrics.innerWidth - metaLabelWidth - 2, 4.2, 8, {
        contentMode: "dynamic",
        bindingKey: "time",
        placeholder: "14:30",
        text: "",
        fontSize: 8.2,
        fontWeight: 600
    }));
    y += 6;
    if (template.operationKind === "unit") {
        elements.push(createText("quantity_label", "Quantidade label", metrics.margin, y, metaLabelWidth, 4.2, 9, {
            text: "QUANTIDADE",
            fontSize: 7.2,
            fontWeight: 700
        }), createText("quantity_value", "Quantidade", metrics.margin + metaLabelWidth + 2, y, metrics.innerWidth - metaLabelWidth - 2, 4.2, 10, {
            contentMode: "dynamic",
            bindingKey: "quantity",
            placeholder: "2",
            text: "",
            fontSize: 8.2,
            fontWeight: 600
        }), createText("unit_price_label", "Preco unidade label", metrics.margin, y + 5, metaLabelWidth, 4.2, 11, {
            text: "PRECO UN.",
            fontSize: 7.2,
            fontWeight: 700
        }), createText("unit_price_value", "Preco unidade", metrics.margin + metaLabelWidth + 2, y + 5, metrics.innerWidth - metaLabelWidth - 2, 4.2, 12, {
            contentMode: "dynamic",
            bindingKey: "unitPrice",
            placeholder: "R$ 12,90",
            text: "",
            fontSize: 8.2,
            fontWeight: 600
        }));
        y += 11;
    } else {
        elements.push(createText("weight_label", "Peso label", metrics.margin, y, metaLabelWidth, 4.2, 9, {
            text: "PESO",
            fontSize: 7.2,
            fontWeight: 700
        }), createText("weight_value", "Peso", metrics.margin + metaLabelWidth + 2, y, metrics.innerWidth - metaLabelWidth - 2, 4.2, 10, {
            contentMode: "dynamic",
            bindingKey: "weight",
            placeholder: "0,435",
            text: "",
            fontSize: 8.2,
            fontWeight: 600
        }), createText("tare_label", "Tara label", metrics.margin, y + 5, metaLabelWidth, 4.2, 11, {
            text: "TARA",
            fontSize: 7.2,
            fontWeight: 700
        }), createText("tare_value", "Tara", metrics.margin + metaLabelWidth + 2, y + 5, metrics.innerWidth - metaLabelWidth - 2, 4.2, 12, {
            contentMode: "dynamic",
            bindingKey: "tare",
            placeholder: "0,020",
            text: "",
            fontSize: 8.2,
            fontWeight: 600
        }), createText("price_kg_label", "Preco kg label", metrics.margin, y + 10, metaLabelWidth, 4.2, 13, {
            text: "PRECO/KG",
            fontSize: 7.2,
            fontWeight: 700
        }), createText("price_kg_value", "Preco kg", metrics.margin + metaLabelWidth + 2, y + 10, metrics.innerWidth - metaLabelWidth - 2, 4.2, 14, {
            contentMode: "dynamic",
            bindingKey: "pricePerKg",
            placeholder: "R$ 48,90",
            text: "",
            fontSize: 8.2,
            fontWeight: 600
        }));
        y += 16;
    }
    elements.push(createShape("total_band", "Faixa total", metrics.margin, y, metrics.innerWidth, priceBandHeight, 20, {
        fill: "#111827",
        stroke: "#111827",
        borderRadius: 1.2
    }), createText("total_label", "Total label", metrics.margin + 1.5, y + 1.5, metrics.innerWidth * 0.42, priceBandHeight - 2.5, 21, {
        text: "TOTAL R$",
        fontSize: 8.4,
        fontWeight: 700,
        color: "#ffffff"
    }), createText("total_value", "Total", metrics.margin + metrics.innerWidth * 0.42, y + 1.1, metrics.innerWidth * 0.58 - 1.5, priceBandHeight - 2.2, 22, {
        contentMode: "dynamic",
        bindingKey: "totalPrice",
        placeholder: "R$ 25,80",
        text: "",
        fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("price").fontSize,
        fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("price").fontWeight,
        align: "right",
        color: "#ffffff"
    }));
    y += priceBandHeight + 1.8;
    elements.push(createBarcode("barcode", metrics.margin, y, metrics.innerWidth, barcodeHeight, 30));
    y += barcodeHeight + 1.6;
    if (template.supports.recipeLines) {
        const recipeHeight = Math.max(10, metrics.innerHeight * 0.14);
        addRecipeBlock(elements, metrics, y, recipeHeight, 40);
        y += recipeHeight + 1.6;
    }
    if (template.supports.nutritionTable) {
        const nutritionHeight = Math.max(18, metrics.innerHeight * 0.26);
        addNutritionBlock(elements, metrics, y, nutritionHeight, 50);
        y += nutritionHeight + 1.6;
    }
    addFooter(elements, metrics, Math.min(y, metrics.height - 14), 60);
    return elements;
};
const buildHorizontalPresetElements = (template, format)=>{
    const metrics = getMetrics(format);
    const elements = [];
    const leftWidth = Math.max(32, metrics.innerWidth * 0.56);
    const rightWidth = metrics.innerWidth - leftWidth - 2.2;
    const bandHeight = 10;
    let y = metrics.margin;
    elements.push(createText("product_title", "Titulo do produto", metrics.margin, y, leftWidth, 4.4, 1, {
        text: "DESCRICAO DO PRODUTO",
        fontSize: 7.6,
        fontWeight: 700
    }), createText("product_description", "Descricao do produto", metrics.margin, y + 4.9, leftWidth, 9.8, 2, {
        contentMode: "dynamic",
        bindingKey: "productDescription",
        placeholder: "Descricao do produto",
        text: "",
        fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("product").fontSize,
        fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("product").fontWeight,
        lineHeight: 1.1
    }));
    elements.push(createText("manufacturing_line", "Fabricacao linha", metrics.margin, y + 15.4, leftWidth * 0.48, 4.4, 3, {
        contentMode: "dynamic",
        bindingKey: "manufacturingDate",
        text: "",
        placeholder: "07/04/2026",
        fontSize: 7.6,
        fontWeight: 600
    }), createText("expiration_line", "Validade linha", metrics.margin + leftWidth * 0.5, y + 15.4, leftWidth * 0.5, 4.4, 4, {
        contentMode: "dynamic",
        bindingKey: "expirationDate",
        text: "",
        placeholder: "09/04/2026",
        fontSize: 7.6,
        fontWeight: 600
    }), createText("time_line", "Hora linha", metrics.margin, y + 20.2, leftWidth, 4.2, 5, {
        contentMode: "dynamic",
        bindingKey: "time",
        text: "",
        placeholder: "14:30",
        fontSize: 7.4,
        fontWeight: 600
    }));
    if (template.operationKind === "unit") {
        elements.push(createText("quantity_line", "Quantidade linha", metrics.margin, y + 25, leftWidth * 0.48, 4.2, 6, {
            contentMode: "dynamic",
            bindingKey: "quantity",
            text: "",
            placeholder: "2 un.",
            fontSize: 7.4,
            fontWeight: 600
        }), createText("unit_price_line", "Preco unidade linha", metrics.margin + leftWidth * 0.5, y + 25, leftWidth * 0.5, 4.2, 7, {
            contentMode: "dynamic",
            bindingKey: "unitPrice",
            text: "",
            placeholder: "R$ 12,90",
            fontSize: 7.4,
            fontWeight: 600,
            align: "right"
        }));
    } else {
        elements.push(createText("weight_line", "Peso linha", metrics.margin, y + 25, leftWidth * 0.32, 4.2, 6, {
            contentMode: "dynamic",
            bindingKey: "weight",
            text: "",
            placeholder: "0,435",
            fontSize: 7.4,
            fontWeight: 600
        }), createText("tare_line", "Tara linha", metrics.margin + leftWidth * 0.34, y + 25, leftWidth * 0.24, 4.2, 7, {
            contentMode: "dynamic",
            bindingKey: "tare",
            text: "",
            placeholder: "0,020",
            fontSize: 7.4,
            fontWeight: 600
        }), createText("price_kg_line", "Preco kg linha", metrics.margin + leftWidth * 0.6, y + 25, leftWidth * 0.4, 4.2, 8, {
            contentMode: "dynamic",
            bindingKey: "pricePerKg",
            text: "",
            placeholder: "R$ 48,90",
            fontSize: 7.4,
            fontWeight: 600,
            align: "right"
        }));
    }
    elements.push(createShape("total_band", "Faixa total", metrics.margin + leftWidth + 2.2, y, rightWidth, bandHeight, 20, {
        fill: "#111827",
        stroke: "#111827",
        borderRadius: 1.2
    }), createText("total_label", "Total label", metrics.margin + leftWidth + 3.4, y + 1.3, rightWidth - 6.8, 3.6, 21, {
        text: "TOTAL R$",
        fontSize: 7.2,
        fontWeight: 700,
        color: "#ffffff"
    }), createText("total_value", "Total", metrics.margin + leftWidth + 3.4, y + 4.6, rightWidth - 6.8, 4.4, 22, {
        contentMode: "dynamic",
        bindingKey: "totalPrice",
        text: "",
        placeholder: "R$ 25,80",
        fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("price").fontSize,
        fontWeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypography"])("price").fontWeight,
        color: "#ffffff",
        align: "right"
    }), createBarcode("barcode", metrics.margin + leftWidth + 2.2, y + 12, rightWidth, Math.max(11, metrics.innerHeight * 0.26), 23));
    let lowerY = metrics.margin + 31.4;
    if (template.supports.recipeLines) {
        const recipeHeight = template.supports.specialMessages ? 10 : 14;
        addRecipeBlock(elements, metrics, lowerY, recipeHeight, 40);
        lowerY += recipeHeight + 1.4;
    }
    if (template.supports.specialMessages) {
        addMessagesBlock(elements, metrics, lowerY, 9.2, 50);
        lowerY += 10.4;
    }
    addFooter(elements, metrics, Math.min(lowerY, metrics.height - 12), 60);
    return elements;
};
const createPresetElements = (template, format)=>{
    if (template.id === "template_60x40_unidade_vertical") {
        return buildTemplate60x40UnitVerticalElements(format);
    }
    return template.family.startsWith("vertical") ? buildVerticalPresetElements(template, format) : buildHorizontalPresetElements(template, format);
};
const buildOfficialTemplatePreviewPayload = (templateId, overrides)=>{
    const fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listOfficialTemplateFields"])(templateId);
    return fields.reduce((accumulator, field)=>{
        var _overrides_field_key, _ref;
        accumulator[field.key] = (_ref = (_overrides_field_key = overrides === null || overrides === void 0 ? void 0 : overrides[field.key]) !== null && _overrides_field_key !== void 0 ? _overrides_field_key : normalizeSampleValue(field)) !== null && _ref !== void 0 ? _ref : "";
        return accumulator;
    }, {});
};
const buildOfficialTemplateDocument = (param)=>{
    let { templateId, formatId, orientation, name } = param;
    const template = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOfficialTemplateById"])(templateId);
    if (!template) {
        throw new Error("Template oficial nao encontrado: ".concat(templateId));
    }
    const resolvedFormat = resolveFormat(template, formatId, orientation);
    const dataSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listOfficialTemplateFields"])(templateId).map(toDataField);
    const elements = createPresetElements(template, resolvedFormat);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$factories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInitialDocument"])({
        name: name !== null && name !== void 0 ? name : template.name,
        document: {
            width: resolvedFormat.resolvedWidthMm,
            height: resolvedFormat.resolvedHeightMm,
            unit: "mm",
            orientation: resolvedFormat.resolvedOrientation,
            background: "#ffffff",
            dpi: 203
        },
        dataSchema,
        elements,
        metadata: {
            officialTemplateId: template.id,
            officialTemplateFamily: template.family,
            operationKind: template.operationKind,
            formatId: resolvedFormat.id,
            shape: resolvedFormat.shape,
            supports: template.supports,
            structuredFieldKeys: template.fieldKeys.filter((key)=>[
                    "recipeLines",
                    "specialMessages",
                    "nutritionTable"
                ].includes(key)),
            source: "official_catalog"
        }
    });
};
const listOfficialTemplatePresetOptions = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listOfficialTemplates"])().map((template)=>({
            id: template.id,
            name: template.name,
            summary: template.summary,
            orientation: template.orientation,
            operationKind: template.operationKind,
            defaultFormat: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOfficialTemplateDefaultFormat"])(template.id),
            recommendedFormats: template.recommendedFormatIds.map((formatId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLabelFormatById"])(formatId)).filter((format)=>Boolean(format))
        }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/lib/template-library.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    var _MODEL_CATEGORIES_find;
    const match = (_MODEL_CATEGORIES_find = MODEL_CATEGORIES.find((category)=>MODEL_CATEGORY_CONFIG[category].keywords.some((keyword)=>normalizedName.includes(normalizeText(keyword))))) !== null && _MODEL_CATEGORIES_find !== void 0 ? _MODEL_CATEGORIES_find : "doces";
    return match;
}
const getCategoryDefinition = (category)=>MODEL_CATEGORY_CONFIG[category];
const formatDateInputLocal = (date)=>{
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
};
const addDaysToDateInput = (dateInput, days)=>{
    const base = new Date("".concat(dateInput, "T00:00:00"));
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
    var _document_dataSchema_find;
    const keywords = FIELD_MATCHERS[matcherKey];
    return (_document_dataSchema_find = document.dataSchema.find((field)=>{
        var _field_description;
        const haystack = normalizeText("".concat(field.key, " ").concat(field.label, " ").concat((_field_description = field.description) !== null && _field_description !== void 0 ? _field_description : ""));
        return keywords.some((keyword)=>haystack.includes(normalizeText(keyword)));
    })) === null || _document_dataSchema_find === void 0 ? void 0 : _document_dataSchema_find.key;
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
    var _printers_find;
    const preferredPrinter = (_printers_find = printers.find((printer)=>printer.isActive)) !== null && _printers_find !== void 0 ? _printers_find : printers[0];
    var _profiles_find;
    const preferredProfile = (_profiles_find = profiles.find((profile)=>profile.printerId === (preferredPrinter === null || preferredPrinter === void 0 ? void 0 : preferredPrinter.id))) !== null && _profiles_find !== void 0 ? _profiles_find : profiles[0];
    return {
        printer: preferredPrinter,
        profile: preferredProfile
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/app/home/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Alert/Alert.mjs [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Autocomplete$2f$Autocomplete$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Autocomplete$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Autocomplete/Autocomplete.mjs [app-client] (ecmascript) <locals> <export default as Autocomplete>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Button/Button.mjs [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Chip/Chip.mjs [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/CircularProgress/CircularProgress.mjs [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Dialog/Dialog.mjs [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/DialogActions/DialogActions.mjs [app-client] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/DialogContent/DialogContent.mjs [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/DialogTitle/DialogTitle.mjs [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Stack/Stack.mjs [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/TextField/TextField.mjs [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$icons$2d$material$40$9$2e$0$2e$0_$40$_c836dbdbeea88e25b562b656f87be531$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$LocalPrintshopRounded$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+icons-material@9.0.0_@_c836dbdbeea88e25b562b656f87be531/node_modules/@mui/icons-material/LocalPrintshopRounded.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$icons$2d$material$40$9$2e$0$2e$0_$40$_c836dbdbeea88e25b562b656f87be531$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$BookmarkBorderRounded$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+icons-material@9.0.0_@_c836dbdbeea88e25b562b656f87be531/node_modules/@mui/icons-material/BookmarkBorderRounded.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/template/render.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$app$2f$dashboard$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/app/dashboard-shell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$app$2f$session$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/app/session-guard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$label$2d$preview$2d$surface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/editor/label-preview-surface.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$print$2f$label$2d$print$2d$portal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/print/label-print-portal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$barcode$2d$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/barcode-validation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ui$2f$label$2d$format$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/ui/label-format-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ui$2f$page$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/ui/page-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/label-format-registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$quick$2d$label$2d$builder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/quick-label-builder.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/official-template-presets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/template-library.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
;
const formatDateLabel = (value)=>new Date("".concat(value, "T00:00:00")).toLocaleDateString("pt-BR");
const formatTimeLabel = ()=>new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
const ORIGIN_FOOTER = "Pascal Fast Food.\nRua Victorio Viezzer, 588.\nVista Alegre.\nCuritiba - Parana.";
const ORIGIN_VERTICAL_TEXT = "Pascal Fast Food.\nRua Victorio Viezzer, 588.\nVista Alegre.\nCuritiba-Paraná.";
const OFFICIAL_TEMPLATE_OPTIONS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listOfficialTemplatePresetOptions"])().filter(_c = (template)=>template.operationKind === "unit");
_c1 = OFFICIAL_TEMPLATE_OPTIONS;
const DEFAULT_TEMPLATE_ID = "template_60x40_unidade_vertical";
const formatTimestampLabel = (value)=>new Date(value).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
const formatTemplateTypeLabel = (template)=>{
    const format = typeof template.formatId === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLabelFormatById"])(template.formatId) : undefined;
    if (format) {
        return format.name;
    }
    if (template.width && template.height && template.unit) {
        return "".concat(template.width, " x ").concat(template.height, " ").concat(template.unit);
    }
    return "Formato personalizado";
};
const formatTemplateCategoryLabel = (template)=>template.category ? "".concat(template.category.charAt(0).toUpperCase()).concat(template.category.slice(1)) : "Categoria livre";
const formatCurrencyLabel = (value)=>typeof value === "number" && Number.isFinite(value) ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value) : null;
const buildProductOptionMeta = (product)=>{
    const tokens = [
        product.productCode ? "Codigo: ".concat(product.productCode) : null,
        product.barcode ? "Barcode: ".concat(product.barcode) : null,
        product.category ? "Categoria: ".concat(product.category) : null,
        product.unitOfMeasure ? product.unitOfMeasure : null,
        formatCurrencyLabel(product.price)
    ].filter(Boolean);
    return tokens.join(" — ");
};
function HomePage() {
    _s();
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$app$2f$session$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionGuard"], {
        onSession: setSession,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$app$2f$dashboard$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardShell"], {
            title: "Operacao Rapida",
            subtitle: "Preencha responsavel, item e quantidade. O restante da etiqueta e resolvido automaticamente.",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickWelcomeExperience, {
                session: session
            }, void 0, false, {
                fileName: "[project]/apps/web/app/home/page.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/app/home/page.tsx",
            lineNumber: 134,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/app/home/page.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_s(HomePage, "Vg48Kv/XyvnxZ9Q+AJPylK1Sow8=");
_c2 = HomePage;
const getProductOptionKey = (product)=>{
    var _product_productCode, _product_barcode;
    return product.id || product.productCode || product.barcode || "".concat(product.name, "-").concat((_product_productCode = product.productCode) !== null && _product_productCode !== void 0 ? _product_productCode : "sem-codigo", "-").concat((_product_barcode = product.barcode) !== null && _product_barcode !== void 0 ? _product_barcode : "sem-barcode");
};
function QuickWelcomeExperience(param) {
    let { session } = param;
    _s1();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$quick$2d$label$2d$builder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultQuickForm"])());
    const [printActive, setPrintActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formatDialogOpen, setFormatDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [templateDialogOpen, setTemplateDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savedTemplateDialogOpen, setSavedTemplateDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [templateId, setTemplateId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_TEMPLATE_ID);
    const [savedTemplates, setSavedTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [savedTemplatesLoading, setSavedTemplatesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savedTemplatesError, setSavedTemplatesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [savedTemplateLoadingId, setSavedTemplateLoadingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [productsLoading, setProductsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [productsError, setProductsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [productSearch, setProductSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [debouncedProductSearch, setDebouncedProductSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedSavedTemplateId, setSelectedSavedTemplateId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedSavedTemplateDocument, setSelectedSavedTemplateDocument] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[selectedFormat]": ()=>{
            var _getLabelFormatById;
            return (_getLabelFormatById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLabelFormatById"])(form.formatId)) !== null && _getLabelFormatById !== void 0 ? _getLabelFormatById : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultLabelFormat"])();
        }
    }["QuickWelcomeExperience.useMemo[selectedFormat]"], [
        form.formatId
    ]);
    const selectedTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[selectedTemplate]": ()=>{
            var _OFFICIAL_TEMPLATE_OPTIONS_find;
            return (_OFFICIAL_TEMPLATE_OPTIONS_find = OFFICIAL_TEMPLATE_OPTIONS.find({
                "QuickWelcomeExperience.useMemo[selectedTemplate]": (template)=>template.id === templateId
            }["QuickWelcomeExperience.useMemo[selectedTemplate]"])) !== null && _OFFICIAL_TEMPLATE_OPTIONS_find !== void 0 ? _OFFICIAL_TEMPLATE_OPTIONS_find : OFFICIAL_TEMPLATE_OPTIONS[0];
        }
    }["QuickWelcomeExperience.useMemo[selectedTemplate]"], [
        templateId
    ]);
    const templatePreviewSamples = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[templatePreviewSamples]": ()=>Object.fromEntries(OFFICIAL_TEMPLATE_OPTIONS.map({
                "QuickWelcomeExperience.useMemo[templatePreviewSamples]": (template)=>{
                    var _template_defaultFormat, _template_recommendedFormats_;
                    var _template_defaultFormat_id, _ref;
                    const formatId = (_ref = (_template_defaultFormat_id = (_template_defaultFormat = template.defaultFormat) === null || _template_defaultFormat === void 0 ? void 0 : _template_defaultFormat.id) !== null && _template_defaultFormat_id !== void 0 ? _template_defaultFormat_id : (_template_recommendedFormats_ = template.recommendedFormats[0]) === null || _template_recommendedFormats_ === void 0 ? void 0 : _template_recommendedFormats_.id) !== null && _ref !== void 0 ? _ref : form.formatId;
                    const previewDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildOfficialTemplateDocument"])({
                        templateId: template.id,
                        formatId,
                        name: template.name
                    });
                    const previewPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildOfficialTemplatePreviewPayload"])(template.id, {
                        productName: "Sanduiche natural",
                        productDescription: "Sanduiche natural",
                        manufacturingDate: "09/04/2026",
                        expirationDate: "11/04/2026",
                        time: "14:30",
                        quantity: "1",
                        unitPrice: 12.9,
                        totalPrice: 12.9,
                        barcode: "7891234567890",
                        barcodeText: "7891234567890",
                        responsibleLabel: "Resp. Equipe:",
                        responsibleName: "Equipe A",
                        originFooter: ORIGIN_FOOTER,
                        originVerticalText: ORIGIN_VERTICAL_TEXT
                    });
                    const scale = Math.min(2.2, 132 / Math.max(previewDocument.document.width, 1), 88 / Math.max(previewDocument.document.height, 1));
                    return [
                        template.id,
                        {
                            document: previewDocument,
                            previewPayload,
                            scale
                        }
                    ];
                }
            }["QuickWelcomeExperience.useMemo[templatePreviewSamples]"]))
    }["QuickWelcomeExperience.useMemo[templatePreviewSamples]"], [
        form.formatId
    ]);
    const officialDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[officialDocument]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildOfficialTemplateDocument"])({
                templateId,
                formatId: selectedFormat.id,
                name: selectedTemplate === null || selectedTemplate === void 0 ? void 0 : selectedTemplate.name
            })
    }["QuickWelcomeExperience.useMemo[officialDocument]"], [
        selectedFormat.id,
        selectedTemplate === null || selectedTemplate === void 0 ? void 0 : selectedTemplate.name,
        templateId
    ]);
    const selectedSavedTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[selectedSavedTemplate]": ()=>{
            var _savedTemplates_find;
            return (_savedTemplates_find = savedTemplates.find({
                "QuickWelcomeExperience.useMemo[selectedSavedTemplate]": (template)=>template.id === selectedSavedTemplateId
            }["QuickWelcomeExperience.useMemo[selectedSavedTemplate]"])) !== null && _savedTemplates_find !== void 0 ? _savedTemplates_find : null;
        }
    }["QuickWelcomeExperience.useMemo[selectedSavedTemplate]"], [
        savedTemplates,
        selectedSavedTemplateId
    ]);
    const document = selectedSavedTemplateDocument !== null && selectedSavedTemplateDocument !== void 0 ? selectedSavedTemplateDocument : officialDocument;
    const productDataPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[productDataPayload]": ()=>{
            var _selectedProduct_price;
            const unitPrice = (_selectedProduct_price = selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.price) !== null && _selectedProduct_price !== void 0 ? _selectedProduct_price : undefined;
            const totalPrice = unitPrice !== undefined && unitPrice !== null ? Number(unitPrice) * Math.max(1, Number(form.quantity) || 1) : undefined;
            const productName = (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.name) || form.product || "Produto";
            const barcode = (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.barcode) || form.barcode;
            return {
                productId: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.id,
                productName,
                product: productName,
                produto: productName,
                item: productName,
                productDescription: (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.description) || productName,
                description: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.description,
                descricao: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.description,
                ingredients: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.ingredients,
                ingredientes: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.ingredients,
                recipeLines: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.ingredients,
                unitPrice,
                price: unitPrice,
                preco: unitPrice,
                precoUnitario: unitPrice,
                totalPrice,
                total: totalPrice,
                barcode,
                barcodeText: barcode,
                productCode: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.productCode,
                codigoProduto: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.productCode,
                unitOfMeasure: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.unitOfMeasure,
                unidade: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.unitOfMeasure,
                category: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.category,
                brand: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.brand,
                origin: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.origin
            };
        }
    }["QuickWelcomeExperience.useMemo[productDataPayload]"], [
        form.product,
        form.quantity,
        form.barcode,
        selectedProduct
    ]);
    const previewPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[previewPayload]": ()=>{
            if (selectedSavedTemplateDocument && selectedSavedTemplate) {
                const category = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inferTemplateCategory"])({
                    name: selectedSavedTemplate.name,
                    category: selectedSavedTemplate.category
                });
                return {
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$template$2f$render$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildPreviewPayload"])(selectedSavedTemplateDocument),
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$template$2d$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildQuickPrintPayload"])(selectedSavedTemplateDocument, category, {
                        productName: String(productDataPayload.productName),
                        responsibleName: form.responsible || "Equipe",
                        manufacturedAt: form.manufacturedAt,
                        expiresAt: form.expiresAt,
                        quantity: form.quantity
                    }),
                    responsibleLabel: "Resp. Equipe:",
                    ...productDataPayload
                };
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$official$2d$template$2d$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildOfficialTemplatePreviewPayload"])(templateId, {
                ...productDataPayload,
                productName: String(productDataPayload.productName),
                productDescription: typeof productDataPayload.productDescription === "string" ? productDataPayload.productDescription : String(productDataPayload.productName),
                manufacturingDate: formatDateLabel(form.manufacturedAt),
                expirationDate: formatDateLabel(form.expiresAt),
                time: formatTimeLabel(),
                quantity: String(form.quantity),
                barcode: String(productDataPayload.barcode || form.barcode),
                barcodeText: String(productDataPayload.barcode || form.barcode),
                responsibleLabel: "Resp. Equipe:",
                responsibleName: form.responsible || "Equipe",
                originFooter: ORIGIN_FOOTER,
                originVerticalText: ORIGIN_VERTICAL_TEXT
            });
        }
    }["QuickWelcomeExperience.useMemo[previewPayload]"], [
        form,
        productDataPayload,
        selectedSavedTemplate,
        selectedSavedTemplateDocument,
        templateId
    ]);
    const previewScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[previewScale]": ()=>{
            const maxW = 440;
            const maxH = 340;
            return Math.min(6, maxW / Math.max(document.document.width, 1), maxH / Math.max(document.document.height, 1));
        }
    }["QuickWelcomeExperience.useMemo[previewScale]"], [
        document.document.height,
        document.document.width
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickWelcomeExperience.useEffect": ()=>{
            const timeoutId = window.setTimeout({
                "QuickWelcomeExperience.useEffect.timeoutId": ()=>{
                    setDebouncedProductSearch(productSearch.trim());
                }
            }["QuickWelcomeExperience.useEffect.timeoutId"], 250);
            return ({
                "QuickWelcomeExperience.useEffect": ()=>window.clearTimeout(timeoutId)
            })["QuickWelcomeExperience.useEffect"];
        }
    }["QuickWelcomeExperience.useEffect"], [
        productSearch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickWelcomeExperience.useEffect": ()=>{
            if (!session) {
                return;
            }
            let active = true;
            setSavedTemplatesLoading(true);
            setSavedTemplatesError(null);
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTemplates"])(session, {
                limit: 10
            }).then({
                "QuickWelcomeExperience.useEffect": (templates)=>{
                    if (!active) return;
                    setSavedTemplates(templates.filter({
                        "QuickWelcomeExperience.useEffect": (template)=>template.status !== "ARCHIVED"
                    }["QuickWelcomeExperience.useEffect"]).slice(0, 10));
                }
            }["QuickWelcomeExperience.useEffect"]).catch({
                "QuickWelcomeExperience.useEffect": ()=>{
                    if (!active) return;
                    setSavedTemplatesError("Nao foi possivel carregar os templates salvos.");
                }
            }["QuickWelcomeExperience.useEffect"]).finally({
                "QuickWelcomeExperience.useEffect": ()=>{
                    if (!active) return;
                    setSavedTemplatesLoading(false);
                }
            }["QuickWelcomeExperience.useEffect"]);
            return ({
                "QuickWelcomeExperience.useEffect": ()=>{
                    active = false;
                }
            })["QuickWelcomeExperience.useEffect"];
        }
    }["QuickWelcomeExperience.useEffect"], [
        session
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickWelcomeExperience.useEffect": ()=>{
            if (!session) {
                setProducts([]);
                setProductsError(null);
                return;
            }
            let active = true;
            setProductsLoading(true);
            setProductsError(null);
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchProducts"])(session, {
                active: "true",
                search: debouncedProductSearch || undefined
            }).then({
                "QuickWelcomeExperience.useEffect": (nextProducts)=>{
                    if (!active) return;
                    setProducts(nextProducts);
                }
            }["QuickWelcomeExperience.useEffect"]).catch({
                "QuickWelcomeExperience.useEffect": ()=>{
                    if (!active) return;
                    setProducts([]);
                    setProductsError("Nao foi possivel carregar os produtos da base.");
                }
            }["QuickWelcomeExperience.useEffect"]).finally({
                "QuickWelcomeExperience.useEffect": ()=>{
                    if (!active) return;
                    setProductsLoading(false);
                }
            }["QuickWelcomeExperience.useEffect"]);
            return ({
                "QuickWelcomeExperience.useEffect": ()=>{
                    active = false;
                }
            })["QuickWelcomeExperience.useEffect"];
        }
    }["QuickWelcomeExperience.useEffect"], [
        debouncedProductSearch,
        session
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickWelcomeExperience.useEffect": ()=>{
            if (!printActive) return;
            let frame = 0;
            frame = window.requestAnimationFrame({
                "QuickWelcomeExperience.useEffect": ()=>{
                    try {
                        window.print();
                    } catch (e) {
                    // O usuario pode tentar novamente.
                    } finally{
                        setPrintActive(false);
                    }
                }
            }["QuickWelcomeExperience.useEffect"]);
            return ({
                "QuickWelcomeExperience.useEffect": ()=>window.cancelAnimationFrame(frame)
            })["QuickWelcomeExperience.useEffect"];
        }
    }["QuickWelcomeExperience.useEffect"], [
        printActive
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickWelcomeExperience.useEffect": ()=>{
            if (!selectedProduct) {
                return;
            }
            const refreshedProduct = products.find({
                "QuickWelcomeExperience.useEffect.refreshedProduct": (product)=>product.id === selectedProduct.id
            }["QuickWelcomeExperience.useEffect.refreshedProduct"]);
            if (refreshedProduct) {
                setSelectedProduct(refreshedProduct);
            }
        }
    }["QuickWelcomeExperience.useEffect"], [
        products,
        selectedProduct
    ]);
    const handleFieldChange = (key, value)=>{
        setForm((current)=>({
                ...current,
                [key]: value
            }));
    };
    const handleQuantityChange = (value)=>{
        const parsed = Number(value);
        setForm((current)=>({
                ...current,
                quantity: Number.isFinite(parsed) && parsed >= 1 ? Math.max(1, Math.floor(parsed)) : 1
            }));
    };
    const handleProductSelection = (product)=>{
        setSelectedProduct(product);
        var _product_name;
        setProductSearch((_product_name = product === null || product === void 0 ? void 0 : product.name) !== null && _product_name !== void 0 ? _product_name : "");
        if (!product) {
            return;
        }
        setForm((current)=>({
                ...current,
                product: product.name,
                barcode: product.barcode || current.barcode
            }));
    };
    const handleFormatChange = (value)=>{
        setSelectedSavedTemplateId(null);
        setSelectedSavedTemplateDocument(null);
        setForm((current)=>({
                ...current,
                formatId: value
            }));
        setFormatDialogOpen(false);
    };
    const handleTemplateChange = (nextTemplateId, nextFormatId)=>{
        setSelectedSavedTemplateId(null);
        setSelectedSavedTemplateDocument(null);
        setTemplateId(nextTemplateId);
        setForm((current)=>({
                ...current,
                formatId: nextFormatId !== null && nextFormatId !== void 0 ? nextFormatId : current.formatId
            }));
        setTemplateDialogOpen(false);
    };
    const handleSavedTemplateChange = async (template)=>{
        if (!session) {
            return;
        }
        setSavedTemplateLoadingId(template.id);
        try {
            const nextDocument = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTemplateDocument"])(template.id, session);
            setSelectedSavedTemplateId(template.id);
            setSelectedSavedTemplateDocument(nextDocument);
            setSavedTemplateDialogOpen(false);
        } catch (e) {
            setSavedTemplatesError("Nao foi possivel abrir o template salvo selecionado.");
        } finally{
            setSavedTemplateLoadingId(null);
        }
    };
    const handleReturnToOfficialTemplate = ()=>{
        setSelectedSavedTemplateId(null);
        setSelectedSavedTemplateDocument(null);
    };
    const handlePrint = ()=>{
        const scannableErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$barcode$2d$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScannableValidationErrors"])(document, previewPayload);
        if (scannableErrors.length > 0) {
            var _scannableErrors_;
            setSavedTemplatesError((_scannableErrors_ = scannableErrors[0]) !== null && _scannableErrors_ !== void 0 ? _scannableErrors_ : "Corrija o codigo antes de imprimir.");
            return;
        }
        setPrintActive(true);
    };
    const automaticSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[automaticSummary]": ()=>{
            const manufacturedLabel = formatDateLabel(form.manufacturedAt);
            const expiresLabel = formatDateLabel(form.expiresAt);
            return "Fabricacao ".concat(manufacturedLabel, " | Validade ").concat(expiresLabel, " | Origem aplicada automaticamente.");
        }
    }["QuickWelcomeExperience.useMemo[automaticSummary]"], [
        form.expiresAt,
        form.manufacturedAt
    ]);
    const activeFormatLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickWelcomeExperience.useMemo[activeFormatLabel]": ()=>{
            var _selectedSavedTemplateDocument_metadata;
            const metadataFormatId = selectedSavedTemplateDocument && typeof ((_selectedSavedTemplateDocument_metadata = selectedSavedTemplateDocument.metadata) === null || _selectedSavedTemplateDocument_metadata === void 0 ? void 0 : _selectedSavedTemplateDocument_metadata.formatId) === "string" ? selectedSavedTemplateDocument.metadata.formatId : null;
            const metadataFormat = metadataFormatId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLabelFormatById"])(metadataFormatId) : undefined;
            if (metadataFormat) {
                return metadataFormat.name;
            }
            if (selectedSavedTemplateDocument) {
                return "".concat(selectedSavedTemplateDocument.document.width, " x ").concat(selectedSavedTemplateDocument.document.height, " ").concat(selectedSavedTemplateDocument.document.unit);
            }
            return selectedFormat.name;
        }
    }["QuickWelcomeExperience.useMemo[activeFormatLabel]"], [
        selectedFormat.name,
        selectedSavedTemplateDocument
    ]);
    var _selectedTemplate_name, _selectedTemplate_name1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
        spacing: 3,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ui$2f$page$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageSection"], {
                sx: {
                    p: {
                        xs: 2.25,
                        md: 3
                    }
                },
                contentSx: {
                    display: "grid",
                    gap: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                        spacing: 1,
                        sx: {
                            maxWidth: 720
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "overline",
                                color: "text.secondary",
                                children: "Operacao diaria"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/home/page.tsx",
                                lineNumber: 562,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h4",
                                children: "Preencha, confira a etiqueta e imprima."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/home/page.tsx",
                                lineNumber: 565,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "body2",
                                color: "text.secondary",
                                children: "A entrada do sistema fica centrada no uso rapido, mas o preview agora mostra o template oficial completo do modelo escolhido."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/home/page.tsx",
                                lineNumber: 566,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "caption",
                                color: "text.secondary",
                                children: "Modelo padrao da operacao rapida: 60x40 unidade vertical."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/home/page.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 561,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                lg: "minmax(300px, 360px) minmax(0, 1fr)"
                            },
                            gap: 3,
                            alignItems: "start"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                spacing: 2.25,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                        direction: "row",
                                        spacing: 1,
                                        useFlexGap: true,
                                        sx: {
                                            flexWrap: "wrap"
                                        },
                                        children: [
                                            selectedSavedTemplate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                variant: "filled",
                                                color: "primary",
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$icons$2d$material$40$9$2e$0$2e$0_$40$_c836dbdbeea88e25b562b656f87be531$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$BookmarkBorderRounded$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                    fileName: "[project]/apps/web/app/home/page.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 25
                                                }, void 0),
                                                label: "Template salvo: ".concat(selectedSavedTemplate.name)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 586,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                variant: "filled",
                                                color: templateId === DEFAULT_TEMPLATE_ID ? "primary" : "default",
                                                label: templateId === DEFAULT_TEMPLATE_ID ? "Modelo padrao: ".concat((_selectedTemplate_name = selectedTemplate === null || selectedTemplate === void 0 ? void 0 : selectedTemplate.name) !== null && _selectedTemplate_name !== void 0 ? _selectedTemplate_name : "60x40 unidade vertical") : (_selectedTemplate_name1 = selectedTemplate === null || selectedTemplate === void 0 ? void 0 : selectedTemplate.name) !== null && _selectedTemplate_name1 !== void 0 ? _selectedTemplate_name1 : "Modelo oficial"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 593,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                variant: "text",
                                                size: "small",
                                                onClick: ()=>setSavedTemplateDialogOpen(true),
                                                children: "Alterar modelo"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 603,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                variant: "outlined",
                                                color: "primary",
                                                label: "Etiqueta ".concat(activeFormatLabel)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 606,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                variant: "text",
                                                size: "small",
                                                onClick: ()=>setFormatDialogOpen(true),
                                                children: "Alterar formato"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 607,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                variant: "text",
                                                size: "small",
                                                onClick: ()=>setTemplateDialogOpen(true),
                                                startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$icons$2d$material$40$9$2e$0$2e$0_$40$_c836dbdbeea88e25b562b656f87be531$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$BookmarkBorderRounded$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                    fileName: "[project]/apps/web/app/home/page.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 28
                                                }, void 0),
                                                children: "Modelos oficiais"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 610,
                                                columnNumber: 15
                                            }, this),
                                            selectedSavedTemplate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                variant: "text",
                                                size: "small",
                                                onClick: handleReturnToOfficialTemplate,
                                                children: "Usar modelo oficial"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 619,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 584,
                                        columnNumber: 13
                                    }, this),
                                    savedTemplatesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                        severity: "warning",
                                        children: savedTemplatesError
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 625,
                                        columnNumber: 36
                                    }, this) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Autocomplete$2f$Autocomplete$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Autocomplete$3e$__["Autocomplete"], {
                                        options: products,
                                        loading: productsLoading,
                                        filterOptions: (options)=>options,
                                        value: selectedProduct,
                                        inputValue: productSearch,
                                        onInputChange: (_event, value, reason)=>{
                                            if (reason === "reset") {
                                                return;
                                            }
                                            setProductSearch(value);
                                        },
                                        onChange: (_event, product)=>handleProductSelection(product),
                                        getOptionLabel: (product)=>{
                                            var _product_name;
                                            return (_product_name = product === null || product === void 0 ? void 0 : product.name) !== null && _product_name !== void 0 ? _product_name : "";
                                        },
                                        getOptionKey: getProductOptionKey,
                                        isOptionEqualToValue: (option, value)=>option.id === value.id,
                                        loadingText: "Carregando produtos da base...",
                                        noOptionsText: productsError ? "Nao foi possivel carregar os produtos." : debouncedProductSearch ? "Nenhum produto encontrado para essa busca." : "Nenhum produto ativo encontrado na base.",
                                        renderOption: (props, product)=>{
                                            const { key, ...optionProps } = props;
                                            var _product_id, _ref;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                component: "li",
                                                ...optionProps,
                                                sx: {
                                                    display: "grid",
                                                    gap: 0.35,
                                                    py: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        sx: {
                                                            fontWeight: 700
                                                        },
                                                        children: product.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                                        lineNumber: 662,
                                                        columnNumber: 21
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "caption",
                                                        color: "text.secondary",
                                                        children: buildProductOptionMeta(product)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                                        lineNumber: 665,
                                                        columnNumber: 21
                                                    }, void 0)
                                                ]
                                            }, (_ref = (_product_id = product.id) !== null && _product_id !== void 0 ? _product_id : key) !== null && _ref !== void 0 ? _ref : getProductOptionKey(product), true, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 656,
                                                columnNumber: 19
                                            }, void 0);
                                        },
                                        renderInput: (params)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                ...params,
                                                label: "Produto da base",
                                                placeholder: "Buscar produto cadastrado",
                                                helperText: productsError !== null && productsError !== void 0 ? productsError : "Busca por nome, codigo, barcode ou categoria. Ao selecionar, ingredientes, preco, unidade e codigo de barras entram automaticamente no template."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 672,
                                                columnNumber: 17
                                            }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 627,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                        label: "Responsavel",
                                        value: form.responsible,
                                        onChange: (event)=>handleFieldChange("responsible", event.target.value),
                                        placeholder: "Nome do responsavel",
                                        fullWidth: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 684,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                        label: "Item",
                                        value: form.product,
                                        onChange: (event)=>handleFieldChange("product", event.target.value),
                                        placeholder: "Descricao do produto",
                                        fullWidth: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 692,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                        label: "Quantidade",
                                        type: "number",
                                        value: form.quantity,
                                        onChange: (event)=>handleQuantityChange(event.target.value),
                                        slotProps: {
                                            htmlInput: {
                                                min: 1,
                                                step: 1
                                            }
                                        },
                                        fullWidth: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 700,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        sx: {
                                            lineHeight: 1.6
                                        },
                                        children: automaticSummary
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 709,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        variant: "contained",
                                        size: "large",
                                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$icons$2d$material$40$9$2e$0$2e$0_$40$_c836dbdbeea88e25b562b656f87be531$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$LocalPrintshopRounded$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/apps/web/app/home/page.tsx",
                                            lineNumber: 716,
                                            columnNumber: 26
                                        }, void 0),
                                        onClick: handlePrint,
                                        sx: {
                                            alignSelf: "flex-start",
                                            minWidth: 176
                                        },
                                        children: "Imprimir"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 713,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/home/page.tsx",
                                lineNumber: 583,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                spacing: 1.25,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: "grid",
                                            gap: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 700
                                                },
                                                children: "Preview da etiqueta"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 726,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "body2",
                                                color: "text.secondary",
                                                children: "Atualiza em tempo real e usa a mesma base oficial da impressao."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 729,
                                                columnNumber: 15
                                            }, this),
                                            selectedSavedTemplate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                color: "text.secondary",
                                                children: [
                                                    "Base atual: template salvo atualizado em",
                                                    " ",
                                                    formatTimestampLabel(selectedSavedTemplate.updatedAt),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 733,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 725,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            minHeight: 360,
                                            display: "grid",
                                            placeItems: "center",
                                            borderRadius: 3,
                                            border: "1px dashed rgba(15, 23, 42, 0.12)",
                                            background: "linear-gradient(180deg, rgba(248,250,252,0.92), rgba(241,245,249,0.92))",
                                            p: {
                                                xs: 1.5,
                                                md: 2
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$label$2d$preview$2d$surface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelPreviewSurface"], {
                                            document: document,
                                            previewPayload: previewPayload,
                                            scale: previewScale,
                                            preset: "preview"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/home/page.tsx",
                                            lineNumber: 752,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 740,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/home/page.tsx",
                                lineNumber: 724,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 575,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/home/page.tsx",
                lineNumber: 560,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: templateDialogOpen,
                onClose: ()=>setTemplateDialogOpen(false),
                fullWidth: true,
                maxWidth: "sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                        children: "Escolher modelo oficial"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 769,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                        dividers: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                            spacing: 1.25,
                            children: OFFICIAL_TEMPLATE_OPTIONS.map((template)=>{
                                const active = template.id === templateId;
                                const isDefault = template.id === DEFAULT_TEMPLATE_ID;
                                const previewSample = templatePreviewSamples[template.id];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: active ? "contained" : "outlined",
                                    color: active ? "primary" : "inherit",
                                    onClick: ()=>{
                                        var _template_defaultFormat;
                                        return handleTemplateChange(template.id, (_template_defaultFormat = template.defaultFormat) === null || _template_defaultFormat === void 0 ? void 0 : _template_defaultFormat.id);
                                    },
                                    sx: {
                                        justifyContent: "space-between",
                                        textAlign: "left",
                                        px: 2,
                                        py: 1.5
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                        direction: "row",
                                        spacing: 1.5,
                                        sx: {
                                            width: "100%",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                spacing: 0.5,
                                                sx: {
                                                    alignItems: "flex-start",
                                                    minWidth: 0,
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                        direction: "row",
                                                        spacing: 1,
                                                        sx: {
                                                            alignItems: "center",
                                                            flexWrap: "wrap"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "subtitle2",
                                                                children: template.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                                lineNumber: 803,
                                                                columnNumber: 27
                                                            }, this),
                                                            isDefault ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                size: "small",
                                                                color: active ? "default" : "primary",
                                                                variant: active ? "filled" : "outlined",
                                                                label: "Padrao"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                                lineNumber: 805,
                                                                columnNumber: 29
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                                        lineNumber: 802,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "caption",
                                                        sx: {
                                                            color: "inherit",
                                                            opacity: 0.82
                                                        },
                                                        children: template.summary
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                                        lineNumber: 813,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 801,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    flexShrink: 0,
                                                    width: 148,
                                                    minWidth: 148,
                                                    display: {
                                                        xs: "none",
                                                        sm: "grid"
                                                    },
                                                    placeItems: "center",
                                                    borderRadius: 2,
                                                    border: "1px solid",
                                                    borderColor: active ? "rgba(255,255,255,0.28)" : "divider",
                                                    background: active ? "rgba(255,255,255,0.1)" : "linear-gradient(180deg, rgba(248,250,252,0.95), rgba(241,245,249,0.95))",
                                                    py: 1,
                                                    px: 0.75
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$label$2d$preview$2d$surface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelPreviewSurface"], {
                                                    document: previewSample.document,
                                                    previewPayload: previewSample.previewPayload,
                                                    scale: previewSample.scale,
                                                    preset: "preview",
                                                    containerStyle: {
                                                        marginInline: "auto"
                                                    },
                                                    surfaceStyle: {
                                                        borderRadius: 8,
                                                        boxShadow: active ? "0 10px 20px rgba(15, 23, 42, 0.18)" : "0 8px 18px rgba(15, 23, 42, 0.08)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/home/page.tsx",
                                                    lineNumber: 835,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 818,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 792,
                                        columnNumber: 21
                                    }, this)
                                }, template.id, false, {
                                    fileName: "[project]/apps/web/app/home/page.tsx",
                                    lineNumber: 778,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/home/page.tsx",
                            lineNumber: 771,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 770,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                            onClick: ()=>setTemplateDialogOpen(false),
                            children: "Fechar"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/home/page.tsx",
                            lineNumber: 856,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 855,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/home/page.tsx",
                lineNumber: 763,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: formatDialogOpen,
                onClose: ()=>setFormatDialogOpen(false),
                fullWidth: true,
                maxWidth: "md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                        children: "Escolher formato da etiqueta"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 866,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                        dividers: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$ui$2f$label$2d$format$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelFormatSelector"], {
                            categories: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FORMAT_CATEGORIES"],
                            formats: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$label$2d$format$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FORMATS"],
                            value: form.formatId,
                            onChange: handleFormatChange
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/home/page.tsx",
                            lineNumber: 868,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 867,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                            onClick: ()=>setFormatDialogOpen(false),
                            children: "Fechar"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/home/page.tsx",
                            lineNumber: 876,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 875,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/home/page.tsx",
                lineNumber: 860,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: savedTemplateDialogOpen,
                onClose: ()=>setSavedTemplateDialogOpen(false),
                fullWidth: true,
                maxWidth: "sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                        children: "Alterar modelo"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 886,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                        dividers: true,
                        children: savedTemplatesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                            spacing: 1.5,
                            sx: {
                                alignItems: "center",
                                py: 4
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                    size: 26
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/home/page.tsx",
                                    lineNumber: 890,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "body2",
                                    color: "text.secondary",
                                    children: "Carregando templates salvos..."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/home/page.tsx",
                                    lineNumber: 891,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/home/page.tsx",
                            lineNumber: 889,
                            columnNumber: 13
                        }, this) : savedTemplates.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            severity: "info",
                            children: "Nenhum template salvo foi encontrado nos ultimos modelos criados."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/home/page.tsx",
                            lineNumber: 896,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                            spacing: 1.25,
                            children: savedTemplates.map((template)=>{
                                const active = template.id === selectedSavedTemplateId;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: active ? "contained" : "outlined",
                                    color: active ? "primary" : "inherit",
                                    disabled: savedTemplateLoadingId === template.id,
                                    onClick: ()=>void handleSavedTemplateChange(template),
                                    sx: {
                                        justifyContent: "flex-start",
                                        textAlign: "left",
                                        px: 2,
                                        py: 1.5
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                        spacing: 0.5,
                                        sx: {
                                            alignItems: "flex-start"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle2",
                                                children: template.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 919,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                sx: {
                                                    color: "inherit",
                                                    opacity: 0.82
                                                },
                                                children: [
                                                    formatTemplateCategoryLabel(template),
                                                    " | ",
                                                    formatTemplateTypeLabel(template)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 920,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                sx: {
                                                    color: "inherit",
                                                    opacity: 0.82
                                                },
                                                children: [
                                                    "Status ",
                                                    template.status,
                                                    " | Atualizado em",
                                                    " ",
                                                    formatTimestampLabel(template.updatedAt)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/home/page.tsx",
                                                lineNumber: 923,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/home/page.tsx",
                                        lineNumber: 918,
                                        columnNumber: 21
                                    }, this)
                                }, template.id, false, {
                                    fileName: "[project]/apps/web/app/home/page.tsx",
                                    lineNumber: 905,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/home/page.tsx",
                            lineNumber: 900,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 887,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                            onClick: ()=>setSavedTemplateDialogOpen(false),
                            children: "Fechar"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/home/page.tsx",
                            lineNumber: 935,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 934,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/home/page.tsx",
                lineNumber: 880,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickHomePrintPortal, {
                active: printActive,
                document: document,
                previewPayload: previewPayload,
                quantity: form.quantity
            }, void 0, false, {
                fileName: "[project]/apps/web/app/home/page.tsx",
                lineNumber: 939,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/home/page.tsx",
        lineNumber: 559,
        columnNumber: 5
    }, this);
}
_s1(QuickWelcomeExperience, "odkAbUQ4fntyS3rN2TcqSdND+/w=");
_c3 = QuickWelcomeExperience;
function QuickHomePrintPortal(param) {
    let { active, document, previewPayload, quantity } = param;
    if (!active) {
        return null;
    }
    const copies = Math.max(1, Math.floor(quantity || 1));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$print$2f$label$2d$print$2d$portal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelPrintPortal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "label-print-portal",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-print-root": true,
                className: "label-print-root",
                children: Array.from({
                    length: copies
                }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "label-print-root__page",
                        style: {
                            breakAfter: index < copies - 1 ? "page" : "auto",
                            pageBreakAfter: index < copies - 1 ? "always" : "auto"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "label-print-root__item",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "label-print-surface",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$editor$2f$label$2d$preview$2d$surface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelPreviewSurface"], {
                                    document: document,
                                    previewPayload: previewPayload,
                                    scale: 1,
                                    preset: "print",
                                    mode: "physical"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/home/page.tsx",
                                    lineNumber: 981,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/home/page.tsx",
                                lineNumber: 980,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/home/page.tsx",
                            lineNumber: 979,
                            columnNumber: 15
                        }, this)
                    }, "quick-print-".concat(index), false, {
                        fileName: "[project]/apps/web/app/home/page.tsx",
                        lineNumber: 971,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/app/home/page.tsx",
                lineNumber: 969,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/app/home/page.tsx",
            lineNumber: 968,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/app/home/page.tsx",
        lineNumber: 967,
        columnNumber: 5
    }, this);
}
_c4 = QuickHomePrintPortal;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "OFFICIAL_TEMPLATE_OPTIONS$listOfficialTemplatePresetOptions().filter");
__turbopack_context__.k.register(_c1, "OFFICIAL_TEMPLATE_OPTIONS");
__turbopack_context__.k.register(_c2, "HomePage");
__turbopack_context__.k.register(_c3, "QuickWelcomeExperience");
__turbopack_context__.k.register(_c4, "QuickHomePrintPortal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_2aa672c9._.js.map