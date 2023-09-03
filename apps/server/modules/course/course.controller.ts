// import type { Request, Response } from "express";
import type { Request, Response } from "express-serve-static-core";
import CourseService from "./course.service";
import { asyncErrorHandler } from "../../controllers/error.controller";

const service = new CourseService("course");

export const list = asyncErrorHandler(async (req: Request, res: Response) => {
    const result = await service.list();
    return res.status(200).send(result);
});

export const getById = asyncErrorHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await service.getById(id);

        res.status(200).send(result);
    }
);

export const create = asyncErrorHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await service.create(data);
    res.status(201).send(result);
});

export const deleteById = asyncErrorHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        await service.deleteById(id);
        res.status(204).send();
    }
);

export const updateById = asyncErrorHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        await service.updateById(req.body, id);
        res.status(204).send();
    }
);
