import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { mockAuth } from "./mock-data";

// Mock Clerk Provider
export const MockClerkProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <ClerkProvider publishableKey="pk_test_mock">{children}</ClerkProvider>
    );
};

// Mock authenticated user context
export const MockAuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // Mock the useAuth hook return value
    React.useEffect(() => {
        // You can customize this based on your auth implementation
        (global as any).mockAuthState = mockAuth;
    }, []);

    return <>{children}</>;
};
