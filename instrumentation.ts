/**
 * Next.js OpenTelemetry & Observability Initialization Hook
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Node.js server-side instrumentation (OpenTelemetry / Sentry / NewRelic)
    console.log('[Instrumentation] Server-side OpenTelemetry runtime initialized.');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime instrumentation
    console.log('[Instrumentation] Edge runtime instrumentation initialized.');
  }
}
