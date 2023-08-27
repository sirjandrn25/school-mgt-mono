// import type { Request, Response } from "express";
import type { Request, Response } from "express-serve-static-core";
import CourseService from "./course.service";
const service = new CourseService("course");

export default class CourseController {
    async list(req: Request, res: Response) {
        const result = await service.list();
        return res.status(200).send(result);
    }
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await service.getById(id);
        res.status(200).send(result);
    }
    async create(req: Request, res: Response) {
        const data = req.body;
        console.log({ data });
        const result = await service.create(data);
        res.status(201).send(result);
    }
    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        await service.deleteById(id);
        res.status(204).send();
    }
}
