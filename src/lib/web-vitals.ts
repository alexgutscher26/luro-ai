import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from "web-vitals";
import { track } from "@vercel/analytics";

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
        window.addEventListener("online", () => {
            this.isOnline = true;
            this.flushQueue();
        });

        window.addEventListener("offline", () => {
            this.isOnline = false;
        });
    }

    private initializeMetrics() {
        onCLS(this.handleMetric.bind(this));
        onINP(this.handleMetric.bind(this));
        onFCP(this.handleMetric.bind(this));
        onLCP(this.handleMetric.bind(this));
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

        // Send to Vercel Analytics
        if (process.env.NODE_ENV === "production") {
            track("web_vital", {
                metric: metric.name,
                value: metric.value,
                rating: metric.rating,
            });
        }

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
            console.error("Failed to send web vitals:", error);
            // Re-queue events on failure
            this.queue.unshift(...events);
        }
    }
}

// Export singleton instance
export const webVitalsReporter = new WebVitalsReporter();

// Export function for manual reporting
export const reportWebVitals = (metric: Metric) => {
    webVitalsReporter["handleMetric"](metric);
};
