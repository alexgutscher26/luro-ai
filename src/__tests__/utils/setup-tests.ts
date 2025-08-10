import { jest } from "@jest/globals";

// Setup function to run before each test
export const setupTest = () => {
    // Clear any previous localStorage
    localStorage.clear();

    // Reset any global mocks
    jest.clearAllMocks();
};

// Cleanup function to run after each test
export const cleanupTest = () => {
    // Additional cleanup if needed
    localStorage.clear();
};
