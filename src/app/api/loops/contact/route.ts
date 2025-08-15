import { NextRequest, NextResponse } from "next/server";
import { LoopsClient } from "loops";
import { withSecurity } from "@/lib/with-security";
import { withValidation } from "@/lib/with-validation";
import { LoopsContactSchema } from "@/schema";

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

async function handler(_request: NextRequest, validatedData: any) {
    try {
        // Data is already validated by middleware
        const { email, firstName, lastName, userGroup, source } =
            validatedData.body;

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

// Apply security and validation middleware with proper configuration
export const POST = withSecurity({
    rateLimit: "contact",
    csrf: true,
    cors: {
        origin: ["https://yourdomain.com", "https://marketing.yourdomain.com"],
        methods: ["POST"],
        credentials: true,
    },
})(withValidation({ body: LoopsContactSchema }, handler));

// Also handle OPTIONS for preflight
export const OPTIONS = withSecurity({
    cors: true,
    csrf: false,
})(() => Promise.resolve(new NextResponse(null, { status: 200 })));
