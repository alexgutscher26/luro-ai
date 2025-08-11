import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser as useClerkUser } from "@clerk/nextjs";

interface UserProfile {
    id: string;
    clerkId: string;
    email: string;
    name?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UpdateUserData {
    name?: string;
    avatar?: string;
}

export const useUser = () => {
    const { user: clerkUser, isLoaded } = useClerkUser();
    const queryClient = useQueryClient();

    // Fetch user profile from database
    const {
        data: userProfile,
        isLoading: isProfileLoading,
        error: profileError,
    } = useQuery({
        queryKey: ["user-profile", clerkUser?.id],
        queryFn: async (): Promise<UserProfile> => {
            if (!clerkUser?.id) throw new Error("No user ID");

            const response = await fetch(`/api/users/${clerkUser.id}`);
            if (!response.ok) throw new Error("Failed to fetch user profile");

            return response.json();
        },
        enabled: Boolean(clerkUser?.id) && isLoaded,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Update user profile
    const updateUserMutation = useMutation({
        mutationFn: async (data: UpdateUserData): Promise<UserProfile> => {
            if (!clerkUser?.id) throw new Error("No user ID");

            const response = await fetch(`/api/users/${clerkUser.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to update user profile");
            return response.json();
        },
        onSuccess: updatedUser => {
            // Update the cache
            queryClient.setQueryData(
                ["user-profile", clerkUser?.id],
                updatedUser
            );
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });

    return {
        // Clerk user data
        clerkUser,
        isClerkLoaded: isLoaded,

        // Database user profile
        userProfile,
        isProfileLoading,
        profileError,

        // Mutations
        updateUser: updateUserMutation.mutate,
        isUpdating: updateUserMutation.isPending,
        updateError: updateUserMutation.error,

        // Combined loading state
        isLoading: !isLoaded || isProfileLoading,
    };
};
