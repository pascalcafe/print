FROM node:20-slim AS base
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/api/package.json apps/web/package.json apps/worker/package.json packages/shared/package.json packages/prisma/package.json packages/ui/package.json ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY . .
RUN pnpm --filter @easyprint/shared build
RUN pnpm --filter @easyprint/worker build

FROM node:20-slim AS release
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
COPY --from=build /workspace/node_modules ./node_modules
COPY --from=build /workspace/apps/worker/dist ./dist
COPY --from=build /workspace/packages/shared ./packages/shared
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
