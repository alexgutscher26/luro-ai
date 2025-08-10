import React from "react";
import { cn } from "@/functions";

/**
 * Props interface for the Wrapper component
 */
interface Props {
    /** Additional CSS classes to apply to the wrapper */
    className?: string;
    /** Child elements to be wrapped */
    children: React.ReactNode;
}

/**
 * Layout Wrapper Component
 *
 * Provides consistent max-width container with responsive padding
 * for page content. Ensures proper content alignment and spacing
 * across different screen sizes.
 *
 * @param {React.ReactNode} children - Content to be wrapped
 * @param {string} [className] - Additional CSS classes for customization
 *
 * @returns {JSX.Element} Wrapped content with responsive container styling
 *
 * @example
 * // Basic usage
 * <Wrapper>
 *   <h1>Page Title</h1>
 *   <p>Page content</p>
 * </Wrapper>
 *
 * // With custom styling
 * <Wrapper className="bg-gray-50 min-h-screen">
 *   <main>Main content</main>
 * </Wrapper>
 *
 * @since 1.0.0
 */
const Wrapper = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                "size-full mx-auto max-w-6xl px-4 md:px-12",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Wrapper;
