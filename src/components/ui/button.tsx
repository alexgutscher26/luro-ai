import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/functions";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md shadow-none text-sm font-medium ring-offset-background transition transform-gpu ease-in-out duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95 group select-none",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:opacity-70 bt-primary",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "text-primary bg-primary/10 hover:bg-primary/30",
                tertiary: "text-foreground bg-[#232323] hover:brightness-125",
                subtle: "border border-input bg-accent/20 hover:bg-white/10 hover:text-accent-foreground",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                white: "bg-foreground text-background hover:opacity-70",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 px-3",
                lg: "h-10 px-8",
                xl: "h-12 px-10",
                icon: "h-8 w-8",
                iconlg: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    iconl?: React.ReactNode;
    iconr?: React.ReactNode;
    children?: React.ReactNode; // Add this line
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            iconl,
            iconr,
            className,
            variant,
            size,
            asChild = false,
            children,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        // If button only contains icons and no text, ensure aria-label is provided
        const hasOnlyIcons = !children && (iconl || iconr);
        const needsAriaLabel =
            hasOnlyIcons && !props["aria-label"] && !props["aria-labelledby"];

        if (needsAriaLabel && process.env.NODE_ENV === "development") {
            console.warn(
                "Button with only icons should have an aria-label for accessibility"
            );
        }

        // When asChild is true, we need to clone the child and add our props to it
        if (asChild) {
            return (
                <Slot
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                >
                    {children}
                </Slot>
            );
        }

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {iconl && <span aria-hidden="true">{iconl}</span>}
                {children}
                {iconr && <span aria-hidden="true">{iconr}</span>}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
