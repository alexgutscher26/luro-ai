"use client";

import React from "react";
import ErrorBoundary from "./error-boundary";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface Props {
    children: React.ReactNode;
}

/**
 * Global Error Boundary Component
 *
 * Application-level error boundary that provides a consistent error handling
 * experience across the entire application. Should be placed at the root level.
 */
const GlobalErrorBoundary = ({ children }: Props) => {
    const handleError = (error: Error) => {
        // Log to external service in production
        if (process.env.NODE_ENV === "production") {
            // Example: Send to error tracking service
            // errorTrackingService.captureException(error, { extra: errorInfo });
            console.error("Global error caught:", error);
        }
    };

    const globalFallback = (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full mx-auto p-6">
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-destructive/10 p-3">
                            <AlertTriangle className="h-8 w-8 text-destructive" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-foreground">
                            Application Error
                        </h1>
                        <p className="text-muted-foreground">
                            We're sorry, but something went wrong. Our team has
                            been notified and is working to fix the issue.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                            onClick={() => window.location.reload()}
                            variant="default"
                            className="flex items-center space-x-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            <span>Reload Application</span>
                        </Button>

                        <Button
                            onClick={() => (window.location.href = "/")}
                            variant="outline"
                            className="flex items-center space-x-2"
                        >
                            <Home className="h-4 w-4" />
                            <span>Go Home</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <ErrorBoundary
            fallback={globalFallback}
            onError={handleError}
            showDetails
        >
            {children}
        </ErrorBoundary>
    );
};

export default GlobalErrorBoundary;
