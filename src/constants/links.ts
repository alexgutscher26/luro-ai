import {
    ClockIcon,
    MessageSquare,
    BarChart2,
    FileTextIcon,
    UserPlusIcon,
    CreditCardIcon,
    SettingsIcon,
    LogOut,
    Headphones,
    ChartPieIcon,
    LucideIcon,
    MessagesSquareIcon,
    NewspaperIcon,
    MegaphoneIcon,
    LineChartIcon,
    MessageSquareTextIcon,
    UsersIcon,
    KeyIcon, // Add this import
} from "lucide-react";

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
};

export const SIDEBAR_LINKS: Link[] = [
    {
        href: "/app",
        label: "Dashboard",
        icon: ChartPieIcon,
    },
    {
        href: "/app/campaigns",
        label: "Campaigns",
        icon: MegaphoneIcon,
    },
    {
        href: "/app/analytics",
        label: "Analytics",
        icon: LineChartIcon,
    },
    {
        href: "/app/posts",
        label: "Posts",
        icon: MessageSquareTextIcon,
    },
    {
        href: "/app/engagement",
        label: "Engagement",
        icon: UsersIcon,
    },
    {
        href: "/app/api-keys",
        label: "API Keys",
        icon: KeyIcon,
    },
    {
        href: "/app/billing",
        label: "Billing",
        icon: CreditCardIcon,
    },
    {
        href: "/app/settings",
        label: "Settings",
        icon: SettingsIcon,
    },
];

export const FOOTER_LINKS = [
    {
        title: "Product",
        links: [
            { name: "Home", href: "/" },
            { name: "Features", href: "/" },
            { name: "Pricing", href: "/" },
            { name: "Contact", href: "/" },
            { name: "Download", href: "/" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Blog", href: "/blog" },
            { name: "Help Center", href: "/help-center" },
            { name: "Community", href: "/community" },
            { name: "Guides", href: "/guides" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Cookies", href: "/cookies" },
        ],
    },
    {
        title: "Developers",
        links: [
            { name: "API Docs", href: "/api-docs" },
            { name: "SDKs", href: "/sdks" },
            { name: "Tools", href: "/tools" },
            { name: "Open Source", href: "/open-source" },
            { name: "Changelog", href: "/changelog" },
        ],
    },
];
