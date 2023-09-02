import { Router } from "express";
const router = Router();
import StudentController from "./student.controller";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { studentRegistrationSchema } from "./student.schema";
const controller = new StudentController();

router.get("", controller.list);
router.post(
    "/register",
    schemaValidator(studentRegistrationSchema),
    controller.registration
);

export default router;
