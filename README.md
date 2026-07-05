# 🏛️ HEXA Studio — Architectural Visualization

<p align="center">
  <img src="apps/frontend/public/logo.webp" alt="HEXA Studio Logo" width="300" />
</p>

<p align="center">
  <strong>Living Spaces. Visualized.</strong><br>
  <i>Immersive 3D architectural experiences for the world's most ambitious projects.</i>
</p>

---

## ✨ The Vision
HEXA Studio bridges the gap between technical architectural data and high-end visual storytelling. We create cinematic, interactive 3D environments that allow clients to experience a space before a single brick is laid.

### 💎 The Luxury Standard
Our platform is built on three pillars:
- **Visual Fidelity**: 8K photorealistic rendering, cinematic lighting, and material authenticity.
- **Immersive Motion**: GSAP-driven storytelling and seamless camera transitions.
- **Engineering Excellence**: Enterprise-grade monorepo architecture with zero-downtime deployment.

---

## 🛠️ Technical Ecosystem

### Frontend (The Experience)
- **Framework**: Next.js 15 (App Router)
- **3D Engine**: Three.js $\rightarrow$ React Three Fiber $\rightarrow$ @react-three/drei
- **Motion**: GSAP, Framer Motion, Lenis Smooth Scroll
- **Styling**: TailwindCSS 4 (Luxury Design System)

### Backend (The Intelligence)
- **BFF**: NestJS (Backend-for-Frontend)
- **CMS**: Strapi 5 Headless CMS
- **Auth**: JWT with httpOnly secure cookies
- **Validation**: Zod & class-validator

### Infrastructure (The Foundation)
- **Orchestration**: Docker Compose (14 services)
- **Reverse Proxy**: Traefik v3 (Automatic SSL/ACME)
- **Data**: PostgreSQL 16, Redis 7, MinIO (S3 Compatible)
- **Observability**: Sentry, Prometheus, Grafana, Loki

---

## 🚀 Quick Start

### 1. Prerequisites
- Docker & Docker Compose v2
- Node.js 20+

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/justfilmk/HexaStudio.git
cd HexaStudio

# Configure environment
cp .env.example .env
# Edit .env with your secrets

# Launch the ecosystem
docker compose up -d --build
```

### 3. Access Points
| Service | URL |
| :--- | :--- |
| **Frontend** | `http://localhost` |
| **API Docs** | `http://api.localhost/api/docs` |
| **CMS Admin** | `http://cms.localhost/admin` |
| **Monitoring** | `http://grafana.localhost` |

---

## 📈 Deployment Pipeline
Our project utilizes a professional CI/CD pipeline:
`GitHub Push` $\rightarrow$ `Lint & Test` $\rightarrow$ `Docker Build` $\rightarrow$ `GHCR Registry` $\rightarrow$ `Rolling Update (SSH)` $\rightarrow$ `Health Check` $\rightarrow$ `Live`

## 📖 Documentation
- [Architecture Guide](docs/ARCHITECTURE.md)
- [Implementation Roadmap](IMPLEMENTATION_ROADMAP.md)
- [AI Operating Manual](AGENTS.md)

---

<p align="center">
  © 2026 HEXA Studio. All rights reserved. Private Repository.
</p>
