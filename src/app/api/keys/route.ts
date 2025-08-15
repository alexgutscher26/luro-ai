import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { withSecurity } from "@/lib/with-security";
import { withValidation } from "@/lib/with-validation";
import { CreateApiKeySchema } from "@/schema";
import crypto from "crypto";

/**
 * Handles API requests related to managing user API keys.
 *
 * This function processes GET and POST requests to retrieve and create API keys for a user, respectively.
 * It first authenticates the user by checking if they are logged in and exist in the database.
 * For GET requests, it retrieves all API keys associated with the user, excluding the actual key for security reasons.
 * For POST requests, it validates input data, generates a random API key, hashes it for storage,
 * and creates a new API key entry in the database. The raw key is returned only once upon creation.
 *
 * @param request - The Next.js request object containing the HTTP method and body.
 * @param validatedData - An object containing validated request data.
 * @returns A JSON response with either the list of API keys or the newly created API key details.
 */
async function handler(request: NextRequest, validatedData: any) {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await db.user.findUnique({
        where: { clerkId: user.id },
    });

    if (!dbUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (request.method === "GET") {
        // Get all API keys for the user
        const apiKeys = await db.apiKey.findMany({
            where: { userId: dbUser.id },
            select: {
                id: true,
                name: true,
                isActive: true,
                lastUsedAt: true,
                expiresAt: true,
                permissions: true,
                createdAt: true,
                // Don't return the actual key for security
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ apiKeys });
    }

    if (request.method === "POST") {
        // Create new API key - data is already validated
        const { name, expiresAt, permissions } = validatedData.body;

        // Generate a random API key
        const rawKey = `luro_${crypto.randomBytes(32).toString("hex")}`;

        // Hash the key before storing
        const hashedKey = crypto
            .createHash("sha256")
            .update(rawKey)
            .digest("hex");

        const apiKey = await db.apiKey.create({
            data: {
                name,
                key: hashedKey,
                userId: dbUser.id,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
                permissions: permissions || [],
            },
        });

        return NextResponse.json({
            apiKey: {
                id: apiKey.id,
                name: apiKey.name,
                isActive: apiKey.isActive,
                expiresAt: apiKey.expiresAt,
                permissions: apiKey.permissions,
                createdAt: apiKey.createdAt,
            },
            // Return the raw key only once
            key: rawKey,
        });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

// Apply security and validation middleware
const securedHandler = withSecurity({ rateLimit: "api", csrf: true });
const validatedHandler = withValidation(
    { body: CreateApiKeySchema },
    handler
);

export const GET = securedHandler(async (req: NextRequest) => {
    return handler(req, {});
});

export const POST = securedHandler(validatedHandler);
