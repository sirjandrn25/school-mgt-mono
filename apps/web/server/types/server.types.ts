import { NextRequest, NextResponse } from "next/server";

export type RequestType = NextRequest & {
    user?: any;
};
export type ResponseType = typeof NextResponse & {};
