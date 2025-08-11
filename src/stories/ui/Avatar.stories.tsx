import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const meta: Meta<typeof Avatar> = {
    title: "UI/Avatar",
    component: Avatar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
};

export const WithFallback: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src="/broken-image.jpg" alt="Broken" />
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-xs">SM</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar className="h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-lg">LG</AvatarFallback>
            </Avatar>
        </div>
    ),
};

export const FallbackVariations: Story = {
    render: () => (
        <div className="flex gap-4">
            <Avatar>
                <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback className="bg-blue-500 text-white">
                    CD
                </AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback className="bg-green-500 text-white">
                    EF
                </AvatarFallback>
            </Avatar>
        </div>
    ),
};
