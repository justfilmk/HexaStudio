# Performance Report: HEXA Vision

## 1. Baseline Performance
As the project is currently a skeleton, "Current Performance" is essentially the baseline of the frameworks used (Next.js 15, NestJS).

### Estimated Initial Metrics
- **LCP (Largest Contentful Paint):** Expected < 1.2s (due to Next.js App Router and Tailwind 4).
- **FID (First Input Delay):** Expected < 100ms.
- **CLS (Cumulative Layout Shift):** Expected < 0.1.

## 2. 3D Performance Strategy (The "Critical" Area)
The main performance risk is the 3D scene. To maintain "Awwwards-level" performance, the following strategies are mandated:

### Asset Optimization
- **Geometry:** Use Draco compression for all `.glb`/`.gltf` models to reduce binary size.
- **Textures:** Implement KTX2 texture compression to reduce GPU VRAM usage.
- **LOD (Level of Detail):** Implement distance-based LOD to swap high-poly models for low-poly ones.

### Rendering Optimization
- **Draw Call Reduction:** Use `InstancedMesh` for repetitive architectural elements (columns, windows).
- **Frustum Culling:** Enabled by default in R3F; ensure complex meshes are properly bounded.
- **Post-Processing:** Use `EffectComposer` selectively. High-cost effects (SSAO, Bloom) must be toggleable or scaled based on device performance.

## 3. Infrastructure Performance
- **Edge Caching:** Cloudflare will be used to cache static 3D assets and API responses.
- **DB Performance:** Redis is already integrated for caching frequently accessed content from Strapi.
- **Network:** Traefik v3 handles compression (gzip/brotli) to reduce payload sizes.

## 4. Performance Monitoring Plan
- **Real User Monitoring (RUM):** Sentry is already installed; will be used to track Web Vitals in production.
- **Infra Monitoring:** Prometheus/Grafana stack will monitor API response times and DB query latency.
- **Lighthouse CI:** Plan to integrate Lighthouse into GitHub Actions to prevent performance regressions.

## 5. Summary
The infrastructure is optimized for performance. The success of the project now depends on the **rigorous optimization of 3D assets** and the efficient use of the GPU.
