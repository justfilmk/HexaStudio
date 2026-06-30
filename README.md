# HexaStudio

Production v1 foundation for [HexaStudio.net](https://hexastudio.net) — a 3D creative studio platform.

## Stack

| Layer      | Technology                                                                    |
| ---------- | ----------------------------------------------------------------------------- |
| Frontend   | Next.js 15, TailwindCSS 4, Three.js, R3F, Drei, GSAP, Zustand, TanStack Query |
| API        | NestJS, Swagger, JWT, Passport, Class Validator, Helmet                       |
| CMS        | Strapi 5 (blog, categories, portfolio, services, SEO)                         |
| Data       | PostgreSQL 16, Redis 7, MinIO                                                 |
| Proxy      | Traefik v3                                                                    |
| Monitoring | Prometheus, Grafana, Loki, Promtail                                           |
| Errors     | Sentry (env-configured)                                                       |

## Quick Start (Docker)

### 1. Prerequisites

- Docker & Docker Compose v2
- Node.js 20+ (for local app development without Docker)

### 2. Environment

```bash
cp .env.example .env
# Edit .env — set all "change_me_*" values before running
```

### 3. Local DNS (Traefik host routing)

Add to `C:\Windows\System32\drivers\etc\hosts` (Windows) or `/etc/hosts` (Linux/macOS):

```
127.0.0.1 hexastudio.net api.hexastudio.net cms.hexastudio.net storage.hexastudio.net storage-console.hexastudio.net grafana.hexastudio.net prometheus.hexastudio.net traefik.hexastudio.net
```

### 4. Start the stack

```bash
docker compose up -d --build
```

### 5. Access services

| Service            | URL                              |
| ------------------ | -------------------------------- |
| Frontend           | http://localhost                 |
| API                | http://api.localhost/api         |
| API Docs (Swagger) | http://api.localhost/api/docs    |
| CMS (Strapi)       | http://cms.localhost/admin       |
| MinIO API          | http://storage.localhost         |
| MinIO Console      | http://storage-console.localhost |
| Grafana            | http://grafana.localhost         |
| Prometheus         | http://prometheus.localhost      |
| Traefik Dashboard  | http://traefik.localhost:8080    |

## Local Development (without Docker apps)

Run infrastructure only:

```bash
docker compose up -d postgres redis minio minio-init traefik
```

Then in separate terminals:

```bash
npm install
npm run dev:frontend   # :3000
npm run dev:backend    # :4000
npm run dev:cms        # :1337
```

## Project Structure

```
HexaStudio/
├── apps/
│   ├── frontend/     # Next.js 15
│   ├── backend/      # NestJS API
│   └── cms/          # Strapi CMS
├── docker/
│   ├── traefik/
│   ├── prometheus/
│   ├── grafana/
│   ├── loki/
│   ├── minio/
│   └── postgres/
├── docs/
│   └── ARCHITECTURE.md
├── docker-compose.yml
├── .env.example
└── package.json
```

## CI/CD

Every push to `main` triggers GitHub Actions:

1. **Build** each app (`frontend`, `backend`, `cms`) → push images to `ghcr.io`
2. **Deploy** via SSH to the production server → `docker compose up -d`

### Setup for CI/CD

1. Add these secrets to your GitHub repo → Settings → Secrets and variables → Actions:

   | Secret             | Value                          |
   | ------------------ | ------------------------------ |
   | `SERVER_HOST`    | Your server IP                 |
   | `SERVER_USER`    | SSH user (e.g.`ubuntu`)      |
   | `SERVER_SSH_KEY` | Private SSH key for deployment |
   | `GITHUB_TOKEN`   | Auto-provided                  |
2. On your server: clone the repo, generate secrets, and do the first deploy:

   ```bash
   # Run manually once
   sudo bash /opt/hexastudio/scripts/deploy.sh
   ```

## Production Deployment (Manual)

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full production architecture on Ubuntu 24.04 with Cloudflare.

## License

Private — HexaStudio
