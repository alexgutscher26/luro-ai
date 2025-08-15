"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    BarChart3Icon,
    BrainIcon,
    CalendarIcon,
    UsersIcon,
    LucideIcon,
} from "lucide-react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/functions";

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    benefits: string[];
    image?: string;
    color: string;
}

const FEATURES: Feature[] = [
    {
        id: "ai-content",
        title: "AI-Powered Content Creation",
        description:
            "Generate engaging posts, captions, and hashtags with our advanced AI that understands your brand voice.",
        icon: BrainIcon,
        benefits: [
            "Generate posts in seconds",
            "Maintain consistent brand voice",
            "Optimize for each platform",
            "Smart hashtag suggestions",
        ],
        color: "from-purple-500 to-pink-500",
    },
    {
        id: "analytics",
        title: "Advanced Analytics & Insights",
        description:
            "Track performance, understand your audience, and discover trending content with comprehensive analytics.",
        icon: BarChart3Icon,
        benefits: [
            "Real-time performance tracking",
            "Audience insights & demographics",
            "Competitor analysis",
            "ROI measurement",
        ],
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: "scheduling",
        title: "Smart Scheduling & Automation",
        description:
            "Schedule posts across all platforms and automate your social media workflow for maximum efficiency.",
        icon: CalendarIcon,
        benefits: [
            "Multi-platform scheduling",
            "Optimal timing suggestions",
            "Bulk upload & editing",
            "Auto-posting workflows",
        ],
        color: "from-green-500 to-emerald-500",
    },
    {
        id: "collaboration",
        title: "Team Collaboration",
        description:
            "Work seamlessly with your team, manage approvals, and maintain brand consistency across all content.",
        icon: UsersIcon,
        benefits: [
            "Team member management",
            "Content approval workflows",
            "Role-based permissions",
            "Collaborative content calendar",
        ],
        color: "from-orange-500 to-red-500",
    },
];

const FeatureCarousel: React.FC = () => {
    const { nextStep, previousStep } = useOnboarding();
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
    const currentFeature = FEATURES[currentFeatureIndex];

    // Early return if no current feature (safety check)
    if (!currentFeature) {
        return null;
    }

    const nextFeature = () => {
        setCurrentFeatureIndex(prev => (prev + 1) % FEATURES.length);
    };

    const previousFeature = () => {
        setCurrentFeatureIndex(
            prev => (prev - 1 + FEATURES.length) % FEATURES.length
        );
    };

    const goToFeature = (index: number) => {
        setCurrentFeatureIndex(index);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="w-full max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-12"
                >
                    <Badge variant="secondary" className="mb-4">
                        Step 2 of 4
                    </Badge>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Discover What Makes Luro AI Special
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Explore the powerful features that will transform your
                        social media strategy
                    </p>
                </motion.div>

                {/* Feature Display */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentFeatureIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-1 lg:grid-cols-2">
                                        {/* Content */}
                                        <div className="p-12">
                                            <div
                                                className={cn(
                                                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6",
                                                    currentFeature.color
                                                )}
                                            >
                                                <currentFeature.icon className="w-8 h-8 text-white" />
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                                {currentFeature.title}
                                            </h3>

                                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                                {currentFeature.description}
                                            </p>

                                            <div className="space-y-3">
                                                {currentFeature.benefits.map(
                                                    (benefit, index) => (
                                                        <motion.div
                                                            key={benefit}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    index * 0.1,
                                                            }}
                                                            className="flex items-center space-x-3"
                                                        >
                                                            <div
                                                                className={cn(
                                                                    "w-2 h-2 rounded-full bg-gradient-to-r",
                                                                    currentFeature.color
                                                                )}
                                                            />
                                                            <span className="text-gray-700 dark:text-gray-300">
                                                                {benefit}
                                                            </span>
                                                        </motion.div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Visual */}
                                        <div
                                            className={cn(
                                                "bg-gradient-to-br p-12 flex items-center justify-center",
                                                currentFeature.color
                                            )}
                                        >
                                            <div className="w-full h-64 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                                                <currentFeature.icon className="w-24 h-24 text-white/80" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <Button
                        onClick={previousFeature}
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </Button>

                    <Button
                        onClick={nextFeature}
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </Button>
                </div>

                {/* Feature Indicators */}
                <div className="flex justify-center space-x-2 mt-8">
                    {FEATURES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToFeature(index)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-all duration-200",
                                index === currentFeatureIndex
                                    ? "bg-blue-500 scale-125"
                                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                            )}
                        />
                    ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-12">
                    <Button
                        onClick={previousStep}
                        variant="outline"
                        className="px-6 py-3 rounded-xl"
                    >
                        <ChevronLeftIcon className="w-4 h-4 mr-2" />
                        Back
                    </Button>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {currentFeatureIndex + 1} of {FEATURES.length} features
                    </div>

                    <Button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl"
                    >
                        Continue
                        <ChevronRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FeatureCarousel;
