import type { Request, Response } from "express";

export default class BaseController {
    public service: any;

    constructor(service: any) {
        this.service = service;
    }

    async list(req: Request, res: Response) {
        // const result = await this.service.list();
        res.status(200).send({});
    }
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.service.getById(id);
        res.status(200).send(result);
    }
    async create(req: Request, res: Response) {
        const data = req.body;
        const result = await this.service.create(data);
        res.status(201).send(result);
    }
    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        await this.service.deleteById(id);
        res.status(204).send();
    }
}
