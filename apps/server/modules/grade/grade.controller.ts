import type { Request, Response } from "express";
import GradeService from "./grade.service";
const service = new GradeService();

export default class GradeController {
    async list(req: Request, res: Response) {
        const result = await service.list();
        res.status(200).send(result);
    }
    async create(req: Request, res: Response) {
        const result = await service.create(req.body);
        res.status(201).send(result);
    }
}
