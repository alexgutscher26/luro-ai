# Spacing System Guide

## Overview

This project uses a consistent spacing system based on a 4px base unit (0.25rem). All spacing values follow this scale to ensure visual consistency across the application.

## Base Scale

| Size | Value   | Pixels | Usage                       |
| ---- | ------- | ------ | --------------------------- |
| xs   | 0.25rem | 4px    | Tight spacing, borders      |
| sm   | 0.5rem  | 8px    | Small gaps, compact layouts |
| md   | 1rem    | 16px   | Default spacing             |
| lg   | 1.5rem  | 24px   | Comfortable spacing         |
| xl   | 2rem    | 32px   | Large spacing               |
| 2xl  | 3rem    | 48px   | Section spacing             |
| 3xl  | 4rem    | 64px   | Large section spacing       |

## Usage Examples

### Using Constants

```tsx
import { SPACING, COMPONENT_SPACING } from '@/constants';

// Basic spacing
<div className={SPACING.md}>
  <p>Content with medium spacing</p>
</div>

// Component spacing
<button className={COMPONENT_SPACING.button.lg}>
  Large Button
</button>
```

### Using Hooks

```tsx
import { useSpacing, useComponentSpacing } from "@/hooks";

function MyComponent() {
    const stackSpacing = useSpacing({ size: "lg", responsive: true });
    const buttonSpacing = useComponentSpacing("button", "md");

    return (
        <div className={stackSpacing}>
            <button className={buttonSpacing}>Click me</button>
        </div>
    );
}
```

### Responsive Spacing

```tsx
// Responsive stack spacing
<div className="space-y-4 md:space-y-6 lg:space-y-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Responsive grid spacing
<div className="grid gap-4 md:gap-6 lg:gap-8">
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
</div>
```

## Component Guidelines

### Cards

- Small cards: `p-4`
- Medium cards: `p-6`
- Large cards: `p-8`
- Extra large cards: `p-12`

### Buttons

- Small: `px-3 py-1.5`
- Medium: `px-4 py-2`
- Large: `px-6 py-3`
- Extra large: `px-8 py-4`

### Sections

- Small sections: `py-12 md:py-16`
- Medium sections: `py-16 md:py-20 lg:py-24`
- Large sections: `py-20 md:py-24 lg:py-32`
- Extra large sections: `py-24 md:py-32 lg:py-40`

### Containers

- Small containers: `px-4 py-8`
- Medium containers: `px-6 py-12`
- Large containers: `px-8 py-16`
- Extra large containers: `px-12 py-24`

## Best Practices

1. **Use the spacing constants** instead of arbitrary values
2. **Be consistent** with spacing sizes across similar components
3. **Use responsive spacing** for better mobile experience
4. **Follow the component guidelines** for specific component types
5. **Test on different screen sizes** to ensure spacing works well

## Migration Guide

When updating existing components:

1. Replace arbitrary spacing values with constants
2. Use the spacing hooks for dynamic spacing
3. Ensure responsive behavior is maintained
4. Test thoroughly across different screen sizes
