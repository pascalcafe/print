FROM node:20-slim AS base
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
# copy each workspace package.json into its correct subpath to avoid overwrite
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY apps/worker/package.json ./apps/worker/package.json
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/prisma/package.json ./packages/prisma/package.json
COPY packages/ui/package.json ./packages/ui/package.json
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY . .
RUN pnpm --filter @easyprint/shared build
RUN pnpm --filter @easyprint/prisma generate
RUN pnpm --filter @easyprint/api build

FROM node:20-slim AS release
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
COPY --from=build /workspace/node_modules ./node_modules
COPY --from=build /workspace/dist ./dist
COPY --from=build /workspace/packages/shared ./packages/shared
COPY --from=build /workspace/apps/api/package.json ./apps/api/package.json
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000
CMD ["node", "dist/apps/api/src/main.js"]
