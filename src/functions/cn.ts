import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges CSS class names using clsx and tailwind-merge
 *
 * This utility function combines multiple class name inputs and resolves
 * Tailwind CSS conflicts by merging conflicting classes intelligently.
 * Essential for conditional styling in React components.
 *
 * @param {...ClassValue[]} inputs - Variable number of class name inputs
 *   Can include strings, objects, arrays, or conditional expressions
 *
 * @returns {string} Merged and deduplicated class name string
 *
 * @example
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500')
 * // Returns: "px-4 py-2 bg-blue-500"
 *
 * // Conditional classes
 * cn('base-class', {
 *   'active-class': isActive,
 *   'disabled-class': isDisabled
 * })
 *
 * // Tailwind conflict resolution
 * cn('px-4 px-6', 'py-2 py-4')
 * // Returns: "px-6 py-4" (later classes override earlier ones)
 *
 * @since 1.0.0
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
