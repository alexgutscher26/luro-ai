import { render, testAccessibility, axeRules } from "../utils/test-utils";
import { Button } from "@/components/ui/button";

describe("Button Accessibility", () => {
    it("should not have accessibility violations", async () => {
        await testAccessibility(<Button>Click me</Button>);
    });

    it("should be accessible with different variants", async () => {
        const variants = [
            "default",
            "destructive",
            "outline",
            "secondary",
            "ghost",
            "link",
        ] as const;

        for (const variant of variants) {
            await testAccessibility(
                <Button variant={variant}>Button {variant}</Button>,
                axeRules.basic
            );
        }
    });

    it("should be accessible when disabled", async () => {
        await testAccessibility(<Button disabled>Disabled Button</Button>);
    });

    it("should be accessible with custom aria labels", async () => {
        await testAccessibility(
            <Button
                aria-label="Custom action button"
                aria-describedby="help-text"
            >
                Action
            </Button>
        );
    });
});
