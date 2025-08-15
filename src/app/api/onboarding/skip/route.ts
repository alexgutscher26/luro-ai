import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';

/**
 * Handles POST requests to update user onboarding status.
 *
 * This function retrieves the authenticated user's ID, checks if it exists,
 * and updates the user's onboarding status in the database. If the user is unauthorized,
 * it returns a 401 error response. In case of any database operation failure or internal
 * server error, it logs the error and returns a 500 error response.
 */
export async function POST() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update user in database
    await db.user.upsert({
      where: { clerkId: userId },
      update: {
        onboardingSkipped: true,
        onboardingSkippedAt: new Date(),
      },
      create: {
        clerkId: userId,
        email: '', // This will be updated from Clerk webhook
        onboardingSkipped: true,
        onboardingSkippedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding skipped successfully',
    });
  } catch (error) {
    console.error('Error skipping onboarding:', error);
    return NextResponse.json(
      { error: 'Failed to skip onboarding' },
      { status: 500 }
    );
  }
}