"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/service-worker";

export const PerformanceMonitor = () => {
    useEffect(() => {
        // Register service worker
        registerServiceWorker();

        // Dynamically import web-vitals only on client side
        import("@/lib/web-vitals");

        // Monitor long tasks
        if ("PerformanceObserver" in window) {
            const longTaskObserver = new PerformanceObserver(list => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn(
                            `Long task detected: ${entry.duration}ms`,
                            entry
                        );
                    }
                }
            });

            try {
                longTaskObserver.observe({ entryTypes: ["longtask"] });
            } catch (e) {
                // Long task API not supported
            }

            // Monitor layout shifts
            const layoutShiftObserver = new PerformanceObserver(list => {
                for (const entry of list.getEntries()) {
                    if ((entry as LayoutShift).hadRecentInput) continue;
                    console.log("Layout shift detected:", entry);
                }
            });

            try {
                layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });
            } catch (e) {
                // Layout shift API not supported
            }

            return () => {
                longTaskObserver.disconnect();
                layoutShiftObserver.disconnect();
            };
        }

        // Return undefined when PerformanceObserver is not available
        return undefined;
    }, []);

    return null;
};
