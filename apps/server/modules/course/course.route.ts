import { Router } from "express";
import CourseController from "./course.controller";
const router = Router();

const controller = new CourseController();

router.get("", controller.list);
router.get("/:id", controller.getById);
router.post("", controller.create);
router.delete("/:id", controller.deleteById);

export default router;
