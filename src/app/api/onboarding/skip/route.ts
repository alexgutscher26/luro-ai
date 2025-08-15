import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';

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