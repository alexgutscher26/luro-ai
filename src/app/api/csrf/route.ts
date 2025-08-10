import { NextRequest, NextResponse } from "next/server";
import { generateCSRFToken } from "@/lib/csrf";
import { withRateLimit } from "@/lib/with-rate-limit";

async function handler(request: NextRequest) {
    try {
        const token = generateCSRFToken();
        
        return NextResponse.json(
            { csrfToken: token },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                    "Pragma": "no-cache",
                },
            }
        );
    } catch (error) {
        console.error("CSRF token generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate CSRF token" },
            { status: 500 }
        );
    }
}

// Apply rate limiting to CSRF token endpoint
export const GET = withRateLimit("api")(handler);