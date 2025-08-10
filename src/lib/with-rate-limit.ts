import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getRateLimitHeaders, rateLimiters } from "./rate-limit";

type RateLimitType = keyof typeof rateLimiters;

export function withRateLimit(limiter: RateLimitType = "api") {
    return function rateLimitMiddleware(
        handler: (request: NextRequest) => Promise<NextResponse>
    ) {
        return async function (request: NextRequest) {
            try {
                const rateLimitResult = await checkRateLimit(request, limiter);
                
                // Add rate limit headers to response
                const headers = getRateLimitHeaders(rateLimitResult);
                
                if (!rateLimitResult.success) {
                    return NextResponse.json(
                        {
                            error: "rate_limit_exceeded",
                            message: "Too many requests. Please try again later.",
                            retryAfter: Math.ceil(
                                (rateLimitResult.reset.getTime() - Date.now()) / 1000
                            ),
                        },
                        {
                            status: 429,
                            headers: {
                                ...headers,
                                "Retry-After": Math.ceil(
                                    (rateLimitResult.reset.getTime() - Date.now()) / 1000
                                ).toString(),
                            },
                        }
                    );
                }
                
                // Call the original handler
                const response = await handler(request);
                
                // Add rate limit headers to successful responses
                Object.entries(headers).forEach(([key, value]) => {
                    response.headers.set(key, value);
                });
                
                return response;
            } catch (error) {
                console.error("Rate limiting error:", error);
                // If rate limiting fails, allow the request to proceed
                return handler(request);
            }
        };
    };
}