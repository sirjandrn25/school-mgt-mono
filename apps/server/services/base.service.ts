import { PrismaClient } from "database";
import CustomError from "../utils/customError.utils";
const prisma = new PrismaClient({
    errorFormat: "pretty",
});
export default class BaseService {
    public db: any;
    public prisma: any;

    constructor(private model_name: any) {
        this.prisma = prisma;
        this.db = prisma[this.model_name];
    }

    async list() {
        return await this.db.findMany({});
    }
    async getById(id: string) {
        const result = await this.db.findUnique({
            where: {
                id: id,
            },
        });
        if (!result) throw new CustomError("Could not find !!", 404);
        return result;
    }

    async deleteById(id: string) {
        await this.getById(id);
        return await this.db.delete({
            where: {
                id,
            },
        });
    }

    //@todo make student type
    async create(data: any) {
        return await this.db.create({
            data: data,
        });
    }
    async updateById(data: any, id: string) {
        await this.getById(id);
        return await this.db.create({
            where: { id },
            data: data,
        });
    }
}
