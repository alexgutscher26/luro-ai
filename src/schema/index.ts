import { SignInSchema, type SignInSchemaType } from "./signin-schema";
import { SignUpSchema, type SignUpSchemaType } from "./signup-schema";
import {
    serverSchema,
    clientSchema,
    envSchema,
    type ServerEnv,
    type ClientEnv,
    type Env,
} from "./env-schema";
import {
    CreateApiKeySchema,
    UpdateApiKeySchema,
    ApiKeyParamsSchema,
    type CreateApiKeySchemaType,
    type UpdateApiKeySchemaType,
    type ApiKeyParamsSchemaType,
} from "./api-key-schema";
import {
    WebVitalsSchema,
    type WebVitalsSchemaType,
    type WebVitalEventType,
} from "./web-vitals-schema";
import {
    LoopsContactSchema,
    type LoopsContactSchemaType,
} from "./loops-contact-schema";
import {
    OnboardingCompletionSchema,
    OnboardingStepSchema,
    type OnboardingCompletionSchemaType,
    type OnboardingStepSchemaType,
} from "./onboarding-schema";

export {
    // Auth schemas
    SignInSchema,
    SignInSchemaType,
    SignUpSchema,
    SignUpSchemaType,
    
    // Environment schemas
    serverSchema,
    clientSchema,
    envSchema,
    type ServerEnv,
    type ClientEnv,
    type Env,
    
    // API Key schemas
    CreateApiKeySchema,
    UpdateApiKeySchema,
    ApiKeyParamsSchema,
    type CreateApiKeySchemaType,
    type UpdateApiKeySchemaType,
    type ApiKeyParamsSchemaType,
    
    // Web Vitals schemas
    WebVitalsSchema,
    type WebVitalsSchemaType,
    type WebVitalEventType,
    
    // Loops Contact schemas
    LoopsContactSchema,
    type LoopsContactSchemaType,
    
    // Onboarding schemas
    OnboardingCompletionSchema,
    OnboardingStepSchema,
    type OnboardingCompletionSchemaType,
    type OnboardingStepSchemaType,
};
