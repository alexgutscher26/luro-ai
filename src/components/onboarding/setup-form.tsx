"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    BuildingIcon,
    TargetIcon,
    BellIcon,
    MailIcon,
    MegaphoneIcon,
} from "lucide-react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/functions";
import { toast } from "sonner";

const INDUSTRIES = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Real Estate",
    "Food & Beverage",
    "Travel & Tourism",
    "Non-profit",
    "Other",
];

const TEAM_SIZES = [
    "Just me",
    "2-5 people",
    "6-20 people",
    "21-50 people",
    "51-200 people",
    "200+ people",
];

const PRIMARY_GOALS = [
    "Increase brand awareness",
    "Drive website traffic",
    "Generate leads",
    "Boost engagement",
    "Improve customer service",
    "Build community",
    "Increase sales",
    "Educate audience",
];

const SetupForm: React.FC = () => {
    const { nextStep, previousStep, updateUserPreferences, userPreferences } =
        useOnboarding();
    const [formData, setFormData] = useState({
        industry: userPreferences.industry || "",
        teamSize: userPreferences.teamSize || "",
        primaryGoals: userPreferences.primaryGoals || [],
        notificationPreferences: {
            email: userPreferences.notificationPreferences?.email ?? true,
            push: userPreferences.notificationPreferences?.push ?? true,
            marketing:
                userPreferences.notificationPreferences?.marketing ?? false,
        },
        theme: userPreferences.theme || "system",
    });

    const [currentSection, setCurrentSection] = useState(0);
    const sections = ["Business Info", "Goals", "Preferences"];

    const handleGoalToggle = (goal: string) => {
        setFormData(prev => ({
            ...prev,
            primaryGoals: prev.primaryGoals.includes(goal)
                ? prev.primaryGoals.filter(g => g !== goal)
                : [...prev.primaryGoals, goal],
        }));
    };

    const handleNotificationChange = (
        type: keyof typeof formData.notificationPreferences,
        value: boolean
    ) => {
        setFormData(prev => ({
            ...prev,
            notificationPreferences: {
                ...prev.notificationPreferences,
                [type]: value,
            },
        }));
    };

    const handleNext = () => {
        if (currentSection < sections.length - 1) {
            setCurrentSection(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(prev => prev - 1);
        } else {
            previousStep();
        }
    };

    const handleSubmit = () => {
        // Validate required fields
        if (
            !formData.industry ||
            !formData.teamSize ||
            formData.primaryGoals.length === 0
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        updateUserPreferences(formData);
        toast.success("Preferences saved successfully!");
        nextStep();
    };

    const renderBusinessInfo = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <BuildingIcon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Tell us about your business
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                    This helps us customize your experience
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label
                        htmlFor="industry"
                        className="text-sm font-medium mb-2 block"
                    >
                        What industry are you in? *
                    </Label>
                    <Select
                        value={formData.industry}
                        onValueChange={value =>
                            setFormData(prev => ({ ...prev, industry: value }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                            {INDUSTRIES.map(industry => (
                                <SelectItem key={industry} value={industry}>
                                    {industry}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label
                        htmlFor="teamSize"
                        className="text-sm font-medium mb-2 block"
                    >
                        How big is your team? *
                    </Label>
                    <Select
                        value={formData.teamSize}
                        onValueChange={value =>
                            setFormData(prev => ({ ...prev, teamSize: value }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                            {TEAM_SIZES.map(size => (
                                <SelectItem key={size} value={size}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </motion.div>
    );

    const renderGoals = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <TargetIcon className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    What are your primary goals?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Select all that apply (minimum 1 required)
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PRIMARY_GOALS.map(goal => {
                    const isSelected = formData.primaryGoals.includes(goal);
                    return (
                        <motion.button
                            key={goal}
                            onClick={() => handleGoalToggle(goal)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "p-4 rounded-lg border-2 text-left transition-all duration-200",
                                isSelected
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className={cn(
                                        "font-medium",
                                        isSelected
                                            ? "text-blue-700 dark:text-blue-300"
                                            : "text-gray-700 dark:text-gray-300"
                                    )}
                                >
                                    {goal}
                                </span>
                                {isSelected && (
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    </div>
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );

    const renderPreferences = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <BellIcon className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Customize your experience
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Set your notification and display preferences
                </p>
            </div>

            <div className="space-y-6">
                {/* Notification Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                            <BellIcon className="w-5 h-5 mr-2" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <MailIcon className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="font-medium">
                                        Email notifications
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Get updates about your account
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={formData.notificationPreferences.email}
                                onCheckedChange={checked =>
                                    handleNotificationChange("email", checked)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <BellIcon className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="font-medium">
                                        Push notifications
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Real-time alerts in your browser
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={formData.notificationPreferences.push}
                                onCheckedChange={checked =>
                                    handleNotificationChange("push", checked)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <MegaphoneIcon className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="font-medium">
                                        Marketing emails
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Tips, updates, and special offers
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={
                                    formData.notificationPreferences.marketing
                                }
                                onCheckedChange={checked =>
                                    handleNotificationChange(
                                        "marketing",
                                        checked
                                    )
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Theme Preference */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Theme Preference
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={formData.theme}
                            onValueChange={(
                                value: "light" | "dark" | "system"
                            ) =>
                                setFormData(prev => ({ ...prev, theme: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );

    const renderCurrentSection = () => {
        switch (currentSection) {
            case 0:
                return renderBusinessInfo();
            case 1:
                return renderGoals();
            case 2:
                return renderPreferences();
            default:
                return renderBusinessInfo();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="w-full max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-8"
                >
                    <Badge variant="secondary" className="mb-4">
                        Step 3 of 4
                    </Badge>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Personalize Your Experience
                    </h2>

                    {/* Section Progress */}
                    <div className="flex justify-center space-x-2 mb-6">
                        {sections.map((section, index) => (
                            <div
                                key={section}
                                className={cn(
                                    "px-3 py-1 rounded-full text-sm font-medium transition-all duration-200",
                                    index === currentSection
                                        ? "bg-blue-500 text-white"
                                        : index < currentSection
                                          ? "bg-green-500 text-white"
                                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                )}
                            >
                                {section}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Form Content */}
                <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                        {renderCurrentSection()}
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                    <Button
                        onClick={handlePrevious}
                        variant="outline"
                        className="px-6 py-3 rounded-xl"
                    >
                        <ChevronLeftIcon className="w-4 h-4 mr-2" />
                        Back
                    </Button>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {currentSection + 1} of {sections.length}
                    </div>

                    <Button
                        onClick={handleNext}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl"
                    >
                        {currentSection === sections.length - 1
                            ? "Complete Setup"
                            : "Continue"}
                        <ChevronRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SetupForm;
