import { NextRequest } from "next/server";
import Tokens from "csrf";

// Initialize CSRF tokens instance
const tokens = new Tokens();

// Generate a secret for CSRF token generation
const CSRF_SECRET =
    process.env.CSRF_SECRET || "your-csrf-secret-key-change-in-production";

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
    return tokens.create(CSRF_SECRET);
}

/**
 * Verify a CSRF token
 */
export function verifyCSRFToken(token: string): boolean {
    return tokens.verify(CSRF_SECRET, token);
}

/**
 * Extract CSRF token from request
 */
export function extractCSRFToken(request: NextRequest): string | null {
    // Check header first (recommended)
    const headerToken = request.headers.get("x-csrf-token");
    if (headerToken) return headerToken;

    // Check form data as fallback
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/x-www-form-urlencoded")) {
        // For form submissions, you'd need to parse the body
        // This is a simplified version - in practice, you might want to handle this differently
        return null;
    }

    return null;
}

/**
 * Check if request method requires CSRF protection
 */
export function requiresCSRFProtection(method: string): boolean {
    return ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase());
}
