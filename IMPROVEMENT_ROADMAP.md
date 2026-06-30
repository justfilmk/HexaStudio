# Improvement Roadmap: HEXA Vision

## 1. Phase 1: Core Infrastructure & Foundation (Immediate)
**Goal:** Turn the "shells" into a functioning, secure system.
- **Architecture Refactor (Sprint 1):** Shift to feature-based structure and implement shared types.
- **Authentication Engine:** Implement JWT-based auth flow (NestJS $\rightarrow$ Frontend).
- **CMS Schema expansion:** Build out Portfolio, Blog, and Services types in Strapi.
- **SSL/TLS Deployment:** Secure all endpoints with HTTPS.

## 2. Phase 2: The 3D Experience (High Impact)
**Goal:** Implement the core value proposition—the Architecture Visualization.
- **R3F Scene Setup:** Basic environment, lighting, and camera controls.
- **Asset Pipeline:** Integrate MinIO for model storage and implement a Draco-compressed loading system.
- **Interactive Elements:** Implement "Hotspots" and architectural annotations.
- **Animation Orchestration:** Use GSAP to create cinematic camera transitions.

## 3. Phase 3: Enterprise Features & Polishing (Scaling)
**Goal:** Reach "Awwwards" quality and ensure enterprise stability.
- **Performance Tuning:** Implement KTX2 textures and InstancedMesh for complex scenes.
- **Advanced SEO:** Full JSON-LD implementation and dynamic sitemaps.
- **A11y Layer:** Build the parallel semantic DOM for screen readers.
- **CI/CD Optimization:** Implement automated E2E tests using Playwright.

## 4. Summary Table
| Phase | Focus | Key Outcome | Priority | Effort |
|-------|--------|-------------|----------|--------|
| Phase 1 | Foundation | Functional Auth & CMS | Critical | Medium |
| Phase 2 | 3D Core | Visual "Wow" Factor | Critical | High |
| Phase 3 | Polish | Production Quality | High | Medium |
