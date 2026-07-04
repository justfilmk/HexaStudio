# --- Base Image ---
FROM node:22
WORKDIR /app

# --- Environment ---
ENV NODE_ENV production

# --- Users ---
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# --- Copy Pre-built Assets ---
COPY apps/frontend/public ./apps/frontend/public
COPY apps/frontend/.next ./apps/frontend/.next
COPY node_modules ./node_modules
COPY package.json ./package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/cms/package.json ./apps/cms/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/utils/package.json ./packages/utils/package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "dev", "--workspace=apps/frontend"]
