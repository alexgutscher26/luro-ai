import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateApiKeyData {
    name: string;
    expiresAt?: string;
}

interface UpdateApiKeyData {
    name?: string;
    isActive?: boolean;
}

// Fetch all API keys
export const useApiKeys = () => {
    return useQuery({
        queryKey: ["apiKeys"],
        queryFn: async () => {
            const response = await fetch("/api/keys");
            if (!response.ok) {
                throw new Error("Failed to fetch API keys");
            }
            return response.json();
        },
    });
};

// Create new API key
export const useCreateApiKey = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateApiKeyData) => {
            const response = await fetch("/api/keys", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to create API key");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
            toast.success("API key created successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create API key");
        },
    });
};

// Update API key
export const useUpdateApiKey = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: UpdateApiKeyData;
        }) => {
            const response = await fetch(`/api/keys/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to update API key");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
            toast.success("API key updated successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update API key");
        },
    });
};

// Delete API key
export const useDeleteApiKey = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/keys/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete API key");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
            toast.success("API key deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete API key");
        },
    });
};
