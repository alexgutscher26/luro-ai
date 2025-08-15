import { z } from "zod";

// Base API key validation
const apiKeyIdSchema = z.string().uuid({
    message: "API key ID must be a valid UUID"
});

// Create API key schema
export const CreateApiKeySchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name must be at most 100 characters" })
        .trim(),
    expiresAt: z
        .string()
        .datetime({ message: "Invalid expiration date format" })
        .optional()
        .nullable(),
    permissions: z
        .array(z.string())
        .default([])
        .optional()
});

// Update API key schema
export const UpdateApiKeySchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name cannot be empty" })
        .max(100, { message: "Name must be at most 100 characters" })
        .trim()
        .optional(),
    isActive: z.boolean().optional(),
    expiresAt: z
        .string()
        .datetime({ message: "Invalid expiration date format" })
        .nullable()
        .optional(),
    permissions: z
        .array(z.string())
        .optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field must be provided for update" }
);

// API key route params schema
export const ApiKeyParamsSchema = z.object({
    id: apiKeyIdSchema
});

// Export types
export type CreateApiKeySchemaType = z.infer<typeof CreateApiKeySchema>;
export type UpdateApiKeySchemaType = z.infer<typeof UpdateApiKeySchema>;
export type ApiKeyParamsSchemaType = z.infer<typeof ApiKeyParamsSchema>;