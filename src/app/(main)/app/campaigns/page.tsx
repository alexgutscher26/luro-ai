"use client";

import React, { useState } from "react";
import {
    MegaphoneIcon,
    PlayIcon,
    PauseIcon,
    EyeIcon,
    MousePointerClickIcon,
    TrendingUpIcon,
    CalendarIcon,
    PlusIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const CAMPAIGN_STATS = [
    {
        title: "Active Campaigns",
        value: "12",
        change: "+2 from last month",
        icon: MegaphoneIcon,
        trend: "up",
    },
    {
        title: "Total Impressions",
        value: "2.4M",
        change: "+15.2% from last month",
        icon: EyeIcon,
        trend: "up",
    },
    {
        title: "Click-through Rate",
        value: "3.8%",
        change: "+0.5% from last month",
        icon: MousePointerClickIcon,
        trend: "up",
    },
    {
        title: "Conversion Rate",
        value: "2.1%",
        change: "-0.2% from last month",
        icon: TrendingUpIcon,
        trend: "down",
    },
];

const CAMPAIGNS_DATA = [
    {
        id: 1,
        name: "Summer Sale 2024",
        status: "active",
        budget: "$5,000",
        spent: "$3,200",
        impressions: "450K",
        clicks: "12.5K",
        ctr: "2.8%",
        startDate: "2024-06-01",
        endDate: "2024-08-31",
    },
    {
        id: 2,
        name: "Brand Awareness Q3",
        status: "active",
        budget: "$8,000",
        spent: "$6,100",
        impressions: "720K",
        clicks: "18.2K",
        ctr: "2.5%",
        startDate: "2024-07-01",
        endDate: "2024-09-30",
    },
    {
        id: 3,
        name: "Product Launch Campaign",
        status: "paused",
        budget: "$3,500",
        spent: "$1,800",
        impressions: "280K",
        clicks: "8.4K",
        ctr: "3.0%",
        startDate: "2024-05-15",
        endDate: "2024-07-15",
    },
    {
        id: 4,
        name: "Holiday Promotion",
        status: "draft",
        budget: "$10,000",
        spent: "$0",
        impressions: "0",
        clicks: "0",
        ctr: "0%",
        startDate: "2024-11-01",
        endDate: "2024-12-31",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "active":
            return "bg-green-100 text-green-800 border-green-200";
        case "paused":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "draft":
            return "bg-gray-100 text-gray-800 border-gray-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "active":
            return <PlayIcon className="h-3 w-3" />;
        case "paused":
            return <PauseIcon className="h-3 w-3" />;
        default:
            return null;
    }
};

const CampaignsPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        budget: "",
        startDate: "",
        endDate: "",
        platform: "",
        objective: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCreateCampaign = () => {
        // Basic validation
        if (
            !formData.name ||
            !formData.budget ||
            !formData.startDate ||
            !formData.endDate
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        // Here you would typically make an API call to create the campaign
        console.log("Creating campaign:", formData);
        toast.success("Campaign created successfully!");

        // Reset form and close modal
        setFormData({
            name: "",
            description: "",
            budget: "",
            startDate: "",
            endDate: "",
            platform: "",
            objective: "",
        });
        setIsCreateModalOpen(false);
    };

    return (
        <Container className="py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Campaigns
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage and monitor your marketing campaigns
                    </p>
                </div>
                <div className="ml-auto">
                    <Dialog
                        open={isCreateModalOpen}
                        onOpenChange={setIsCreateModalOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Create Campaign
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Create New Campaign</DialogTitle>
                                <DialogDescription>
                                    Set up a new marketing campaign with your
                                    desired parameters.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Campaign Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={e =>
                                            handleInputChange(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="col-span-3"
                                        placeholder="Enter campaign name"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="description"
                                        className="text-right"
                                    >
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={e =>
                                            handleInputChange(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="col-span-3"
                                        placeholder="Describe your campaign objectives"
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="budget"
                                        className="text-right"
                                    >
                                        Budget *
                                    </Label>
                                    <Input
                                        id="budget"
                                        type="number"
                                        value={formData.budget}
                                        onChange={e =>
                                            handleInputChange(
                                                "budget",
                                                e.target.value
                                            )
                                        }
                                        className="col-span-3"
                                        placeholder="Enter budget amount"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="platform"
                                        className="text-right"
                                    >
                                        Platform
                                    </Label>
                                    <Select
                                        onValueChange={value =>
                                            handleInputChange("platform", value)
                                        }
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="facebook">
                                                Facebook
                                            </SelectItem>
                                            <SelectItem value="instagram">
                                                Instagram
                                            </SelectItem>
                                            <SelectItem value="twitter">
                                                Twitter
                                            </SelectItem>
                                            <SelectItem value="linkedin">
                                                LinkedIn
                                            </SelectItem>
                                            <SelectItem value="google">
                                                Google Ads
                                            </SelectItem>
                                            <SelectItem value="tiktok">
                                                TikTok
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="objective"
                                        className="text-right"
                                    >
                                        Objective
                                    </Label>
                                    <Select
                                        onValueChange={value =>
                                            handleInputChange(
                                                "objective",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select campaign objective" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="awareness">
                                                Brand Awareness
                                            </SelectItem>
                                            <SelectItem value="traffic">
                                                Website Traffic
                                            </SelectItem>
                                            <SelectItem value="engagement">
                                                Engagement
                                            </SelectItem>
                                            <SelectItem value="leads">
                                                Lead Generation
                                            </SelectItem>
                                            <SelectItem value="conversions">
                                                Conversions
                                            </SelectItem>
                                            <SelectItem value="sales">
                                                Sales
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="startDate"
                                        className="text-right"
                                    >
                                        Start Date *
                                    </Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={e =>
                                            handleInputChange(
                                                "startDate",
                                                e.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="endDate"
                                        className="text-right"
                                    >
                                        End Date *
                                    </Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={e =>
                                            handleInputChange(
                                                "endDate",
                                                e.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsCreateModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCreateCampaign}
                                >
                                    Create Campaign
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {CAMPAIGN_STATS.map((stat, index) => (
                    <Container key={stat.title} delay={index * 0.1}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stat.value}
                                </div>
                                <p
                                    className={`text-xs flex items-center gap-1 ${
                                        stat.trend === "up"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {stat.change}
                                    <TrendingUpIcon
                                        className={`h-3 w-3 ${
                                            stat.trend === "down"
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                ))}
            </div>

            {/* Campaigns Table */}
            <Container delay={0.3}>
                <Card>
                    <CardHeader>
                        <CardTitle>All Campaigns</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Overview of all your marketing campaigns
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                            Campaign
                                        </th>
                                        <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                            Status
                                        </th>
                                        <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                            Budget
                                        </th>
                                        <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                            Spent
                                        </th>
                                        <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                            Impressions
                                        </th>
                                        <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                            Clicks
                                        </th>
                                        <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                            CTR
                                        </th>
                                        <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                            Duration
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CAMPAIGNS_DATA.map(campaign => (
                                        <tr
                                            key={campaign.id}
                                            className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                                        >
                                            <td className="py-4 px-2">
                                                <div className="font-medium text-foreground">
                                                    {campaign.name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <Badge
                                                    variant="outline"
                                                    className={`gap-1 ${getStatusColor(campaign.status)}`}
                                                >
                                                    {getStatusIcon(
                                                        campaign.status
                                                    )}
                                                    {campaign.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        campaign.status.slice(
                                                            1
                                                        )}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-2 text-foreground">
                                                {campaign.budget}
                                            </td>
                                            <td className="py-4 px-2 text-foreground">
                                                {campaign.spent}
                                            </td>
                                            <td className="py-4 px-2 text-foreground">
                                                {campaign.impressions}
                                            </td>
                                            <td className="py-4 px-2 text-foreground">
                                                {campaign.clicks}
                                            </td>
                                            <td className="py-4 px-2 text-foreground">
                                                {campaign.ctr}
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <CalendarIcon className="h-3 w-3" />
                                                    {new Date(
                                                        campaign.startDate
                                                    ).toLocaleDateString()}{" "}
                                                    -{" "}
                                                    {new Date(
                                                        campaign.endDate
                                                    ).toLocaleDateString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </Container>
    );
};

export default CampaignsPage;
