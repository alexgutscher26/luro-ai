import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "@/components/ui/textarea";

const meta: Meta<typeof Textarea> = {
    title: "UI/Textarea",
    component: Textarea,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            control: "boolean",
        },
        placeholder: {
            control: "text",
        },
        rows: {
            control: "number",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "Type your message here...",
    },
};

export const WithContent: Story = {
    args: {
        defaultValue:
            "This is some sample content in the textarea.\n\nIt spans multiple lines to show how the component handles longer text.",
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="space-y-4 w-80">
            <Textarea placeholder="Small (default)" />
            <Textarea placeholder="Medium" rows={6} />
            <Textarea placeholder="Large" rows={10} />
        </div>
    ),
};

export const States: Story = {
    render: () => (
        <div className="space-y-4 w-80">
            <Textarea placeholder="Normal state" />
            <Textarea placeholder="Disabled state" disabled />
            <Textarea
                placeholder="With content"
                defaultValue="Sample content"
            />
        </div>
    ),
};
