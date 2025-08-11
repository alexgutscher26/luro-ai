"use client";

import React, { useState } from "react";
import {
    CreditCardIcon,
    DollarSignIcon,
    CalendarIcon,
    TrendingUpIcon,
    DownloadIcon,
    EditIcon,
    PlusIcon,
    CheckIcon,
    AlertCircleIcon,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const BILLING_STATS = [
    {
        title: "Current Plan",
        value: "Pro",
        change: "$10/month",
        icon: CreditCardIcon,
        trend: "up",
    },
    {
        title: "Monthly Spend",
        value: "$10.00",
        change: "Due Jan 15, 2024",
        icon: DollarSignIcon,
        trend: "up",
    },
    {
        title: "Usage This Month",
        value: "75%",
        change: "7.5K of 10K requests",
        icon: TrendingUpIcon,
        trend: "up",
    },
    {
        title: "Next Billing",
        value: "15 days",
        change: "January 15, 2024",
        icon: CalendarIcon,
        trend: "up",
    },
];

const BILLING_HISTORY = [
    {
        id: 1,
        date: "2023-12-15",
        description: "Pro Plan - Monthly Subscription",
        amount: "$10.00",
        status: "paid",
        invoice: "INV-2023-12-001",
    },
    {
        id: 2,
        date: "2023-11-15",
        description: "Pro Plan - Monthly Subscription",
        amount: "$10.00",
        status: "paid",
        invoice: "INV-2023-11-001",
    },
    {
        id: 3,
        date: "2023-10-15",
        description: "Pro Plan - Monthly Subscription",
        amount: "$10.00",
        status: "paid",
        invoice: "INV-2023-10-001",
    },
    {
        id: 4,
        date: "2023-09-15",
        description: "Pro Plan - Monthly Subscription",
        amount: "$10.00",
        status: "paid",
        invoice: "INV-2023-09-001",
    },
    {
        id: 5,
        date: "2023-08-15",
        description: "Pro Plan - Monthly Subscription",
        amount: "$10.00",
        status: "failed",
        invoice: "INV-2023-08-001",
    },
];

const PAYMENT_METHODS = [
    {
        id: 1,
        type: "card",
        last4: "4242",
        brand: "Visa",
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
    },
    {
        id: 2,
        type: "card",
        last4: "5555",
        brand: "Mastercard",
        expiryMonth: 8,
        expiryYear: 2026,
        isDefault: false,
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "paid":
            return "bg-green-100 text-green-800 border-green-200";
        case "failed":
            return "bg-red-100 text-red-800 border-red-200";
        case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

/**
 * Renders the billing page component with various sections for managing payment methods, plans, and history.
 */
const BillingPage = () => {
    const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
    const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
    const [newPaymentMethod, setNewPaymentMethod] = useState({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
        name: "",
    });

    const handleAddPaymentMethod = () => {
        // Add payment method logic here
        toast.success("Payment method added successfully!");
        setIsAddPaymentOpen(false);
        setNewPaymentMethod({
            cardNumber: "",
            expiryMonth: "",
            expiryYear: "",
            cvc: "",
            name: "",
        });
    };

    const handleDownloadInvoice = (invoice: string) => {
        // Download invoice logic here
        toast.success(`Downloading invoice ${invoice}`);
    };

    return (
        <div className="p-4 w-full">
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Billing & Subscription
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your subscription, billing history, and
                            payment methods
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Dialog
                            open={isChangePlanOpen}
                            onOpenChange={setIsChangePlanOpen}
                        >
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <EditIcon className="h-4 w-4 mr-2" />
                                    Change Plan
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Change Subscription Plan
                                    </DialogTitle>
                                    <DialogDescription>
                                        Choose a different plan that better fits
                                        your needs.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="border rounded-lg p-4 bg-black border-gray-700">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-white">
                                                        Current plan
                                                    </h3>
                                                </div>
                                                <div className="text-right">
                                                    <Badge className="bg-blue-600 text-white border-blue-500">
                                                        Current
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 bg-black text-white border-gray-700 cursor-pointer hover:bg-gray-900 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-white">
                                                        Enterprise Plan
                                                    </h3>
                                                    <p className="text-sm text-gray-300">
                                                        For larger teams
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-white">
                                                        $15/month
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setIsChangePlanOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            toast.success(
                                                "Plan change scheduled for next billing cycle"
                                            );
                                            setIsChangePlanOpen(false);
                                        }}
                                    >
                                        Confirm Change
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    {BILLING_STATS.map((stat, index) => {
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
                                        <div className="text-2xl font-bold">
                                            {stat.value}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {stat.change}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Container>
                        );
                    })}
                </div>

                {/* Current Plan & Usage */}
                <Container delay={0.4}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Current Plan & Usage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-3">
                                        Pro Plan
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <CheckIcon className="h-4 w-4 text-green-500" />
                                            <span className="text-sm">
                                                Advanced AI content generation
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckIcon className="h-4 w-4 text-green-500" />
                                            <span className="text-sm">
                                                10 social media integrations
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckIcon className="h-4 w-4 text-green-500" />
                                            <span className="text-sm">
                                                Priority email support
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckIcon className="h-4 w-4 text-green-500" />
                                            <span className="text-sm">
                                                10 project limit
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-3">
                                        Usage This Month
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>API Requests</span>
                                                <span>7,500 / 10,000</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: "75%" }}

                                                ></div>

                                                />

                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Projects</span>
                                                <span>6 / 10</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full"
                                                    style={{ width: "60%" }}

                                                ></div>

                                                />

                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Integrations</span>
                                                <span>4 / 10</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-purple-600 h-2 rounded-full"
                                                    style={{ width: "40%" }}

                                                ></div>

                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Container>

                {/* Payment Methods */}
                <Container delay={0.5}>
                    <Card className="mb-6">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Payment Methods</CardTitle>
                            <Dialog
                                open={isAddPaymentOpen}
                                onOpenChange={setIsAddPaymentOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <PlusIcon className="h-4 w-4 mr-2" />
                                        Add Payment Method
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add Payment Method
                                        </DialogTitle>
                                        <DialogDescription>
                                            Add a new credit or debit card to
                                            your account.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="cardNumber">
                                                Card Number
                                            </Label>
                                            <Input
                                                id="cardNumber"
                                                placeholder="1234 5678 9012 3456"
                                                value={
                                                    newPaymentMethod.cardNumber
                                                }
                                                onChange={e =>
                                                    setNewPaymentMethod({
                                                        ...newPaymentMethod,
                                                        cardNumber:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="expiryMonth">
                                                    Expiry Month
                                                </Label>
                                                <Select
                                                    value={
                                                        newPaymentMethod.expiryMonth
                                                    }
                                                    onValueChange={value =>
                                                        setNewPaymentMethod({
                                                            ...newPaymentMethod,
                                                            expiryMonth: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Month" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Array.from(
                                                            { length: 12 },
                                                            (_, i) => (
                                                                <SelectItem
                                                                    key={i + 1}
                                                                    value={(
                                                                        i + 1
                                                                    )
                                                                        .toString()
                                                                        .padStart(
                                                                            2,
                                                                            "0"
                                                                        )}
                                                                >
                                                                    {(i + 1)
                                                                        .toString()
                                                                        .padStart(
                                                                            2,
                                                                            "0"
                                                                        )}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="expiryYear">
                                                    Expiry Year
                                                </Label>
                                                <Select
                                                    value={
                                                        newPaymentMethod.expiryYear
                                                    }
                                                    onValueChange={value =>
                                                        setNewPaymentMethod({
                                                            ...newPaymentMethod,
                                                            expiryYear: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Array.from(
                                                            { length: 10 },
                                                            (_, i) => {
                                                                const year =
                                                                    new Date().getFullYear() +
                                                                    i;
                                                                return (
                                                                    <SelectItem
                                                                        key={
                                                                            year
                                                                        }
                                                                        value={year.toString()}
                                                                    >
                                                                        {year}
                                                                    </SelectItem>
                                                                );
                                                            }
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="cvc">CVC</Label>
                                                <Input
                                                    id="cvc"
                                                    placeholder="123"
                                                    value={newPaymentMethod.cvc}
                                                    onChange={e =>
                                                        setNewPaymentMethod({
                                                            ...newPaymentMethod,
                                                            cvc: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="name">
                                                    Cardholder Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    placeholder="John Doe"
                                                    value={
                                                        newPaymentMethod.name
                                                    }
                                                    onChange={e =>
                                                        setNewPaymentMethod({
                                                            ...newPaymentMethod,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setIsAddPaymentOpen(false)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleAddPaymentMethod}
                                        >
                                            Add Payment Method
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {PAYMENT_METHODS.map(method => (
                                    <div
                                        key={method.id}
                                        className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <div className="font-medium">
                                                    {method.brand} ••••{" "}
                                                    {method.last4}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Expires {method.expiryMonth}
                                                    /{method.expiryYear}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {method.isDefault && (
                                                <Badge variant="secondary">
                                                    Default
                                                </Badge>
                                            )}
                                            <Button variant="ghost" size="sm">
                                                <EditIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Container>

                {/* Billing History */}
                <Container delay={0.6}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {BILLING_HISTORY.map(bill => (
                                    <div
                                        key={bill.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-black hover:text-white hover:border-gray-600 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-800 transition-colors">
                                                {bill.status === "paid" ? (
                                                    <CheckIcon className="h-5 w-5 text-green-600 group-hover:text-green-400" />
                                                ) : (
                                                    <AlertCircleIcon className="h-5 w-5 text-red-600 group-hover:text-red-400" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {bill.description}
                                                </div>
                                                <div className="text-sm text-muted-foreground group-hover:text-gray-300">
                                                    {formatDate(bill.date)} •{" "}
                                                    {bill.invoice}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge
                                                className={`${getStatusColor(bill.status)} group-hover:bg-gray-700 group-hover:text-white group-hover:border-gray-600`}
                                            >
                                                {bill.status}
                                            </Badge>
                                            <div className="font-medium">
                                                {bill.amount}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="group-hover:bg-gray-800 group-hover:text-white group-hover:hover:bg-gray-700"
                                                onClick={() =>
                                                    handleDownloadInvoice(
                                                        bill.invoice
                                                    )
                                                }
                                            >
                                                <DownloadIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default BillingPage;
