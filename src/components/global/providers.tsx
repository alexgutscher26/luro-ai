"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalErrorBoundary from "./global-error-boundary";
import { OnboardingProvider } from "@/hooks/use-onboarding";

interface Props {
    children: React.ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

/**
 * Wraps children with global error boundary, query client provider, clerk provider, and onboarding provider.
 */
const Providers = ({ children }: Props) => {
    return (
        <GlobalErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <ClerkProvider>
                    <OnboardingProvider>{children}</OnboardingProvider>
                </ClerkProvider>
                {process.env.NODE_ENV === "development" && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </QueryClientProvider>
        </GlobalErrorBoundary>
    );
};

export default Providers;
