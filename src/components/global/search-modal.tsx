"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    SearchIcon,
    FileIcon,
    UserIcon,
    SettingsIcon,
    BarChart3Icon,
    MegaphoneIcon,
    CreditCardIcon,
    XIcon,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/functions";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import Link from "next/link";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SearchResult {
    id: string;
    title: string;
    description: string;
    href: string;
    category: string;
    icon: React.ComponentType<{ className?: string }>;
}

// Mock search data - replace with actual search implementation
const SEARCH_DATA: SearchResult[] = [
    {
        id: "dashboard",
        title: "Dashboard",
        description: "View your analytics and overview",
        href: "/app",
        category: "Pages",
        icon: BarChart3Icon,
    },
    {
        id: "posts",
        title: "Posts",
        description: "Manage your social media posts",
        href: "/app/posts",
        category: "Pages",
        icon: FileIcon,
    },
    {
        id: "campaigns",
        title: "Campaigns",
        description: "Create and manage marketing campaigns",
        href: "/app/campaigns",
        category: "Pages",
        icon: MegaphoneIcon,
    },
    {
        id: "engagement",
        title: "Engagement",
        description: "Track audience engagement metrics",
        href: "/app/engagement",
        category: "Pages",
        icon: UserIcon,
    },
    {
        id: "billing",
        title: "Billing",
        description: "Manage your subscription and payments",
        href: "/app/billing",
        category: "Pages",
        icon: CreditCardIcon,
    },
    {
        id: "settings",
        title: "Settings",
        description: "Configure your account preferences",
        href: "/app/settings",
        category: "Pages",
        icon: SettingsIcon,
    },
];

const searchFunction = async (query: string): Promise<SearchResult[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    if (!query.trim()) return [];

    return SEARCH_DATA.filter(
        item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
    );
};

export const SearchModal: React.FC<SearchModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const { searchTerm, setSearchTerm, results, isLoading, clearSearch } =
        useDebouncedSearch({
            searchFn: searchFunction,
            delay: 200,
            minLength: 1,
        });

    // Reset selected index when results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [results]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!results.length) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < results.length - 1 ? prev + 1 : 0
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev > 0 ? prev - 1 : results.length - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (results[selectedIndex]) {
                    handleResultClick(results[selectedIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                onClose();
                break;
        }
    };

    const handleResultClick = (result: SearchResult) => {
        onClose();
        // Navigation will be handled by the Link component
    };

    const handleClose = () => {
        clearSearch();
        setSelectedIndex(0);
        onClose();
    };

    const groupedResults = results.reduce(
        (acc, result) => {
            if (!acc[result.category]) {
                acc[result.category] = [];
            }
            acc[result.category].push(result);
            return acc;
        },
        {} as Record<string, SearchResult[]>
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl p-0 gap-0 [&>button]:hidden">
                <DialogHeader className="p-4 pb-2 border-b">
                    <div className="flex items-center gap-3">
                        <SearchIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <Input
                            ref={inputRef}
                            placeholder="Search pages, settings, and more..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base bg-transparent"
                        />
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {searchTerm && (
                                <Badge
                                    variant="secondary"
                                    className="text-xs px-2 py-1"
                                >
                                    {results.length} result
                                    {results.length !== 1 ? "s" : ""}
                                </Badge>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClose}
                                className="h-8 w-8 p-0 hover:bg-accent"
                            >
                                <XIcon className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div
                    ref={resultsRef}
                    className="max-h-96 overflow-y-auto px-4 pb-4"
                >
                    {isLoading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex flex-col items-center gap-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />

                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />

                                <div className="text-sm text-muted-foreground">
                                    Searching...
                                </div>
                            </div>
                        </div>
                    )}

                    {!isLoading && searchTerm && results.length === 0 && (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex flex-col items-center gap-3 text-center">
                                <SearchIcon className="h-8 w-8 text-muted-foreground/50" />
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-foreground">
                                        No results found
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Try searching for something else
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isLoading && !searchTerm && (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex flex-col items-center gap-4 text-center max-w-sm">
                                <div className="p-3 rounded-full bg-accent/50">
                                    <SearchIcon className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-foreground">
                                        Search anything
                                    </div>
                                    <div className="text-xs text-muted-foreground leading-relaxed">
                                        Find pages, settings, and features
                                        quickly. Try searching for "dashboard",
                                        "settings", or "billing".
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <kbd className="px-2 py-1 bg-accent rounded text-xs font-mono">
                                        ↑
                                    </kbd>
                                    <kbd className="px-2 py-1 bg-accent rounded text-xs font-mono">
                                        ↓
                                    </kbd>
                                    <span>to navigate</span>
                                    <kbd className="px-2 py-1 bg-accent rounded text-xs font-mono">
                                        ↵
                                    </kbd>
                                    <span>to select</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isLoading && results.length > 0 && (
                        <div className="space-y-4">
                            {Object.entries(groupedResults).map(
                                ([category, categoryResults]) => (
                                    <div key={category}>
                                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                            {category}
                                        </div>
                                        <div className="space-y-1">
                                            {categoryResults.map(
                                                (result, index) => {
                                                    const globalIndex =
                                                        results.findIndex(
                                                            r =>
                                                                r.id ===
                                                                result.id
                                                        );
                                                    const isSelected =
                                                        globalIndex ===
                                                        selectedIndex;
                                                    const Icon = result.icon;

                                                    return (
                                                        <Link
                                                            key={result.id}
                                                            href={result.href}
                                                            onClick={() =>
                                                                handleResultClick(
                                                                    result
                                                                )
                                                            }
                                                            className={cn(
                                                                "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                                                                isSelected
                                                                    ? "bg-accent text-accent-foreground"
                                                                    : "hover:bg-accent/50"
                                                            )}
                                                        >
                                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium text-sm">
                                                                    {
                                                                        result.title
                                                                    }
                                                                </div>
                                                                <div className="text-xs text-muted-foreground truncate">
                                                                    {
                                                                        result.description
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>

                {results.length > 0 && (
                    <div className="border-t px-4 py-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                                Use ↑↓ to navigate, ↵ to select, esc to close
                            </span>
                            <Badge variant="secondary" className="text-xs">
                                {results.length} result
                                {results.length !== 1 ? "s" : ""}
                            </Badge>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
