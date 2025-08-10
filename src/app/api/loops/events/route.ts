import { NextRequest, NextResponse } from "next/server";
import { LoopsClient } from "loops";
import { withRateLimit } from "@/lib/with-rate-limit";

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

async function handler(request: NextRequest) {
    try {
        const { email, eventName, eventProperties } = await request.json();

        // Send event to Loops
        const result = await loops.sendEvent({
            email,
            eventName,
            eventProperties,
        });

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error("Loops event tracking error:", error);
        return NextResponse.json(
            { error: "Failed to send event" },
            { status: 500 }
        );
    }
}

// Apply standard API rate limiting (100 requests per minute)
export const POST = withRateLimit("api")(handler);
