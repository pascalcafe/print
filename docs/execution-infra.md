# Execução, build e infraestrutura

## Visão geral

Este monorepo é organizado para desenvolvimento local com `pnpm` e infraestrutura de suporte via Docker Compose.

- `apps/api`: backend NestJS e Prisma
- `apps/web`: frontend Next.js
- `apps/worker`: worker assíncrono
- `packages/shared`: código compartilhado e contratos de domínio
- `packages/prisma`: schema Prisma, migrações e cliente
- `infra/docker-compose.yml`: infraestrutura local mínima
- `infra/docker-compose.prod.yml`: composição de produção com migration job

## Preparação local

1. Instale Node.js 20.x e pnpm 10.x
2. Rode `pnpm install` na raiz do repositório
3. Configure o banco de dados local ou use Docker Compose

## Comandos principais

### Desenvolvimento local

```bash
pnpm dev
```

Isso executa `scripts/dev.mjs`, que:

- valida as portas `3000` e `4000`
- gera o cliente Prisma em `packages/prisma`
- constrói `packages/shared`
- inicia `@easyprint/web` e `@easyprint/api` em paralelo

### Build do monorepo

```bash
pnpm build
```

Esse comando executa o build de todos os workspaces com script `build`.

### Lint e typecheck

```bash
pnpm lint
pnpm typecheck
```

### Banco de dados e Prisma

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:migrate:dev
```

## Scripts de workspace

### apps/api

- `pnpm --filter @easyprint/api dev` — inicia NestJS em modo de desenvolvimento com watch
- `pnpm --filter @easyprint/api build` — compila o NestJS
- `pnpm --filter @easyprint/api lint` — valida TypeScript
- `pnpm --filter @easyprint/api typecheck` — valida TypeScript
- `pnpm --filter @easyprint/api prisma:generate` — gera Prisma client
- `pnpm --filter @easyprint/api prisma:migrate` — roda `prisma migrate dev`
- `pnpm --filter @easyprint/api prisma:deploy` — aplica migrations em deploy

### apps/web

- `pnpm --filter @easyprint/web dev` — inicia o Next.js em modo de desenvolvimento
- `pnpm --filter @easyprint/web build` — gera a build do Next.js
- `pnpm --filter @easyprint/web lint` — gera tipagens e valida TS
- `pnpm --filter @easyprint/web typecheck` — valida TypeScript

### apps/worker

- `pnpm --filter @easyprint/worker dev` — inicia o worker usando `tsx watch`
- `pnpm --filter @easyprint/worker build` — compila o worker
- `pnpm --filter @easyprint/worker lint` — valida TypeScript
- `pnpm --filter @easyprint/worker typecheck` — valida TypeScript

### packages/shared

- `pnpm --filter @easyprint/shared build` — compila os pacotes compartilhados
- `pnpm --filter @easyprint/shared lint` — valida TypeScript
- `pnpm --filter @easyprint/shared typecheck` — valida TypeScript

## Infraestrutura local com Docker Compose

### Exemplo mínimo

Use `infra/docker-compose.yml` para subir apenas a infraestrutura necessária:

```bash
docker compose -f infra/docker-compose.yml up -d
```

Serviços:

- `postgres`: banco PostgreSQL
- `redis`: cache e fila opcional (`--profile optional`)
- `rabbitmq`: broker opcional (`--profile optional`)

Serviços opcionais:

```bash
docker compose -f infra/docker-compose.yml --profile optional up -d
```

### Produção local

Use `infra/docker-compose.prod.yml` para um ambiente mais próximo de produção:

```bash
docker compose -f infra/docker-compose.prod.yml up -d --build
```

Esse compose inclui:

- `postgres`
- `redis` (opcional)
- `rabbitmq` (opcional)
- `migration` — executa `prisma migrate deploy` antes de iniciar a API
- `api` — serviço backend
- `web` — serviço frontend
- `worker` — worker opcional

> Observação: este arquivo espera que existam `apps/api/Dockerfile`, `apps/web/Dockerfile` e `apps/worker/Dockerfile`. Se não houver Dockerfiles no repositório atual, é necessário adicioná-los ou ajustar o compose.

### Variáveis de ambiente

A infra de produção utiliza `infra/env.production`.

Exemplo de valores esperados:

```env
DATABASE_URL="postgresql://easyprint:easyprint@localhost:5432/easyprint?schema=public"
PORT=4000
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
JWT_SECRET="easyprint-dev-secret"
JWT_EXPIRES_IN="8h"
```

## Observações

- `pnpm dev` já valida portas e impede que `web` ou `api` iniciem em portas diferentes silenciosamente.
- Para rodar a aplicação completa em produção local, primeiro suba o PostgreSQL e aplique as migrations.
- Se você só precisa do backend e frontend em dev, use `pnpm dev` e um banco PostgreSQL local ou containerizado.

## Checklist de fluxo local

1. `pnpm install`
2. `docker compose -f infra/docker-compose.yml up -d`
3. `pnpm dev`
4. Acesse `http://127.0.0.1:3000/login`
5. Verifique `http://127.0.0.1:4000/api/health` se a API estiver rodando
