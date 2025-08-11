"use client";

import React, { useState, useMemo } from "react";
import { 
    HeartIcon, 
    MessageCircleIcon, 
    ShareIcon,
    TrendingUpIcon,
    EyeIcon,
    SearchIcon} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const ENGAGEMENT_STATS = [
    {
        title: "Total Engagement",
        value: "127.5K",
        change: "+23.1% from last month",
        icon: HeartIcon,
        trend: "up"
    },
    {
        title: "Engagement Rate",
        value: "4.8%",
        change: "+0.7% from last month",
        icon: TrendingUpIcon,
        trend: "up"
    },
    {
        title: "Comments",
        value: "8.2K",
        change: "+15.3% from last month",
        icon: MessageCircleIcon,
        trend: "up"
    },
    {
        title: "Shares",
        value: "3.4K",
        change: "+8.9% from last month",
        icon: ShareIcon,
        trend: "up"
    }
];

const ENGAGEMENT_DATA = [
    {
        id: 1,
        postContent: "🚀 Exciting news! We're launching our new AI-powered analytics dashboard...",
        platform: "twitter",
        publishedAt: "2024-01-15T10:30:00Z",
        engagement: {
            likes: 245,
            comments: 18,
            shares: 32,
            views: 3200,
            rate: 4.2
        },
        author: "Marketing Team"
    },
    {
        id: 2,
        postContent: "Check out our latest blog post about social media trends for 2024!",
        platform: "instagram",
        publishedAt: "2024-01-14T15:45:00Z",
        engagement: {
            likes: 189,
            comments: 24,
            shares: 15,
            views: 2800,
            rate: 5.1
        },
        author: "Content Team"
    },
    {
        id: 3,
        postContent: "Customer spotlight: See how @CompanyX increased their engagement by 150%!",
        platform: "linkedin",
        publishedAt: "2024-01-13T11:20:00Z",
        engagement: {
            likes: 156,
            comments: 12,
            shares: 28,
            views: 2100,
            rate: 6.2
        },
        author: "Success Team"
    },
    {
        id: 4,
        postContent: "Tips for better social media engagement: 1. Post consistently 2. Use relevant hashtags...",
        platform: "facebook",
        publishedAt: "2024-01-12T09:15:00Z",
        engagement: {
            likes: 98,
            comments: 31,
            shares: 19,
            views: 1800,
            rate: 3.8
        },
        author: "Marketing Team"
    },
    {
        id: 5,
        postContent: "Behind the scenes: Our team working on the next big feature!",
        platform: "instagram",
        publishedAt: "2024-01-11T16:30:00Z",
        engagement: {
            likes: 312,
            comments: 45,
            shares: 67,
            views: 4200,
            rate: 7.1
        },
        author: "Product Team"
    }
];

const CHART_DATA = [
    { name: "Jan", engagement: 4200, rate: 3.2 },
    { name: "Feb", engagement: 4800, rate: 3.8 },
    { name: "Mar", engagement: 3900, rate: 2.9 },
    { name: "Apr", engagement: 5200, rate: 4.1 },
    { name: "May", engagement: 6100, rate: 4.7 },
    { name: "Jun", engagement: 5800, rate: 4.3 },
    { name: "Jul", engagement: 7200, rate: 5.2 },
    { name: "Aug", engagement: 6800, rate: 4.9 },
    { name: "Sep", engagement: 7500, rate: 5.4 },
    { name: "Oct", engagement: 8200, rate: 5.8 },
    { name: "Nov", engagement: 7900, rate: 5.6 },
    { name: "Dec", engagement: 8500, rate: 6.1 }
];

const chartConfig = {
    engagement: {
        label: "Total Engagement",
        color: "hsl(var(--chart-1))",
    },
    rate: {
        label: "Engagement Rate (%)",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

/**
 * Retrieves color classes based on the platform type.
 *
 * This function maps a given platform string to corresponding background and text color CSS class names.
 * If the platform does not match any predefined cases, it defaults to gray colors.
 *
 * @param platform - A string representing the platform name (e.g., "twitter", "instagram").
 * @returns A string with space-separated CSS class names for background and text color.
 */
const getPlatformColor = (platform: string) => {
    switch (platform) {
        case "twitter": return "bg-blue-100 text-blue-800";
        case "instagram": return "bg-pink-100 text-pink-800";
        case "facebook": return "bg-blue-100 text-blue-800";
        case "linkedin": return "bg-blue-100 text-blue-800";
        default: return "bg-gray-100 text-gray-800";
    }
};

/**
 * Determines the engagement color based on the given rate.
 *
 * The function evaluates the engagement rate and returns a corresponding color class name.
 * If the rate is 5 or higher, it returns "text-green-600".
 * If the rate is between 3 (inclusive) and 4 (exclusive), it returns "text-yellow-600".
 * For rates below 3, it defaults to "text-red-600".
 *
 * @param rate - The engagement rate as a number.
 */
const getEngagementColor = (rate: number) => {
    if (rate >= 5) return "text-green-600";
    if (rate >= 3) return "text-yellow-600";
    return "text-red-600";
};

/**
 * Formats a date string to a locale-specific format.
 */
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Engagement Page Component.
 *
 * This component renders a page displaying engagement analytics, including filters for search terms,
 * platform selection, and sorting options. It calculates total engagement, average rate, and displays
 * filtered engagements in a list format. The component uses hooks for state management and leverages
 * useMemo for optimizing the filtering and sorting process.
 *
 * @returns JSX.Element representing the Engagement Analytics page.
 */
const EngagementPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [platformFilter, setPlatformFilter] = useState("all");
    const [sortBy, setSortBy] = useState("date");

    const filteredEngagements = useMemo(() => {
        return ENGAGEMENT_DATA.filter(item => {
            const matchesSearch = item.postContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPlatform = platformFilter === "all" || item.platform === platformFilter;
            
            return matchesSearch && matchesPlatform;
        }).sort((a, b) => {
            switch (sortBy) {
                case "engagement":
                    return b.engagement.rate - a.engagement.rate;
                case "likes":
                    return b.engagement.likes - a.engagement.likes;
                case "date":
                default:
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            }
        });
    }, [searchTerm, platformFilter, sortBy]);

    const totalEngagement = filteredEngagements.reduce((sum, item) => 
        sum + item.engagement.likes + item.engagement.comments + item.engagement.shares, 0
    );

    const averageRate = filteredEngagements.length > 0 
        ? (filteredEngagements.reduce((sum, item) => sum + item.engagement.rate, 0) / filteredEngagements.length).toFixed(1)
        : "0.0";

    return (
        <div className="p-4 w-full">
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Engagement Analytics</h1>
                        <p className="text-muted-foreground">Monitor and analyze your social media engagement performance</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    {ENGAGEMENT_STATS.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Container key={stat.title} delay={index * 0.1}>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {stat.title}
                                        </CardTitle>
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {stat.change}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Container>
                        );
                    })}
                </div>

                {/* Chart */}
                <Container delay={0.4}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Engagement Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={CHART_DATA}
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
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <defs>
                                        <linearGradient id="fillEngagement" x1="0" y1="0" x2="0" y2="1">
                                            <stop
                                                offset="5%"
                                                stopColor="var(--color-engagement)"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="var(--color-engagement)"
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        dataKey="engagement"
                                        type="natural"
                                        fill="url(#fillEngagement)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-engagement)"
                                        stackId="a"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </Container>

                {/* Filters and Search */}
                <Container delay={0.5}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Engagement Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="relative">
                                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            placeholder="Search posts or authors..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Platform" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Platforms</SelectItem>
                                        <SelectItem value="twitter">Twitter</SelectItem>
                                        <SelectItem value="instagram">Instagram</SelectItem>
                                        <SelectItem value="facebook">Facebook</SelectItem>
                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="date">Date</SelectItem>
                                        <SelectItem value="engagement">Engagement Rate</SelectItem>
                                        <SelectItem value="likes">Likes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-black border border-gray-700 rounded-lg p-3">
                                    <div className="text-sm text-gray-300 font-medium">Total Posts</div>
                                    <div className="text-xl font-semibold text-white">{filteredEngagements.length}</div>
                                </div>
                                <div className="bg-black border border-gray-700 rounded-lg p-3">
                                    <div className="text-sm text-gray-300 font-medium">Total Engagement</div>
                                    <div className="text-xl font-semibold text-white">{totalEngagement.toLocaleString()}</div>
                                </div>
                                <div className="bg-black border border-gray-700 rounded-lg p-3">
                                    <div className="text-sm text-gray-300 font-medium">Average Rate</div>
                                    <div className="text-xl font-semibold text-white">{averageRate}%</div>
                                </div>
                            </div>

                            {/* Engagement List */}
                            <div className="space-y-4">
                                {filteredEngagements.map((item) => (
                                    <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-900 hover:border-gray-600 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02]">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className={getPlatformColor(item.platform)}>
                                                        {item.platform}
                                                    </Badge>
                                                    <span className="text-sm text-muted-foreground">
                                                        by {item.author}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">•</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {formatDate(item.publishedAt)}
                                                    </span>
                                                </div>
                                                <p className="text-sm mb-3 line-clamp-2">
                                                    {item.postContent}
                                                </p>
                                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <HeartIcon className="h-4 w-4" />
                                                        <span>{item.engagement.likes}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageCircleIcon className="h-4 w-4" />
                                                        <span>{item.engagement.comments}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <ShareIcon className="h-4 w-4" />
                                                        <span>{item.engagement.shares}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <EyeIcon className="h-4 w-4" />
                                                        <span>{item.engagement.views}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-muted-foreground mb-1">Engagement Rate</div>
                                                <div className={`text-lg font-semibold ${getEngagementColor(item.engagement.rate)}`}>
                                                    {item.engagement.rate}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredEngagements.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">No engagement data found matching your filters.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default EngagementPage;