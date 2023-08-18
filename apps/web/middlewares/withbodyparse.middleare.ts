import { NextResponse } from "next/server";

export const withBodyParserMiddleware = (
    next: (request: any, response: any) => void
) => {
    return async (request: any, response: NextResponse) => {
        const data = await request.json();
        request.body = data;
        return await next(request, response);
    };
};
