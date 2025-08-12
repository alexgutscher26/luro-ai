"use client";

import React, { useState, useMemo } from "react";
import {
    MessageSquareTextIcon,
    PlusIcon,
    EyeIcon,
    HeartIcon,
    ShareIcon,
    MessageCircleIcon,
    CalendarIcon,
    ImageIcon,
    VideoIcon,
    LinkIcon,
    MoreHorizontalIcon,
    EditIcon,
    TrashIcon,
    SendIcon,
    SearchIcon,
    TrendingUpIcon,
    ClockIcon,
    FileTextIcon,
    Copy,
    ExternalLinkIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const POST_STATS = [
    {
        title: "Total Posts",
        value: "247",
        change: "+12 this month",
        icon: MessageSquareTextIcon,
        trend: "up",
    },
    {
        title: "Total Engagement",
        value: "45.2K",
        change: "+18.5% from last month",
        icon: HeartIcon,
        trend: "up",
    },
    {
        title: "Average Reach",
        value: "8.7K",
        change: "+5.2% from last month",
        icon: EyeIcon,
        trend: "up",
    },
    {
        title: "Scheduled Posts",
        value: "23",
        change: "+8 this week",
        icon: CalendarIcon,
        trend: "up",
    },
];

const POSTS_DATA = [
    {
        id: 1,
        content:
            "🚀 Exciting news! We're launching our new AI-powered analytics dashboard. Get ready to supercharge your social media strategy! #AI #Analytics #SocialMedia",
        platform: "twitter",
        status: "published",
        publishedAt: "2024-01-15T10:30:00Z",
        scheduledFor: null,
        engagement: {
            likes: 245,
            comments: 18,
            shares: 32,
            views: 3200,
        },
        mediaType: "text",
        mediaUrl: null,
        author: "Marketing Team",
    },
    {
        id: 2,
        content:
            "Check out our latest blog post about social media trends for 2024! Link in bio 📈",
        platform: "instagram",
        status: "published",
        publishedAt: "2024-01-14T15:45:00Z",
        scheduledFor: null,
        engagement: {
            likes: 189,
            comments: 24,
            shares: 15,
            views: 2800,
        },
        mediaType: "image",
        mediaUrl: "/images/blog-preview.jpg",
        author: "Content Team",
    },
    {
        id: 3,
        content:
            "Behind the scenes: Our team working on the next big feature! Can you guess what it is? 🤔",
        platform: "linkedin",
        status: "scheduled",
        publishedAt: null,
        scheduledFor: "2024-01-16T09:00:00Z",
        engagement: {
            likes: 0,
            comments: 0,
            shares: 0,
            views: 0,
        },
        mediaType: "video",
        mediaUrl: "/videos/behind-scenes.mp4",
        author: "Product Team",
    },
    {
        id: 4,
        content:
            "Tips for better social media engagement:\n\n1. Post consistently\n2. Use relevant hashtags\n3. Engage with your audience\n4. Share valuable content\n\nWhat's your best tip? 💡",
        platform: "facebook",
        status: "draft",
        publishedAt: null,
        scheduledFor: null,
        engagement: {
            likes: 0,
            comments: 0,
            shares: 0,
            views: 0,
        },
        mediaType: "text",
        mediaUrl: null,
        author: "Marketing Team",
    },
    {
        id: 5,
        content:
            "Webinar alert! 🎯 Join us next week for 'Advanced Social Media Analytics' - free for all attendees. Register now! #Webinar #Analytics",
        platform: "twitter",
        status: "scheduled",
        publishedAt: null,
        scheduledFor: "2024-01-17T14:00:00Z",
        engagement: {
            likes: 0,
            comments: 0,
            shares: 0,
            views: 0,
        },
        mediaType: "link",
        mediaUrl: "https://example.com/webinar",
        author: "Events Team",
    },
    {
        id: 6,
        content:
            "Customer spotlight: See how @CompanyX increased their engagement by 150% using our platform! 🌟",
        platform: "linkedin",
        status: "published",
        publishedAt: "2024-01-13T11:20:00Z",
        scheduledFor: null,
        engagement: {
            likes: 156,
            comments: 12,
            shares: 28,
            views: 2100,
        },
        mediaType: "image",
        mediaUrl: "/images/customer-spotlight.jpg",
        author: "Success Team",
    },
];

const getPlatformColor = (platform: string) => {
    switch (platform) {
        case "twitter":
            return "bg-blue-500";
        case "instagram":
            return "bg-pink-500";
        case "linkedin":
            return "bg-blue-700";
        case "facebook":
            return "bg-blue-600";
        default:
            return "bg-gray-500";
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "published":
            return "bg-green-500";
        case "scheduled":
            return "bg-yellow-500";
        case "draft":
            return "bg-gray-500";
        default:
            return "bg-gray-500";
    }
};

const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
        case "image":
            return ImageIcon;
        case "video":
            return VideoIcon;
        case "link":
            return LinkIcon;
        default:
            return MessageSquareTextIcon;
    }
};

const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getEngagementRate = (engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
}) => {
    if (engagement.views === 0) return 0;
    return (
        ((engagement.likes + engagement.comments + engagement.shares) /
            engagement.views) *
        100
    ).toFixed(1);
};

/**
 * A React component that displays a list of posts with various filters, search functionality,
 * and detailed information about each post including engagement metrics, author, platform, etc.
 *
 * @component
 * @name PostsList
 *
 * @returns {JSX.Element} - The rendered UI component for the posts list.
 */
const PostsPage = () => {
    const [posts, setPosts] = useState(POSTS_DATA);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, _setStatusFilter] = useState("all");
    const [platformFilter, setPlatformFilter] = useState("all");
    const [activeTab, setActiveTab] = useState("all");
    const [newPost, setNewPost] = useState({
        content: "",
        platform: "",
        scheduledFor: "",
        mediaType: "text",
        author: "Marketing Team",
    });

    // Enhanced filtering and searching
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch =
                post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "all" || post.status === statusFilter;
            const matchesPlatform =
                platformFilter === "all" || post.platform === platformFilter;
            const matchesTab = activeTab === "all" || post.status === activeTab;

            return (
                matchesSearch && matchesStatus && matchesPlatform && matchesTab
            );
        });
    }, [posts, searchTerm, statusFilter, platformFilter, activeTab]);

    // Analytics calculations
    const analytics = useMemo(() => {
        const published = posts.filter(p => p.status === "published");
        const totalEngagement = published.reduce(
            (sum, post) =>
                sum +
                post.engagement.likes +
                post.engagement.comments +
                post.engagement.shares,
            0
        );
        const avgEngagement =
            published.length > 0
                ? Math.round(totalEngagement / published.length)
                : 0;
        const topPost =
            published.length > 0
                ? published.reduce((top, post) =>
                      post.engagement.views > top.engagement.views ? post : top
                  )
                : null;

        return {
            published: published.length,
            totalEngagement,
            avgEngagement,
            topPost,
        };
    }, [posts]);

    const handleCreatePost = () => {
        if (!newPost.content || !newPost.platform) {
            alert("Please fill in all required fields");
            return;
        }

        const post = {
            id: Math.max(...posts.map(p => p.id)) + 1,
            content: newPost.content,
            platform: newPost.platform,
            status: newPost.scheduledFor ? "scheduled" : "draft",
            publishedAt: null,
            scheduledFor: newPost.scheduledFor ? newPost.scheduledFor : null,
            engagement: {
                likes: 0,
                comments: 0,
                shares: 0,
                views: 0,
            },
            mediaType: newPost.mediaType,
            mediaUrl: null,
            author: newPost.author,
        };

        setPosts([post, ...posts]);
        setNewPost({
            content: "",
            platform: "",
            scheduledFor: "",
            mediaType: "text",
            author: "Marketing Team",
        });
        setIsCreateDialogOpen(false);
        alert("Post created successfully!");
    };

    const handleDeletePost = (postId: number) => {
        setPosts(posts.filter(post => post.id !== postId));
        alert("Post deleted successfully!");
    };

    const handlePublishPost = (postId: number) => {
        setPosts(
            posts.map(post =>
                post.id === postId
                    ? {
                          ...post,
                          status: "published",
                          publishedAt: new Date().toISOString(),
                          engagement: {
                              ...post.engagement,
                              views: Math.floor(Math.random() * 1000) + 500,
                          },
                      }
                    : post
            )
        );
        alert("Post published successfully!");
    };

    const handleDuplicatePost = (post: typeof posts[0]) => {
        const duplicatedPost = {
            ...post,
            id: Math.max(...posts.map(p => p.id)) + 1,
            status: "draft" as const,
            publishedAt: null,
            scheduledFor: null as string | null,
            engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
            content: post.content + " (Copy)",
        };
        setPosts([duplicatedPost, ...posts]);
        alert("Post duplicated successfully!");
    };

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            {/* Enhanced Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Social Media Posts
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Create, schedule, and manage your social media content
                        across all platforms
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <TrendingUpIcon className="w-4 h-4" />
                            {analytics.published} published
                        </span>
                        <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {
                                posts.filter(p => p.status === "scheduled")
                                    .length
                            }{" "}
                            scheduled
                        </span>
                        <span className="flex items-center gap-1">
                            <FileTextIcon className="w-4 h-4" />
                            {
                                posts.filter(p => p.status === "draft").length
                            }{" "}
                            drafts
                        </span>
                    </div>
                </div>
                <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                            <PlusIcon className="w-4 h-4" />
                            Create Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Create New Post</DialogTitle>
                            <DialogDescription>
                                Create engaging social media content. You can
                                publish immediately, schedule for later, or save
                                as draft.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="content">Content *</Label>
                                <Textarea
                                    id="content"
                                    placeholder="What's on your mind? Share something engaging..."
                                    value={newPost.content}
                                    onChange={e =>
                                        setNewPost({
                                            ...newPost,
                                            content: e.target.value,
                                        })
                                    }
                                    className="min-h-[120px] resize-none"
                                />
                                <div className="text-xs text-muted-foreground text-right">
                                    {newPost.content.length}/280 characters
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="platform">Platform *</Label>
                                    <Select
                                        value={newPost.platform}
                                        onValueChange={value =>
                                            setNewPost({
                                                ...newPost,
                                                platform: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="twitter">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                    Twitter
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="instagram">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                                                    Instagram
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="linkedin">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-700" />
                                                    LinkedIn
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="facebook">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                                    Facebook
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mediaType">
                                        Media Type
                                    </Label>
                                    <Select
                                        value={newPost.mediaType}
                                        onValueChange={value =>
                                            setNewPost({
                                                ...newPost,
                                                mediaType: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">
                                                Text Only
                                            </SelectItem>
                                            <SelectItem value="image">
                                                Image
                                            </SelectItem>
                                            <SelectItem value="video">
                                                Video
                                            </SelectItem>
                                            <SelectItem value="link">
                                                Link
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="author">Author</Label>
                                    <Select
                                        value={newPost.author}
                                        onValueChange={value =>
                                            setNewPost({
                                                ...newPost,
                                                author: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Marketing Team">
                                                Marketing Team
                                            </SelectItem>
                                            <SelectItem value="Content Team">
                                                Content Team
                                            </SelectItem>
                                            <SelectItem value="Product Team">
                                                Product Team
                                            </SelectItem>
                                            <SelectItem value="Success Team">
                                                Success Team
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="scheduledFor">
                                        Schedule For (Optional)
                                    </Label>
                                    <Input
                                        id="scheduledFor"
                                        type="datetime-local"
                                        value={newPost.scheduledFor}
                                        onChange={e =>
                                            setNewPost({
                                                ...newPost,
                                                scheduledFor: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsCreateDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreatePost}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {newPost.scheduledFor
                                    ? "Schedule Post"
                                    : "Save as Draft"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {POST_STATS.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <Card
                            key={index}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <IconComponent className="h-4 w-4 text-blue-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stat.value}
                                </div>
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                    <TrendingUpIcon className="w-3 h-3" />
                                    {stat.change}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Enhanced Filters and Search */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">
                            <div className="relative flex-1 max-w-sm">
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search posts or authors..."
                                    value={searchTerm}
                                    onChange={e =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                            <Select
                                value={platformFilter}
                                onValueChange={setPlatformFilter}
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Platforms
                                    </SelectItem>
                                    <SelectItem value="twitter">
                                        Twitter
                                    </SelectItem>
                                    <SelectItem value="instagram">
                                        Instagram
                                    </SelectItem>
                                    <SelectItem value="linkedin">
                                        LinkedIn
                                    </SelectItem>
                                    <SelectItem value="facebook">
                                        Facebook
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {filteredPosts.length} of {posts.length} posts
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Enhanced Tabs */}
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-6"
            >
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                        All Posts ({posts.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="published"
                        className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                        Published (
                        {posts.filter(p => p.status === "published").length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="scheduled"
                        className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                    >
                        Scheduled (
                        {posts.filter(p => p.status === "scheduled").length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="draft"
                        className="data-[state=active]:bg-gray-600 data-[state=active]:text-white"
                    >
                        Drafts ({posts.filter(p => p.status === "draft").length}
                        )
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Enhanced Posts List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Posts
                        {analytics.topPost && (
                            <Badge variant="outline" className="text-xs">
                                Top performer:{" "}
                                {analytics.topPost.engagement.views} views
                            </Badge>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <MessageSquareTextIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No posts found matching your criteria.</p>
                            </div>
                        ) : (
                            filteredPosts.map(post => {
                                const MediaIcon = getMediaIcon(post.mediaType);
                                const engagementRate = getEngagementRate(
                                    post.engagement
                                );

                                return (
                                    <div
                                        key={post.id}
                                        className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${getPlatformColor(post.platform)}`}
                                                />
                                                <Badge
                                                    variant="outline"
                                                    className={`${getStatusColor(post.status)} text-white border-none text-xs`}
                                                >
                                                    {post.status}
                                                </Badge>
                                                <span className="text-sm text-muted-foreground capitalize font-medium">
                                                    {post.platform}
                                                </span>
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <MediaIcon className="w-4 h-4" />
                                                    <span className="text-xs">
                                                        {post.mediaType}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    by {post.author}
                                                </span>
                                                {post.status === "published" &&
                                                    engagementRate > 5 && (
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-green-50 text-green-700 border-green-200"
                                                        >
                                                            High engagement
                                                        </Badge>
                                                    )}
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="hover:bg-gray-100"
                                                    >
                                                        <MoreHorizontalIcon className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-48"
                                                >
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem className="hover:bg-gray-50">
                                                        <EditIcon className="w-4 h-4 mr-2" />
                                                        Edit Post
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDuplicatePost(
                                                                post
                                                            )
                                                        }
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <Copy className="w-4 h-4 mr-2" />
                                                        Duplicate
                                                    </DropdownMenuItem>
                                                    {post.status ===
                                                        "published" && (
                                                        <DropdownMenuItem className="hover:bg-gray-50">
                                                            <ExternalLinkIcon className="w-4 h-4 mr-2" />
                                                            View on Platform
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuSeparator />
                                                    {post.status ===
                                                        "draft" && (
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handlePublishPost(
                                                                    post.id
                                                                )
                                                            }
                                                            className="hover:bg-blue-50 text-blue-600"
                                                        >
                                                            <SendIcon className="w-4 h-4 mr-2" />
                                                            Publish Now
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDeletePost(
                                                                post.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:bg-red-50"
                                                    >
                                                        <TrashIcon className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-sm leading-relaxed text-gray-900">
                                                {post.content}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-6">
                                                {post.status === "published" ? (
                                                    <>
                                                        <span className="flex items-center gap-1 text-muted-foreground hover:text-red-500 cursor-pointer transition-colors">
                                                            <HeartIcon className="w-4 h-4" />
                                                            {
                                                                post.engagement
                                                                    .likes
                                                            }
                                                        </span>
                                                        <span className="flex items-center gap-1 text-muted-foreground hover:text-blue-500 cursor-pointer transition-colors">
                                                            <MessageCircleIcon className="w-4 h-4" />
                                                            {
                                                                post.engagement
                                                                    .comments
                                                            }
                                                        </span>
                                                        <span className="flex items-center gap-1 text-muted-foreground hover:text-green-500 cursor-pointer transition-colors">
                                                            <ShareIcon className="w-4 h-4" />
                                                            {
                                                                post.engagement
                                                                    .shares
                                                            }
                                                        </span>
                                                        <span className="flex items-center gap-1 text-muted-foreground">
                                                            <EyeIcon className="w-4 h-4" />
                                                            {
                                                                post.engagement
                                                                    .views
                                                            }
                                                        </span>
                                                        {engagementRate > 0 && (
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {engagementRate}
                                                                % engagement
                                                            </Badge>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-muted-foreground text-xs">
                                                        {post.status ===
                                                        "scheduled"
                                                            ? "Waiting to publish"
                                                            : "Ready to schedule or publish"}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span className="text-xs">
                                                    {post.status === "published"
                                                        ? `Published ${formatDate(post.publishedAt)}`
                                                        : post.status ===
                                                            "scheduled"
                                                          ? `Scheduled for ${formatDate(post.scheduledFor)}`
                                                          : "Draft saved"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostsPage;
