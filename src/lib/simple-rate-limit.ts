import { NextRequest } from "next/server";

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function simpleRateLimit(
    request: NextRequest,
    limit: number = 100,
    windowMs: number = 60000 // 1 minute
) {
    const ip =
        request.headers.get("x-forwarded-for") || request.ip || "unknown";
    const now = Date.now();
    const key = `${ip}`;

    const entry = rateLimitStore.get(key);

    if (!entry || now > entry.resetTime) {
        // Create new entry or reset expired entry
        rateLimitStore.set(key, {
            count: 1,
            resetTime: now + windowMs,
        });
        return {
            success: true,
            remaining: limit - 1,
            reset: new Date(now + windowMs),
            limit,
        };
    }

    if (entry.count >= limit) {
        return {
            success: false,
            remaining: 0,
            reset: new Date(entry.resetTime),
            limit,
        };
    }

    entry.count++;
    return {
        success: true,
        remaining: limit - entry.count,
        reset: new Date(entry.resetTime),
        limit,
    };
}

// Cleanup expired entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}, 60000); // Clean up every minute
