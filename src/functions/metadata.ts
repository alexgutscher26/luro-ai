import { Metadata } from "next";

/**
 * Configuration interface for metadata generation
 * 
 * Defines all possible options for generating Next.js metadata
 * including SEO, social sharing, and internationalization settings.
 * 
 * @interface MetadataProps
 */
interface MetadataProps {
    /** Page title for browser tab and SEO */
    title?: string;
    
    /** Meta description for search engines and social sharing */
    description?: string;
    
    /** URL or path to social sharing image (null to disable) */
    image?: string | null;
    
    /** Favicon and app icon configuration */
    icons?: Metadata["icons"];
    
    /** Prevent search engine indexing when true */
    noIndex?: boolean;
    
    /** Array of SEO keywords */
    keywords?: string[];
    
    /** Content author name */
    author?: string;
    
    /** Twitter handle for Twitter Card attribution */
    twitterHandle?: string;
    
    /** OpenGraph content type */
    type?: "website" | "article" | "profile";
    
    /** Content locale (e.g., 'en_US', 'es_ES') */
    locale?: string;
    
    /** Alternate language versions mapping */
    alternates?: Record<string, string>;
    
    /** Article publication date (ISO 8601 string) */
    publishedTime?: string;
    
    /** Article last modified date (ISO 8601 string) */
    modifiedTime?: string;
}

/**
 * Generates Next.js metadata object for SEO optimization
 * 
 * Creates comprehensive metadata including OpenGraph, Twitter cards,
 * and standard meta tags for improved search engine visibility
 * and social media sharing.
 * 
 * @param {MetadataProps} props - Configuration object for metadata generation
 * @param {string} [props.title] - Page title (defaults to app name)
 * @param {string} [props.description] - Page description for SEO
 * @param {string|null} [props.image] - Social sharing image URL
 * @param {Metadata["icons"]} [props.icons] - Favicon configuration
 * @param {boolean} [props.noIndex=false] - Whether to prevent search indexing
 * @param {string[]} [props.keywords] - SEO keywords array
 * @param {string} [props.author] - Content author name
 * @param {string} [props.twitterHandle] - Twitter handle for cards
 * @param {"website"|"article"|"profile"} [props.type="website"] - OpenGraph type
 * @param {string} [props.locale="en_US"] - Content locale
 * @param {Record<string, string>} [props.alternates={}] - Alternate language URLs
 * @param {string} [props.publishedTime] - Article publish date (ISO string)
 * @param {string} [props.modifiedTime] - Article modified date (ISO string)
 * 
 * @returns {Metadata} Complete Next.js metadata object
 * 
 * @example
 * // Basic usage
 * const metadata = generateMetadata({
 *   title: "About Us",
 *   description: "Learn more about our company"
 * });
 * 
 * // Article with full metadata
 * const articleMetadata = generateMetadata({
 *   title: "How to Use AI for Content Creation",
 *   description: "Complete guide to AI-powered content",
 *   type: "article",
 *   publishedTime: "2024-01-15T10:00:00Z",
 *   keywords: ["AI", "content creation", "automation"]
 * });
 * 
 * @since 1.0.0
 */
export const generateMetadata = ({
  title = `${process.env.NEXT_PUBLIC_APP_NAME} - Smart Social Media Marketing Platform`,
  description = "Streamline your social media management with AI-powered analytics, scheduling, and content optimization. Get real-time insights, automate posts, and boost engagement across all platforms",
    image = "/thumbnail.png",
    icons = [
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/icons/favicon-32x32.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/icons/favicon-16x16.png",
        },
    ],
    noIndex = false,
    keywords = [
        "AI content creation",
        "content automation",
        "AI writing assistant",
        "content generation",
        "artificial intelligence",
        "content marketing",
    ],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
    twitterHandle = "@yourtwitterhandle",
    type = "website",
    locale = "en_US",
    alternates = {},
    publishedTime,
    modifiedTime,
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(
        process.env.NEXT_PUBLIC_APP_URL || "https://luro-ai.vercel.app"
    );
    const imageUrl = image ? new URL(image, metadataBase).toString() : null;

    return {
        metadataBase,
        title: {
            template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
            default: title,
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: process.env.NEXT_PUBLIC_APP_NAME,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,

        // OpenGraph
        openGraph: {
            type,
            siteName: process.env.NEXT_PUBLIC_APP_NAME,
            title,
            description,
            ...(imageUrl && {
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
            }),
            locale,
            alternateLocale: Object.keys(alternates),
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },

        // Twitter
        twitter: {
            card: imageUrl ? "summary_large_image" : "summary",
            site: twitterHandle,
            creator: twitterHandle,
            title,
            description,
            ...(imageUrl && { images: [imageUrl] }),
        },

        // Robots
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },

        // Verification
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
            yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
            yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
        },
    };
};
