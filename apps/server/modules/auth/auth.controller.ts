import type { Request, Response } from "express";
import { ObjectUtils } from "helper-utils";
import { WithUserRequestType } from "../../types/server.types";
import { userType } from "../../types/user.types";
import { HashingUtils } from "../../utils/hashing.utils";
import JwtTokenUtils from "../../utils/jwtToken.utils";
import AuthService from "./auth.service";

export default class AuthController {
    static async loggedUserDetail(req: WithUserRequestType, res: Response) {
        const user = req.user;

        if (!user) return res.status(403).send("Not logged in");
        const result = await AuthService.getByEmail(user?.email);
        return res
            .status(200)
            .send(ObjectUtils.removeNode(result as any, "password"));
    }
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await AuthService.getByEmail(email);
            if (!user)
                return res.status(403).send({
                    email: "this email does not exist!!",
                });
            const isMatched = await HashingUtils.compare(
                password,
                user?.password
            );
            if (!isMatched)
                return res.status(403).send({
                    password: "password is does not match !!",
                });
            const save_user_info: Omit<userType, "password"> = {
                name: user.name,
                email: user.email,
                role: user.role,
                id: user?.id,
            };

            const access_token = await JwtTokenUtils.generateAccessToken(
                save_user_info
            );
            const refresh_token = await JwtTokenUtils.generateRefreshToken(
                save_user_info
            );

            res.status(200).send({
                user: save_user_info,
                access_token,
                refresh_token,
            });
        } catch (error) {
            res.status(500).send("Error");
        }
    }

    static async register(req: Request, res: Response) {
        const { email, name, password } = req?.body || {};
        if (!email) throw Error("Email is required");
        try {
            const result = await AuthService.saveUser({
                email,
                name,
                password,
            });

            return res.status(201).send(result);
        } catch (err) {
            console.log({ err });
            return res.status(500).send("Error");
        }
    }

    static async handleRefreshToken(req: Request, res: Response) {
        const { token } = req.body;
        try {
            const result = await JwtTokenUtils.verifyRefreshToken(token);
            return res.status(200).send(result);
        } catch (err) {
            return res
                .status(403)
                .send({ message: "Error verifying refresh token" });
        }
    }
}
