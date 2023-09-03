import { z } from "zod";

export const admissionSchema = z.object({
    student_id: z.string(),
    grade_id: z.string(),
});
