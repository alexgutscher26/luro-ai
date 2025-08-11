import { validateServerEnv, validateClientEnv } from "../src/lib/env";

function validateEnvironment() {
    console.log("🔍 Validating environment variables...");

    try {
        // Validate server environment
        console.log("📋 Validating server environment variables...");
        validateServerEnv();
        console.log("✅ Server environment variables are valid");

        // Validate client environment
        console.log("📋 Validating client environment variables...");
        validateClientEnv();
        console.log("✅ Client environment variables are valid");

        console.log("🎉 All environment variables are valid!");
    } catch (error) {
        console.error("💥 Environment validation failed:", error);
    }
}

validateEnvironment();
