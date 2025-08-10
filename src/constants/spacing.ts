/**
 * Consistent spacing system for the application
 * Based on 4px base unit (0.25rem)
 */

export const SPACING = {
  // Base spacing units
  xs: 'space-y-1',      // 4px
  sm: 'space-y-2',      // 8px
  md: 'space-y-4',      // 16px
  lg: 'space-y-6',      // 24px
  xl: 'space-y-8',      // 32px
  '2xl': 'space-y-12',  // 48px
  '3xl': 'space-y-16',  // 64px
  '4xl': 'space-y-20',  // 80px
  '5xl': 'space-y-24',  // 96px
} as const;

export const SPACING_X = {
  xs: 'space-x-1',      // 4px
  sm: 'space-x-2',      // 8px
  md: 'space-x-4',      // 16px
  lg: 'space-x-6',      // 24px
  xl: 'space-x-8',      // 32px
  '2xl': 'space-x-12',  // 48px
  '3xl': 'space-x-16',  // 64px
} as const;

export const PADDING = {
  xs: 'p-1',            // 4px
  sm: 'p-2',            // 8px
  md: 'p-4',            // 16px
  lg: 'p-6',            // 24px
  xl: 'p-8',            // 32px
  '2xl': 'p-12',        // 48px
  '3xl': 'p-16',        // 64px
} as const;

export const MARGIN = {
  xs: 'm-1',            // 4px
  sm: 'm-2',            // 8px
  md: 'm-4',            // 16px
  lg: 'm-6',            // 24px
  xl: 'm-8',            // 32px
  '2xl': 'm-12',        // 48px
  '3xl': 'm-16',        // 64px
} as const;

export const GAP = {
  xs: 'gap-1',          // 4px
  sm: 'gap-2',          // 8px
  md: 'gap-4',          // 16px
  lg: 'gap-6',          // 24px
  xl: 'gap-8',          // 32px
  '2xl': 'gap-12',      // 48px
  '3xl': 'gap-16',      // 64px
} as const;

// Component-specific spacing
export const COMPONENT_SPACING = {
  button: {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
    xl: 'px-8 py-4',
  },
  card: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  },
  container: {
    sm: 'px-4 py-8',
    md: 'px-6 py-12',
    lg: 'px-8 py-16',
    xl: 'px-12 py-24',
  },
  section: {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20 lg:py-24',
    lg: 'py-20 md:py-24 lg:py-32',
    xl: 'py-24 md:py-32 lg:py-40',
  },
} as const;

// Responsive spacing utilities
export const RESPONSIVE_SPACING = {
  stack: {
    sm: 'space-y-2 md:space-y-3',
    md: 'space-y-4 md:space-y-6',
    lg: 'space-y-6 md:space-y-8',
    xl: 'space-y-8 md:space-y-12',
  },
  grid: {
    sm: 'gap-2 md:gap-3',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8',
    xl: 'gap-8 md:gap-12',
  },
} as const;

export type SpacingSize = keyof typeof SPACING;
export type ComponentSpacingType = keyof typeof COMPONENT_SPACING;