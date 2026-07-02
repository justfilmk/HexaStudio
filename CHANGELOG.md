# Changelog: HEXA Vision

## [0.2.0] - 2026-07-02
### Added
- **3D Visual Core (Sprint 2):**
    - Implemented React Three Fiber (R3F) canvas with high-performance configuration.
    - Integrated Draco-compressed asset loader via CDN.
    - Developed Cinematic Camera system with GSAP transitions and `useCameraStore`.
    - Implemented Interactive Hotspots with 3D-to-HTML overlays.
    - Created Backend-for-Frontend (BFF) `ProjectsModule` in NestJS with mock data.
- **Premium UI/UX Strategy (Sprint 3):**
    - Generated `UI_REVIEW.md`, `UX_IMPROVEMENTS.md`, and `RESPONSIVE_REPORT.md`.
    - Defined luxury design system (asymmetric layouts, refined typography).
- **Cinematic Hero Section (Sprint 4):**
    - Implemented high-fidelity Post-Processing stack (Bloom, Depth of Field, Noise, Vignette).
    - Added mouse-driven camera parallax for an immersive "living" scene.
    - Developed an Adaptive Quality System (Low/Medium/High) based on GPU detection.
    - Integrated `THREEJS_GUIDE.md` and `PERFORMANCE_REPORT.md`.

## [0.1.0] - 2026-06-30
### Added
- **Architecture:** Implemented Feature-Based Architecture in Frontend and Backend.
- **Shared Packages:** Created `@hexastudio/types` and `@hexastudio/utils`.
- **Frontend UI:** Added Base UI components (`Button`), `GlobalErrorBoundary`, and `LoadingScreen`.
- **Backend Core:** Added `GlobalExceptionFilter` for standardized API error responses.
- **Documentation:** Added `AGENTS.md`, `FOLDER_STRUCTURE.md`, `REFACTOR_SUMMARY.md`, and updated `ARCHITECTURE.md`.

### Changed
- **Frontend:** Refactored `HomePage` into a feature component `HomeHero`.
- **Backend:** Moved `HealthModule` to `/src/modules/health`.
- **Monorepo:** Updated `package.json` workspaces to include shared packages.
