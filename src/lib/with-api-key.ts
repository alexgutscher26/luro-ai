import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import crypto from "crypto";

export function withApiKey(
    handler: (request: NextRequest, apiKey: any) => Promise<NextResponse>
) {
    return async function apiKeyMiddleware(request: NextRequest) {
        try {
            const authHeader = request.headers.get("authorization");
            const apiKeyFromHeader = request.headers.get("x-api-key");

            let apiKeyValue: string | null = null;

            // Check Authorization header (Bearer token)
            if (authHeader?.startsWith("Bearer ")) {
                apiKeyValue = authHeader.substring(7);
            }
            // Check X-API-Key header
            else if (apiKeyFromHeader) {
                apiKeyValue = apiKeyFromHeader;
            }

            if (!apiKeyValue) {
                return NextResponse.json(
                    { error: "API key required" },
                    { status: 401 }
                );
            }

            // Hash the provided API key to compare with stored hash
            const hashedKey = crypto
                .createHash("sha256")
                .update(apiKeyValue)
                .digest("hex");

            // Find the API key in database
            const apiKey = await db.apiKey.findUnique({
                where: { key: hashedKey },
                include: { user: true },
            });

            if (!apiKey) {
                return NextResponse.json(
                    { error: "Invalid API key" },
                    { status: 401 }
                );
            }

            if (!apiKey.isActive) {
                return NextResponse.json(
                    { error: "API key is disabled" },
                    { status: 401 }
                );
            }

            if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
                return NextResponse.json(
                    { error: "API key has expired" },
                    { status: 401 }
                );
            }

            // Update last used timestamp
            await db.apiKey.update({
                where: { id: apiKey.id },
                data: { lastUsedAt: new Date() },
            });

            return handler(request, apiKey);
        } catch (error) {
            console.error("API key authentication error:", error);
            return NextResponse.json(
                { error: "Authentication failed" },
                { status: 500 }
            );
        }
    };
}
