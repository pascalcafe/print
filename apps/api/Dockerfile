FROM node:20-slim AS base
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

# copy only workspace manifests to leverage layer caching for deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/prisma/package.json ./packages/prisma/package.json
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY . .
RUN pnpm --filter @easyprint/shared build
RUN pnpm --filter @easyprint/prisma generate
RUN pnpm --filter @easyprint/api build

FROM node:20-slim AS release
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

# copy built artifacts and runtime node_modules from build stage
COPY --from=build /workspace/dist ./dist
COPY --from=build /workspace/apps/api/package.json ./package.json
COPY --from=build /workspace/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /workspace/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install production dependencies only for the API package
RUN pnpm install --frozen-lockfile --prod --filter @easyprint/api...

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

# lightweight healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
	CMD curl -f http://localhost:4000/healthz || exit 1

# Run as non-root user for improved security
RUN addgroup --system app && adduser --system --ingroup app --home /app app \
	&& chown -R app:app /app
USER app

CMD ["node", "dist/apps/api/src/main.js"]
