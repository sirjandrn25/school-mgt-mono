import { Router } from "express";
import GradeController from "./grade.controller";
const router = Router();
const controller = new GradeController();

router.get("", controller.list);
router.post("", controller.create);
// router.get("/:id", controller.getById);
// router.get("", controller.create);
// router.get("/:id", controller.deleteById);

export default router;
