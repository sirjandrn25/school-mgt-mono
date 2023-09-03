import { Router } from "express";
import * as admissionController from "./admission.controller";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { admissionSchema } from "./admission.schema";
const router = Router();

router.get("", admissionController.list);
router.post("", schemaValidator(admissionSchema), admissionController.create);
router.put("/:id", admissionController.updateById);

router.delete("/:id", admissionController.deleteById);
export default router;
