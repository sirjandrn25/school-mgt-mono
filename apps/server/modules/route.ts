import authRouter from "./auth/auth.route";
import { Router } from "express";
const router = Router();
router.use("/auth", authRouter);
export default router;
