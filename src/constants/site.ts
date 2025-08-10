import { getClientEnv } from "@/lib/env";

const clientEnv = getClientEnv();

export const APP_NAME = clientEnv.NEXT_PUBLIC_APP_NAME;
export const APP_DOMAIN = `https://${clientEnv.NEXT_PUBLIC_APP_DOMAIN}`;
export const ALLOWED_ORIGINS = [
    clientEnv.NEXT_PUBLIC_APP_DOMAIN,
    `www.${clientEnv.NEXT_PUBLIC_APP_DOMAIN}`,
];

export const APP_HOSTNAMES = new Set([
    process.env.NEXT_PUBLIC_APP_DOMAIN,
    `www.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
]);
