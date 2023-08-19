import { Router } from "express";
import AuthController from "./auth.controller";
const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh_token", AuthController.handleRefreshToken);
export default router;
