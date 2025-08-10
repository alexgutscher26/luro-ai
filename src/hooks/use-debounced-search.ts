import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";

interface UseSearchOptions<T> {
    searchFn: (query: string) => Promise<T[]>;
    delay?: number;
    minLength?: number;
    enabled?: boolean;
}

export const useDebouncedSearch = <T>({
    searchFn,
    delay = 300,
    minLength = 2,
    enabled = true,
}: UseSearchOptions<T>) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounceValue(searchTerm, delay);

    const shouldSearch = useMemo(() => {
        return enabled && debouncedSearchTerm.length >= minLength;
    }, [enabled, debouncedSearchTerm, minLength]);

    const {
        data: results = [],
        isLoading,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["search", debouncedSearchTerm],
        queryFn: () => searchFn(debouncedSearchTerm),
        enabled: shouldSearch,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const clearSearch = () => setSearchTerm("");

    return {
        searchTerm,
        setSearchTerm,
        results,
        isLoading:
            isLoading ||
            (searchTerm !== debouncedSearchTerm &&
                searchTerm.length >= minLength),
        isFetching,
        error,
        clearSearch,
        hasResults: results.length > 0,
        isSearching: shouldSearch,
    };
};
