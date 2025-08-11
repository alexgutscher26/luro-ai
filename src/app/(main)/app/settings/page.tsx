"use client";

import React, { useState } from "react";
import {
    UserIcon,
    BellIcon,
    ShieldIcon,
    PaletteIcon,
    GlobeIcon,
    DatabaseIcon,
    KeyIcon,
    MailIcon,
    SmartphoneIcon,
    EyeIcon,
    EyeOffIcon,
    CheckIcon,
    EditIcon,
    SaveIcon,
    XIcon,
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const SETTINGS_STATS = [
    {
        title: "Profile Completion",
        value: "85%",
        change: "Complete your profile",
        icon: UserIcon,
        trend: "up",
    },
    {
        title: "Security Score",
        value: "9/10",
        change: "Excellent security",
        icon: ShieldIcon,
        trend: "up",
    },
    {
        title: "Active Sessions",
        value: "3",
        change: "2 devices connected",
        icon: SmartphoneIcon,
        trend: "up",
    },
    {
        title: "Data Usage",
        value: "2.4GB",
        change: "This month",
        icon: DatabaseIcon,
        trend: "up",
    },
];

const NOTIFICATION_SETTINGS = [
    {
        id: "email_campaigns",
        title: "Campaign Updates",
        description:
            "Get notified about campaign performance and status changes",
        enabled: true,
    },
    {
        id: "email_billing",
        title: "Billing Notifications",
        description: "Receive billing reminders and payment confirmations",
        enabled: true,
    },
    {
        id: "email_security",
        title: "Security Alerts",
        description: "Important security notifications and login alerts",
        enabled: true,
    },
    {
        id: "push_engagement",
        title: "Engagement Alerts",
        description: "Push notifications for high engagement posts",
        enabled: false,
    },
    {
        id: "push_mentions",
        title: "Mentions & Comments",
        description:
            "Get notified when someone mentions or comments on your content",
        enabled: true,
    },
];

const PRIVACY_SETTINGS = [
    {
        id: "profile_visibility",
        title: "Profile Visibility",
        description: "Make your profile visible to other users",
        enabled: true,
    },
    {
        id: "analytics_sharing",
        title: "Analytics Sharing",
        description: "Share anonymous usage data to improve the platform",
        enabled: false,
    },
    {
        id: "marketing_emails",
        title: "Marketing Communications",
        description: "Receive product updates and marketing emails",
        enabled: false,
    },
];

/**
 * Renders a settings page component.
 *
 * The component manages various user settings including profile, appearance, notifications,
 * and privacy settings. It includes functionality to edit profile details, change passwords,
 * toggle notification and privacy preferences, and delete accounts. The UI is composed of multiple
 * cards for different settings sections, with dialogs for password changes and account deletions.
 *
 * @returns A React component representing the settings page.
 */
const SettingsPage = () => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
    const [notificationSettings, setNotificationSettings] = useState(
        NOTIFICATION_SETTINGS
    );
    const [privacySettings, setPrivacySettings] = useState(PRIVACY_SETTINGS);
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Social media manager passionate about creating engaging content and driving meaningful connections.",
        timezone: "America/New_York",
        language: "en",
        theme: "system",
    });
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: "",
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    /**
     * Toggles the notification setting for a given ID and updates the user with a success message.
     */
    const handleNotificationToggle = (id: string) => {
        setNotificationSettings(prev =>
            prev.map(setting =>
                setting.id === id
                    ? { ...setting, enabled: !setting.enabled }
                    : setting
            )
        );
        toast.success("Notification preferences updated");
    };

    /**
     * Toggles the privacy setting for a given ID and shows a success notification.
     */
    const handlePrivacyToggle = (id: string) => {
        setPrivacySettings(prev =>
            prev.map(setting =>
                setting.id === id
                    ? { ...setting, enabled: !setting.enabled }
                    : setting
            )
        );
        toast.success("Privacy settings updated");
    };

    /**
     * Handles profile save by setting editing state to false and showing a success toast.
     */
    const handleProfileSave = () => {
        setIsEditingProfile(false);
        toast.success("Profile updated successfully");
    };

    /**
     * Handles the password change process by validating inputs and updating state.
     *
     * This function checks if the new password matches the confirmation, ensures the
     * password meets length requirements, updates UI states, and provides feedback via
     * toast notifications.
     */
    const handlePasswordChange = () => {
        if (passwordData.new !== passwordData.confirm) {
            toast.error("New passwords don't match");
            return;
        }
        if (passwordData.new.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }
        setIsChangePasswordOpen(false);
        setPasswordData({ current: "", new: "", confirm: "" });
        toast.success("Password changed successfully");
    };

    /**
     * Closes the delete account modal and shows a success toast.
     */
    const handleDeleteAccount = () => {
        setIsDeleteAccountOpen(false);
        toast.success("Account deletion request submitted");
    };

    return (
        <div className="p-4 w-full">
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Settings
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your account preferences and privacy settings
                        </p>
                    </div>
                </div>

                {/* Settings Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    {SETTINGS_STATS.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index}>
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
                        );
                    })}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Profile Settings */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <UserIcon className="h-5 w-5" />
                                        Profile Settings
                                    </CardTitle>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setIsEditingProfile(!isEditingProfile)
                                    }
                                >
                                    {isEditingProfile ? (
                                        <XIcon className="h-4 w-4 mr-2" />
                                    ) : (
                                        <EditIcon className="h-4 w-4 mr-2" />
                                    )}
                                    {isEditingProfile ? "Cancel" : "Edit"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                {isEditingProfile ? (
                                    <Input
                                        id="name"
                                        value={profileData.name}
                                        onChange={e =>
                                            setProfileData(prev => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        {profileData.name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <p className="text-sm text-muted-foreground">
                                    {profileData.email}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Email cannot be changed here. Contact
                                    support if needed.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                {isEditingProfile ? (
                                    <Textarea
                                        id="bio"
                                        value={profileData.bio}
                                        onChange={e =>
                                            setProfileData(prev => ({
                                                ...prev,
                                                bio: e.target.value,
                                            }))
                                        }
                                        rows={3}
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        {profileData.bio}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    {isEditingProfile ? (
                                        <Select
                                            value={profileData.timezone}
                                            onValueChange={value =>
                                                setProfileData(prev => ({
                                                    ...prev,
                                                    timezone: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="America/New_York">
                                                    Eastern Time
                                                </SelectItem>
                                                <SelectItem value="America/Chicago">
                                                    Central Time
                                                </SelectItem>
                                                <SelectItem value="America/Denver">
                                                    Mountain Time
                                                </SelectItem>
                                                <SelectItem value="America/Los_Angeles">
                                                    Pacific Time
                                                </SelectItem>
                                                <SelectItem value="Europe/London">
                                                    London
                                                </SelectItem>
                                                <SelectItem value="Europe/Paris">
                                                    Paris
                                                </SelectItem>
                                                <SelectItem value="Asia/Tokyo">
                                                    Tokyo
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            Eastern Time
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    {isEditingProfile ? (
                                        <Select
                                            value={profileData.language}
                                            onValueChange={value =>
                                                setProfileData(prev => ({
                                                    ...prev,
                                                    language: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">
                                                    English
                                                </SelectItem>
                                                <SelectItem value="es">
                                                    Spanish
                                                </SelectItem>
                                                <SelectItem value="fr">
                                                    French
                                                </SelectItem>
                                                <SelectItem value="de">
                                                    German
                                                </SelectItem>
                                                <SelectItem value="ja">
                                                    Japanese
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            English
                                        </p>
                                    )}
                                </div>
                            </div>
                            {isEditingProfile && (
                                <div className="flex gap-2 pt-4">
                                    <Button onClick={handleProfileSave}>
                                        <SaveIcon className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Appearance Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PaletteIcon className="h-5 w-5" />
                                Appearance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Theme</Label>
                                <Select
                                    value={profileData.theme}
                                    onValueChange={value =>
                                        setProfileData(prev => ({
                                            ...prev,
                                            theme: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">
                                            Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                            System
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    Choose your preferred theme or sync with
                                    your system settings
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notification Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BellIcon className="h-5 w-5" />
                                Notifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {notificationSettings.map(setting => (
                                <div
                                    key={setting.id}
                                    className="flex items-center justify-between space-x-2"
                                >
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">
                                            {setting.title}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {setting.description}
                                        </div>
                                    </div>
                                    <Switch
                                        checked={setting.enabled}
                                        onCheckedChange={() =>
                                            handleNotificationToggle(setting.id)
                                        }
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Privacy Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldIcon className="h-5 w-5" />
                                Privacy & Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {privacySettings.map(setting => (
                                <div
                                    key={setting.id}
                                    className="flex items-center justify-between space-x-2"
                                >
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">
                                            {setting.title}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {setting.description}
                                        </div>
                                    </div>
                                    <Switch
                                        checked={setting.enabled}
                                        onCheckedChange={() =>
                                            handlePrivacyToggle(setting.id)
                                        }
                                    />
                                </div>
                            ))}
                            <Separator />
                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() =>
                                        setIsChangePasswordOpen(true)
                                    }
                                >
                                    <KeyIcon className="h-4 w-4 mr-2" />
                                    Change Password
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => setIsDeleteAccountOpen(true)}
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Change Password Dialog */}
                <Dialog
                    open={isChangePasswordOpen}
                    onOpenChange={setIsChangePasswordOpen}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                                Enter your current password and choose a new
                                one.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">
                                    Current Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="current-password"
                                        type={
                                            showPasswords.current
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordData.current}
                                        onChange={e =>
                                            setPasswordData(prev => ({
                                                ...prev,
                                                current: e.target.value,
                                            }))
                                        }
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() =>
                                            setShowPasswords(prev => ({
                                                ...prev,
                                                current: !prev.current,
                                            }))
                                        }
                                    >
                                        {showPasswords.current ? (
                                            <EyeOffIcon className="h-4 w-4" />
                                        ) : (
                                            <EyeIcon className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="new-password"
                                        type={
                                            showPasswords.new
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordData.new}
                                        onChange={e =>
                                            setPasswordData(prev => ({
                                                ...prev,
                                                new: e.target.value,
                                            }))
                                        }
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() =>
                                            setShowPasswords(prev => ({
                                                ...prev,
                                                new: !prev.new,
                                            }))
                                        }
                                    >
                                        {showPasswords.new ? (
                                            <EyeOffIcon className="h-4 w-4" />
                                        ) : (
                                            <EyeIcon className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">
                                    Confirm New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirm-password"
                                        type={
                                            showPasswords.confirm
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordData.confirm}
                                        onChange={e =>
                                            setPasswordData(prev => ({
                                                ...prev,
                                                confirm: e.target.value,
                                            }))
                                        }
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() =>
                                            setShowPasswords(prev => ({
                                                ...prev,
                                                confirm: !prev.confirm,
                                            }))
                                        }
                                    >
                                        {showPasswords.confirm ? (
                                            <EyeOffIcon className="h-4 w-4" />
                                        ) : (
                                            <EyeIcon className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsChangePasswordOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handlePasswordChange}>
                                Change Password
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Account Dialog */}
                <Dialog
                    open={isDeleteAccountOpen}
                    onOpenChange={setIsDeleteAccountOpen}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Account</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove all
                                your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-destructive">
                                <ShieldIcon className="h-4 w-4" />
                                <span className="font-medium">Warning</span>
                            </div>
                            <p className="text-sm text-destructive/80 mt-1">
                                All your campaigns, posts, analytics data, and
                                account information will be permanently deleted.
                            </p>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteAccountOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default SettingsPage;
