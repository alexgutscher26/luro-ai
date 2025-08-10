type CORSConfig = {
    development: {
        origin: boolean;
        credentials: boolean;
    };
    production: {
        origin: string[];
        credentials: boolean;
    };
};

export const corsConfig: CORSConfig = {
    development: {
        origin: true, // Allow all origins in development
        credentials: true,
    },
    production: {
        origin: [
            "https://yourdomain.com",
            "https://www.yourdomain.com",
            "https://app.yourdomain.com",
        ],
        credentials: true,
    },
};

export function getCORSConfig() {
    const env = process.env.NODE_ENV as keyof CORSConfig;
    return corsConfig[env] || corsConfig.development;
}