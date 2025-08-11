"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
    Copy,
    MoreHorizontal,
    Plus,
    Trash2,
    Edit,
    KeyIcon,
    Activity,
    Calendar,
    Shield,
} from "lucide-react";
import { toast } from "sonner";
import { Container } from "@/components";
import {
    useApiKeys,
    useCreateApiKey,
    useUpdateApiKey,
    useDeleteApiKey,
} from "@/hooks/use-api-keys";

export function ApiKeysManagement() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [setIsEditDialogOpen] = useState(false);
    const [setEditingKey] = useState<any>(null);
    const [newKeyName, setNewKeyName] = useState("");
    const [newKeyExpiry, setNewKeyExpiry] = useState("");
    const [createdKey, setCreatedKey] = useState<string | null>(null);

    const { data: apiKeysData } = useApiKeys();
    const createApiKey = useCreateApiKey();
    const updateApiKey = useUpdateApiKey();
    const deleteApiKey = useDeleteApiKey();

    const handleCreateApiKey = async () => {
        if (!newKeyName.trim()) {
            toast.error("Please enter a name for the API key");
            return;
        }

        try {
            const result = await createApiKey.mutateAsync({
                name: newKeyName,
                expiresAt: newKeyExpiry || undefined,
            });

            setCreatedKey(result.apiKey.key!);
            setNewKeyName("");
            setNewKeyExpiry("");
        } catch (error) {
            console.error("Failed to create API key:", error);
        }
    };

    const handleCopyKey = (key: string) => {
        navigator.clipboard.writeText(key);
        toast.success("API key copied to clipboard");
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        try {
            await updateApiKey.mutateAsync({ id, isActive: !isActive });
        } catch (error) {
            console.error("Failed to update API key:", error);
        }
    };

    const handleDeleteKey = async (id: string) => {
        if (
            confirm(
                "Are you sure you want to delete this API key? This action cannot be undone."
            )
        ) {
            try {
                await deleteApiKey.mutateAsync({ id });
            } catch (error) {
                console.error("Failed to delete API key:", error);
            }
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "Never";
        return new Date(date).toLocaleDateString();
    };

    const activeKeys =
        apiKeysData?.apiKeys?.filter((key: { isActive: any }) => key.isActive)
            .length || 0;
    const totalKeys = apiKeysData?.apiKeys?.length || 0;
    const recentlyUsed =
        apiKeysData?.apiKeys?.filter(
            (key: { lastUsedAt: string | number | Date }) =>
                key.lastUsedAt &&
                new Date(key.lastUsedAt) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto px-6 py-8 max-w-7xl">
                {/* Header Section */}
                <Container>
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                API Keys
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Manage your API keys for secure access to your
                                account.
                            </p>
                        </div>
                        <Dialog
                            open={isCreateDialogOpen}
                            onOpenChange={setIsCreateDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    size="lg"
                                    className="shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    Create API Key
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <KeyIcon className="h-5 w-5" />
                                        Create New API Key
                                    </DialogTitle>
                                    <DialogDescription>
                                        Create a new API key for programmatic
                                        access to your account.
                                    </DialogDescription>
                                </DialogHeader>

                                {createdKey ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                            <Label className="text-sm font-medium text-green-800 dark:text-green-200">
                                                Your new API key
                                            </Label>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <Input
                                                    value={createdKey}
                                                    readOnly
                                                    className="font-mono text-sm bg-white dark:bg-green-950/30 border-green-300 dark:border-green-700"
                                                    aria-label="Generated API key"
                                                    aria-describedby="api-key-warning"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleCopyKey(
                                                            createdKey
                                                        )
                                                    }
                                                    className="shrink-0"
                                                    aria-label="Copy API key"
                                                >
                                                    <Copy
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                </Button>
                                            </div>
                                            <p
                                                id="api-key-warning"
                                                className="text-sm text-green-700 dark:text-green-300 mt-2 flex items-center gap-1"
                                            >
                                                <Shield
                                                    className="h-3 w-3"
                                                    aria-hidden="true"
                                                />
                                                Make sure to copy your API key
                                                now. You won't be able to see it
                                                again!
                                            </p>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                onClick={() => {
                                                    setCreatedKey(null);
                                                    setIsCreateDialogOpen(
                                                        false
                                                    );
                                                }}
                                                className="w-full"
                                            >
                                                Done
                                            </Button>
                                        </DialogFooter>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="name"
                                                className="text-sm font-medium"
                                            >
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                placeholder="My API Key"
                                                value={newKeyName}
                                                onChange={e =>
                                                    setNewKeyName(
                                                        e.target.value
                                                    )
                                                }
                                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="expiry"
                                                className="text-sm font-medium"
                                            >
                                                Expiry Date (Optional)
                                            </Label>
                                            <Input
                                                id="expiry"
                                                type="date"
                                                value={newKeyExpiry}
                                                onChange={e =>
                                                    setNewKeyExpiry(
                                                        e.target.value
                                                    )
                                                }
                                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        <DialogFooter className="gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsCreateDialogOpen(false)
                                                }
                                                className="flex-1"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleCreateApiKey}
                                                disabled={
                                                    createApiKey.isPending
                                                }
                                                className="flex-1"
                                            >
                                                {createApiKey.isPending
                                                    ? "Creating..."
                                                    : "Create API Key"}
                                            </Button>
                                        </DialogFooter>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                </Container>

                {/* Enhanced Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    <Container>
                        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                                <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                    Total API Keys
                                </CardTitle>
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <KeyIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative">
                                <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                                    {totalKeys}
                                </div>
                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                    Keys in your account
                                </p>
                            </CardContent>
                        </Card>
                    </Container>

                    <Container delay={0.1}>
                        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                                <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                                    Active Keys
                                </CardTitle>
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative">
                                <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                                    {activeKeys}
                                </div>
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                    Currently active
                                </p>
                            </CardContent>
                        </Card>
                    </Container>

                    <Container delay={0.2}>
                        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                                <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                    Recently Used
                                </CardTitle>
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative">
                                <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                                    {recentlyUsed}
                                </div>
                                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                                    Used this week
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                </div>

                {/* Enhanced API Keys Table */}
                <Container delay={0.3}>
                    <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                        <CardHeader className="border-b bg-gradient-to-r from-background to-muted/20">
                            <CardTitle className="text-xl font-semibold flex items-center gap-2">
                                <KeyIcon className="h-5 w-5" />
                                Your API Keys
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {totalKeys === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 px-6">
                                    <div className="p-4 bg-muted/50 rounded-full mb-4">
                                        <KeyIcon className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        No API keys found
                                    </h3>
                                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                                        Create your first API key to get started
                                        with programmatic access to your
                                        account.
                                    </p>
                                    <Button
                                        onClick={() =>
                                            setIsCreateDialogOpen(true)
                                        }
                                        size="lg"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Your First API Key
                                    </Button>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-b bg-muted/30">
                                                <TableHead className="font-semibold">
                                                    Name
                                                </TableHead>
                                                <TableHead className="font-semibold">
                                                    Key
                                                </TableHead>
                                                <TableHead className="font-semibold">
                                                    Status
                                                </TableHead>
                                                <TableHead className="font-semibold">
                                                    Created
                                                </TableHead>
                                                <TableHead className="font-semibold">
                                                    Expires
                                                </TableHead>
                                                <TableHead className="font-semibold text-right">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {apiKeysData?.apiKeys?.map(
                                                (apiKey: {
                                                    id:
                                                        | any[]
                                                        | React.Key
                                                        | null
                                                        | undefined;
                                                    name:
                                                        | string
                                                        | number
                                                        | bigint
                                                        | boolean
                                                        | React.ReactElement<
                                                              any,
                                                              | string
                                                              | React.JSXElementConstructor<any>
                                                          >
                                                        | Iterable<React.ReactNode>
                                                        | React.ReactPortal
                                                        | Promise<React.AwaitedReactNode>
                                                        | null
                                                        | undefined;
                                                    isActive: boolean;
                                                    createdAt: Date | null;
                                                    expiresAt: Date | null;
                                                }) => (
                                                    <TableRow
                                                        key={apiKey.id}
                                                        className="hover:bg-muted/30 transition-colors"
                                                    >
                                                        <TableCell className="font-medium py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="p-1.5 bg-primary/10 rounded">
                                                                    <KeyIcon className="h-3 w-3 text-primary" />
                                                                </div>
                                                                {apiKey.name}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div className="flex items-center gap-2">
                                                                <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
                                                                    {`${apiKey.id.slice(0, 8)}...${apiKey.id.slice(-4)}`}
                                                                </code>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() =>
                                                                        handleCopyKey(
                                                                            apiKey.id
                                                                        )
                                                                    }
                                                                    className="h-6 w-6 p-0"
                                                                >
                                                                    <Copy className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div className="flex items-center space-x-3">
                                                                <Switch
                                                                    checked={
                                                                        apiKey.isActive
                                                                    }
                                                                    onCheckedChange={() =>
                                                                        handleToggleActive(
                                                                            apiKey.id,
                                                                            apiKey.isActive
                                                                        )
                                                                    }
                                                                    size="sm"
                                                                />
                                                                <Badge
                                                                    variant={
                                                                        apiKey.isActive
                                                                            ? "default"
                                                                            : "secondary"
                                                                    }
                                                                    className={
                                                                        apiKey.isActive
                                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {apiKey.isActive
                                                                        ? "Active"
                                                                        : "Inactive"}
                                                                </Badge>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4 text-muted-foreground">
                                                            {formatDate(
                                                                apiKey.createdAt
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="py-4 text-muted-foreground">
                                                            {formatDate(
                                                                apiKey.expiresAt
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="py-4 text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-8 w-8 p-0"
                                                                        aria-label={`Actions for API key ${apiKey.name}`}
                                                                    >
                                                                        <MoreHorizontal
                                                                            className="h-4 w-4"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent
                                                                    align="end"
                                                                    className="w-48"
                                                                >
                                                                    <DropdownMenuItem
                                                                        onClick={() => {
                                                                            setEditingKey(
                                                                                apiKey
                                                                            );
                                                                            setIsEditDialogOpen(
                                                                                true
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleCopyKey(
                                                                                apiKey.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <Copy className="mr-2 h-4 w-4" />
                                                                        Copy Key
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleDeleteKey(
                                                                                apiKey.id
                                                                            )
                                                                        }
                                                                        className="text-destructive focus:text-destructive"
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </div>
    );
}

export default ApiKeysManagement;
