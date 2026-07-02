# --- Stage 1: Base ---
FROM node:22 AS base
WORKDIR /app

# --- Stage 2: Builder ---
FROM base AS builder
COPY . .
RUN npm install
RUN npm run build --workspace=apps/frontend

# --- Stage 3: Runner ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/cms/package.json ./apps/cms/package.json
COPY --from=builder /app/packages/types/package.json ./packages/types/package.json
COPY --from=builder /app/packages/utils/package.json ./packages/utils/package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "dev", "--workspace=apps/frontend"]

# --- Stage 4: Runner ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/cms/package.json ./apps/cms/package.json
COPY --from=builder /app/packages/types/package.json ./packages/types/package.json
COPY --from=builder /app/packages/utils/package.json ./packages/utils/package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "dev", "--workspace=apps/frontend"]
