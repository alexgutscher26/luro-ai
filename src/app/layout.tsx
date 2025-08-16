import "@/styles/globals.css";
import { cn, generateMetadata } from "@/functions";
import { inter, satoshi } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components";
import AccessibilityChecker from "@/components/global/accessibility-checker";
import { PerformanceMonitor } from "@/components/global/performance-monitor";
import { UmamiAnalytics, PrivacyNotice } from "@/components";
import { getClientEnv } from "@/lib/env";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const env = getClientEnv();
    const isAnalyticsEnabled = !!(env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && env.NEXT_PUBLIC_UMAMI_URL);

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased font-default overflow-x-hidden !scrollbar-hide",
                    inter.variable,
                    satoshi.variable
                )}
            >
                <Toaster richColors theme="dark" position="top-right" />
                <Providers>{children}</Providers>
                {process.env.NODE_ENV === "development" && (
                    <AccessibilityChecker />
                )}
                <PerformanceMonitor />
                
                {/* Analytics Integration */}
                {isAnalyticsEnabled && (
                    <>
                        <UmamiAnalytics 
                            honorDNT={true}
                            enabled={process.env.NODE_ENV === 'production'}
                        />
                        <PrivacyNotice 
                            enabled={process.env.NODE_ENV === 'production'}
                            privacyPolicyUrl="/privacy"
                        />
                    </>
                )}
                
                {/* Vercel Analytics */}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
