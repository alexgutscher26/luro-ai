import { NextRequest, NextResponse } from "next/server";
import { LoopsClient } from "loops";
import { withRateLimit } from "@/lib/with-rate-limit";

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

async function handler(request: NextRequest) {
    try {
        const { email, firstName, lastName, userGroup, source } =
            await request.json();

        // Create or update contact in Loops
        const contactProperties = {
            firstName,
            lastName,
            userGroup,
            source,
        };

        const contact = await loops.createContact(email, contactProperties);

        return NextResponse.json({ success: true, contact });
    } catch (error: any) {
        // Handle specific error cases
        if (error.statusCode === 409) {
            return NextResponse.json(
                {
                    success: false,
                    error: "already_subscribed",
                    message:
                        "This email is already subscribed to our newsletter!",
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: "server_error",
                message: "Failed to subscribe. Please try again later.",
            },
            { status: 500 }
        );
    }
}

// Apply rate limiting with 'contact' limiter (3 requests per minute)
export const POST = withRateLimit("contact")(handler);
