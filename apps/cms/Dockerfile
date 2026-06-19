# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /opt/app
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git python3

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci 2>/dev/null || npm install

FROM base AS builder
COPY --from=deps /opt/app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 strapi && adduser --system --uid 1001 strapi
COPY --from=builder --chown=strapi:strapi /opt/app ./
RUN mkdir -p public/uploads && chown -R strapi:strapi public/uploads
USER strapi
EXPOSE 1337
CMD ["npm", "run", "start"]
