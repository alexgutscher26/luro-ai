import { useEffect, useRef, useCallback } from "react";

interface UseFocusManagementOptions {
    /** Whether to trap focus within the container */
    trapFocus?: boolean;
    /** Whether to restore focus when component unmounts */
    restoreFocus?: boolean;
    /** Whether to auto-focus the first element */
    autoFocus?: boolean;
    /** Custom selector for focusable elements */
    focusableSelector?: string;
    /** Element to focus initially (overrides autoFocus) */
    initialFocusRef?: React.RefObject<HTMLElement>;
    /** Element to return focus to when unmounting */
    returnFocusRef?: React.RefObject<HTMLElement>;
}

/**
 * Custom hook for advanced focus management
 *
 * Provides focus trapping, focus restoration, and auto-focus capabilities
 * for modals, dialogs, and other overlay components.
 *
 * @param options Configuration options for focus management
 * @returns Object with container ref and focus management functions
 *
 * @example
 * // Modal with focus trap
 * const Modal = ({ isOpen, onClose }) => {
 *   const { containerRef, focusFirst, focusLast } = useFocusManagement({
 *     trapFocus: true,
 *     restoreFocus: true,
 *     autoFocus: true
 *   });
 *
 *   if (!isOpen) return null;
 *
 *   return (
 *     <div ref={containerRef} role="dialog" aria-modal="true">
 *       <button onClick={onClose}>Close</button>
 *       <input placeholder="Search..." />
 *       <button>Submit</button>
 *     </div>
 *   );
 * };
 */
export const useFocusManagement = ({
    trapFocus = false,
    restoreFocus = true,
    autoFocus = false,
    focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="button"]:not([disabled])',
    initialFocusRef,
    returnFocusRef,
}: UseFocusManagementOptions = {}) => {
    const containerRef = useRef<HTMLElement>(null);
    const previousActiveElementRef = useRef<HTMLElement | null>(null);

    const getFocusableElements = useCallback((): HTMLElement[] => {
        if (!containerRef.current) return [];
        return Array.from(
            containerRef.current.querySelectorAll(focusableSelector)
        ) as HTMLElement[];
    }, [focusableSelector]);

    const focusFirst = useCallback(() => {
        if (initialFocusRef?.current) {
            initialFocusRef.current.focus();
            return;
        }

        const elements = getFocusableElements();
        if (elements.length > 0) {
            elements[0].focus();
        }
    }, [getFocusableElements, initialFocusRef]);

    const focusLast = useCallback(() => {
        const elements = getFocusableElements();
        if (elements.length > 0) {
            elements[elements.length - 1].focus();
        }
    }, [getFocusableElements]);

    const handleTabKey = useCallback(
        (event: KeyboardEvent) => {
            if (!trapFocus || event.key !== "Tab") return;
            if (!containerRef.current?.contains(event.target as Node)) return;

            const elements = getFocusableElements();
            if (elements.length === 0) return;

            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];
            const activeElement = document.activeElement as HTMLElement;

            if (event.shiftKey) {
                // Shift + Tab: moving backwards
                if (activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab: moving forwards
                if (activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        },
        [trapFocus, getFocusableElements]
    );

    // Store the previously focused element when component mounts
    useEffect(() => {
        if (restoreFocus) {
            previousActiveElementRef.current =
                document.activeElement as HTMLElement;
        }

        if (autoFocus) {
            // Small delay to ensure the component is fully rendered
            const timeoutId = setTimeout(focusFirst, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [autoFocus, focusFirst, restoreFocus]);

    // Set up focus trap
    useEffect(() => {
        if (trapFocus) {
            document.addEventListener("keydown", handleTabKey);
            return () => document.removeEventListener("keydown", handleTabKey);
        }
    }, [trapFocus, handleTabKey]);

    // Restore focus when component unmounts
    useEffect(() => {
        return () => {
            if (restoreFocus) {
                const elementToFocus =
                    returnFocusRef?.current || previousActiveElementRef.current;
                if (elementToFocus && document.contains(elementToFocus)) {
                    elementToFocus.focus();
                }
            }
        };
    }, [restoreFocus, returnFocusRef]);

    return {
        containerRef,
        focusFirst,
        focusLast,
        getFocusableElements,
    };
};
