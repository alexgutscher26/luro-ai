"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    showDetails?: boolean;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * @param {ReactNode} children - Child components to wrap
 * @param {ReactNode} [fallback] - Custom fallback UI to display on error
 * @param {Function} [onError] - Callback function called when an error occurs
 * @param {boolean} [showDetails] - Whether to show error details in development
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error details
        console.error("ErrorBoundary caught an error:", error, errorInfo);

        // Update state with error info
        this.setState({ error, errorInfo });

        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }

    handleReset = () => {
        this.setState({ hasError: false });
    };

    override render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4 rounded-lg border border-destructive/20 bg-destructive/5 p-8">
                    <div className="flex items-center space-x-2 text-destructive">
                        <AlertTriangle className="h-6 w-6" />
                        <h2 className="text-lg font-semibold">
                            Something went wrong
                        </h2>
                    </div>

                    <p className="text-center text-sm text-muted-foreground max-w-md">
                        An unexpected error occurred. Please try refreshing the
                        page or contact support if the problem persists.
                    </p>

                    {this.props.showDetails &&
                        process.env.NODE_ENV === "development" &&
                        this.state.error && (
                            <details className="w-full max-w-2xl">
                                <summary className="cursor-pointer text-sm font-medium text-destructive hover:text-destructive/80">
                                    Error Details (Development)
                                </summary>
                                <div className="mt-2 rounded-md bg-destructive/10 p-4">
                                    <pre className="text-xs text-destructive overflow-auto">
                                        {this.state.error.toString()}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </div>
                            </details>
                        )}

                    <div className="flex space-x-2">
                        <Button
                            onClick={this.handleReset}
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            <span>Try Again</span>
                        </Button>

                        <Button
                            onClick={() => window.location.reload()}
                            variant="default"
                            size="sm"
                        >
                            Reload Page
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
