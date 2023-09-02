import { Router } from "express";
import * as AuthController from "./auth.controller";
import { verifyUser } from "../../middleware/auth.middleware";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { loginSchema, refreshTokenSchema, registerSchema } from "./auth.schema";
const router = Router();

router.post(
    "/register",
    schemaValidator(registerSchema),
    AuthController.register
);
router.post("/login", schemaValidator(loginSchema), AuthController.login);
router.post(
    "/refresh_token",
    schemaValidator(refreshTokenSchema),
    AuthController.handleRefreshToken
);
router.get("/me", verifyUser, AuthController.loggedUserDetail);
export default router;
