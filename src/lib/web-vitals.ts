import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from "web-vitals";

interface AnalyticsEvent {
    name: string;
    value: number;
    id: string;
    delta: number;
    rating: "good" | "needs-improvement" | "poor";
    navigationType: string;
    timestamp: number;
}

class WebVitalsReporter {
    private queue: AnalyticsEvent[] = [];
    private isOnline = typeof window !== "undefined" ? navigator.onLine : true;

    constructor() {
        // Only initialize if we're in the browser
        if (typeof window !== "undefined") {
            this.setupOnlineListener();
            this.initializeMetrics();
        }
    }

    private setupOnlineListener() {
        // Check if we're in the browser before accessing window
        if (typeof window === "undefined") return;

        window.addEventListener("online", () => {
            this.isOnline = true;
            this.flushQueue();
        });

        window.addEventListener("offline", () => {
            this.isOnline = false;
        });
    }

    private initializeMetrics() {
        // Core Web Vitals
        onCLS(this.handleMetric.bind(this));
        onINP(this.handleMetric.bind(this)); // Changed from getFID to onINP
        onLCP(this.handleMetric.bind(this));

        // Additional metrics
        onFCP(this.handleMetric.bind(this));
        onTTFB(this.handleMetric.bind(this));
    }

    private handleMetric(metric: Metric) {
        const event: AnalyticsEvent = {
            name: metric.name,
            value: metric.value,
            id: metric.id,
            delta: metric.delta,
            rating: metric.rating,
            navigationType: metric.navigationType,
            timestamp: Date.now(),
        };

        this.queue.push(event);

        if (this.isOnline) {
            this.flushQueue();
        }

        // Log to console in development
        if (process.env.NODE_ENV === "development") {
            console.log(`[Web Vitals] ${metric.name}:`, {
                value: metric.value,
                rating: metric.rating,
                delta: metric.delta,
            });
        }
    }

    private async flushQueue() {
        if (this.queue.length === 0) return;

        const events = [...this.queue];
        this.queue = [];

        try {
            // Send to your analytics endpoint
            await fetch("/api/analytics/web-vitals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ events }),
            });
        } catch (error) {
            console.error("Failed to send Web Vitals data:", error);
            // Re-queue events for retry
            this.queue.unshift(...events);
        }
    }

    // Public method to manually report custom metrics
    public reportCustomMetric(
        name: string,
        value: number,
        additionalData?: Record<string, any>
    ) {
        const event: AnalyticsEvent = {
            name: `custom.${name}`,
            value,
            id: `custom-${Date.now()}-${Math.random()}`,
            delta: value,
            rating: "good", // Default rating for custom metrics
            navigationType: "navigate",
            timestamp: Date.now(),
            ...additionalData,
        };

        this.queue.push(event);

        if (this.isOnline) {
            this.flushQueue();
        }
    }
}

// Only instantiate in the browser
export const webVitalsReporter =
    typeof window !== "undefined" ? new WebVitalsReporter() : null;

// Hook for React components
export const useWebVitals = () => {
    return {
        reportCustomMetric:
            webVitalsReporter?.reportCustomMetric.bind(webVitalsReporter) ||
            (() => {}),
    };
};
