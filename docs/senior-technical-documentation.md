# Documentação Técnica Sênior — Projeto EasyPrint

Este documento fornece um nível técnico sênior, detalhado e pragmático sobre a arquitetura, responsabilidades de módulos, fluxos de dados, contratos, operação, observabilidade, segurança e práticas de desenvolvimento do repositório EasyPrint. O objetivo é permitir que um engenheiro sênior compreenda rapidamente decisões arquiteturais, debugging avançado, e procedimentos operacionais sem precisar vasculhar todos os arquivos fonte.

Sumário
- Visão geral e propósito
- Arquitetura e diagramas lógicos
- Módulos principais e responsabilidades
- Fluxos de dados e contratos (APIs, eventos, filas)
- Banco de dados e modelo Prisma
- Configuração, build e execução (local, container, produção)
- Observabilidade e tracing
- Segurança e autenticação
- Testes, qualidade e linting
- CI/CD e releases
- Operações, troubleshooting e runbooks
- Convenções e padrões de código
- Glossário e referências de arquivos

1. Visão geral e propósito
-------------------------
EasyPrint é uma plataforma de impressão/gerenciamento de templates e jobs de impressão composta por vários serviços (monorepo): API (NestJS), front-end (Next.js), workers assíncronos e pacotes compartilhados (prisma, libs). A plataforma gerencia templates, usuários/identidade, filas de jobs, assets e integração com impressoras, com foco em alta fidelidade de render e rastreabilidade de jobs.

2. Arquitetura e diagramas lógicos
---------------------------------
- Modelo: monorepo com separação clara entre BFF/API, web (Next.js), workers e pacotes compartilhados.
- Comunicação: API REST/HTTP principal e filas/assincronismo para processamento de jobs (worker). Persistência por Prisma/Postgres. Observabilidade por traces e métricas exportadas.

Diagrama lógico (textual):
- Usuário (UI Next.js) → API (NestJS) → Postgres (Prisma)
                                    ↘︎ → Worker (processamento de jobs) → Armazenamento / impressoras
                                    ↘︎ → Serviços de auditoria / mensageria

3. Módulos principais e responsabilidades
-----------------------------------------
- `api/` ([api/src](api/src)): implementação NestJS. Responsável por expor endpoints HTTP, autenticação, autorização RBAC, validação DTOs, coordenação de jobs e orquestração entre serviços.
- `web/` ([web/app](web/app)): aplicação Next.js (React) para operadores e usuários finais — UI de templates, editor, fila de impressão, autenticação SSO.
- `worker/` ([worker/src](worker/src)): processo para execução de jobs de impressão em background (render, composição, conversão de formatos, entrega para agente/impressora).
- `packages/prisma/` ([packages/prisma/schema.prisma](packages/prisma/schema.prisma)): schema, migrations e scripts relacionados ao banco de dados. Centraliza o modelo de dados.
- `shared/` e `packages/*`: utilitários, tipos compartilhados e bibliotecas cross-cutting (ex.: models, clients, helpers, hooks de observabilidade).
- `agent/` ([apps/agent](apps/agent)): componente de orquestração/edge para comunicar com impressoras locais/hosts (se aplicável). Pode conter integração com OIDC ou agentes locais.

4. Fluxos de dados e contratos
-----------------------------
- Requisições UI → API: usar DTOs e validações (class-validator). Endpoints devem ser idempotentes quando apropriado, e retornar códigos HTTP RESTful.
- Criação de job de impressão: 1) API valida e persiste job; 2) Job enfileirado (DB flag / fila externa) ou em tabela de jobs; 3) Worker consome job, renderiza, atualiza status, persiste artefatos e notifica API via evento ou atualização direta.
- Contratos de API: documentar endpoints principais (CRUD templates, criar job, status job, assets, auth). Recomenda-se manter OpenAPI/Swagger atualizado a partir de `api`.

5. Banco de dados e Prisma
-------------------------
- Localização do schema: [packages/prisma/schema.prisma](packages/prisma/schema.prisma).
- Migrations: pasta `packages/prisma/migrations`. Fluxo recomendado:
  - Desenvolvimento local: executar `pnpm --filter packages/prisma prisma migrate dev --name <desc>` para gerar e testar migrations.
  - Produção: usar `prisma migrate deploy` no processo de release e garantir backups antes de aplicar.
- Boas práticas de schema:
  - Normalizar entidades centrais (template, print_job, asset, user, audit_event).
  - Evitar alterações destrutivas sem migrations que preservem dados (migrations backfilled, scripts de transformação).

6. Configuração, build e execução
--------------------------------
- Monorepo: usar `pnpm` (veja `pnpm-workspace.yaml`). Recomendado `pnpm install` no root.
- Containers e Docker: há `Dockerfile` em `api/`, `web/` e `worker/` e `infra/docker-compose.yml` para orquestração local. Execução típica local com containers:

```powershell
pnpm install
docker-compose -f infra/docker-compose.yml up --build
```

- Execução local sem containers: cada app tem seu `package.json` com scripts. Ex.: `pnpm --filter web dev` para front-end, `pnpm --filter api start:dev` para API e `pnpm --filter worker start:dev` para o worker (ver `package.json` de cada pacote para scripts exatos).
- Variáveis de ambiente: consulte `infra/env.production.example` e `render.yaml`. Garantir `DATABASE_URL`, `JWT_SECRET`, `OIDC_*`, `SENTRY_DSN` (se aplicável) e variáveis de storage (S3/etc).

7. Observabilidade e tracing
---------------------------
- Logs: centralizar logs estruturados (JSON) com nível configurável via `LOG_LEVEL`. Contextualizar logs com `requestId`, `jobId`, `userId`.
- Tracing: integrar OpenTelemetry (ou equivalente) em API e worker. Propagar contextos entre chamadas HTTP e mensagens de fila.
- Métricas: expor métricas Prometheus (`/metrics`) em serviços; instrumentar latências de endpoints críticos e tempo de processamento de jobs.
- Alertas: configurar alertas para erros 5xx em produção, filas crescentes e latências de render acima de SLAs.

8. Segurança e autenticação
---------------------------
- Autenticação: OIDC/SSO conforme `docs/sso-oidc.md` e código em `api/auth`. Usar JWTs curtos assinado por `JWT_SECRET` ou por token OIDC.
- Autorização: RBAC, verificar roles no `api` antes de operações sensíveis (criar templates, deletar jobs). Utilize guards/strategies do NestJS.
- Proteção de dados: criptografar segredos em KMS / vault em produção; não commitar credenciais; usar `.env` apenas localmente.
- Uploads/Assets: validar tipos e tamanhos de arquivos; assinar URLs temporários para downloads diretos.

9. Testes, qualidade e linting
----------------------------
- Estrutura de testes: unitários para utilitários e serviços, integração para endpoints críticos e testes E2E end-to-end para fluxos de jobs.
- Ferramentas recomendadas: Vitest/Jest (ver `package.json`), eslint, prettier, typescript strict.
- Coverage: manter thresholds para blocos críticos (ex.: 70-80% para business logic).

10. CI/CD e releases
---------------------
- Pipeline deve incluir etapas: lint, typecheck, unit tests, build (web + api + worker), migrações (aplicar ou gerar), imagem Docker, e deployment canary/blue-green.
- Tags e versionamento: usar semver e changelogs automáticos (conventional commits) para gerar releases.

11. Operações, troubleshooting e runbooks
---------------------------------------
- Problemas comuns e como investigar:
  - Jobs presos: inspecionar tabela de jobs, checar logs do `worker`, verificar conexões com banco e recursos (CPU, memória).
  - Falhas de render: capturar artefato de entrada, rodar render localmente no worker com o mesmo payload.
  - Latência alta API: verificar traces, inspecionar queries geradas pelo Prisma (ativar query logging), checar índices de banco.
- Comandos úteis:

```powershell
# Rodar migrate local
pnpm --filter packages/prisma prisma migrate dev

# Executar worker localmente (exemplo)
pnpm --filter worker dev
```

12. Convenções e padrões de código
---------------------------------
- Tipos e contratos: manter tipos compartilhados em `shared/` para garantir compatibilidade entre front-end, API e worker.
- Handlers e services: seguir padrões NestJS (controllers -> services -> repositories). Evitar lógica de negócio em controllers.
- Erros: usar tipos de erro padronizados e códigos, incluir contexto suficiente nos logs.

13. Glossário e referências de arquivos
------------------------------------
- Arquivos e referências chave:
  - [api/src](api/src) — implementação do backend (controladores, módulos, providers).
  - [web/app](web/app) — front-end Next.js (páginas, componentes, hooks).
  - [worker/src](worker/src) — processador de jobs.
  - [packages/prisma/schema.prisma](packages/prisma/schema.prisma) — modelo de dados e relações.
  - [infra/docker-compose.yml](infra/docker-compose.yml) — orquestração local de containers.
  - [render.yaml](render.yaml) — exemplo de configuração de deploy (plataforma target).
  - [docs/](docs) — documentação complementares (SSO, observability, convenções).

14. Próximos passos e recomendações de curto prazo
------------------------------------------------
- Gerar e publicar OpenAPI/Swagger a partir de `api` para manter contrato atualizado com o front-end e integrações externas.
- Automatizar migrations no pipeline com guarda de backups e verificações de compatibilidade.
- Implementar tracing end-to-end (OpenTelemetry) com dashboards básicos e alertas para erros críticos e SLA de processamento de jobs.

Apêndice A — Exemplo de contrato importante (criação de job)
---------------------------------------------------------
POST /print-jobs
Request JSON (exemplo):
{
  "templateId": "uuid",
  "printerId": "uuid",
  "payload": { /* dados do template */ },
  "options": { "copies": 1, "color": true }
}

Response 201:
{
  "jobId": "uuid",
  "status": "queued",
  "createdAt": "iso"
}

Observações: garantir validação do payload, versionamento de templates e idempotência do endpoint quando aplicável (ex.: `clientRequestId`).

Apêndice B — Checklist de revisão antes de deploy
-------------------------------------------------
- Typecheck e lint limpos.
- Testes unitários e integração com coverage aceitável.
- Migrations revisadas e scripts de rollback planejados.
- Variáveis de ambiente sensíveis configuradas no secret manager.
- Dashboards e alertas configurados para a nova release.
 
15. Mapeamento detalhado do Prisma (entidades e relações)
-------------------------------------------------------
Resumo das entidades centrais (extraído de `packages/prisma/schema.prisma`):
- `Tenant`: representa um cliente/escopo; relacionamento 1:N com `UserTenant`, `Template`, `Printer`, `PrintProfile`, `PrintJob`, `AgentNode` e logs/audit.
- `User` / `UserTenant`: usuários globais e associação por `UserTenant` que define `roleId` por tenant (RBAC).
- `Template` / `TemplateVersion` / `TemplateApproval` / `TemplateAsset` / `TemplateDataField`: modelagem de templates com versões, aprovação e assets vinculados (via `FileAsset`). Campos chave: `documentJson`, `dataSchemaJson`, `settingsJson`, `currentVersion`.
- `FileAsset`: armazenamento de arquivos (metadata, `storageKey`) e ligação a templates via `TemplateAsset`.
- `PrintJob` / `PrintJobEvent` / `JobDispatchAttempt`: fluxo de jobs com campos essenciais: `status`, `payloadJson`, `resolvedDataJson`, `resultJson`, `idempotencyKey`, `correlationId`, `retryCount`, `nextAttemptAt`.
- `AgentNode` / `AgentHeartbeat`: nós/edge agents que reivindicam dispatchs de jobs; possuem `authTokenHash` e `lastSeenAt`.
- `PrintProfile` / `Printer`: configurações e perfis de impressão por tenant e printer.
- `AuditLog` e `ElectronicSignatureRecord`: trilhas de auditoria e registros de assinatura eletrônica vinculados a operações sensíveis.

Implicações operacionais e práticas recomendadas:
- Garanta `@@unique` e constraints multi-tenant (ex.: `[tenantId, slug]`) ao aplicar consultas/indexes para performance.
- Trate campos JSON com cuidado: mudanças na forma/semântica dos payloads exigem scripts de migração e validação em runtime.
- Idempotência: use `idempotencyKey` para `PrintJob` e verifique uniqueness no servidor.

16. Contratos API — Sumário OpenAPI (endpoints críticos)
------------------------------------------------------
Este resumo foca nos recursos críticos; gere o YAML/JSON via Swagger do `api` para precisão e publique em `docs/openapi.yaml`.

Autenticação
- `POST /auth/authorize` (OIDC redirect)
- `POST /auth/token` (token exchange)
- `GET /auth/me` — perfil e roles por tenant

Tenants
- `GET /tenants`
- `GET /tenants/{id}`
- `POST /tenants`

Usuários (membro por tenant)
- `GET /tenants/{tenantId}/users`
- `POST /tenants/{tenantId}/users` (invite/assign role)
- `PATCH /tenants/{tenantId}/users/{userId}`

Templates & Versions
- `GET /tenants/{tenantId}/templates`
- `POST /tenants/{tenantId}/templates`
- `GET /templates/{templateId}`
- `POST /templates/{templateId}/versions`
- `POST /templates/{templateId}/approvals`

Assets
- `POST /tenants/{tenantId}/assets` (upload → retorna `id`, `storageKey`)
- `GET /assets/{assetId}`

Print Jobs
- `POST /tenants/{tenantId}/print-jobs`
- `GET /tenants/{tenantId}/print-jobs/{jobId}`
- `POST /tenants/{tenantId}/print-jobs/{jobId}/cancel`

Agents / Dispatch
- `POST /agents/{agentId}/claim`
- `POST /agents/{agentId}/dispatch/{attemptId}/complete`

Erro padrão
- 4xx: `errors[]` (field, message)
- 5xx: `{ errorCode, message, correlationId }`

17. Runbooks operacionais (casos comuns)
--------------------------------------
Caso: Job travado em `QUEUED`:
1. Identificar `jobId`/`tenantId` e obter `PrintJob` do banco.
2. Ver logs do `worker` e do `agent` com `correlationId`.
3. SQL de diagnóstico:

```sql
SELECT id, status, retryCount, nextAttemptAt, failureReason
FROM "PrintJob"
WHERE id = '<jobId>' AND "tenantId" = '<tenantId>'
```

4. Se `nextAttemptAt` no futuro, ajustar conforme política de retry ou forçar `nextAttemptAt = now()` para replay.
5. Para erros de render, extrair `payloadJson` e reproduzir localmente no `worker`.

Caso: API lenta
1. Coletar `requestId` e traces.
2. Ver spans longos no tracing e queries via Prisma logging.
3. Identificar índices ausentes e queries N+1; otimizar e adicionar índices.

18. CI/CD e pipeline recomendada
--------------------------------
Etapas essenciais:
- Lint + Prettier
- Typecheck (monorepo incremental)
- Tests (unit + integration)
- Build artifacts
- Gerar OpenAPI
- Docker build + smoke tests
- Deploy com migrations (prod: `prisma migrate deploy` com backup/approval)

Exemplo simplificado (CI step):

```yaml
steps:
  - run: pnpm install --frozen-lockfile
  - run: pnpm -w lint
  - run: pnpm -w test --ci
  - run: pnpm -w build
  - run: pnpm --filter api run generate:openapi # script sugerido
  - run: docker build -t easyprint/api:sha-$GITHUB_SHA ./apps/api
```

19. Guia de desenvolvimento local (prático)
-----------------------------------------
Setup mínimo:
```powershell
pnpm install
cp infra/env.production.example .env.local
docker-compose -f infra/docker-compose.yml up --build -d
pnpm --filter api start:dev
pnpm --filter web dev
pnpm --filter worker start:dev
```

Dicas: use `--filter` para escopar comandos; para testes de integração use um Postgres isolado em Docker.

20. Checklists e revisão final
-----------------------------
- Docs: OpenAPI gerado e armazenado em `docs/openapi.yaml`.
- Segurança: segredos em secrets manager; tokens rotacionados.
- Observability: traces, logs e métricas expostas com dashboards mínimos.

Documento consolidado concluído — inclui mapeamento do Prisma, contratos API resumidos, runbooks operacionais, pipeline CI/CD e guia local.

Fim do documento.

21. Guia de desenvolvimento local — detalhado e prático
-----------------------------------------------------
Pré-requisitos:
- Node 20.x (testado com v20), pnpm v7+/v8+/v10+, Docker (opcional para infra local), Git.

Passo a passo (ambiente Linux/Windows PowerShell compatível):
1) Clonar e instalar:

```powershell
git clone <repo>
cd EasyPrint
pnpm install
```

2) Variáveis de ambiente:
- Copie `infra/env.production.example` para `.env.local` e ajuste os valores. Valores essenciais:
  - `DATABASE_URL` — apontar para Postgres local/compose
  - `JWT_SECRET`, `OIDC_*`, `SENTRY_DSN` (opcionais)

3) Rodar infra local (opcional, recomendado para integração):

```powershell
docker-compose -f infra/docker-compose.yml up --build -d
```

4) Gerar Prisma client (se necessário):

```powershell
pnpm --filter packages/prisma prisma generate
```

5) Rodar serviços em desenvolvimento (recomendado por pacotes):

```powershell
pnpm --filter @easyprint/api dev    # backend com hot-reload
pnpm --filter web dev               # front-end Next.js
pnpm --filter worker dev            # worker em modo dev
```

6) Execução isolada (produção local):
- Para testar builds de produção, crie artefatos e rode containers via `docker-compose` ou `docker build` + `docker run`.

7) Testes:
- Unitários: `pnpm -w test --filter <package>` (ver `package.json` de cada pacote)
- Integração: usar docker-compose com Postgres e rodar testes que apontam para `DATABASE_URL` do compose.

Dicas avançadas:
- Use `pnpm --filter <package> -w` para comandos que atuam em pacotes específicos no monorepo.
- Para debugging de problemas de inicialização do `api`, inicie com `DEBUG=* node` ou ative logs detalhados via `LOG_LEVEL=debug`.

22. Checklists e troubleshooting — ampliado
----------------------------------------
Checklist antes de abrir PR de feature:
- Code: lint e typecheck (`pnpm -w lint`, `pnpm -w typecheck`).
- Tests: unit e integração relevantes passam.
- Segurança: não há secrets no diff; dependências atualizadas e sem alertas críticos.
- Docs: endpoints novos documentados em OpenAPI e runbooks atualizados se comportamento operacional mudou.

Troubleshooting comum (procedimentos rápidos):
- Erro: `PrismaClientInitializationError` ao iniciar API
  - Verificar `DATABASE_URL` e se o Postgres está acessível.
  - Checar `packages/prisma/migrations` e possíveis locks.

- Erro: `ENOTFOUND` em chamadas a serviços externos (OIDC, storage)
  - Verificar variáveis de ambiente e DNS/rotas de rede em ambiente local.

- Problema: testes E2E falham intermitentemente
  - Usar retries controlados, isolar o teste e rodar com logs detalhados.

23. Entrega final e revisão
--------------------------
- Confirme que `docs/` contém `senior-technical-documentation.md` e, quando possível, `openapi.yaml` (gerado). Se a geração automática falhar no seu ambiente, use `apps/api/scripts/generate-openapi-from-dist.js` após compilar `api`.
- Peça revisão técnica por pares focada em migrations e mudanças em estruturas JSON (templates/payloads).

Fim do documento.

21. Infraestrutura, Docker e deploy (detalhado)
--------------------------------------------
Objetivo: prover instruções concretas e padrões operacionais para imagens Docker, `docker-compose` local, e deploy em orquestradores (Kubernetes/Helm ou PaaS via `render.yaml`).

21.1 Dockerfiles — padrões e recomendações
- Use multi-stage builds para separar dependências de desenvolvimento e artefatos de runtime.
- Cache de dependências: copie `package.json` e `pnpm-lock.yaml` antes do `pnpm install` para aproveitar cache de camadas.
- Use `pnpm` com `--frozen-lockfile` em CI para reprodutibilidade.
- Build de produção: transpile TypeScript e bundle (se aplicável) para reduzir tempo de startup e superfície de erro.
- Runtime: execute como usuário não-root (`useradd` / `node` user) e use uma imagem base minimal (ex.: `node:20-alpine` ou `gcr.io/distroless/nodejs`).
- Healthchecks: exponha `HEALTH` endpoint simples (ex.: `/healthz`), documente `HEALTH_PORT` e inclua `HEALTHCHECK` em imagens quando apropriado.

Exemplo (padrão para `api`):
 - Etapa de build: instalar dependências, rodar `pnpm build` e gerar `openapi`.
 - Etapa de runtime: copiar `dist/`, instalar `prisma client` necessário em `production` e executar `node dist/main.js` com `NODE_ENV=production`.

21.2 docker-compose — padrões locais
- Serviços recomendados no `infra/docker-compose.yml`:
  - `postgres` (volume persistente), `adminer`/pgadmin para inspeção opcional
  - `redis` (se usado para filas/cache)
  - `api` — ligado ao `postgres` e `redis`
  - `worker` — ligado a `postgres` e `redis`
  - `web` — Next.js dev/prod
- Rede: use network bridge isolada. Evite expor serviços internos sem necessidade.
- Volumes: montar diretórios de dados do Postgres e storage local para assets em ambiente de dev.
- Healthchecks: configure `healthcheck` no compose para reinício automático de containers problemáticos.

Exemplo snippet (docker-compose service):

```yaml
services:
  api:
    build: ./apps/api
    environment:
      - DATABASE_URL
      - REDIS_URL
    depends_on:
      - postgres
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000/healthz || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 3

  worker:
    build: ./worker
    depends_on: [api, postgres]
```

21.3 Kubernetes / Helm — práticas e manifestos
- Deploy manifests:
  - `Deployment` com `readinessProbe` e `livenessProbe`; `rollingUpdate` strategy com `maxSurge: 1` e `maxUnavailable: 0` para zero-downtime.
  - `HorizontalPodAutoscaler` baseado em CPU e/ou latency SLOs.
  - `ConfigMap` para configurações não sensíveis; `Secret` para segredos (KMS/Vault preferível em produção).
  - `PodDisruptionBudget` para garantir disponibilidade mínima durante manutenção.
- Migrations:
  - Execute `prisma migrate deploy` em um job controlado (init job) ou em um pod `pre-deploy` com aprovação humana para produção.
  - Alternativa: migrações em CI com `--create-only` e `apply` no deploy stage mediante checks.
- Init containers: usar init container para checar disponibilidade do DB antes do app iniciar.

21.4 Estratégia de build e tags de imagem
- Tag por `sha` e `semver` (ex.: `registry/easyprint/api:sha-<sha>` e `registry/easyprint/api:v1.2.3`).
- Imagens reprodutíveis: fixe versões de base images e use `pnpm --frozen-lockfile`.
- Scans de segurança de imagem integrados no pipeline (trivy/clair).

21.5 Migrations e backup
- Backups automáticos do Postgres antes de rodar migrations em produção. Mantenha política de retenção (ex.: 30 dias) e verifique restores periodicamente.
- Rodar `prisma migrate deploy` somente após build e smoke tests passarem; em mudanças destrutivas, exigir janela de manutenção e script de rollback/manual.

21.6 Secrets e configuração
- Não armazenar segredos em Git; use SecretManager (AWS/GCP/Azure) ou Vault e injete via K8s Secrets ou provider do PaaS.
- Variáveis sensíveis: `DATABASE_URL`, `JWT_SECRET`, `OIDC_CLIENT_SECRET`, `SENTRY_DSN`, `STORAGE_*`.

21.7 Observability e produção
- Configure readiness/liveness endpoints, traces (OTel) e `/metrics` para Prometheus.
- Logs estruturados e correlacionáveis com `correlationId`. Envie para um agregador (ELK, Loki, or SaaS provider).

21.8 Runbook rápido de deploy
1. Merge PR → CI: lint/test/build
2. CI gera imagens e publica no registry com tag `sha` e `candidate`.
3. Ambiente de staging: deploy automático, rodar smoke tests e testes end-to-end.
4. Migrations: runbook/manual approval para produção, executar `prisma migrate deploy`.
5. Deploy canary (percentagem), monitorar métricas e traces; promover quando limpo.

Observação final: revisar `apps/api/Dockerfile` e `web/Dockerfile` para garantir compatibilidade com o padrão multi-stage e healthchecks. Recomendo que eu faça uma revisão automática do `apps/api/Dockerfile` agora — deseja que eu analise e proponha melhorias diretamente nesse arquivo?
