import { DictionaryType } from "core";
import { PrismaClient } from "database";
const prisma = new PrismaClient();

export default class StudentService {
    private db;
    constructor() {
        this.db = prisma.student;
    }
    async list() {
        return await this.db.findMany({});
    }
    async getById(id: string) {
        return await this.db.findUnique({
            where: {
                id: id,
            },
        });
    }

    async deleteById(id: string) {
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
}
