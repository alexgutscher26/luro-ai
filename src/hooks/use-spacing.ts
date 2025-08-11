import { useMemo } from "react";
import { cn } from "@/functions";
import {
    SPACING,
    SPACING_X,
    PADDING,
    GAP,
    COMPONENT_SPACING,
    RESPONSIVE_SPACING,
    type SpacingSize,
    type ComponentSpacingType,
} from "@/constants/spacing";

interface UseSpacingOptions {
    direction?: "vertical" | "horizontal";
    size?: SpacingSize;
    responsive?: boolean;
}

export function useSpacing({
    direction = "vertical",
    size = "md",
    responsive = true,
}: UseSpacingOptions = {}) {
    return useMemo(() => {
        const baseSpacing =
            direction === "vertical"
                ? SPACING[size]
                : SPACING_X[size as keyof typeof SPACING_X] || SPACING_X.xl;

        if (responsive) {
            const responsiveSpacing =
                (RESPONSIVE_SPACING.stack as Record<SpacingSize, string>)[
                    size
                ] || baseSpacing;
            return responsiveSpacing;
        }

        return baseSpacing;
    }, [direction, size, responsive]);
}

export function useComponentSpacing(
    component: ComponentSpacingType,
    size: SpacingSize = "md"
) {
    return useMemo(() => {
        const componentSpacing = COMPONENT_SPACING[component];
        return componentSpacing && size in componentSpacing
            ? (componentSpacing as Record<SpacingSize, string>)[size]
            : PADDING[size as keyof typeof PADDING];
    }, [component, size]);
}

export function useGridSpacing(size: SpacingSize = "md", responsive = true) {
    return useMemo(() => {
        if (responsive) {
            return (
                (RESPONSIVE_SPACING.grid as Record<SpacingSize, string>)[
                    size
                ] || (GAP as Record<SpacingSize, string>)[size]
            );
        }
        return GAP[size as keyof typeof GAP];
    }, [size, responsive]);
}

// Utility function to combine spacing classes
export function combineSpacing(
    ...classes: (string | undefined | null | false)[]
) {
    return cn(...classes.filter(Boolean));
}
