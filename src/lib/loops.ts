import { LoopsClient } from "loops";

// Create a function to get the loops client with proper error handling
const getLoopsClient = () => {
    const apiKey = process.env.LOOPS_API_KEY;

    if (!apiKey) {
        console.warn(
            "LOOPS_API_KEY is not set. Loops integration will be disabled."
        );
        return null;
    }

    return new LoopsClient(apiKey);
};

// Helper functions for common operations
export async function createLoopsContact({
    email,
    firstName,
    lastName,
    userGroup = "user",
    source = "registration",
}: {
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    userGroup?: string;
    source?: string;
}) {
    try {
        const loopsClient = getLoopsClient();
        if (!loopsClient) {
            console.warn(
                "Loops client not available - skipping contact creation"
            );
            return null;
        }

        const contactProperties: Record<string, any> = {
            userGroup,
            source,
        };

        // Only add firstName and lastName if they have truthy values
        if (firstName) {
            contactProperties.firstName = firstName;
        }
        if (lastName) {
            contactProperties.lastName = lastName;
        }

        const response = await loopsClient.createContact(
            email,
            contactProperties
        );
        console.log("Loops contact created:", response);
        return response;
    } catch (error) {
        console.error("Failed to create Loops contact:", error);
        throw error;
    }
}

export const sendWelcomeEmail = async (email: string, firstName?: string) => {
    const loops = getLoopsClient();

    if (!loops) {
        console.warn("Loops client not available. Skipping welcome email.");
        return null;
    }

    try {
        return await loops.sendTransactionalEmail({
            email,
            transactionalId: "welcome-email", // Replace with your actual transactional ID
            dataVariables: {
                firstName: firstName || "there",
            },
        });
    } catch (error) {
        console.error("Failed to send welcome email:", error);
        throw error;
    }
};

export const trackUserEvent = async ({
    email,
    eventName,
    eventProperties = {},
}: {
    email: string;
    eventName: string;
    eventProperties?: Record<string, any>;
}) => {
    const loops = getLoopsClient();

    if (!loops) {
        console.warn("Loops client not available. Skipping event tracking.");
        return null;
    }

    try {
        return await loops.sendEvent({
            email,
            eventName,
            eventProperties,
        });
    } catch (error) {
        console.error("Failed to track event:", error);
        throw error;
    }
};
