import { NextRequest, NextResponse } from "next/server";
import { ZodSchema, ZodError } from "zod";

interface ValidationOptions {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
}

export function withValidation(
    options: ValidationOptions,
    handler: (
        request: NextRequest,
        validatedData: any,
        context?: any
    ) => Promise<NextResponse>
) {
    return async function validationMiddleware(
        request: NextRequest,
        context?: any
    ): Promise<NextResponse> {
        try {
            const validatedData: any = {};

            // Validate request body
            if (
                options.body &&
                (request.method === "POST" ||
                    request.method === "PUT" ||
                    request.method === "PATCH")
            ) {
                try {
                    const body = await request.json();
                    validatedData.body = options.body.parse(body);
                } catch (error) {
                    if (error instanceof SyntaxError) {
                        return NextResponse.json(
                            {
                                error: "Invalid JSON format",
                                details: "Request body must be valid JSON",
                            },
                            { status: 400 }
                        );
                    }
                    throw error;
                }
            }

            // Validate route parameters
            if (options.params && context?.params) {
                validatedData.params = options.params.parse(context.params);
            }

            // Validate query parameters
            if (options.query) {
                const url = new URL(request.url);
                const queryParams = Object.fromEntries(
                    url.searchParams.entries()
                );
                validatedData.query = options.query.parse(queryParams);
            }

            return handler(request, validatedData, context);
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.errors.map(err => ({
                    field: err.path.join("."),
                    message: err.message,
                    code: err.code,
                }));

                return NextResponse.json(
                    {
                        error: "Validation failed",
                        details: formattedErrors,
                        timestamp: new Date().toISOString(),
                    },
                    { status: 400 }
                );
            }

            console.error("Validation middleware error:", error);
            return NextResponse.json(
                {
                    error: "Internal server error",
                    message: "An unexpected error occurred during validation",
                },
                { status: 500 }
            );
        }
    };
}

// Utility function for query parameter validation
export function validateQueryParams<T>(
    schema: ZodSchema<T>,
    request: NextRequest
): T {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    return schema.parse(queryParams);
}

// Utility function for request body validation
export async function validateRequestBody<T>(
    schema: ZodSchema<T>,
    request: NextRequest
): Promise<T> {
    const body = await request.json();
    return schema.parse(body);
}
