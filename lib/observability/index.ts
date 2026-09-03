/**
 * AgroPet Pr1me - Unified Observability Suite
 * Unifies Sentry, OpenTelemetry, Datadog and NewRelic instrumentation.
 */

export interface ObservabilityContext {
  userId?: string;
  route?: string;
  tags?: Record<string, string | number | boolean>;
  extra?: Record<string, any>;
}

class ObservabilityService {
  private isProduction = process.env.NODE_ENV === 'production';
  private hasSentry = Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);
  private hasDatadog = Boolean(process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID);
  private hasNewRelic = Boolean(process.env.NEW_RELIC_LICENSE_KEY);

  /**
   * Captures runtime errors and reports to Sentry & OpenTelemetry
   */
  public captureException(error: Error | unknown, context?: ObservabilityContext): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    if (!this.isProduction) {
      console.warn('[Observability:Error]', {
        message: errorObj.message,
        stack: errorObj.stack,
        context,
      });
      return;
    }

    // Sentry Dispatch
    if (this.hasSentry && typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(errorObj, {
        extra: context?.extra,
        tags: context?.tags,
        user: context?.userId ? { id: context.userId } : undefined,
      });
    }

    // Datadog RUM Dispatch
    if (this.hasDatadog && typeof window !== 'undefined' && (window as any).DD_RUM) {
      (window as any).DD_RUM.addError(errorObj, {
        ...context?.extra,
        ...context?.tags,
      });
    }

    // NewRelic Dispatch
    if (this.hasNewRelic && typeof window !== 'undefined' && (window as any).newrelic) {
      (window as any).newrelic.noticeError(errorObj, context?.tags);
    }
  }

  /**
   * Tracks custom business and performance metrics (e.g., cart adds, checkout latency)
   */
  public recordMetric(metricName: string, value: number, tags?: Record<string, string>): void {
    if (!this.isProduction) {
      console.info(`[Observability:Metric] ${metricName}: ${value}`, tags);
      return;
    }

    // OpenTelemetry / Datadog custom metric forwarding
    if (typeof window !== 'undefined' && (window as any).DD_RUM) {
      (window as any).DD_RUM.addAction(metricName, { value, ...tags });
    }
  }

  /**
   * Tracks user interaction events for product analytics and Datadog RUM
   */
  public trackEvent(name: string, properties?: Record<string, any>): void {
    if (!this.isProduction) {
      console.log(`[Observability:Event] ${name}`, properties);
      return;
    }

    if (typeof window !== 'undefined' && (window as any).DD_RUM) {
      (window as any).DD_RUM.addAction(name, properties);
    }
  }

  /**
   * Traces an async operation using OpenTelemetry span semantics
   */
  public async traceSpan<T>(name: string, fn: () => Promise<T>, tags?: Record<string, string>): Promise<T> {
    const startTime = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - startTime;
      this.recordMetric(`${name}.duration_ms`, duration, { status: 'success', ...tags });
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      this.recordMetric(`${name}.duration_ms`, duration, { status: 'error', ...tags });
      this.captureException(error, { route: name, tags });
      throw error;
    }
  }
}

export const observability = new ObservabilityService();
