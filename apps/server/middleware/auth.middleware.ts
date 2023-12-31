import type { Response } from "express";
import { WithUserRequestType } from "../types/server.types";

const jwt = require("jsonwebtoken");

export const verifyUser = (
    req: WithUserRequestType,
    res: Response,
    next: Function
) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    console.log({ token });

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err) return res.sendStatus(403);
            console.log(req);
            req.user = decoded;
            next();
        }
    );
};
