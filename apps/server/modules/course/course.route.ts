import { Router } from "express";
import * as CourseController from "./course.controller";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { courseSchema } from "./course.schema";
const router = Router();

router.get("", CourseController.list);
router.post("", schemaValidator(courseSchema), CourseController.create);
router.put("/:id", CourseController.updateById);
router.get("/:id", CourseController.getById);
router.delete("/:id", CourseController.deleteById);
export default router;
