import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface UseLocalStorageOptions<T> {
    key: string;
    defaultValue: T;
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
}

export const useLocalStorage = <T>({
    key,
    defaultValue,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
}: UseLocalStorageOptions<T>) => {
    const queryClient = useQueryClient();

    // Query to get value from localStorage
    const { data: value = defaultValue } = useQuery({
        queryKey: ["localStorage", key],
        queryFn: (): T => {
            if (typeof window === "undefined") return defaultValue;

            try {
                const item = window.localStorage.getItem(key);
                return item ? deserialize(item) : defaultValue;
            } catch (error) {
                console.warn(`Error reading localStorage key "${key}":`, error);
                return defaultValue;
            }
        },
        staleTime: Infinity, // Never stale
        gcTime: Infinity, // Never garbage collected (replaces cacheTime)
    });

    // Mutation to set value in localStorage
    const setValueMutation = useMutation({
        mutationFn: async (newValue: T | ((prev: T) => T)): Promise<T> => {
            const valueToStore =
                typeof newValue === "function"
                    ? (newValue as (prev: T) => T)(value)
                    : newValue;

            try {
                if (typeof window !== "undefined") {
                    window.localStorage.setItem(key, serialize(valueToStore));
                }
                return valueToStore;
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
                throw error;
            }
        },
        onSuccess: newValue => {
            queryClient.setQueryData(["localStorage", key], newValue);
        },
    });

    // Mutation to remove value from localStorage
    const removeValueMutation = useMutation({
        mutationFn: async (): Promise<T> => {
            try {
                if (typeof window !== "undefined") {
                    window.localStorage.removeItem(key);
                }
                return defaultValue;
            } catch (error) {
                console.warn(
                    `Error removing localStorage key "${key}":`,
                    error
                );
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.setQueryData(["localStorage", key], defaultValue);
        },
    });

    return {
        value,
        setValue: setValueMutation.mutate,
        removeValue: removeValueMutation.mutate,
        isLoading: setValueMutation.isPending || removeValueMutation.isPending,
    };
};
