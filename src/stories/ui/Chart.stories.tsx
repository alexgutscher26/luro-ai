import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import {
    Bar,
    BarChart,
    Line,
    LineChart,
    Area,
    AreaChart,
    Pie,
    PieChart,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const meta: Meta<typeof ChartContainer> = {
    title: "UI/Chart",
    component: ChartContainer,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const salesData = [
    { month: "Jan", sales: 4000, revenue: 2400, profit: 1600 },
    { month: "Feb", sales: 3000, revenue: 1398, profit: 1200 },
    { month: "Mar", sales: 2000, revenue: 9800, profit: 800 },
    { month: "Apr", sales: 2780, revenue: 3908, profit: 1800 },
    { month: "May", sales: 1890, revenue: 4800, profit: 1200 },
    { month: "Jun", sales: 2390, revenue: 3800, profit: 1500 },
];

const chartConfig = {
    sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
    },
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-2))",
    },
    profit: {
        label: "Profit",
        color: "hsl(var(--chart-3))",
    },
};

export const BarChartExample: Story = {
    render: () => (
        <div className="w-[600px] h-[400px]">
            <ChartContainer config={chartConfig}>
                <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="sales" fill="var(--color-sales)" />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
            </ChartContainer>
        </div>
    ),
};

export const LineChartExample: Story = {
    render: () => (
        <div className="w-[600px] h-[400px]">
            <ChartContainer config={chartConfig}>
                <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="var(--color-sales)"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="var(--color-profit)"
                        strokeWidth={2}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    ),
};

const pieData = [
    { name: "Desktop", value: 400, fill: "hsl(var(--chart-1))" },
    { name: "Mobile", value: 300, fill: "hsl(var(--chart-2))" },
    { name: "Tablet", value: 200, fill: "hsl(var(--chart-3))" },
    { name: "Other", value: 100, fill: "hsl(var(--chart-4))" },
];

export const PieChartExample: Story = {
    render: () => (
        <div className="w-[400px] h-[400px]">
            <ChartContainer config={chartConfig}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
            </ChartContainer>
        </div>
    ),
};
