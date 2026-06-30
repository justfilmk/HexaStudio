# Prioritized Implementation Roadmap: HEXA Vision

## 🚩 Phase 1: Foundation & Architecture (Sprint 1)
**Goal:** Establish a scalable codebase and secure communication.

| Task ID | Task Description | Priority | Effort | Dependency |
|---------|-------------------|----------|--------|------------|
| F1.1 | **Architecture Refactor:** Implement feature-based folder structure in Frontend and Backend | Critical | Medium | None |
| F1.2 | **Shared Types Package:** Create `@hexastudio/types` for E2E type safety | Critical | Low | F1.1 |
| F1.3 | **Auth Engine:** Implement full JWT flow (NestJS $\rightarrow$ Frontend) | Critical | Medium | F1.1 |
| F1.4 | **SSL/TLS Setup:** Configure Traefik ACME / Cloudflare Certs | Critical | Low | None |
| F1.5 | **CMS Schema Expansion:** Build Portfolio, Blog, Services in Strapi | Critical | Low | None |

## 🎨 Phase 2: The Visual Core (Sprint 2)
**Goal:** Implement the high-end 3D visualization experience.

| Task ID | Task Description | Priority | Effort | Dependency |
|---------|-------------------|----------|--------|------------|
| V2.1 | **R3F Scene Setup:** Basic lighting, environment, and camera orchestration | Critical | Medium | F1.1 |
| V2.2 | **Asset Pipeline:** MinIO integration + Draco/KTX2 loading system | Critical | Medium | F1.5 |
| V2.3 | **BFF Integration:** NestJS API as an aggregator for Strapi content | High | Medium | F1.3, F1.5 |
| V2.4 | **Cinematic Animations:** GSAP camera transitions and entry animations | High | Medium | V2.1 |
| V2.5 | **Interactive Hotspots:** 3D annotations and UI triggers | High | Medium | V2.1 |

## 🚀 Phase 3: Production Polish (Sprint 3)
**Goal:** Reach Awwwards-grade quality and enterprise stability.

| Task ID | Task Description | Priority | Effort | Dependency |
|---------|-------------------|----------|--------|------------|
| P3.1 | **Performance Tuning:** InstancedMesh and LOD implementation | High | High | V2.1 |
| P3.2 | **Advanced SEO:** Dynamic Sitemaps and JSON-LD structured data | Medium | Low | F1.5 |
| P3.3 | **Accessibility Layer:** Semantic parallel DOM for 3D scenes | Medium | Medium | V2.1 |
| P3.4 | **E2E Testing:** Playwright suite for critical user flows | Medium | High | F1.3 |
| P3.5 | **Monitoring Dashboards:** Custom Grafana panels for API/Infra | Low | Low | None |

## 🛠️ Effort Estimation Legend
- **Low:** 1-3 days
- **Medium:** 4-7 days
- **High:** 8+ days
