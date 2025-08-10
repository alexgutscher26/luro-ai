import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cn } from "../cn";

describe("cn utility function", () => {
    it("should merge class names correctly", () => {
        const result = cn("class1", "class2");
        expect(result).toBe("class1 class2");
    });

    it("should handle conditional classes", () => {
        const result = cn("base", true && "conditional", false && "hidden");
        expect(result).toBe("base conditional");
    });

    it("should handle undefined and null values", () => {
        const result = cn("base", undefined, null, "valid");
        expect(result).toBe("base valid");
    });

    it("should merge conflicting Tailwind classes", () => {
        const result = cn("px-4 px-6", "py-2 py-4");
        expect(result).toBe("px-6 py-4");
    });

    it("should handle object syntax for conditional classes", () => {
        const result = cn("base", {
            active: true,
            disabled: false,
            highlighted: true,
        });
        expect(result).toBe("base active highlighted");
    });

    it("should return empty string for no inputs", () => {
        const result = cn();
        expect(result).toBe("");
    });

    it("should handle arrays of classes", () => {
        const result = cn(["class1", "class2"], "class3");
        expect(result).toBe("class1 class2 class3");
    });
});
