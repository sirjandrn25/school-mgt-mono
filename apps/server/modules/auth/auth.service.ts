import { PrismaClient } from "database";
import { userType } from "../../types/user.types";
import { HashingUtils } from "../../utils/hashing.utils";

const prisma = new PrismaClient();

export default class AuthService {
    static async getByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    static async saveUser(data: Omit<userType, "role">) {
        const newData = { ...data };
        newData["password"] = await HashingUtils.hash(data.password);

        return await prisma.user.create({
            data: {
                ...newData,
            },
        });
    }
}
