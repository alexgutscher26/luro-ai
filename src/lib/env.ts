import {
    serverSchema,
    clientSchema,
    type ServerEnv,
    type ClientEnv,
} from "@/schema/env-schema";

/**
 * Validates server-side environment variables
 * Should only be called on the server side
 */
export function validateServerEnv(): ServerEnv {
    if (typeof window !== "undefined") {
        throw new Error(
            "validateServerEnv() should only be called on the server side"
        );
    }

    try {
        return serverSchema.parse(process.env);
    } catch (error) {
        console.error("❌ Invalid server environment variables:");
        console.error(error);
        throw new Error("Server environment validation failed");
    }
}

/**
 * Validates client-side environment variables
 * Can be called on both client and server
 */
export function validateClientEnv(): ClientEnv {
    const clientEnv = Object.keys(process.env)
        .filter(key => key.startsWith("NEXT_PUBLIC_"))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {} as Record<string, string | undefined>
        );

    try {
        return clientSchema.parse(clientEnv);
    } catch (error) {
        console.error("❌ Invalid client environment variables:");
        console.error(error);
        throw new Error("Client environment validation failed");
    }
}

/**
 * Get validated server environment variables
 * Memoized for performance
 */
let _serverEnv: ServerEnv | null = null;
export function getServerEnv(): ServerEnv {
    if (_serverEnv === null) {
        _serverEnv = validateServerEnv();
    }
    return _serverEnv;
}

/**
 * Get validated client environment variables
 * Memoized for performance
 */
let _clientEnv: ClientEnv | null = null;
export function getClientEnv(): ClientEnv {
    if (_clientEnv === null) {
        _clientEnv = validateClientEnv();
    }
    return _clientEnv;
}

/**
 * Utility to check if we're in a specific environment
 */
export function isProduction(): boolean {
    return process.env.NODE_ENV === "production";
}

export function isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
}

export function isStaging(): boolean {
    return process.env.NODE_ENV === "test";
}

/**
 * Get environment-specific configuration
 */
export function getEnvironmentConfig() {
    const env = process.env.NODE_ENV || "development";

    return {
        environment: env,
        isProduction: isProduction(),
        isDevelopment: isDevelopment(),
        isStaging: isStaging(),
        logLevel: isProduction() ? "error" : "debug",
        enableDebugLogs: !isProduction(),
    };
}
