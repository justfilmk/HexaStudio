# Technical Debt Report: HEXA Vision

## 1. High Priority Debt (Critical Path)
- **Authentication Gap:** The project has dependencies for JWT/Passport but no implemented logic. This is a primary blocker for all protected features.
- **3D Scene Absence:** R3F and Three.js are installed, but there is no implementation. The core "value proposition" of the site is currently missing.
- **CMS Schema Under-development:** Only the `Category` type exists. Without a full schema (Portfolio, Projects, Services), the frontend cannot be populated with real data.
- **Backend Domain Logic:** The NestJS API is a hollow shell. No services or controllers exist beyond health checks.

## 2. Medium Priority Debt (Architecture & Quality)
- **Frontend Structure:** The current `src` folder is very flat. As the project grows, it will need a feature-based architecture (e.g., `features/scene`, `features/ui`, `features/auth`).
- **Type Definitions:** While TypeScript is used, there are no shared types between the Backend and Frontend. This will lead to runtime errors as the API grows.
- **Error Handling:** Basic Sentry integration is present, but no global error handling strategy (interceptors in NestJS, Error Boundaries in React) is implemented.
- **Asset Pipeline:** No clear strategy for optimizing 3D models (glTF compression, Draco) before they hit MinIO.

## 3. Low Priority Debt (Maintenance & DX)
- **Test Coverage:** Zero tests implemented across all three applications.
- **Documentation:** `ARCHITECTURE.md` is a good start, but API documentation (beyond Swagger) and component documentation are missing.
- **Local DX:** Dependency on Docker for basic DBs is fine, but a simplified `setup.sh` for local non-docker app development would improve speed.

## 4. Debt Summary Table
| Area | Severity | Impact | Effort to Fix |
|------|----------|--------|---------------|
| Auth | Critical | Blocked Features | Medium |
| 3D Scene | Critical | No Product | High |
| CMS Schema | High | No Content | Low |
| API Logic | High | No Functionality | Medium |
| Project Structure | Medium | Maintainability | Medium |
| Testing | Medium | Stability | High |
