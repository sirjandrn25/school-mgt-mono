import { PrismaClient } from "database";

const prisma = new PrismaClient();

export default class AuthService {
    static async getByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }
}
