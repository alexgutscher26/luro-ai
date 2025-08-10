import { db } from "@/lib/prisma";
import { createLoopsContact } from "@/lib/loops";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses || !user.emailAddresses[0] || !user.emailAddresses[0].emailAddress) {
        return redirect("/auth/signin");
    }

    const existingUser = await db.user.findUnique({
        where: {
            clerkId: user.id,
        },
    });

    if (!existingUser) {
        // Create user in database
        await db.user.create({
            data: {
                id: user.id,
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                avatar: user.imageUrl,
            },
        });

        // Create contact in Loops (non-blocking)
        try {
            const contactData: {
                email: string;
                firstName?: string;
                lastName?: string;
                userGroup: string;
                source: string;
            } = {
                email: user.emailAddresses[0].emailAddress,
                userGroup: 'user',
                source: 'signup',
            };

            if (user.firstName) {
                contactData.firstName = user.firstName;
            }
            if (user.lastName) {
                contactData.lastName = user.lastName;
            }

            const result = await createLoopsContact(contactData);
            
            if (result) {
                console.log('Successfully created Loops contact for:', user.emailAddresses[0].emailAddress);
            }
        } catch (error) {
            console.error('Failed to create Loops contact:', error);
            // Don't block user registration if Loops fails
        }

        redirect("/app");
    }

    redirect("/app");
};

export default AuthCallbackPage;
