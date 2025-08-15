"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/functions";

interface ProgressTrackerProps {
    className?: string;
    showLabels?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
    className,
    showLabels = true,
    size = 'md'
}) => {
    const { steps, currentStepIndex } = useOnboarding();
    
    const sizeClasses = {
        sm: {
            container: 'space-y-2',
            step: 'w-8 h-8',
            line: 'h-1',
            text: 'text-xs'
        },
        md: {
            container: 'space-y-3',
            step: 'w-12 h-12',
            line: 'h-1.5',
            text: 'text-sm'
        },
        lg: {
            container: 'space-y-4',
            step: 'w-14 h-14',
            line: 'h-2',
            text: 'text-base'
        }
    };
    
    const classes = sizeClasses[size];
    
    return (
        <div className={cn("w-full", className)}>
            <div className="flex items-center justify-between relative">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const isUpcoming = index > currentStepIndex;
                    
                    return (
                        <div key={step.id} className="flex flex-col items-center relative flex-1">
                            {/* Enhanced Step Circle */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className={cn(
                                    "rounded-full flex items-center justify-center font-bold transition-all duration-300 relative z-10 border-2",
                                    classes.step,
                                    isCompleted && "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400 shadow-lg shadow-green-500/25",
                                    isCurrent && "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400 ring-4 ring-blue-200 dark:ring-blue-800 shadow-lg shadow-blue-500/25",
                                    isUpcoming && "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-slate-300 dark:border-slate-600"
                                )}
                            >
                                {isCompleted ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <CheckIcon className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <span className={size === 'sm' ? 'text-sm' : 'text-lg'}>{index + 1}</span>
                                )}
                            </motion.div>
                            
                            {/* Enhanced Step Label */}
                            {showLabels && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                    className={cn(
                                        "text-center mt-3 max-w-24",
                                        classes.text,
                                        isCurrent && "text-blue-600 dark:text-blue-400 font-semibold",
                                        isCompleted && "text-green-600 dark:text-green-400 font-medium",
                                        isUpcoming && "text-slate-500 dark:text-slate-400"
                                    )}
                                >
                                    <div className="font-semibold">{step.title}</div>
                                    {size !== 'sm' && (
                                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-tight">
                                            {step.description}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                            
                            {/* Enhanced Connection Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute top-6 left-1/2 w-full h-1 flex items-center z-0">
                                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: isCompleted ? 1 : 0 }}
                                            transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-green-500 to-blue-500 origin-left rounded-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressTracker;