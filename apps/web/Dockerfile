# apps/web/Dockerfile
FROM node:20-slim AS builder
WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/
COPY packages/ui/package.json packages/ui/

RUN pnpm install --frozen-lockfile

COPY apps/web ./apps/web
COPY packages/shared ./packages/shared
COPY packages/ui ./packages/ui

RUN pnpm --filter @easyprint/shared build
RUN pnpm --filter @easyprint/ui build
RUN pnpm --filter @easyprint/web build

FROM node:20-slim AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/apps/web/.next ./.next
COPY --from=builder /workspace/apps/web/public ./public
COPY --from=builder /workspace/apps/web/next.config.mjs ./next.config.mjs
COPY --from=builder /workspace/apps/web/package.json ./package.json
COPY --from=builder /workspace/apps/web/next-env.d.ts ./next-env.d.ts
COPY --from=builder /workspace/packages/shared ./packages/shared
COPY --from=builder /workspace/packages/ui ./packages/ui

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "exec", "next", "start", "-p", "3000"]
