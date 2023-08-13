import { RequestType } from "../types/server.types";

export const login = async (req: RequestType, res: any) => {
    const data = await req.json();

    return res.json({
        ...data,
    });
};
