# apps/worker/Dockerfile
FROM node:20-slim AS builder
WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/worker/package.json apps/worker/
COPY packages/shared/package.json packages/shared/

RUN pnpm install --frozen-lockfile

COPY apps/worker ./apps/worker
COPY packages/shared ./packages/shared

RUN pnpm --filter @easyprint/shared build
RUN pnpm --filter @easyprint/worker build

FROM node:20-slim AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/apps/worker/dist ./dist
COPY --from=builder /workspace/packages/shared ./packages/shared

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
