# Changelog: HEXA Vision

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
