import { z } from "zod";
import { dateRegex } from "../../constants/regex.constant";

const commonStudentSchema = {
    full_name: z.string({
        required_error: "full name is required !!",
    }),
    birth_date: z.string().datetime(),
    gender: z.enum(["M", "F"]),
    mother_name: z.string().optional(),
    father_name: z.string().optional(),
    photo: z.string().optional(),
    address: z.string().optional(),
};
export const studentSchema = z.object({
    ...commonStudentSchema,
});
export const studentRegistrationSchema = z.object({
    ...commonStudentSchema,
    course_id: z.string(),
});
