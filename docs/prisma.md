# Banco de dados e Prisma

## Visão geral

O EasyPrint usa PostgreSQL como banco relacional principal e Prisma como ORM e gerenciador de migrations.

O schema Prisma está em `packages/prisma/schema.prisma` e define os principais domínios do produto:

- multi-tenancy por `Tenant`
- identidade e permissões por `User`, `Role`, `Permission`, `UserTenant`
- templates, versões, assets e aprovações
- jobs de impressão, eventos e dispatch para agentes
- auditoria e assinatura eletrônica
- integração com provedores externos de identidade

## Estrutura de dados principal

### Tenants e usuários

- `Tenant`: contexto de organização ou cliente.
- `User`: usuário do sistema com `email`, `passwordHash` e `status`.
- `UserTenant`: vínculo de usuário com tenant e papel (`Role`).
- `Role` e `Permission`: modelo básico de RBAC usado para controle de acesso.

### Template e versionamento

- `Template`: entidade principal de template com estado (`TemplateStatus`), JSON do documento e configurações.
- `TemplateVersion`: snapshot histórico completo do template para versionamento e rollback.
- `TemplateApproval`: fluxo de aprovação de templates com requests e decisões.

O template é tratado como JSON, o que garante que o mesmo documento seja reutilizado em:

- editor
- preview
- persistência
- versionamento
- execução de impressão

### Assets e arquivos

- `FileAsset`: arquivo persistido como asset.
- `TemplateAsset`: relação muitos-para-muitos entre templates e assets.

### Impressão e agentes

- `PrintJob`: registro de trabalho de impressão com payload, status, seleção de impressora e perfil.
- `PrintJobEvent`: eventos de log e progresso do trabalho.
- `AgentNode`: agente local ou remoto que pode receber dispatch de jobs.
- `JobDispatchAttempt`: tentativas de entrega de jobs a agentes.
- `Printer` e `PrintProfile`: configuração de impressoras e perfis de impressão.

### Auditoria e conformidade

- `AuditLog`: registro de ações e eventos importantes no sistema.
- `ElectronicSignatureRecord`: assinatura eletrônica ligada a aprovações e ações sensíveis.

## Principais comandos de Prisma

### Gerar cliente

```bash
pnpm --filter @easyprint/prisma generate
```

### Migrar em desenvolvimento

```bash
pnpm --filter @easyprint/prisma migrate:dev
```

### Aplicar migrations em produção

```bash
pnpm --filter @easyprint/prisma migrate:deploy
```

### Comandos globais do monorepo

- `pnpm db:generate`
- `pnpm db:migrate`
- `pnpm db:migrate:dev`

## Variáveis de ambiente

O Prisma usa a variável `DATABASE_URL` definida em `packages/prisma/.env` ou no ambiente do processo.

Exemplo:

```env
DATABASE_URL="postgresql://easyprint:easyprint@localhost:5432/easyprint?schema=public"
```

## Observações importantes

- O produto usa campos JSON extensivamente (`Json`) para armazenar documentos de template, esquemas de dados, configurações e payloads de impressão.
- A modelagem permite mesclar controladores transacionais com histórico de versão e auditoria.
- O uso de `onDelete: Cascade` em muitas relações garante limpeza consistente de dados ao remover tenants, templates ou usuários.

## Onde o Prisma é consumido

- `apps/api`: executa `prisma generate`, `prisma migrate dev`, `prisma migrate deploy` e usa o cliente Prisma para acessar o banco.
- `packages/prisma`: provê o schema, o cliente gerado e os scripts de migração do monorepo.

## Recomendações

- Sempre gere o cliente Prisma após alterar `schema.prisma`.
- Execute `pnpm --filter @easyprint/prisma migrate:dev` em ambientes de desenvolvimento.
- Use `migrate:deploy` em ambientes de produção para aplicar migrations sem prompts interativos.
