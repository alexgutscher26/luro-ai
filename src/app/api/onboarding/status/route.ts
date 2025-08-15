import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';

/**
 * Fetches and returns the onboarding status of a user.
 *
 * This function retrieves the user's authentication ID using `auth()`.
 * It then checks if the user is authorized; if not, it returns a 401 Unauthorized response.
 * If authorized, it queries the database for the user's onboarding details.
 * If the user does not exist, it returns a default set of onboarding status.
 * Otherwise, it formats and returns the user's onboarding status, including timestamps in ISO format.
 *
 * @returns A JSON response containing the user's onboarding status or an error message.
 */
export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
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
    console.error('Error fetching onboarding status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch onboarding status' },
      { status: 500 }
    );
  }
}