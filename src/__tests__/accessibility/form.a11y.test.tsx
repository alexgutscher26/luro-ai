import { render, testAccessibility, axeRules } from "../utils/test-utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

describe("Form Accessibility", () => {
    it("should not have accessibility violations for labeled input", async () => {
        await testAccessibility(
            <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
            </div>
        );
    });

    it("should be accessible with error states", async () => {
        await testAccessibility(
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    aria-invalid="true"
                    aria-describedby="password-error"
                />
                <div id="password-error" role="alert">
                    Password must be at least 8 characters
                </div>
            </div>
        );
    });
});
