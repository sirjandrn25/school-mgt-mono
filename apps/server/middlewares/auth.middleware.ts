import { Request, Response } from "express";
import { WithUserRequestType } from "../types/common.types";

const jwt = require("jsonwebtoken");

export const verifyUser = (
    req: WithUserRequestType,
    res: Response,
    next: Function
) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err) return res.sendStatus(403);
            req.user = decoded;
            next();
        }
    );
};
