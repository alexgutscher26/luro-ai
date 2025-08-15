import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function GET() {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await db.user.findUnique({
            where: { clerkId: userId },
            select: {
                onboardingCompleted: true,
                onboardingCompletedAt: true,
                onboardingSkipped: true,
                onboardingSkippedAt: true,
                userPreferences: true,
                completedSteps: true,
            },
        });

        if (!user) {
            return NextResponse.json({
                onboardingCompleted: false,
                onboardingSkipped: false,
                userPreferences: {},
                completedSteps: [],
            });
        }

        return NextResponse.json({
            onboardingCompleted: user.onboardingCompleted,
            onboardingCompletedAt: user.onboardingCompletedAt?.toISOString(),
            onboardingSkipped: user.onboardingSkipped,
            onboardingSkippedAt: user.onboardingSkippedAt?.toISOString(),
            userPreferences: user.userPreferences,
            completedSteps: user.completedSteps,
        });
    } catch (error) {
        console.error("Error fetching onboarding status:", error);
        return NextResponse.json(
            { error: "Failed to fetch onboarding status" },
            { status: 500 }
        );
    }
}
