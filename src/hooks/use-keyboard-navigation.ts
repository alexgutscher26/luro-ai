import { useEffect, useRef, useCallback } from "react";

interface UseKeyboardNavigationOptions {
    /** Enable arrow key navigation */
    enableArrowKeys?: boolean;
    /** Enable tab navigation */
    enableTabNavigation?: boolean;
    /** Enable escape key handling */
    enableEscapeKey?: boolean;
    /** Callback when escape key is pressed */
    onEscape?: () => void;
    /** Callback when enter key is pressed */
    onEnter?: (activeElement: HTMLElement) => void;
    /** Selector for navigable elements */
    itemSelector?: string;
    /** Whether navigation should loop (wrap around) */
    loop?: boolean;
    /** Whether to prevent default behavior */
    preventDefault?: boolean;
}

/**
 * Custom hook for keyboard navigation within a container
 * 
 * Provides arrow key navigation, escape handling, and enter key support
 * for interactive elements within a container.
 * 
 * @param options Configuration options for keyboard navigation
 * @returns Ref to attach to the container element
 * 
 * @example
 * // Basic dropdown navigation
 * const DropdownMenu = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const menuRef = useKeyboardNavigation({
 *     enableArrowKeys: true,
 *     enableEscapeKey: true,
 *     onEscape: () => setIsOpen(false),
 *     itemSelector: '[role="menuitem"]',
 *     loop: true
 *   });
 * 
 *   return (
 *     <div ref={menuRef} role="menu">
 *       // menu items go here
 *     </div>
 *   );
 * };
 */
export const useKeyboardNavigation = ({
    enableArrowKeys = true,
    enableTabNavigation = true,
    enableEscapeKey = true,
    onEscape,
    onEnter,
    itemSelector = '[tabindex]:not([tabindex="-1"]), button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [role="button"]:not([disabled]), [role="menuitem"]:not([disabled])',
    loop = false,
    preventDefault = true,
}: UseKeyboardNavigationOptions = {}) => {
    const containerRef = useRef<HTMLElement>(null);
    const currentIndexRef = useRef<number>(-1);

    const getNavigableElements = useCallback((): HTMLElement[] => {
        if (!containerRef.current) return [];
        return Array.from(
            containerRef.current.querySelectorAll(itemSelector)
        ) as HTMLElement[];
    }, [itemSelector]);

    const focusElement = useCallback((index: number) => {
        const elements = getNavigableElements();
        if (elements.length === 0) return;

        let targetIndex = index;
        if (loop) {
            if (targetIndex < 0) targetIndex = elements.length - 1;
            if (targetIndex >= elements.length) targetIndex = 0;
        } else {
            targetIndex = Math.max(0, Math.min(targetIndex, elements.length - 1));
        }

        const element = elements[targetIndex];
        if (element) {
            element.focus();
            currentIndexRef.current = targetIndex;
        }
    }, [getNavigableElements, loop]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!containerRef.current?.contains(event.target as Node)) return;

        const elements = getNavigableElements();
        if (elements.length === 0) return;

        // Find current focused element index
        const activeElement = document.activeElement as HTMLElement;
        const currentIndex = elements.indexOf(activeElement);
        currentIndexRef.current = currentIndex;

        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                if (enableArrowKeys) {
                    if (preventDefault) event.preventDefault();
                    focusElement(currentIndex + 1);
                }
                break;

            case 'ArrowUp':
            case 'ArrowLeft':
                if (enableArrowKeys) {
                    if (preventDefault) event.preventDefault();
                    focusElement(currentIndex - 1);
                }
                break;

            case 'Home':
                if (enableArrowKeys) {
                    if (preventDefault) event.preventDefault();
                    focusElement(0);
                }
                break;

            case 'End':
                if (enableArrowKeys) {
                    if (preventDefault) event.preventDefault();
                    focusElement(elements.length - 1);
                }
                break;

            case 'Escape':
                if (enableEscapeKey && onEscape) {
                    if (preventDefault) event.preventDefault();
                    onEscape();
                }
                break;

            case 'Enter':
            case ' ':
                if (onEnter && activeElement) {
                    if (preventDefault) event.preventDefault();
                    onEnter(activeElement);
                }
                break;

            case 'Tab':
                if (!enableTabNavigation && preventDefault) {
                    event.preventDefault();
                }
                break;
        }
    }, [enableArrowKeys, enableTabNavigation, enableEscapeKey, onEscape, onEnter, preventDefault, focusElement, getNavigableElements]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return containerRef;
};