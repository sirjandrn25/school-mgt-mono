import AdmissionService from "./admission.service";
import { Request, Response } from "express";

const service = new AdmissionService("admission");

export const list = async (req: Request, res: Response) => {
    const result = await service.list();
    return res.send(result);
};
export const create = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await service.create(data);
    return res.status(201).send(result);
};

export const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await service.deleteById(id);
    return res.status(204).send();
};

export const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await service.updateById(id, req.body);
    return res.status(200).send(result);
};
