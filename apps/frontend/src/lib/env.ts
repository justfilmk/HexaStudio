/**
 * Validated public environment variables for the frontend.
 * Centralizes access to NEXT_PUBLIC_* vars with safe defaults.
 */
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://api.localhost',
  cmsUrl: process.env.NEXT_PUBLIC_CMS_URL ?? 'http://cms.localhost',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
} as const;
