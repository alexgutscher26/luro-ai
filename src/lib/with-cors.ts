import { NextRequest, NextResponse } from "next/server";

type CORSOptions = {
    origin?: string | string[] | boolean;
    methods?: string[];
    allowedHeaders?: string[];
    exposedHeaders?: string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
};

const defaultOptions: CORSOptions = {
    origin: process.env.NODE_ENV === "production" 
        ? ["https://yourdomain.com", "https://www.yourdomain.com"] 
        : true, // Allow all origins in development
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-CSRF-Token",
        "X-Requested-With",
        "Accept",
        "Origin",
    ],
    exposedHeaders: ["X-CSRF-Token"],
    credentials: true,
    maxAge: 86400, // 24 hours
    optionsSuccessStatus: 200,
};

function isOriginAllowed(origin: string | null, allowedOrigin: string | string[] | boolean): boolean {
    if (allowedOrigin === true) return true;
    if (allowedOrigin === false) return false;
    if (!origin) return false;
    
    if (typeof allowedOrigin === "string") {
        return origin === allowedOrigin;
    }
    
    if (Array.isArray(allowedOrigin)) {
        return allowedOrigin.includes(origin);
    }
    
    return false;
}

export function withCORS(options: CORSOptions = {}) {
    const corsOptions = { ...defaultOptions, ...options };
    
    return function corsMiddleware(
        handler: (request: NextRequest) => Promise<NextResponse>
    ) {
        return async function corsHandler(request: NextRequest) {
            const origin = request.headers.get("origin");
            const method = request.method;
            
            // Handle preflight requests
            if (method === "OPTIONS") {
                const response = new NextResponse(null, {
                    status: corsOptions.optionsSuccessStatus ?? 200,
                });
                
                // Set CORS headers for preflight
                if (corsOptions.origin && isOriginAllowed(origin, corsOptions.origin)) {
                    response.headers.set("Access-Control-Allow-Origin", origin || "*");
                }
                
                if (corsOptions.credentials) {
                    response.headers.set("Access-Control-Allow-Credentials", "true");
                }
                
                if (corsOptions.methods) {
                    response.headers.set("Access-Control-Allow-Methods", corsOptions.methods.join(", "));
                }
                
                if (corsOptions.allowedHeaders) {
                    response.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(", "));
                }
                
                if (corsOptions.maxAge) {
                    response.headers.set("Access-Control-Max-Age", corsOptions.maxAge.toString());
                }
                
                return response;
            }
            
            // Handle actual requests
            const response = await handler(request);
            
            // Set CORS headers for actual requests
            if (corsOptions.origin && isOriginAllowed(origin, corsOptions.origin)) {
                response.headers.set("Access-Control-Allow-Origin", origin || "*");
            }
            
            if (corsOptions.credentials) {
                response.headers.set("Access-Control-Allow-Credentials", "true");
            }
            
            if (corsOptions.exposedHeaders) {
                response.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(", "));
            }
            
            return response;
        };
    };
}