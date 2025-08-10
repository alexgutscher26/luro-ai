import { NextRequest, NextResponse } from "next/server";
import { withApiKey } from "@/lib/with-api-key";
import { withSecurity } from "@/lib/with-security";

async function handler(_request: NextRequest, apiKey: any) {
    // This route is now protected by API key authentication
    // The apiKey object contains the authenticated API key and user info

    return NextResponse.json({
        message: "Hello from protected API!",
        user: {
            id: apiKey.user.id,
            email: apiKey.user.email,
        },
        apiKey: {
            name: apiKey.name,
            permissions: apiKey.permissions,
        },
    });
}

// Apply API key authentication
export const GET = withSecurity({ rateLimit: "api", csrf: false })(
    withApiKey(handler)
);
export const POST = withSecurity({ rateLimit: "api", csrf: false })(
    withApiKey(handler)
);
