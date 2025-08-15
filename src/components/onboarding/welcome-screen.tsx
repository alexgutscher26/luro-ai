"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    SparklesIcon,
    ArrowRightIcon,
    RocketIcon,
    Zap,
    BarChart3,
    Brain,
} from "lucide-react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { useUser } from "@clerk/nextjs";
import { FADE_IN_VARIANTS } from "@/constants";

const WelcomeScreen: React.FC = () => {
    const { nextStep, skipOnboarding } = useOnboarding();
    const { user } = useUser();

    const handleGetStarted = () => {
        nextStep();
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            <motion.div
                variants={FADE_IN_VARIANTS}
                initial="hidden"
                animate="visible"
                className="relative w-full max-w-4xl mx-auto p-8 py-12"
            >
                <div className="text-center space-y-8">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="space-y-6"
                    >
                        {/* Logo with Glow Effect */}
                        <div className="relative mx-auto w-24 h-24">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-30 animate-pulse" />
                            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                                <RocketIcon className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800 px-4 py-2"
                        >
                            <SparklesIcon className="w-4 h-4 mr-2" />
                            Welcome to the Future of Social Media
                        </Badge>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent leading-tight">
                            Welcome
                            {user?.firstName ? `, ${user.firstName}` : ""}! 👋
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                            Transform your social media strategy with AI-powered
                            insights,
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                {" "}
                                automated workflows
                            </span>
                            , and
                            <span className="text-purple-600 dark:text-purple-400 font-semibold">
                                data-driven decisions
                            </span>
                            .
                        </p>
                    </motion.div>

                    {/* Enhanced Features Grid */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            {
                                icon: Brain,
                                title: "AI-Powered Content",
                                desc: "Generate engaging posts with advanced AI",
                                color: "from-blue-500 to-cyan-500",
                                bgColor: "bg-blue-50 dark:bg-blue-900/20",
                                borderColor:
                                    "border-blue-200 dark:border-blue-800",
                            },
                            {
                                icon: BarChart3,
                                title: "Advanced Analytics",
                                desc: "Deep insights into audience behavior",
                                color: "from-purple-500 to-pink-500",
                                bgColor: "bg-purple-50 dark:bg-purple-900/20",
                                borderColor:
                                    "border-purple-200 dark:border-purple-800",
                            },
                            {
                                icon: Zap,
                                title: "Smart Automation",
                                desc: "Schedule and optimize posting times",
                                color: "from-amber-500 to-orange-500",
                                bgColor: "bg-amber-50 dark:bg-amber-900/20",
                                borderColor:
                                    "border-amber-200 dark:border-amber-800",
                            },
                        ].map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay: 0.8 + index * 0.1,
                                        duration: 0.5,
                                    }}
                                    whileHover={{
                                        y: -5,
                                        transition: { duration: 0.2 },
                                    }}
                                    className={`p-6 rounded-2xl border-2 ${feature.bgColor} ${feature.borderColor} hover:shadow-lg transition-all duration-300 group`}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="space-y-6 pb-8"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                onClick={handleGetStarted}
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                            >
                                Start Your Journey
                                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </Button>
                            <Button
                                onClick={skipOnboarding}
                                variant="ghost"
                                size="lg"
                                className="px-8 py-4 rounded-2xl font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                            >
                                Skip for now
                            </Button>
                        </div>

                        {/* Progress Indicator */}
                        <div className="flex items-center justify-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                            </div>
                            <span>Step 1 of 4 • About 2 minutes</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default WelcomeScreen;
