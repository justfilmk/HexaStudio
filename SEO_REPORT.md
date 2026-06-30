# SEO Report: HEXA Vision

## 1. Current SEO State
The project is in the scaffolding phase. Basic Next.js defaults are present, but no explicit SEO strategy has been implemented.

## 2. Technical SEO Strategy

### Next.js Optimizations
- **Metadata API:** Utilize Next.js 15 `generateMetadata` for dynamic SEO tags based on Strapi content (Portfolio items, Blog posts).
- **Server-Side Rendering (SSR):** All content-heavy pages (Blog, Projects) will be SSR or ISR (Incremental Static Regeneration) to ensure full indexability by search engines.
- **Semantic HTML:** Implementation of proper `<header>`, `<main>`, `<footer>`, and `<h1>`-`<h6>` hierarchy.

### Content SEO
- **Strapi SEO Plugin:** Integration of the SEO plugin in Strapi to allow content editors to manage Meta Titles, Meta Descriptions, and OpenGraph images.
- **Structured Data (JSON-LD):** Implementation of Schema.org markups for "ProfessionalService", "Project", and "Article" to earn rich snippets in SERPs.
- **URL Structure:** Clean, slug-based URLs (e.g., `/portfolio/modern-villa-concept`) powered by Strapi.

### Performance & Indexing
- **Sitemaps:** Dynamic `sitemap.xml` generation using Next.js to automatically include new CMS content.
- **Robots.txt:** Configured to allow indexing of public pages while blocking `/admin` (CMS) and `/api` (Backend) endpoints.
- **Canonical Tags:** Implementation of canonical links to prevent duplicate content issues.

## 3. SEO Roadmap
| Task | Priority | Goal |
|------|----------|------|
| Meta Tag Integration | High | dynamic tags for all pages |
| JSON-LD Implementation | Medium | Rich snippets in Google |
| Dynamic Sitemap | High | Faster indexing of new content |
| Strapi SEO Setup | High | CMS-driven metadata management |

## 4. Summary
The choice of Next.js provides a massive head start for SEO. By moving from a "shell" to a "content-driven" site with Strapi, the project is well-positioned to dominate search rankings for architectural visualization keywords.
