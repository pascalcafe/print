# apps/api/Dockerfile
FROM node:20-slim AS builder
WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/
COPY packages/prisma/package.json packages/prisma/

RUN pnpm install --frozen-lockfile

COPY apps/api ./apps/api
COPY packages/shared ./packages/shared
COPY packages/prisma ./packages/prisma

RUN pnpm --filter @easyprint/shared build
RUN pnpm --filter @easyprint/api prisma:generate
RUN pnpm --filter @easyprint/api build

FROM node:20-slim AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/apps/api/dist ./dist
COPY --from=builder /workspace/packages/shared ./packages/shared
COPY apps/api/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "dist/src/main.js"]
