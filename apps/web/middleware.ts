import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
    console.log(request.nextUrl.pathname);
};
