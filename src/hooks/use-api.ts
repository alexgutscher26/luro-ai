import React from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryOptions,
    UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface ApiError {
    message: string;
    status?: number;
}

interface UseApiQueryOptions<T>
    extends Omit<UseQueryOptions<T, ApiError>, "queryFn"> {
    endpoint: string;
    showErrorToast?: boolean;
}

interface UseApiMutationOptions<TData, TVariables>
    extends Omit<
        UseMutationOptions<TData, ApiError, TVariables>,
        "mutationFn"
    > {
    endpoint: string;
    method?: "POST" | "PUT" | "PATCH" | "DELETE";
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    successMessage?: string;
    invalidateQueries?: string[];
}

// Generic API fetch function
const apiFetch = async <T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> => {
    const response = await fetch(`/api${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const errorData = await response
            .json()
            .catch(() => ({ message: "An error occurred" }));
        throw {
            message: errorData.message || "An error occurred",
            status: response.status,
        } as ApiError;
    }

    return response.json();
};

// Custom hook for API queries
export const useApiQuery = <T>({
    endpoint,
    showErrorToast = true,
    ...queryOptions
}: UseApiQueryOptions<T>) => {
    const query = useQuery<T, ApiError>({
        ...queryOptions,
        queryFn: () => apiFetch<T>(endpoint),
    });

    // Handle error toast separately
    React.useEffect(() => {
        if (query.error && showErrorToast) {
            toast.error(query.error.message || "Failed to fetch data");
        }
    }, [query.error, showErrorToast]);

    return query;
};

// Custom hook for API mutations
export const useApiMutation = <TData, TVariables = unknown>({
    endpoint,
    method = "POST",
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = "Operation completed successfully",
    invalidateQueries = [],
    ...mutationOptions
}: UseApiMutationOptions<TData, TVariables>) => {
    const queryClient = useQueryClient();

    return useMutation<TData, ApiError, TVariables>({
        ...mutationOptions,
        mutationFn: variables => {
            const body = method === "DELETE" ? null : JSON.stringify(variables);
            return apiFetch<TData>(endpoint, { method, body });
        },
        onSuccess: (data, variables, context) => {
            if (showSuccessToast) {
                toast.success(successMessage);
            }

            // Invalidate specified queries
            invalidateQueries.forEach(queryKey => {
                queryClient.invalidateQueries({ queryKey: [queryKey] });
            });

            mutationOptions.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            if (showErrorToast) {
                toast.error(error.message || "Operation failed");
            }
            mutationOptions.onError?.(error, variables, context);
        },
    });
};

import { useCSRF } from "./use-csrf";

export function useSecureAPI() {
    const { csrfToken } = useCSRF();

    const securePost = async (url: string, data: any) => {
        if (!csrfToken) {
            throw new Error("CSRF token not available");
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    };

    const securePut = async (url: string, data: any) => {
        if (!csrfToken) {
            throw new Error("CSRF token not available");
        }

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    };

    const secureDelete = async (url: string) => {
        if (!csrfToken) {
            throw new Error("CSRF token not available");
        }

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": csrfToken,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    };

    return {
        post: securePost,
        put: securePut,
        delete: secureDelete,
        csrfToken,
    };
}
