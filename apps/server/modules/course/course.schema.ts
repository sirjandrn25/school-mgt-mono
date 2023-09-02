import { z } from "zod";

export const courseSchema = z.object({
    name: z.string({
        required_error: "name is required !!",
    }),
    description: z
        .string({ required_error: "description is required !!" })
        .optional(),
});
