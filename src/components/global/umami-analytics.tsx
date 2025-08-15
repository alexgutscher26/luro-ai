"use client";

import { useEffect } from "react";
import Script from "next/script";
import { getClientEnv } from "@/lib/env";

interface UmamiAnalyticsProps {
    /**
     * Whether to respect user's Do Not Track preference
     * @default true
     */
    honorDNT?: boolean;
    /**
     * Whether to enable data collection
     * @default true
     */
    enabled?: boolean;
}

export function UmamiAnalytics({
    honorDNT = true,
    enabled = true,
}: UmamiAnalyticsProps = {}) {
    const env = getClientEnv();

    // Don't load if analytics is disabled or required env vars are missing
    if (
        !enabled ||
        !env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ||
        !env.NEXT_PUBLIC_UMAMI_URL
    ) {
        return null;
    }

    // Check for Do Not Track preference
    useEffect(() => {
        if (honorDNT && typeof navigator !== "undefined") {
            const dnt =
                navigator.doNotTrack ||
                (window as any).doNotTrack ||
                (navigator as any).msDoNotTrack;
            if (dnt === "1" || dnt === "yes") {
                console.log(
                    "Umami Analytics: Respecting Do Not Track preference"
                );
                return;
            }
        }
    }, [honorDNT]);

    // Check if user has opted out via localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const optOut = localStorage.getItem("umami-opt-out");
            if (optOut === "true") {
                console.log("Umami Analytics: User has opted out");
                return;
            }
        }
    }, []);

    const scriptSrc = `${env.NEXT_PUBLIC_UMAMI_URL}/script.js`;
    const websiteId = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
    const domains = env.NEXT_PUBLIC_UMAMI_DOMAINS;
    const cache = env.NEXT_PUBLIC_UMAMI_CACHE === "true";
    const dnt = env.NEXT_PUBLIC_UMAMI_HONOR_DNT === "true";

    return (
        <Script
            src={scriptSrc}
            data-website-id={websiteId}
            data-domains={domains}
            data-cache={cache ? "true" : "false"}
            data-honor-dnt={dnt ? "true" : "false"}
            strategy="afterInteractive"
            onLoad={() => {
                console.log("Umami Analytics loaded successfully");
            }}
            onError={error => {
                console.error("Failed to load Umami Analytics:", error);
            }}
        />
    );
}

// Custom hook for tracking events
export function useUmamiTracking() {
    const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
        if (typeof window !== "undefined" && (window as any).umami) {
            try {
                (window as any).umami.track(eventName, eventData);
            } catch (error) {
                console.error("Umami tracking error:", error);
            }
        }
    };

    const trackPageView = (url?: string, referrer?: string) => {
        if (typeof window !== "undefined" && (window as any).umami) {
            try {
                (window as any).umami.track(url || window.location.pathname, {
                    referrer: referrer || document.referrer,
                });
            } catch (error) {
                console.error("Umami page view tracking error:", error);
            }
        }
    };

    return { trackEvent, trackPageView };
}

// Utility functions for privacy compliance
export const UmamiUtils = {
    /**
     * Allow user to opt out of analytics
     */
    optOut: () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("umami-opt-out", "true");
            console.log("User opted out of analytics");
        }
    },

    /**
     * Allow user to opt back in to analytics
     */
    optIn: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("umami-opt-out");
            console.log("User opted in to analytics");
        }
    },

    /**
     * Check if user has opted out
     */
    hasOptedOut: (): boolean => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("umami-opt-out") === "true";
        }
        return false;
    },

    /**
     * Check if Do Not Track is enabled
     */
    isDNTEnabled: (): boolean => {
        if (typeof navigator !== "undefined") {
            const dnt =
                navigator.doNotTrack ||
                (window as any).doNotTrack ||
                (navigator as any).msDoNotTrack;
            return dnt === "1" || dnt === "yes";
        }
        return false;
    },
};
