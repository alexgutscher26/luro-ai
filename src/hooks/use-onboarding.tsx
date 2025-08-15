"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import { useLocalStorage } from "./use-local-storage";

// Add gtag type declaration
declare global {
    interface Window {
        gtag?: (
            command: "event",
            eventName: string,
            parameters?: {
                event_category?: string;
                event_label?: string;
                [key: string]: any;
            }
        ) => void;
    }
}

export interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    component: React.ComponentType;
    isCompleted: boolean;
    isOptional?: boolean;
}

export interface UserPreferences {
    industry?: string;
    teamSize?: string;
    primaryGoals?: string[];
    notificationPreferences?: {
        email: boolean;
        push: boolean;
        marketing: boolean;
    };
    theme?: "light" | "dark" | "system";
}

interface OnboardingContextType {
    // State
    isOnboardingActive: boolean;
    currentStepIndex: number;
    steps: OnboardingStep[];
    userPreferences: UserPreferences;
    isCompleted: boolean;
    canSkip: boolean;
    shouldShowOnboarding: boolean;

    // Actions
    startOnboarding: () => void;
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (stepIndex: number) => void;
    completeStep: (stepId: string) => void;
    skipOnboarding: () => void;
    completeOnboarding: () => void;
    updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
    resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
    undefined
);

const ONBOARDING_STEPS: Omit<OnboardingStep, "isCompleted">[] = [
    {
        id: "welcome",
        title: "Welcome to Luro AI",
        description:
            "Get started with the most powerful social media management platform",
        component: () => null, // Will be replaced with actual components
    },
    {
        id: "features",
        title: "Discover Key Features",
        description:
            "Learn about the tools that will transform your social media strategy",
        component: () => null,
    },
    {
        id: "setup",
        title: "Personalize Your Experience",
        description: "Tell us about your business to customize your dashboard",
        component: () => null,
    },
    {
        id: "completion",
        title: "You're All Set!",
        description: "Start creating amazing content with Luro AI",
        component: () => null,
    },
];

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { user, isLoaded } = useUser();
    const { value: onboardingState, setValue: setOnboardingState } =
        useLocalStorage({
            key: "luro-onboarding-state",
            defaultValue: {
                isCompleted: false,
                completedSteps: [] as string[],
                userPreferences: {} as UserPreferences,
                hasSkipped: false,
            },
        });

    const [isOnboardingActive, setIsOnboardingActive] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [userPreferences, setUserPreferences] = useState<UserPreferences>(
        onboardingState.userPreferences
    );

    // Initialize steps with completion status
    const steps: OnboardingStep[] = ONBOARDING_STEPS.map(step => ({
        ...step,
        isCompleted: onboardingState.completedSteps.includes(step.id),
    }));

    const isCompleted = onboardingState.isCompleted;
    const canSkip = currentStepIndex > 0; // Allow skipping after welcome screen

    // Compute shouldShowOnboarding based on user state and onboarding completion
    const shouldShowOnboarding = Boolean(
        isLoaded &&
            user &&
            !isCompleted &&
            !onboardingState.hasSkipped &&
            user.publicMetadata?.onboardingCompleted !== true
    );

    // Check if user should see onboarding
    useEffect(() => {
        if (shouldShowOnboarding) {
            // Check if this is a new user (created within last 24 hours)
            const userCreatedAt = new Date(user?.createdAt || new Date());
            const now = new Date();
            const hoursSinceCreation =
                (now.getTime() - userCreatedAt.getTime()) / (1000 * 60 * 60);

            if (hoursSinceCreation <= 24) {
                setIsOnboardingActive(true);
            }
        }
    }, [shouldShowOnboarding, user]);

    const startOnboarding = () => {
        setIsOnboardingActive(true);
        setCurrentStepIndex(0);
    };

    const nextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            completeOnboarding();
        }
    };

    const previousStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    const goToStep = (stepIndex: number) => {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            setCurrentStepIndex(stepIndex);
        }
    };

    const completeStep = (stepId: string) => {
        setOnboardingState(prev => ({
            ...prev,
            completedSteps: Array.from(
                new Set([...prev.completedSteps, stepId])
            ),
        }));
    };

    const skipOnboarding = async () => {
        try {
            // Call API to save skip status to database
            const response = await fetch("/api/onboarding/skip", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to save onboarding skip status");
            }

            // Update local state
            setOnboardingState(prev => ({
                ...prev,
                hasSkipped: true,
            }));
            setIsOnboardingActive(false);
        } catch (error) {
            console.error("Error skipping onboarding:", error);
            // Still update local state as fallback
            setOnboardingState(prev => ({
                ...prev,
                hasSkipped: true,
            }));
            setIsOnboardingActive(false);
        }
    };

    const completeOnboarding = async () => {
        try {
            // Call API to save to database
            const response = await fetch("/api/onboarding/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    preferences: userPreferences,
                    completedSteps: onboardingState.completedSteps,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save onboarding status");
            }

            // Update local state
            setOnboardingState(prev => ({
                ...prev,
                isCompleted: true,
                userPreferences,
            }));
            setIsOnboardingActive(false);

            // Track completion event
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "onboarding_completed", {
                    event_category: "engagement",
                    event_label: "user_onboarding",
                });
            }
        } catch (error) {
            console.error("Error completing onboarding:", error);
            // Still update local state as fallback
            setOnboardingState(prev => ({
                ...prev,
                isCompleted: true,
                userPreferences,
            }));
            setIsOnboardingActive(false);
        }
    };

    const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
        const updatedPreferences = { ...userPreferences, ...preferences };
        setUserPreferences(updatedPreferences);
        setOnboardingState(prev => ({
            ...prev,
            userPreferences: updatedPreferences,
        }));
    };

    const resetOnboarding = () => {
        setOnboardingState({
            isCompleted: false,
            completedSteps: [],
            userPreferences: {},
            hasSkipped: false,
        });
        setCurrentStepIndex(0);
        setUserPreferences({});
        setIsOnboardingActive(true);
    };

    const value: OnboardingContextType = {
        isOnboardingActive,
        currentStepIndex,
        steps,
        userPreferences,
        isCompleted,
        canSkip,
        shouldShowOnboarding,
        startOnboarding,
        nextStep,
        previousStep,
        goToStep,
        completeStep,
        skipOnboarding,
        completeOnboarding,
        updateUserPreferences,
        resetOnboarding,
    };

    return (
        <OnboardingContext.Provider value={value}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = (): OnboardingContextType => {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error(
            "useOnboarding must be used within an OnboardingProvider"
        );
    }
    return context;
};
