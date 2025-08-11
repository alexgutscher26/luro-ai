import { NextRequest, NextResponse } from "next/server";
import { withRateLimit } from "@/lib/with-rate-limit";

interface WebVitalEvent {
    name: string;
    value: number;
    id: string;
    delta: number;
    rating: "good" | "needs-improvement" | "poor";
    navigationType: string;
    timestamp: number;
}

interface RequestBody {
    events: WebVitalEvent[];
}

async function handler(request: NextRequest) {
    try {
        const { events }: RequestBody = await request.json();

        if (!Array.isArray(events) || events.length === 0) {
            return NextResponse.json(
                { error: "Invalid events data" },
                { status: 400 }
            );
        }

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

async function sendToGA4(event: WebVitalEvent) {
    try {
        const response = await fetch(
            `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: "web-vitals-client",
                    events: [
                        {
                            name: "web_vital",
                            params: {
                                metric_name: event.name,
                                metric_value: event.value,
                                metric_rating: event.rating,
                                metric_delta: event.delta,
                            },
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`GA4 API error: ${response.status}`);
        }
    } catch (error) {
        console.error("Failed to send to GA4:", error);
    }
}

export const POST = withRateLimit("api")(handler);
