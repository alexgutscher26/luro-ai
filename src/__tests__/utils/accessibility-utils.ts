import { axe, toHaveNoViolations } from "jest-axe";
import { render, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";

// Extend Jest matchers
expect.extend(toHaveNoViolations);

/**
 * Test a component for accessibility violations
 * @param component - The React component to test
 * @param options - Optional axe configuration
 */
export const testAccessibility = async (
    component: ReactElement,
    options?: any
): Promise<void> => {
    const { container } = render(component);
    const results = await axe(container, options);
    expect(results).toHaveNoViolations();
};

/**
 * Test accessibility on an already rendered component
 * @param renderResult - The result from @testing-library/react render
 * @param options - Optional axe configuration
 */
export const testAccessibilityOnRendered = async (
    renderResult: RenderResult,
    options?: any
): Promise<void> => {
    const results = await axe(renderResult.container, options);
    expect(results).toHaveNoViolations();
};

/**
 * Common axe rules for different scenarios
 */
export const axeRules = {
    // Basic accessibility rules
    basic: {
        rules: {
            "color-contrast": { enabled: true },
            "keyboard-navigation": { enabled: true },
            "focus-management": { enabled: true },
        },
    },
    // Strict rules for production
    strict: {
        rules: {
            "color-contrast": { enabled: true },
            "keyboard-navigation": { enabled: true },
            "focus-management": { enabled: true },
            "aria-labels": { enabled: true },
            "semantic-markup": { enabled: true },
        },
    },
    // Rules excluding color contrast (useful for design system components)
    noColorContrast: {
        rules: {
            "color-contrast": { enabled: false },
        },
    },
};
