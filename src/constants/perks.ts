import {
    ZapIcon,
    ChartSplineIcon,
    LifeBuoyIcon,
    PaletteIcon,
    ShieldCheckIcon,
    WaypointsIcon,
} from "lucide-react";

/**
 * Application perks/features configuration
 *
 * Defines the key features and benefits displayed on marketing pages.
 * Each perk includes an icon, title, and description for consistent
 * presentation across the application.
 *
 * @constant {Array<PerkItem>} PERKS
 *
 * @example
 * // Render perks in a component
 * {PERKS.map((perk, index) => (
 *   <div key={index}>
 *     <perk.icon className="w-6 h-6" />
 *     <h3>{perk.title}</h3>
 *     <p>{perk.description}</p>
 *   </div>
 * ))}
 *
 * @since 1.0.0
 */
export const PERKS = [
    {
        /** Lucide React icon component */
        icon: ZapIcon,
        /** Feature title */
        title: "Fast and Efficient",
        /** Feature description */
        description:
            "Experience quick and seamless content creation with our optimized AI tools.",
    },
    {
        icon: ChartSplineIcon,
        title: "Insightful Analytics",
        description:
            "Gain valuable insights and analytics to enhance your social media strategy.",
    },
    {
        icon: LifeBuoyIcon,
        title: "24/7 Support",
        description:
            "Our team is available around the clock to assist with any issues or questions.",
    },
    {
        icon: PaletteIcon,
        title: "Customizable Solutions",
        description:
            "Tailor the tools and features to fit your unique social media needs.",
    },
    {
        icon: ShieldCheckIcon,
        title: "Secure and Reliable",
        description:
            "Trust our platform to keep your data safe and ensure consistent performance.",
    },
    {
        icon: WaypointsIcon,
        title: "Seamless Integration",
        description:
            "Easily integrate with your existing social media platforms and tools.",
    },
];
