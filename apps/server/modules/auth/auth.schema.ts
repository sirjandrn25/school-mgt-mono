import { z } from "zod";

const userCommonInfo = {
    email: z.string().email(),
    password: z.string(),
};
export const loginSchema = z.object({
    ...userCommonInfo,
});

export const registerSchema = z.object({
    name: z.string({
        required_error: "name is required !!",
    }),
    ...userCommonInfo,
});

export const refreshTokenSchema = z.object({
    token: z.string({
        required_error: "refresh token is required !!",
    }),
});
