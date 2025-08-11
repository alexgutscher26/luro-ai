import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

const meta: Meta<typeof Table> = {
    title: "UI/Table",
    component: Table,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const userData = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        lastLogin: "2024-01-15",
        avatar: "/avatars/01.png",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Editor",
        status: "Active",
        lastLogin: "2024-01-14",
        avatar: "/avatars/02.png",
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Viewer",
        status: "Inactive",
        lastLogin: "2024-01-10",
        avatar: "/avatars/03.png",
    },
    {
        id: "4",
        name: "Alice Brown",
        email: "alice@example.com",
        role: "Editor",
        status: "Active",
        lastLogin: "2024-01-16",
        avatar: "/avatars/04.png",
    },
];

export const UserManagementTable: Story = {
    render: () => (
        <div className="w-[800px]">
            <Table>
                <TableCaption>
                    A list of users and their information.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>
                            <Button
                                variant="ghost"
                                className="h-auto p-0 font-semibold"
                            >
                                Role
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button
                                variant="ghost"
                                className="h-auto p-0 font-semibold"
                            >
                                Status
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button
                                variant="ghost"
                                className="h-auto p-0 font-semibold"
                            >
                                Last Login
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userData.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback>
                                            {user.name
                                                .split(" ")
                                                .map(n => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">
                                            {user.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        user.role === "Admin"
                                            ? "default"
                                            : user.role === "Editor"
                                              ? "secondary"
                                              : "outline"
                                    }
                                >
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        user.status === "Active"
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    {user.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <span className="sr-only">
                                                Open menu
                                            </span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            View profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Edit user
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Reset password
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            Delete user
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    ),
};
