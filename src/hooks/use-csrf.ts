import { useState, useEffect } from "react";

interface CSRFResponse {
    csrfToken: string;
}

export function useCSRF() {
    const [csrfToken, setCSRFToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCSRFToken = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch("/api/csrf");

            if (!response.ok) {
                throw new Error("Failed to fetch CSRF token");
            }

            const data: CSRFResponse = await response.json();
            setCSRFToken(data.csrfToken);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            setCSRFToken(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCSRFToken();
    }, []);

    return {
        csrfToken,
        isLoading,
        error,
        refetch: fetchCSRFToken,
    };
}
