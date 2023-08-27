import { PrismaClient } from "database";
const prisma = new PrismaClient();
export default class BaseService {
    public db: any;
    private prisma: any;

    constructor(private model_name: any) {
        this.prisma = prisma;
        this.db = prisma[this.model_name];
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

    async register(data: any) {
        const { student, registration_data } = data || {};
        return await this.db.create({
            data: {
                ...student,
                registration: {
                    create: {
                        data: registration_data,
                    },
                },
            },
            include: {
                registration: true,
            },
        });
    }
}
