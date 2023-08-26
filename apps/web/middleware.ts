import { NextRequest } from "next/server";

const public_paths = ["/login"];
const static_public_path = "/_next/static";
export const middleware = async (request: NextRequest) => {
    //detect public path
    // const current_path = request.nextUrl.pathname;
    // if (
    //     current_path.includes(static_public_path) ||
    //     public_paths.includes(current_path)
    // ) {
    // }
};
