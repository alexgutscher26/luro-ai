import { NextRequest, NextResponse } from "next/server";
import { withRateLimit } from "@/lib/with-rate-limit";
import { withValidation } from "@/lib/with-validation";
import { WebVitalsSchema } from "@/schema";

async function handler(_request: NextRequest, validatedData: any) {
    try {
        // Data is already validated by middleware
        const { events } = validatedData.body;

        // Process each event
        for (const event of events) {
            // Log to console in development
            if (process.env.NODE_ENV === "development") {
                console.log(`[Web Vitals API] ${event.name}:`, {
                    value: event.value,
                    rating: event.rating,
                    timestamp: new Date(event.timestamp).toISOString(),
                });
            }

            // In production, you would typically:
            // 1. Store in database
            // 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
            // 3. Send to monitoring service (DataDog, New Relic, etc.)

            // Example: Send to Google Analytics 4
            if (process.env.GA_MEASUREMENT_ID) {
                await sendToGA4(event);
            }

            // Example: Store in database
            // await storeWebVital(event);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Web Vitals API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Placeholder for GA4 integration
async function sendToGA4(event: any) {
    // Implementation would go here
    console.log("Sending to GA4:", event);
}

// Apply rate limiting and validation
const validatedHandler = withValidation(
    { body: WebVitalsSchema },
    handler
);

export const POST = withRateLimit("analytics")(validatedHandler);
