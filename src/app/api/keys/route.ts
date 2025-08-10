import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { withSecurity } from "@/lib/with-security";
import crypto from "crypto";

/**
 * Handles API requests related to managing user API keys.
 *
 * This function first checks if the user is authenticated. If not, it returns a 401 Unauthorized response.
 * It then retrieves the user from the database using their Clerk ID. If the user does not exist, it returns a 404 Not Found response.
 *
 * For GET requests, it fetches all API keys associated with the user and returns them in descending order of creation time.
 * For POST requests, it validates the request body to ensure the 'name' field is present and valid. It then generates a random
 * API key, hashes it for security, and stores it in the database along with other provided details like expiry and permissions.
 * The raw API key is returned only once upon creation for the user to copy.
 *
 * If the request method is neither GET nor POST, it returns a 405 Method Not Allowed response.
 *
 * @param request - The incoming Next.js request object.
 * @returns A JSON response containing either the list of API keys or details of the newly created API key, or an error message.
 */
async function handler(request: NextRequest) {
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
        // Create new API key
        const { name, expiresAt, permissions } = await request.json();

        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }

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

        // Return the raw key only once (for the user to copy)
        return NextResponse.json({
            apiKey: {
                id: apiKey.id,
                name: apiKey.name,
                key: rawKey, // Only returned on creation
                isActive: apiKey.isActive,
                expiresAt: apiKey.expiresAt,
                permissions: apiKey.permissions,
                createdAt: apiKey.createdAt,
            },
        });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export const GET = withSecurity({ rateLimit: "api", csrf: false })(handler);
export const POST = withSecurity({ rateLimit: "api", csrf: true })(handler);
