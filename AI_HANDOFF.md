# AI HANDOFF — HexaStudio Project State

This file enables any AI agent to pick up work exactly where the last agent stopped.

---

## 1. PROJECT ESSENCE

**HexaStudio** (HexaStudio.net) = 3D architecture visualization platform with Next.js 15 frontend, NestJS backend (BFF), Strapi 5 CMS, Docker Compose infra, and an "Awwwards-level" luxury aesthetic.

**Monorepo structure:** `apps/{frontend,backend,cms}` + `packages/{types,utils}` + `docker/` + `scripts/`

---

## 2. LAST SESSION: What Was Accomplished

### Completed
- **AGENTS.md updated** — Sections 37-46 added: UI Review, Brand Guardian, Continuous Improvement, Production Readiness, Critical Thinking Mode, ADR, Visual Regression Checklist, Future-Proof Rule, AI Collaboration Rules, Sprint Exit Criteria, Quality Gate Controller
- **Lint fixed both apps** — Created `eslint.config.mjs` for frontend + backend (ESLint 9 flat config). Removed unused imports/vars, fixed `any` types in `ExperienceCanvas.tsx` and `cn()` in `services/page.tsx`, fixed unused `pos/rot` in `SceneContent.tsx`, unused `_` in `GlobalErrorBoundary.tsx`. Both pass `npm run lint`.
- **Typecheck passing** — `npm run typecheck` succeeds locally.
- **Deleted local .tar.gz** — Freed ~250MB on C:\ (now 0.24GB free — critically low).
- **SSH to server** — Connected to 19.16.1.100 as root via `ssh_keys/id_ed25519_final`. Project at `/home/hexa/hexastudio/`.
- **Dockerfiles fixed** — Removed `COPY node_modules` + added `RUN npm install --production --legacy-peer-deps` + `node_modules` to `.dockerignore`.
- **npm update** — Ran on server (up to date, 2062 packages audited).

### Incomplete / Blocked
- **Docker compose build on server times out** (>120s). Build context too large, npm install inside container takes too long. Previous builds may have cached bad layers from the old Dockerfiles that copied host node_modules.
- **QualityToggle.tsx** exists as a file on server but NOT in local repo. Server's version has a syntax error: `className={px-3 py-1 ...}` should be `className="px-3 py-1 ..."`. This blocks the frontend Docker build.
- **Local C: drive 0.24GB free** — Cannot run `npm install` locally (ENOSPC). All local dev is blocked.
- **Server Node v24.16.0** — CMS (Strapi 5) requires `>=20 <=22`. Unsupported engine warning.

### Key Decisions Made
- Removed root `package.json` overrides for `react@^19.0.0` + `react-dom@^19.0.0` to fix Strapi CMS build (Strapi needs React 18).
- Dockerfiles now install deps INSIDE container (proper Docker practice, clean builds, no host node_modules).
- `node_modules` added to `.dockerignore` at root level.

---

## 3. IMMEDIATE NEXT STEPS (Priority Order)

### [1] Fix QualityToggle.tsx on Server
- File is at `/home/hexa/hexastudio/apps/frontend/src/components/QualityToggle.tsx`
- Fix: `className={px-3 py-1 ...}` → `className="px-3 py-1 ..."`
- Use `sed` or heredoc on server via SSH.
- After fix: `npm run build` inside frontend Docker context to verify.

### [2] Complete Docker Build on Server
- `docker compose build --no-cache` then `docker compose up -d`
- If build times out: try building individual services first (`docker compose build frontend`, `docker compose build backend`), or increase Docker timeout in daemon.json.
- Verify: `docker compose ps` + health checks (use `bash scripts/deploy.sh status` on server).

### [3] Perform Quality Gate Review
- Run the full Quality Gate Controller checklist from AGENTS.md §46.
- Generate: `QUALITY_GATE_REPORT.md`, `QUALITY_SCORECARD.md`, `RELEASE_DECISION.md`, `BLOCKING_ISSUES.md`, `OPTIONAL_IMPROVEMENTS.md`
- Target ≥9.5/10 across all categories.

### [4] Phase 5 — Final Polish & Launch
Per IMPLEMENTATION_ROADMAP.md:
- Visual Regression Testing
- Performance Audit (Lighthouse >95)
- SEO Finalization (JSON-LD, Dynamic Metadata, Sitemap)
- Launch Readiness (Sentry config, Cloudflare WAF, DB backups)

---

## 4. SERVER CONNECTION DETAILS

| Field | Value |
|-------|-------|
| IP | `19.16.1.100` |
| User | `root` |
| Key | `ssh_keys/id_ed25519_final` |
| Project path | `/home/hexa/hexastudio/` |
| Deploy script | `bash scripts/deploy.sh <command>` |
| SSH command | `ssh -i ssh_keys/id_ed25519_final root@19.16.1.100` |
| Node version | v24.16.0 |
| npm version | 11+ |

### Key server commands:
```bash
# Connect
ssh -i ssh_keys/id_ed25519_final root@19.16.1.100

# After connecting (cd to project):
cd /home/hexa/hexastudio

# Build all services
docker compose build --no-cache

# Build single service
docker compose build --no-cache frontend

# Start all
docker compose up -d

# Check status
bash scripts/deploy.sh status

# View logs
bash scripts/deploy.sh logs frontend

# Quick fix QualityToggle.tsx
sed -i "s/className={px-3 py-1/className=\"px-3 py-1/g" apps/frontend/src/components/QualityToggle.tsx
```

---

## 5. KNOWN ISSUES

| Issue | Severity | Status |
|-------|----------|--------|
| QualityToggle.tsx className syntax error on server | Critical | Not fixed |
| Docker build timeout (>120s) | High | Needs workaround |
| Local C: 0.24GB free — ENOSPC | High | Blocking local dev |
| Node v24 unsupported for Strapi (needs <=22) | Medium | nvm or volta on server |
| apps/frontend uses deprecated `next lint` (Next.js 16) | Low | Migrate to eslint CLI |
| Missing `clsx` and `tailwind-merge` in frontend package.json | Medium | Used in lib/utils.ts but not declared |
| No tests anywhere (unit/integration/E2E) | Critical | Must add |
| BFF pattern not implemented (frontend calls direct) | Medium | Architecture gap |
| 3D scene core value prop not started | Critical | Phase 2 architecture exists but no real scene |
| Sentry installed but not configured | Low | Need DSN + setup |

---

## 6. ARCHITECTURE SCORECARD (from PROJECT_AUDIT.md)

| Component | Grade | Status |
|-----------|-------|--------|
| Infrastructure | A | Production-ready |
| DevOps/CI | B | Deploy exists, no quality gates |
| Frontend | C+ | Scaffolding, no 3D |
| Backend | D+ | Health check only |
| CMS | C | 1 of ~6 content types |
| Testing | F | Zero |
| Documentation | A- | Comprehensive |

**Overall Architecture Review Grade: B-**

---

## 7. KEY FILE LOCATIONS

| File | Purpose |
|------|---------|
| `AGENTS.md` | Complete operating manual (46 sections) |
| `IMPLEMENTATION_ROADMAP.md` | Phase plan (Phase 5 pending) |
| `ARCHITECTURE_REVIEW.md` | Architecture evaluation |
| `PROJECT_AUDIT.md` | Full project audit |
| `.env` | Environment config (dev values) |
| `docker-compose.yml` | All 14 services defined |
| `scripts/deploy.sh` | Deployment orchestration |
| `docs/ADR/*.md` | Architecture Decision Records (6) |
| `ssh_keys/id_ed25519_final` | SSH key for server |
| `apps/frontend/eslint.config.mjs` | Frontend ESLint 9 flat config |
| `apps/backend/eslint.config.mjs` | Backend ESLint 9 flat config |

---

## 8. AGENTS.MD CRITICAL SECTIONS FOR NEXT AGENT

- **§37** UI Review Requirements (score 1-10 before merging)
- **§38** Brand Guardian (reject generic/cheap/outdated)
- **§39** Continuous Improvement (leave codebase better)
- **§40** Production Readiness (every commit = prod deploy)
- **§43** Future-Proof Rule (extensibility over quick)
- **§46** Quality Gate Controller (final approval authority)

---

## 9. HANDOFF CHECKLIST FOR NEXT AGENT

- [ ] Read this file completely
- [ ] Read `AGENTS.md` completely
- [ ] Read `IMPLEMENTATION_ROADMAP.md` for phase context
- [ ] Connect to server via SSH and verify project state
- [ ] Fix QualityToggle.tsx className syntax
- [ ] Complete Docker build + verify services
- [ ] Run Quality Gate review
- [ ] Begin Phase 5 (Final Polish & Launch)
- [ ] Update this file when done (or add to .memory/)
