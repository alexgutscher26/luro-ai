"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useOnboarding } from '@/hooks/use-onboarding';
import { OnboardingLayout } from './onboarding-layout';

interface OnboardingTriggerProps {
  autoStart?: boolean;
  children?: React.ReactNode;
}

export function OnboardingTrigger({ autoStart = true, children }: OnboardingTriggerProps) {
  const { user, isLoaded } = useUser();
  const { shouldShowOnboarding, startOnboarding } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (isLoaded && user && autoStart && shouldShowOnboarding) {
      // Check if user has completed onboarding
      const hasCompletedOnboarding = user.publicMetadata?.onboardingCompleted;
      
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
        startOnboarding();
      }
    }
  }, [isLoaded, user, autoStart, shouldShowOnboarding, startOnboarding]);

  const handleClose = () => {
    setShowOnboarding(false);
  };

  const handleManualStart = () => {
    setShowOnboarding(true);
    startOnboarding();
  };

  return (
    <>
      {children && (
        <div onClick={handleManualStart} className="cursor-pointer">
          {children}
        </div>
      )}
      {showOnboarding && (
        <OnboardingLayout onClose={handleClose} />
      )}
    </>
  );
}