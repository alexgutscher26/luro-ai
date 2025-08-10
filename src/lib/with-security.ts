import { NextRequest, NextResponse } from "next/server";
import { withRateLimit } from "./with-rate-limit";
import { withCSRF } from "./with-csrf";
import { withCORS } from "./with-cors";
import { rateLimiters } from "./rate-limit";

type CORSOptions = {
    origin?: string | string[] | boolean;
    methods?: string[];
    allowedHeaders?: string[];
    exposedHeaders?: string[];
    credentials?: boolean;
    maxAge?: number;
};

type SecurityOptions = {
    rateLimit?: keyof typeof rateLimiters;
    csrf?: boolean;
    cors?: boolean | CORSOptions;
};

export function withSecurity(
    options: SecurityOptions = { rateLimit: "api", csrf: true, cors: true }
) {
    return function securityMiddleware(
        handler: (request: NextRequest) => Promise<NextResponse>
    ) {
        let securedHandler = handler;

        // Apply CORS if enabled
        if (options.cors) {
            const corsOptions =
                typeof options.cors === "boolean" ? {} : options.cors;
            securedHandler = withCORS(corsOptions)(securedHandler);
        }

        // Apply CSRF protection if enabled
        if (options.csrf) {
            securedHandler = withCSRF(securedHandler);
        }

        // Apply rate limiting if specified
        if (options.rateLimit) {
            securedHandler = withRateLimit(options.rateLimit)(securedHandler);
        }

        return securedHandler;
    };
}
