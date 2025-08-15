import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

// Initialize Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Different rate limit configurations
export const rateLimiters = {
    // General API rate limit: 100 requests per minute
    api: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, "1 m"),
        analytics: true,
    }),

    // Strict rate limit for sensitive endpoints: 10 requests per minute
    strict: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "1 m"),
        analytics: true,
    }),

    // Auth endpoints: 5 requests per minute
    auth: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
        analytics: true,
    }),

    // Contact/Newsletter: 3 requests per minute
    contact: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 m"),
        analytics: true,
    }),

    // Web vitals analytics: 100 requests per minute
    analytics: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, "1 m"),
        analytics: true,
    }),
};

// Get client identifier for rate limiting
export function getClientIdentifier(request: NextRequest): string {
    // Try to get user ID from headers (if authenticated)
    const userId = request.headers.get("x-user-id");
    if (userId) return `user:${userId}`;

    // Fallback to IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown";
    return `ip:${ip}`;
}

// Rate limit check function
export async function checkRateLimit(
    request: NextRequest,
    limiter: keyof typeof rateLimiters = "api"
) {
    const identifier = getClientIdentifier(request);
    const result = await rateLimiters[limiter].limit(identifier);

    return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
        identifier,
    };
}

// Rate limit response headers
export function getRateLimitHeaders(result: {
    limit: number;
    remaining: number;
    reset: Date | number;
}) {
    const resetTime =
        result.reset instanceof Date ? result.reset.getTime() : result.reset;

    return {
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": result.remaining.toString(),
        "X-RateLimit-Reset": resetTime.toString(),
    };
}
