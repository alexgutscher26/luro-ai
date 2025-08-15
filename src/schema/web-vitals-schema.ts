import { z } from "zod";

// Web vital event schema
const WebVitalEventSchema = z.object({
    name: z.enum(["CLS", "FID", "FCP", "LCP", "TTFB", "INP"], {
        errorMap: () => ({ message: "Invalid web vital metric name" })
    }),
    value: z.number().positive({ message: "Value must be a positive number" }),
    id: z.string().min(1, { message: "ID is required" }),
    delta: z.number(),
    rating: z.enum(["good", "needs-improvement", "poor"], {
        errorMap: () => ({ message: "Rating must be good, needs-improvement, or poor" })
    }),
    navigationType: z.string().min(1, { message: "Navigation type is required" }),
    timestamp: z.number().positive({ message: "Timestamp must be a positive number" })
});

// Web vitals request schema
export const WebVitalsSchema = z.object({
    events: z
        .array(WebVitalEventSchema)
        .min(1, { message: "At least one event is required" })
        .max(50, { message: "Maximum 50 events allowed per request" })
});

export type WebVitalsSchemaType = z.infer<typeof WebVitalsSchema>;
export type WebVitalEventType = z.infer<typeof WebVitalEventSchema>;