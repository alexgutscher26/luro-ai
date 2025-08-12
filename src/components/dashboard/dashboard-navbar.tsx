"use client";

import { useState } from "react";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import Icons from "@/components/global/icons";
import { HelpCircleIcon, ZapIcon, CrownIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/constants/plans";

/**
 * Dashboard navigation bar component.
 *
 * This component renders a fixed header with branding and upgrade options. It includes a modal dialog for displaying
 * details about the Pro plan, including pricing and features. The component also contains links to help documentation
 * and a mobile sidebar.
 *
 * @returns JSX element representing the dashboard navbar.
 */
const DashboardNavbar = () => {
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    // Get the Pro plan from constants
    const proPlan = PLANS.find(plan => plan.id === "pro");

    return (
        <header
            id="dashboard-navbar"
            className="fixed top-0 inset-x-0 w-full h-16 bg-background/40 backdrop-blur-md border-b border-border/50 px-4 z-50"
        >
            <Container className="flex items-center justify-between size-full">
                <div className="flex items-center">
                    <Link href="/app" className="flex items-center gap-x-2">
                        {typeof Icons.icon === "function" && (
                            <Icons.icon className="w-6" />
                        )}

                        <span className="text-lg font-semibold">Luro</span>
                    </Link>
                </div>
                <div className="flex items-center gap-x-2">
                    <Dialog
                        open={isUpgradeModalOpen}
                        onOpenChange={setIsUpgradeModalOpen}
                    >
                        <DialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                                <ZapIcon className="size-4 mr-1.5 text-orange-500 fill-orange-500" />
                                Upgrade
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <CrownIcon className="h-5 w-5 text-yellow-500" />
                                    {proPlan?.title} Plan
                                </DialogTitle>
                                <DialogDescription>
                                    {proPlan?.desc}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">
                                                {proPlan?.title}
                                            </CardTitle>
                                            {proPlan?.badge && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-orange-100 text-orange-800"
                                                >
                                                    {proPlan.badge}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold">
                                                ${proPlan?.monthlyPrice}
                                            </span>
                                            <span className="text-muted-foreground">
                                                /month
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            or ${proPlan?.yearlyPrice}/year
                                            (save $
                                            {(proPlan?.monthlyPrice || 0) * 12 -
                                                (proPlan?.yearlyPrice || 0)}
                                            )
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="space-y-2">
                                            {proPlan?.features.map(feature => (
                                                <div
                                                    key={feature}
                                                    className="flex items-center gap-2"
                                                >
                                                    <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-sm">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <DialogFooter className="gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsUpgradeModalOpen(false)}
                                >
                                    Maybe Later
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                                    onClick={() => {
                                        // Redirect to the plan's link or handle upgrade logic
                                        if (proPlan?.link) {
                                            window.open(proPlan.link, "_blank");
                                        }
                                        setIsUpgradeModalOpen(false);
                                    }}
                                >
                                    <ZapIcon className="h-4 w-4 mr-2" />
                                    {proPlan?.buttonText || "Upgrade Now"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="hidden lg:flex"
                    >
                        <Link href="/help" target="_blank">
                            <HelpCircleIcon className="size-5" />
                        </Link>
                    </Button>
                    <MobileSidebar />
                </div>
            </Container>
        </header>
    );
};

export default DashboardNavbar;
