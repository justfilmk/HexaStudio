# --- Stage 1: Base ---
FROM node:22 AS base
RUN apt-get update && apt-get install -y build-essential gcc g++ make python3
WORKDIR /app

# --- Stage 2: Builder ---
FROM base AS builder
COPY . .
RUN npm install
RUN npm run build --workspace=apps/cms

# --- Stage 3: Runner ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/apps/cms/dist ./apps/cms/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/cms/package.json ./apps/cms/package.json
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=builder /app/packages/types/package.json ./packages/types/package.json
COPY --from=builder /app/packages/utils/package.json ./packages/utils/package.json

EXPOSE 1337
CMD ["npm", "run", "start", "--workspace=apps/cms"]

