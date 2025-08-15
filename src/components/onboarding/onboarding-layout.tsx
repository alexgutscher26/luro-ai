"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from "@/hooks/use-onboarding";
import WelcomeScreen from "./welcome-screen";
import FeatureCarousel from "./feature-carousel";
import SetupForm from "./setup-form";
import CompletionScreen from "./completion-screen";
import ProgressTracker from "./progress-tracker";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface OnboardingLayoutProps {
    onClose?: () => void;
    allowSkip?: boolean;
}

export function OnboardingLayout({
    onClose,
    allowSkip = true,
}: OnboardingLayoutProps) {
    const { currentStepIndex, steps, skipOnboarding } = useOnboarding();
    const totalSteps = steps.length;

    const handleSkip = () => {
        skipOnboarding();
        onClose?.();
    };

    const renderCurrentStep = () => {
        switch (currentStepIndex) {
            case 0:
                return <WelcomeScreen />;
            case 1:
                return <FeatureCarousel />;
            case 2:
                return <SetupForm />;
            case 3:
                return <CompletionScreen />;
            default:
                return <WelcomeScreen />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full max-w-6xl max-h-[95vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Fixed Header */}
                    <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-blue-50/30 dark:from-slate-800 dark:to-slate-800">
                        <div className="flex-1">
                            <ProgressTracker size="sm" showLabels={false} />
                        </div>
                        <div className="flex items-center gap-3">
                            {allowSkip && currentStepIndex < totalSteps && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSkip}
                                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-4 py-2 rounded-xl transition-colors duration-200"
                                >
                                    Skip for now
                                </Button>
                            )}
                            {onClose && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onClose}
                                    className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Scrollable Main Content */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStepIndex}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                    className="w-full min-h-[600px]"
                                >
                                    {renderCurrentStep()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
