import { NextRequest, NextResponse } from "next/server";
import { loginController } from "../../../server/routes/login.route";

export const withProtect = (next: any) => {
    return async (req: NextRequest) => {
        return next(req, NextResponse);
    };
};

export const POST = loginController;
