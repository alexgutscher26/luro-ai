import { z } from "zod";

// Server-side environment variables
const serverSchema = z.object({
  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  
  // Authentication (Clerk)
  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
  
  // Email Automation (Loops.so)
  LOOPS_API_KEY: z.string().min(1, "LOOPS_API_KEY is required"),
  
  // Security
  CSRF_SECRET: z.string().min(32, "CSRF_SECRET must be at least 32 characters").optional(),
  
  // Redis (Upstash) - Optional for rate limiting
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  
  // Environment
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
  
  // Migration flags
  MIGRATION_APPROVED: z.string().optional(),
  FORCE_SEED: z.string().optional(),
  CLEAN_SEED: z.string().optional(),
});

// Client-side environment variables (NEXT_PUBLIC_*)
const clientSchema = z.object({
  // App Configuration
  NEXT_PUBLIC_APP_NAME: z.string().min(1, "NEXT_PUBLIC_APP_NAME is required"),
  NEXT_PUBLIC_APP_DOMAIN: z.string().min(1, "NEXT_PUBLIC_APP_DOMAIN is required"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_AUTHOR_NAME: z.string().optional(),
  
  // Authentication (Clerk)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required"),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default("/signin"),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default("/signup"),
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_URL: z.string().default("/"),
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_URL: z.string().default("/"),
  
  // Email Automation (Loops.so)
  NEXT_PUBLIC_LOOPS_FORM_ID: z.string().min(1, "NEXT_PUBLIC_LOOPS_FORM_ID is required"),
  
  // SEO Verification (Optional)
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
  NEXT_PUBLIC_YANDEX_VERIFICATION: z.string().optional(),
  NEXT_PUBLIC_YAHOO_VERIFICATION: z.string().optional(),
});

// Combined schema for type inference
const envSchema = serverSchema.merge(clientSchema);

// Type exports
export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;
export type Env = z.infer<typeof envSchema>;

// Schema exports
export { serverSchema, clientSchema, envSchema };