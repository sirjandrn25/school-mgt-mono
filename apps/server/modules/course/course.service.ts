import { PrismaClient } from "database";
import BaseService from "../../services/base.service";
const prisma = new PrismaClient();
export default class CourseService extends BaseService {}
