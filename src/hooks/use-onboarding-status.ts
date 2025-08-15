import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

interface OnboardingStatus {
    onboardingCompleted: boolean;
    onboardingCompletedAt?: string;
    onboardingSkipped: boolean;
    onboardingSkippedAt?: string;
    userPreferences?: any;
    completedSteps: string[];
}

export const useOnboardingStatus = () => {
    const { user } = useUser();

    return useQuery({
        queryKey: ["onboarding-status", user?.id],
        queryFn: async (): Promise<OnboardingStatus> => {
            const response = await fetch("/api/onboarding/status");
            if (!response.ok) {
                throw new Error("Failed to fetch onboarding status");
            }
            return response.json();
        },
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
