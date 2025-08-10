import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "next-themes";
import { testAccessibilityOnRendered } from './accessibility-utils';

// Mock providers that wrap your app
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => {
    const result = render(ui, { wrapper: AllTheProviders, ...options });
    return {
        ...result,
        user: userEvent.setup(),
        // Add accessibility testing method
        testA11y: (axeOptions?: any) => testAccessibilityOnRendered(result, axeOptions),
    };
};

export * from "@testing-library/react";
export { customRender as render };
export { testAccessibility, axeRules } from './accessibility-utils';
