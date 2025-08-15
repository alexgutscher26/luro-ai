import { z } from "zod";

// Onboarding completion schema
export const OnboardingCompletionSchema = z.object({
    completedSteps: z.array(z.string()).optional().default([]),
    userPreferences: z.record(z.string(), z.any()).optional().default({}),
    skipOnboarding: z.boolean().optional().default(false),
});

// Onboarding step update schema
export const OnboardingStepSchema = z.object({
    stepId: z.string().min(1, { message: "Step ID is required" }),
    completed: z.boolean(),
    data: z.record(z.string(), z.any()).optional(),
});

export type OnboardingCompletionSchemaType = z.infer<
    typeof OnboardingCompletionSchema
>;
export type OnboardingStepSchemaType = z.infer<typeof OnboardingStepSchema>;
