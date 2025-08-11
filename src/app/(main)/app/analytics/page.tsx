"use client";

import React from "react";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    BarChart3Icon,
    TrendingUpIcon,
    UsersIcon,
    EyeIcon,
    MousePointerClickIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    Bar,
    BarChart,
    ResponsiveContainer,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Container } from "@/components";

// Analytics data
const DETAILED_ANALYTICS = [
    {
        name: "Jan",
        reach: 5200,
        engagement: 3000,
        clicks: 1200,
        conversions: 85,
    },
    {
        name: "Feb",
        reach: 4800,
        engagement: 3500,
        clicks: 1400,
        conversions: 92,
    },
    {
        name: "Mar",
        reach: 6900,
        engagement: 1800,
        clicks: 900,
        conversions: 65,
    },
    {
        name: "Apr",
        reach: 4800,
        engagement: 2900,
        clicks: 1160,
        conversions: 78,
    },
    {
        name: "May",
        reach: 6200,
        engagement: 3600,
        clicks: 1440,
        conversions: 105,
    },
    {
        name: "Jun",
        reach: 6400,
        engagement: 3800,
        clicks: 1520,
        conversions: 112,
    },
    {
        name: "Jul",
        reach: 7600,
        engagement: 4200,
        clicks: 1680,
        conversions: 128,
    },
    {
        name: "Aug",
        reach: 5800,
        engagement: 3400,
        clicks: 1360,
        conversions: 95,
    },
    {
        name: "Sep",
        reach: 6500,
        engagement: 3800,
        clicks: 1520,
        conversions: 110,
    },
    {
        name: "Oct",
        reach: 8200,
        engagement: 4600,
        clicks: 1840,
        conversions: 145,
    },
    {
        name: "Nov",
        reach: 7000,
        engagement: 3900,
        clicks: 1560,
        conversions: 118,
    },
    {
        name: "Dec",
        reach: 5600,
        engagement: 3200,
        clicks: 1280,
        conversions: 88,
    },
];

const CONVERSION_DATA = [
    { name: "Impressions", value: 10000 },
    { name: "Clicks", value: 2400 },
    { name: "Leads", value: 480 },
    { name: "Conversions", value: 120 },
];

const chartConfig = {
    reach: {
        label: "Total Reach",
        color: "hsl(var(--chart-1))",
    },
    engagement: {
        label: "Engagement",
        color: "hsl(var(--chart-2))",
    },
    clicks: {
        label: "Clicks",
        color: "hsl(var(--chart-3))",
    },
    conversions: {
        label: "Conversions",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

const AnalyticsPage = () => {
    return (
        <div className="p-4 w-full">
            <div className="flex flex-col w-full">
                {/* Analytics Cards */}
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Container>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Reach
                                </CardTitle>
                                <EyeIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2.4M</div>
                                <p className="text-xs text-muted-foreground">
                                    +12.5% from last month
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.1}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Engagement
                                </CardTitle>
                                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">42.8K</div>
                                <p className="text-xs text-muted-foreground">
                                    +8.2% from last month
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.2}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Click Rate
                                </CardTitle>
                                <MousePointerClickIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">3.8%</div>
                                <p className="text-xs text-muted-foreground">
                                    +0.5% from last month
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.3}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Conversion Rate
                                </CardTitle>
                                <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2.1%</div>
                                <p className="text-xs text-muted-foreground">
                                    -0.3% from last month
                                    <ArrowDownIcon className="ml-1 h-4 w-4 text-red-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.4}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Revenue
                                </CardTitle>
                                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$64.2K</div>
                                <p className="text-xs text-muted-foreground">
                                    +15.3% from last month
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                </div>

                {/* Performance Overview Chart - Now Full Width */}
                <div className="mt-8">
                    <Container delay={0.2}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 w-full">
                                <ChartContainer config={chartConfig}>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={400}
                                    >
                                        <AreaChart
                                            accessibilityLayer
                                            data={DETAILED_ANALYTICS}
                                            margin={{
                                                left: 12,
                                                right: 12,
                                            }}
                                        >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="name"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={value =>
                                                    value.slice(0, 3)
                                                }
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={
                                                    <ChartTooltipContent />
                                                }
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="fillReach"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor="hsl(var(--chart-1))"
                                                        stopOpacity={0.8}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor="hsl(var(--chart-1))"
                                                        stopOpacity={0.1}
                                                    />
                                                </linearGradient>
                                                <linearGradient
                                                    id="fillEngagement"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor="hsl(var(--chart-2))"
                                                        stopOpacity={0.8}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor="hsl(var(--chart-2))"
                                                        stopOpacity={0.1}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <Area
                                                dataKey="engagement"
                                                type="natural"
                                                fill="url(#fillEngagement)"
                                                fillOpacity={0.4}
                                                stroke="hsl(var(--chart-2))"
                                                stackId="a"
                                            />
                                            <Area
                                                dataKey="reach"
                                                type="natural"
                                                fill="url(#fillReach)"
                                                fillOpacity={0.4}
                                                stroke="hsl(var(--chart-1))"
                                                stackId="a"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </Container>
                </div>

                {/* Conversion Funnel and Monthly Trends */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <Container delay={0.4}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Conversion Funnel</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Track your conversion process
                                </p>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={chartConfig}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={CONVERSION_DATA}
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <ChartTooltip
                                                cursor={false}
                                                content={
                                                    <ChartTooltipContent />
                                                }
                                            />
                                            <Bar
                                                dataKey="value"
                                                fill="hsl(var(--chart-1))"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </Container>

                    <Container delay={0.5}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Trends</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Clicks and conversions over time
                                </p>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={chartConfig}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <AreaChart
                                            data={DETAILED_ANALYTICS}
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="name"
                                                tickFormatter={value =>
                                                    value.slice(0, 3)
                                                }
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={
                                                    <ChartTooltipContent />
                                                }
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="clicks"
                                                stackId="1"
                                                stroke="hsl(var(--chart-3))"
                                                fill="hsl(var(--chart-3))"
                                                fillOpacity={0.6}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="conversions"
                                                stackId="1"
                                                stroke="hsl(var(--chart-4))"
                                                fill="hsl(var(--chart-4))"
                                                fillOpacity={0.6}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
