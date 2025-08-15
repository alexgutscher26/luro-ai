"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircleIcon,
    SparklesIcon,
    ArrowRightIcon,
    RocketIcon,
    BarChart3Icon,
    CalendarIcon,
    UsersIcon,
} from "lucide-react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useUser } from '@clerk/nextjs';

const NEXT_STEPS = [
    {
        icon: RocketIcon,
        title: "Create Your First Post",
        description: "Use our AI-powered content creator to make your first post",
        action: "Create Post",
        href: "/app/"
    },
    {
        icon: BarChart3Icon,
        title: "Explore Analytics",
        description: "See how your content performs with detailed insights",
        action: "View Analytics",
        href: "/app/analytics"
    },
    {
        icon: CalendarIcon,
        title: "Schedule Content",
        description: "Plan your content calendar for the week ahead",
        action: "Open Calendar",
        href: "/app/calendar"
    },
    {
        icon: UsersIcon,
        title: "Invite Your Team",
        description: "Collaborate with team members on your social media strategy",
        action: "Invite Team",
        href: "/app/team"
    }
];

const CompletionScreen: React.FC = () => {
    const { completeOnboarding, userPreferences } = useOnboarding();
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [showConfetti, setShowConfetti] = useState(false);
    
    // Add this useEffect to check user state
    useEffect(() => {
        console.log('User state:', { user: !!user, isLoaded, userId: user?.id });
    }, [user, isLoaded]);
    
    useEffect(() => {
        // Trigger confetti animation
        const timer = setTimeout(() => {
            setShowConfetti(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 500);
        
        return () => clearTimeout(timer);
    }, []);
    
    const handleGetStarted = () => {
        completeOnboarding();
        toast.success("Welcome to Luro AI! 🎉");
        router.push("/app");
    };
    
    const handleQuickAction = (href: string) => {
        completeOnboarding();
        router.push(href);
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl mx-auto"
            >
                <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-12 text-center">
                        {/* Success Animation */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mb-8"
                        >
                            <div className="relative">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                    <CheckCircleIcon className="w-12 h-12 text-white" />
                                </div>
                                {showConfetti && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: 0 }}
                                        animate={{ scale: 1, rotate: 360 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="absolute -top-2 -right-2"
                                    >
                                        <SparklesIcon className="w-8 h-8 text-yellow-500" />
                                    </motion.div>
                                )}
                            </div>
                            
                            <Badge variant="secondary" className="mb-4">
                                <SparklesIcon className="w-3 h-3 mr-1" />
                                Setup Complete!
                            </Badge>
                        </motion.div>
                        
                        {/* Congratulations Message */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mb-12"
                        >
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                🎉 You're All Set!
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                Welcome to Luro AI! Your personalized social media management experience is ready.
                            </p>
                            
                            {/* Personalized Summary */}
                            {userPreferences.industry && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                                    <p className="text-blue-800 dark:text-blue-200">
                                        We've customized your dashboard for the <strong>{userPreferences.industry}</strong> industry
                                        {userPreferences.teamSize && (
                                            <> with a team size of <strong>{userPreferences.teamSize}</strong></>
                                        )}.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                        
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mb-12"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                What would you like to do first?
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {NEXT_STEPS.map((step, index) => (
                                    <motion.button
                                        key={step.title}
                                        onClick={() => handleQuickAction(step.href)}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-left group"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                <step.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                    {step.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                                    {step.description}
                                                </p>
                                                <div className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center">
                                                    {step.action}
                                                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                        
                        {/* Main CTA */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            <Button
                                onClick={handleGetStarted}
                                size="lg"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                Go to Dashboard
                                <ArrowRightIcon className="w-5 h-5 ml-2" />
                            </Button>
                            
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                You can always access these features from your dashboard
                            </p>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default CompletionScreen;