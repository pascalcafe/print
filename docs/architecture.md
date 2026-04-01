# Arquitetura EasyPrint

## Visao geral

O EasyPrint foi estruturado como monorepo para permitir evolucao independente e compartilhamento forte de contratos.

```text
apps/
  api/        -> backend NestJS + Prisma
  web/        -> frontend Next.js + editor visual
  worker/     -> execucao assicrona e futura orquestracao de jobs
packages/
  shared/     -> schema, tipos, factories e estado central do editor
  prisma/     -> schema Prisma, migracoes e scripts de banco
  ui/         -> tokens e componentes compartilhados
docs/         -> decisoes arquiteturais
```

## Decisoes principais

### 1. JSON do template como fonte unica da verdade

O documento da etiqueta e salvo como JSON estruturado e reaproveitado em:

- editor
- preview
- persistencia
- versionamento
- auditoria
- futura execucao de impressao

### 2. Separacao por responsabilidade

- `packages/shared` concentra tipos, regras puras do documento e operacoes centrais do editor.
- `packages/ui` concentra tokens e componentes compartilhados.
- `packages/prisma` concentra o schema de dados e migracoes.
- `apps/web` trata UX, rendering, interacoes e formulacao de comandos.
- `apps/api` trata autenticacao, tenancy, persistencia, auditoria e jobs.
- `apps/worker` prepara o caminho para filas, renderizacao e impressao desacoplada.

### 3. Editor em camadas

O editor foi separado em:

- shell de layout
- store centralizada
- renderer desacoplado
- paines contextuais

Isso prepara o caminho para:

- autosave
- historico
- publicacao
- preview em rota separada
- impressao desacoplada

### 4. Persistencia orientada a snapshots

- `Template` representa a entidade viva.
- `TemplateVersion` armazena snapshots completos em JSON.
- `AuditLog` registra eventos relevantes.
- `PrintJob` e `PrintJobEvent` guardam execucao e trilha operacional.

## Reaproveitamento da base atual

O repositorio ja possuia uma fundacao funcional para:

- shell do editor visual
- CRUD inicial de templates
- schema Prisma do Marco 1
- modulos centrais da API

Essa base foi preservada e reorganizada, evitando retrabalho e aproximando a estrutura da arquitetura-alvo do produto.

## Proximos blocos arquiteturais

- RBAC mais refinado e politicas por capacidade
- ingestao de assets com storage externo
- fila de jobs para worker
- renderer de impressao dedicado
- validacao de schema por Zod/JSON Schema
- collaboration/locking e autosave incremental
