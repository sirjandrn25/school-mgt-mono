import BaseService from "../../services/base.service";

export default class StudentService extends BaseService {
    async register(data: any) {
        const { student, registration_data } = data || {};
        return await this.db.create({
            data: {
                ...student,
                registration: {
                    create: registration_data,
                },
            },
            include: {
                registration: true,
            },
        });
    }
    async admission(data: any) {}
}
