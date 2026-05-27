# EasyPrint

Fundacao inicial do produto EasyPrint em formato monorepo, com:

- `apps/web`: interface Next.js para listagem e editor visual;
- `apps/api`: API NestJS com Prisma;
- `apps/worker`: worker preparado para fila, renderizacao e execucao assicrona;
- `apps/agent`: agente local oficial para cenarios hibridos de impressao;
- `packages/shared`: contratos compartilhados do template/documento e estado central do editor;
- `packages/prisma`: schema e migracoes do banco;
- `packages/ui`: tokens e primitivas visuais reutilizaveis.

## Stack

- Next.js
- React
- TypeScript
- NestJS
- Prisma
- PostgreSQL
- Redis
- RabbitMQ

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm db:generate`
- `pnpm db:migrate`
- `pnpm db:migrate:dev`
- `pnpm --filter @easyprint/agent dev`

## Acesso local

- login: `http://127.0.0.1:3000/login`
- templates: `http://127.0.0.1:3000/`
- api: `http://127.0.0.1:4000/api`

O comando `pnpm dev` valida as portas `3000` e `4000` antes de subir o ambiente. Se alguma estiver ocupada, ele falha com mensagem clara para evitar que o Next mude silenciosamente para outra porta.

## Fluxo inicial esperado

1. rode `pnpm dev`
2. abra `http://127.0.0.1:3000/login`
3. entre com `admin@easyprint.local` e `EasyPrint123!`
4. a tela inicial abre a listagem de templates
5. clique em `Novo template` para entrar no editor com o canvas visivel

## Acesso bootstrap

- e-mail: `admin@easyprint.local`
- senha: `EasyPrint123!`

## Ambiente local

- `infra/docker-compose.yml` sobe PostgreSQL, Redis e RabbitMQ
- `packages/prisma` centraliza schema e migracoes
- `docs/template-document.md` descreve o formato oficial do JSON da etiqueta

## Deploy de produção

O repositório inclui agora suporte a deploy containerizado com Docker:

- `apps/api/Dockerfile` para backend NestJS
- `apps/web/Dockerfile` para frontend Next.js
- `apps/worker/Dockerfile` para worker assíncrono
- `infra/docker-compose.prod.yml` para orquestrar serviços de produção
- `infra/env.production.example` com variáveis de ambiente de produção
- `.dockerignore` para evitar copiar arquivos desnecessários ao build

Passos recomendados:

1. copie `infra/env.production.example` para `infra/env.production`
2. ajuste `DATABASE_URL`, `NEXT_PUBLIC_API_URL`, `JWT_SECRET` e outros valores
3. execute `docker compose -f infra/docker-compose.prod.yml up -d --build`
4. verifique `http://localhost:3000` para o frontend e `http://localhost:4000/api` para a API

Para produção real de alta disponibilidade, use serviços gerenciados ou Kubernetes, inclua TLS, backups de banco e monitoramento.

## Status atual

O repositorio foi estruturado para o Marco 1 com foco em:

- CRUD inicial de templates
- modelo JSON da etiqueta como fonte unica da verdade
- estrutura do editor visual
- persistencia de versoes
- auditoria basica
- modulos para impressoras e jobs de impressao

O Marco 2 foi iniciado com um primeiro corte em:

- produtividade basica do editor
- rollback de versoes
- preparacao do contrato de dados dinamicos
- reforco de permissao para governanca de template

O corte atual do Marco 2 tambem ja inclui:

- autosave remoto para templates persistidos
- recuperacao de rascunho local
- suporte a QR Code no editor e no preview
- atalhos basicos de produtividade no editor
- painel de data schema com preview dinamico basico
- criacao formal e rollback de versoes
- jobs com reimpressao, retry, cancelamento e detalhe
- filtros administrativos para templates, jobs, impressoras e auditoria

O Marco 4 agora adiciona:

- identidade corporativa com base OIDC por tenant
- aprovacao formal de templates e assinatura eletronica por confirmacao de senha
- observabilidade com logs estruturados, health checks e metricas
- agentes locais oficiais com heartbeat, polling e retorno de status
- jobs mais resilientes com idempotencia opcional, tentativas maximas e backoff
- paginas administrativas para identidade, agentes e observabilidade

## Rotas enterprise

- identidade: `http://127.0.0.1:3000/identity`
- agentes: `http://127.0.0.1:3000/agents`
- observabilidade: `http://127.0.0.1:3000/observability`

## Agente local

1. crie um agente em `http://127.0.0.1:3000/agents`
2. copie o token emitido no cadastro ou na rotacao
3. execute:

```bash
$env:AGENT_TOKEN="TOKEN_EMITIDO"
pnpm --filter @easyprint/agent dev
```

Mais detalhes em `docs/architecture.md`, `docs/conventions.md`, `docs/marco-1.md`, `docs/marco-1-implementation-plan.md`, `docs/marco-1-verification.md`, `docs/auth-rbac.md`, `docs/marco-2-implementation-plan.md`, `docs/marco-4-architecture.md`, `docs/sso-oidc.md`, `docs/template-approval.md`, `docs/observability.md` e `docs/agent-local.md`.
