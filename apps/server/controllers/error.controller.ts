import { request, response, type Request, type Response } from "express";

const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: Function
) => {
    error.statusCode = error.statusCode || 500;

    res.status(error.statusCode).send({
        status: error.statusCode,
        message: error.message,
    });
};

export const asyncErrorHandler = (func: Function) => {
    return (req: Request, res: Response, next: Function) =>
        func(req, res, next).catch((error: any) => {
            next(error);
        });
};
export default errorHandler;
