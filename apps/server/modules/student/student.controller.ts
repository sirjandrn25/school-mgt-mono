import type { Request, Response } from "express";
import StudentService from "./student.service";
const service = new StudentService("student");
export default class StudentController {
    async list(req: Request, res: Response) {
        const result = await service.list();
        res.status(200).send(result);
    }
    // async getById(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const result = await service.getById(id);
    //     res.status(200).send(result);
    // }
    // async create(req: Request, res: Response) {
    //     const data = req.body;
    //     const result = await service.create(data);
    //     res.status(201).send(result);
    // }

    // async deleteById(req: Request, res: Response) {
    //     const { id } = req.params;
    //     await service.deleteById(id);
    //     res.status(204).send();
    // }

    async registration(req: Request, res: Response) {
        const data = req.body;
        const { course_id, ...rest } = data || {};
        const current_date = new Date();
        const current_year = current_date.getFullYear();
        const randomNumber = Math.round(Math.random() * 10000);
        try {
            const student = await service.register({
                student: {
                    ...rest,
                    birth_date: rest?.birth_date
                        ? new Date(rest?.birth_date)
                        : new Date(),
                },
                registration_data: {
                    course_id,
                    register_number: `${current_year}-${randomNumber}`,
                },
            });
            res.status(201).send(student);
        } catch (error) {
            console.log({ error });
            res.status(500).send(error);
        }
    }
}
