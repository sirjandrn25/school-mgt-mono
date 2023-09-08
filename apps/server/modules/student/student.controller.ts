import type { Request, Response } from "express";
import StudentService from "./student.service";
import { asyncErrorHandler } from "../../controllers/error.controller";
const service = new StudentService("student");

export const list = asyncErrorHandler(async (req: Request, res: Response) => {
    const result = await service.list();
    res.status(200).send(result);
});
export const registration = asyncErrorHandler(
    async (req: Request, res: Response) => {
        const data = req.body;
        const { course_id, ...rest } = data || {};
        const current_date = new Date();
        const current_year = current_date.getFullYear();
        const randomNumber = Math.round(Math.random() * 10000);

        const student = await service.register({
            student: {
                ...rest,
                birth_date: new Date(rest?.birth_date),
            },
            registration_data: {
                course_id,
                register_number: `${current_year}-${randomNumber}`,
            },
        });
        res.status(201).send(student);
    }
);

export const getById = asyncErrorHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await service.getById(id, {
            admissions: {
                include: {
                    grade: true,
                },
            },
        });
        return res.status(200).send(result);
    }
);
