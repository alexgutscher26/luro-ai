import { NextRequest, NextResponse } from "next/server";
import { LoopsClient } from "loops";
import { withSecurity } from "@/lib/with-security";

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

// Apply both CSRF protection and rate limiting
// Apply security with custom CORS for this specific endpoint
export const POST = withSecurity({
    rateLimit: "contact",
    csrf: true,
    cors: {
        origin: ["https://yourdomain.com", "https://marketing.yourdomain.com"],
        methods: ["POST"],
        credentials: true,
    },
})(handler);

// Also handle OPTIONS for preflight
export const OPTIONS = withSecurity({
    cors: true,
    csrf: false,
})(() => Promise.resolve(new NextResponse(null, { status: 200 })));
