import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';
import { db } from '@/lib/prisma';

const completeOnboardingSchema = z.object({
  preferences: z.object({
    industry: z.string().optional(),
    teamSize: z.string().optional(),
    primaryGoals: z.array(z.string()).optional(),
    notificationPreferences: z.object({
      email: z.boolean().optional(),
      push: z.boolean().optional(),
      marketing: z.boolean().optional(),
    }).optional(),
    theme: z.enum(['light', 'dark', 'system']).optional(),
  }),
  completedSteps: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { preferences, completedSteps } = completeOnboardingSchema.parse(body);

    // Update user in database
    await db.user.upsert({
      where: { clerkId: userId },
      update: {
        onboardingCompleted: true,
        onboardingCompletedAt: new Date(),
        userPreferences: preferences,
        completedSteps: completedSteps || [],
      },
      create: {
        clerkId: userId,
        email: '', // This will be updated from Clerk webhook
        onboardingCompleted: true,
        onboardingCompletedAt: new Date(),
        userPreferences: preferences,
        completedSteps: completedSteps || [],
      },
    });

    // Also update Clerk metadata for backward compatibility
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboardingCompleted: true,
        onboardingCompletedAt: new Date().toISOString(),
      },
      privateMetadata: {
        preferences,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
    });
  } catch (error) {
    console.error('Error completing onboarding:', error);
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}