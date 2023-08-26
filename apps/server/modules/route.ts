import { verifyUser } from "../middleware/auth.middleware";
import authRouter from "./auth/auth.route";
import studentRouter from "./student/student.route";
import { Router } from "express";
const router = Router();
router.use("/auth", authRouter);
router.use("/student", verifyUser, studentRouter);
export default router;
