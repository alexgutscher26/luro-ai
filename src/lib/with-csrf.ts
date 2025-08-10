import { NextRequest, NextResponse } from "next/server";
import {
    extractCSRFToken,
    requiresCSRFProtection,
    verifyCSRFToken,
} from "./csrf";

export function withCSRF(
    handler: (request: NextRequest) => Promise<NextResponse>
) {
    return async function csrfMiddleware(request: NextRequest) {
        // Skip CSRF protection for GET, HEAD, OPTIONS requests
        if (!requiresCSRFProtection(request.method)) {
            return handler(request);
        }

        // Extract CSRF token from request
        const token = extractCSRFToken(request);

        if (!token) {
            return NextResponse.json(
                {
                    error: "csrf_token_missing",
                    message: "CSRF token is required for this request",
                },
                { status: 403 }
            );
        }

        // Verify CSRF token
        if (!verifyCSRFToken(token)) {
            return NextResponse.json(
                {
                    error: "csrf_token_invalid",
                    message: "Invalid CSRF token",
                },
                { status: 403 }
            );
        }

        // Token is valid, proceed with the request
        return handler(request);
    };
}
