import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectSeparator,
} from "@/components/ui/select";

const meta: Meta<typeof Select> = {
    title: "UI/Select",
    component: Select,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
            </SelectContent>
        </Select>
    ),
};

export const WithGroups: Story = {
    render: () => (
        <Select>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="est">
                        Eastern Standard Time (EST)
                    </SelectItem>
                    <SelectItem value="cst">
                        Central Standard Time (CST)
                    </SelectItem>
                    <SelectItem value="mst">
                        Mountain Standard Time (MST)
                    </SelectItem>
                    <SelectItem value="pst">
                        Pacific Standard Time (PST)
                    </SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                    <SelectLabel>Europe</SelectLabel>
                    <SelectItem value="gmt">
                        Greenwich Mean Time (GMT)
                    </SelectItem>
                    <SelectItem value="cet">
                        Central European Time (CET)
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="space-y-4">
            <Select disabled>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Disabled select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="item1">Item 1</SelectItem>
                    <SelectItem value="item2">Item 2</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="With disabled items" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="item1">Available Item</SelectItem>
                    <SelectItem value="item2" disabled>
                        Disabled Item
                    </SelectItem>
                    <SelectItem value="item3">
                        Another Available Item
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    ),
};
