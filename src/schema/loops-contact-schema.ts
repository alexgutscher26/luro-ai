import { z } from "zod";

export const LoopsContactSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .max(254, { message: "Email must be at most 254 characters" }),
    firstName: z
        .string()
        .min(1, { message: "First name is required" })
        .max(50, { message: "First name must be at most 50 characters" })
        .trim()
        .optional(),
    lastName: z
        .string()
        .max(50, { message: "Last name must be at most 50 characters" })
        .trim()
        .optional(),
    userGroup: z
        .string()
        .max(50, { message: "User group must be at most 50 characters" })
        .trim()
        .optional(),
    source: z
        .string()
        .max(100, { message: "Source must be at most 100 characters" })
        .trim()
        .optional()
});

export type LoopsContactSchemaType = z.infer<typeof LoopsContactSchema>;