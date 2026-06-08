export const roleCatalog = {
  admin: "Admin",
  editor: "Editor",
  operator: "Operador"
} as const;

export type UserRoleKey = keyof typeof roleCatalog;

export const permissionCatalog = {
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
} as const;

export type PermissionKey = keyof typeof permissionCatalog;

export const permissionsByRole: Record<UserRoleKey, PermissionKey[]> = {
  admin: Object.keys(permissionCatalog) as PermissionKey[],
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

export function hasPermission(
  permissions: readonly string[] | undefined,
  permission: PermissionKey
) {
  return permissions?.includes(permission) ?? false;
}
