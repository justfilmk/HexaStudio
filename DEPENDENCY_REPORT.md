# Dependency Report: HEXA Vision

## 1. Frontend Dependencies (`apps/frontend`)
| Package | Version | Role | Status |
|---------|---------|------|--------|
| `next` | ^15.1.0 | Framework | Latest |
| `react` | ^19.0.0 | UI Library | Latest |
| `three` | ^0.171.0 | 3D Core | Up-to-date |
| `@react-three/fiber` | ^9.0.0 | R3F Bridge | Up-to-date |
| `@react-three/drei` | ^10.0.0 | R3F Helpers | Up-to-date |
| `gsap` | ^3.12.5 | Animation | Stable |
| `@tanstack/react-query` | ^5.62.0 | Server State | Stable |
| `zustand` | ^5.0.2 | Client State | Stable |
| `tailwindcss` | ^4.0.0 | Styling | Latest (v4) |

## 2. Backend Dependencies (`apps/backend`)
| Package | Version | Role | Status |
|---------|---------|------|--------|
| `@nestjs/core` | ^10.4.15 | Framework | Stable |
| `@nestjs/jwt` | ^10.2.0 | Auth | Stable |
| `passport` | ^0.7.0 | Auth Strategy | Stable |
| `ioredis` | ^5.4.1 | Redis Client | Stable |
| `class-validator` | ^0.14.1 | Validation | Stable |
| `helmet` | ^8.0.0 | Security | Stable |
| `@sentry/node` | ^8.45.0 | Monitoring | Latest |

## 3. CMS Dependencies (`apps/cms`)
| Package | Version | Role | Status |
|---------|---------|------|--------|
| `@strapi/strapi` | ^5.6.0 | Headless CMS | Latest (v5) |
| `pg` | ^8.13.1 | DB Driver | Stable |

## 4. Infrastructure Images
| Service | Image | Version | Note |
|---------|-------|---------|------|
| Traefik | `traefik:v3.3` | v3.3 | Latest |
| Postgres | `postgres:16-alpine` | v16 | Stable |
| Redis | `redis:7-alpine` | v7 | Stable |
| MinIO | `minio/minio:latest` | Latest | Stable |
| Prometheus | `prom/prometheus:v2.54.1` | v2.54 | Stable |
| Grafana | `grafana/grafana:11.3.0` | v11.3 | Stable |
| Loki | `grafana/loki:3.2.1` | v3.2 | Stable |

## 5. Risk Analysis
- **React 19 / Next 15:** Being on the absolute bleeding edge is great for features but can lead to unstable third-party library compatibility (especially in the Three.js ecosystem).
- **Tailwind 4:** Still very new; potential for minor breaking changes in utility classes.
- **Strapi 5:** Significant upgrade from v4; ensure all plugins used are v5 compatible.

## 6. Summary
The project uses a **cutting-edge, modern stack**. There are no outdated or legacy dependencies. The primary risk is "version instability" due to the proximity to latest releases.
