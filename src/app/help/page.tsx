"use client";

import React, { useState } from "react";
import {
    HelpCircleIcon,
    BookOpenIcon,
    MessageCircleIcon,
    MailIcon,
    PhoneIcon,
    SearchIcon,
    ExternalLinkIcon,
    PlayCircleIcon,
    FileTextIcon,
    UsersIcon,
    SettingsIcon,
    BarChart3Icon,
    CreditCardIcon,
    KeyIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

const HELP_CATEGORIES = [
    {
        title: "Getting Started",
        icon: PlayCircleIcon,
        description: "Learn the basics and set up your account",
        articles: 12,
        color: "bg-blue-500",
    },
    {
        title: "Campaign Management",
        icon: BarChart3Icon,
        description: "Create and manage your marketing campaigns",
        articles: 18,
        color: "bg-green-500",
    },
    {
        title: "Analytics & Reporting",
        icon: BarChart3Icon,
        description: "Understand your data and performance metrics",
        articles: 15,
        color: "bg-purple-500",
    },
    {
        title: "Account Settings",
        icon: SettingsIcon,
        description: "Manage your profile and preferences",
        articles: 8,
        color: "bg-orange-500",
    },
    {
        title: "Billing & Subscriptions",
        icon: CreditCardIcon,
        description: "Payment, billing, and subscription management",
        articles: 10,
        color: "bg-red-500",
    },
    {
        title: "API & Integrations",
        icon: KeyIcon,
        description: "Connect with third-party tools and services",
        articles: 6,
        color: "bg-indigo-500",
    },
];

const FAQ_ITEMS = [
    {
        question: "How do I create my first campaign?",
        answer: "To create your first campaign, navigate to the Campaigns section from your dashboard. Click 'Create Campaign' and follow the step-by-step wizard to set up your campaign goals, target audience, and content.",
    },
    {
        question: "What analytics are available?",
        answer: "Our analytics dashboard provides comprehensive insights including engagement rates, reach, impressions, click-through rates, conversion tracking, and audience demographics. You can view data in real-time or generate custom reports.",
    },
    {
        question: "How do I upgrade my plan?",
        answer: "You can upgrade your plan at any time by clicking the 'Upgrade' button in the top navigation or visiting the Billing section in your account settings. Changes take effect immediately.",
    },
    {
        question: "Can I integrate with other platforms?",
        answer: "Yes! We support integrations with major social media platforms, email marketing tools, CRM systems, and analytics platforms. Visit the API Keys section to set up your integrations.",
    },
    {
        question: "How do I contact support?",
        answer: "You can reach our support team through the contact form below, email us at support@luro-ai.com, or use the live chat feature available in your dashboard during business hours.",
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We use enterprise-grade security measures including SSL encryption, regular security audits, and comply with GDPR and other data protection regulations. Your data is never shared with third parties.",
    },
];

const CONTACT_OPTIONS = [
    {
        title: "Email Support",
        description: "Get help via email within 24 hours",
        icon: MailIcon,
        contact: "support@luro-ai.com",
        available: "24/7",
    },
    {
        title: "Live Chat",
        description: "Chat with our support team in real-time",
        icon: MessageCircleIcon,
        contact: "Available in dashboard",
        available: "Mon-Fri 9AM-6PM EST",
    },
    {
        title: "Phone Support",
        description: "Speak directly with our experts",
        icon: PhoneIcon,
        contact: "+1 (555) 123-4567",
        available: "Mon-Fri 9AM-6PM EST",
    },
];

/**
 * Renders a help page with navigation, search, and various sections for categories, FAQs, contact options, and additional resources.
 */
const HelpPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex flex-col min-h-screen w-full">
            <DashboardNavbar />
            <main className="flex flex-col lg:flex-row flex-1 size-full">
                <DashboardSidebar />
                <div className="w-full pt-14 lg:ml-72">
                    <div className="p-4 w-full">
                        <div className="flex flex-col w-full space-y-8">
                            {/* Header */}
                            <div className="mt-4">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                                        <HelpCircleIcon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-foreground">
                                            Help Center
                                        </h1>
                                        <p className="text-muted-foreground">
                                            Find answers to your questions and
                                            learn how to make the most of Luro
                                            AI
                                        </p>
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="max-w-md">
                                    <div className="relative">
                                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                        <Input
                                            type="text"
                                            placeholder="Search for help articles..."
                                            value={searchQuery}
                                            onChange={e =>
                                                setSearchQuery(e.target.value)
                                            }
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Help Categories */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {HELP_CATEGORIES.map((category, index) => {
                                    const IconComponent = category.icon;
                                    return (
                                        <Card
                                            key={index}
                                            className="hover:shadow-md transition-shadow cursor-pointer"
                                        >
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}
                                                    >
                                                        <IconComponent className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-base">
                                                            {category.title}
                                                        </CardTitle>
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-xs mt-1"
                                                        >
                                                            {category.articles}{" "}
                                                            articles
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {category.description}
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700"
                                                >
                                                    Browse articles
                                                    <ExternalLinkIcon className="w-3 h-3 ml-1" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            <Separator />

                            {/* FAQ Section */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">
                                        Frequently Asked Questions
                                    </h2>
                                    <p className="text-muted-foreground mt-1">
                                        Quick answers to common questions
                                    </p>
                                </div>

                                <div className="max-w-4xl">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="space-y-3"
                                    >
                                        {FAQ_ITEMS.map((faq, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={`item-${index}`}
                                                className="border rounded-lg px-4"
                                            >
                                                <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground pb-4">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>

                            <Separator />

                            {/* Contact Support */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">
                                        Still Need Help?
                                    </h2>
                                    <p className="text-muted-foreground mt-1">
                                        Our support team is here to assist you
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {CONTACT_OPTIONS.map(option => {
                                        const IconComponent = option.icon;
                                        return (
                                            <Card
                                                key={option.title}
                                                className="text-center hover:shadow-md transition-shadow"
                                            >
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto">
                                                        <IconComponent className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <CardTitle className="text-base">
                                                        {option.title}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-3 pt-0">
                                                    <p className="text-sm text-muted-foreground">
                                                        {option.description}
                                                    </p>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-foreground">
                                                            {option.contact}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {option.available}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="w-full mt-3"
                                                    >
                                                        Contact Support
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Additional Resources */}
                            <Card className="bg-muted/50">
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <h3 className="text-xl font-bold text-foreground">
                                            Additional Resources
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Explore more ways to get the most
                                            out of Luro AI
                                        </p>

                                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center space-x-2"
                                            >
                                                <BookOpenIcon className="w-4 h-4" />
                                                <span>Documentation</span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center space-x-2"
                                            >
                                                <PlayCircleIcon className="w-4 h-4" />
                                                <span>Video Tutorials</span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center space-x-2"
                                            >
                                                <UsersIcon className="w-4 h-4" />
                                                <span>Community Forum</span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center space-x-2"
                                            >
                                                <FileTextIcon className="w-4 h-4" />
                                                <span>Release Notes</span>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HelpPage;
