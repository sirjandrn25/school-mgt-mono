import { Router } from "express";
import AuthController from "./auth.controller";
import { verifyUser } from "../../middleware/auth.middleware";
const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh_token", AuthController.handleRefreshToken);
router.get("/me", verifyUser, AuthController.loggedUserDetail);
export default router;
