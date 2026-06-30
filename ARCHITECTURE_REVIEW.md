# Architecture Review: HEXA Vision

## 1. System Design Evaluation
The current architecture follows a **Modern Microservices-lite** approach using a monorepo.

### Strengths
- **Infrastructure Isolation:** The use of a dedicated `internal` Docker network for PostgreSQL and Redis is a major security win.
- **Scalability:** By separating the Frontend (Next.js), Backend (NestJS), and CMS (Strapi), each can be scaled independently in a K8s environment if needed.
- **Observability:** The inclusion of Prometheus, Grafana, and Loki from day one is exceptional and ensures that performance bottlenecks will be caught early.
- **Edge Strategy:** The planned integration with Cloudflare (CDN/WAF) and Traefik v3 is the correct approach for a high-traffic, global visual platform.

### Weaknesses
- **Coupling Potential:** There is currently no defined contract (API Schema/OpenAPI) that strictly governs the communication between the three apps.
- **Frontend State Management:** While Zustand and TanStack Query are used, there's no clear architectural pattern for how 3D state (Three.js) interacts with UI state (React).
- **CMS Dependency:** Strapi is the source of truth for content, but if the Backend also manages domain data, there's a risk of "split-brain" data ownership.

## 2. Comparison with "Enterprise-Grade" Standards
| Feature | Standard | Current State | Rating |
|---------|----------|---------------|--------|
| API Design | OpenAPI/Swagger | Scaffolded $\rightarrow$ Needs implementation | $\text{B}$ |
| Data Isolation | VPC/Internal Net | Implemented via Docker networks | $\text{A}$ |
| CI/CD | Automated Pipeline | GitHub Actions $\rightarrow$ GHCR $\rightarrow$ SSH | $\text{A}$ |
| Observability | Full Stack | Prometheus/Grafana/Loki | $\text{A+}$ |
| Type Safety | End-to-End | Local TS only $\rightarrow$ Needs shared types | $\text{C}$ |
| Resilience | Healthchecks/Retries | Implemented in Docker Compose | $\text{B+}$ |

## 3. Recommended Architectural Pivots
1. **Shared Type Library:** Implement a `@hexastudio/types` package in the monorepo to share DTOs and Interfaces across Frontend and Backend.
2. **BFF Pattern (Backend-for-Frontend):** The NestJS API should act as a BFF, aggregating data from Strapi and the primary DB before serving it to Next.js, rather than the Frontend calling Strapi directly for complex logic.
3. **Asset Optimization Layer:** Introduce a processing pipeline for 3D assets (Draco/KTX2 compression) that triggers upon upload to MinIO.

## 4. Final Verdict
The foundation is **solid and professional**. The infrastructure is over-engineered in a good way (observability), and the tech stack is cutting-edge. The primary risk is now **implementation execution**—turning these shells into a functioning product.
