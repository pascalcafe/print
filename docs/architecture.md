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

## Visão de produto e objetivos

EasyPrint foi projetado para oferecer uma plataforma de criação, aprovacao e execucao de impressao de etiquetas e documentos com controle de templates:

- editor visual de templates configuraveis
- versionamento e auditoria de templates
- geracao de trabalhos de impressao e rastreamento de execucao
- suporte a agentes locais e execucao desacoplada
- governanca por identidade, aprovacao e observabilidade

## Responsabilidades dos principais módulos

- `apps/api`: autenticacao, tenancy, persistencia, rotas de CRUD, health checks, jobs e integrações de backend.
- `apps/web`: interface de usuario, editor visual, gerenciamento de templates, login e dashboards.
- `apps/worker`: execucao assicrona de jobs, processamento de fila e futura orquestracao de impressao.
- `packages/shared`: contratos de dominio, tipos compartilhados, validacoes de documento e logica do editor.
- `packages/prisma`: schema Prisma, migracoes, geracao de cliente e scripts de banco.
- `packages/ui`: tokens de design, componentes compartilhados e utilitarios visuais.

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
