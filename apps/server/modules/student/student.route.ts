import { Router } from "express";
const router = Router();
import StudentController from "./student.controller";
const controller = new StudentController();

router.get("", controller.list);
router.get("/:id", controller.getById);
router.get("", controller.create);
router.get("/:id", controller.deleteById);

export default router;
