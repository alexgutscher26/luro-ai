import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { withSecurity } from "@/lib/with-security";
import { withValidation } from "@/lib/with-validation";
import { UpdateApiKeySchema, ApiKeyParamsSchema } from "@/schema";

/**
 * Handles API key operations based on the request method.
 */
async function handler(
    request: NextRequest,
    validatedData: any,
    _context: { params: { id: string } }
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

    // Use validated params
    const { id } = validatedData.params;

    const apiKey = await db.apiKey.findFirst({
        where: {
            id,
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
        // Update API key - data is already validated
        const updateData = validatedData.body;

        const updatedApiKey = await db.apiKey.update({
            where: { id },
            data: {
                ...(updateData.name && { name: updateData.name }),
                ...(typeof updateData.isActive === "boolean" && { isActive: updateData.isActive }),
                ...(updateData.expiresAt !== undefined && {
                    expiresAt: updateData.expiresAt ? new Date(updateData.expiresAt) : null,
                }),
                ...(updateData.permissions && { permissions: updateData.permissions }),
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
            where: { id },
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

// Apply security and validation middleware
const securedHandler = withSecurity({ rateLimit: "api", csrf: true });

/**
 * Handles a PUT request with security checks and validation.
 */
export async function PUT(
    request: NextRequest,
    _context: { params: { id: string } }
) {
    const validatedHandler = withValidation(
        { body: UpdateApiKeySchema, params: ApiKeyParamsSchema },
        handler
    );
    
    return securedHandler(validatedHandler)(request);
}

/**
 * Deletes a resource by handling the request securely.
 */
export async function DELETE(
    request: NextRequest) {
    const validatedHandler = withValidation(
        { params: ApiKeyParamsSchema },
        handler
    );
    
    return securedHandler(validatedHandler)(request);
}
