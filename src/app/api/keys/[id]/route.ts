import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { withSecurity } from "@/lib/with-security";

/**
 * Handles API key operations based on the request method.
 *
 * This function first authenticates the user and checks if they exist in the database.
 * It then retrieves the specified API key associated with the authenticated user.
 * Depending on the HTTP method, it either updates or deletes the API key.
 * If the method is PUT, it updates the API key's details such as name, active status, expiration date, and permissions.
 * If the method is DELETE, it removes the API key from the database.
 * For unsupported methods, it returns a 405 Method Not Allowed response.
 *
 * @param request - The Next.js request object containing the HTTP method and body.
 * @param params - An object containing route parameters, specifically the API key ID.
 * @returns A JSON response with the updated API key details or a success message upon deletion.
 */
async function handler(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

    const apiKey = await db.apiKey.findFirst({
        where: {
            id: params.id,
            userId: dbUser.id,
        },
    });

    if (!apiKey) {
        return NextResponse.json(
            { error: "API key not found" },
            { status: 404 }
        );
    }

    if (request.method === "PUT") {
        // Update API key
        const { name, isActive, expiresAt, permissions } = await request.json();

        const updatedApiKey = await db.apiKey.update({
            where: { id: params.id },
            data: {
                ...(name && { name }),
                ...(typeof isActive === "boolean" && { isActive }),
                ...(expiresAt !== undefined && {
                    expiresAt: expiresAt ? new Date(expiresAt) : null,
                }),
                ...(permissions && { permissions }),
            },
        });

        return NextResponse.json({
            apiKey: {
                id: updatedApiKey.id,
                name: updatedApiKey.name,
                isActive: updatedApiKey.isActive,
                expiresAt: updatedApiKey.expiresAt,
                permissions: updatedApiKey.permissions,
                lastUsedAt: updatedApiKey.lastUsedAt,
                createdAt: updatedApiKey.createdAt,
            },
        });
    }

    if (request.method === "DELETE") {
        // Delete API key
        await db.apiKey.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

// For dynamic routes, we need to wrap the handler differently
const securedHandler = withSecurity({ rateLimit: "api", csrf: true });

/**
 * Handles a PUT request with security checks.
 */
export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
) {
    return securedHandler(async (req: NextRequest) => {
        return handler(req, context);
    })(request);
}

/**
 * Deletes a resource by handling the request securely.
 */
export async function DELETE(
    request: NextRequest,
    context: { params: { id: string } }
) {
    return securedHandler(async (req: NextRequest) => {
        return handler(req, context);
    })(request);
}
