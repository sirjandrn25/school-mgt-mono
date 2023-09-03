import { Router } from "express";
const router = Router();
import * as StudentController from "./student.controller";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { studentRegistrationSchema } from "./student.schema";

router.get("", StudentController.list);
router.post(
    "/register",
    schemaValidator(studentRegistrationSchema),
    StudentController.registration
);
router.get("/:id", StudentController.getById);

export default router;
