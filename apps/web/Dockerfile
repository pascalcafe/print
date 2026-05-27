FROM node:20-slim AS base
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/api/package.json apps/web/package.json apps/worker/package.json packages/shared/package.json packages/prisma/package.json packages/ui/package.json ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY . .
RUN pnpm --filter @easyprint/shared build
RUN pnpm --filter @easyprint/web build

FROM node:20-slim AS release
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
COPY --from=build /workspace/node_modules ./node_modules
COPY --from=build /workspace/apps/web/.next ./.next
COPY --from=build /workspace/apps/web/public ./public
COPY --from=build /workspace/apps/web/package.json ./package.json
COPY --from=build /workspace/apps/web/next.config.mjs ./next.config.mjs
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["pnpm", "exec", "next", "start", "-p", "3000"]
