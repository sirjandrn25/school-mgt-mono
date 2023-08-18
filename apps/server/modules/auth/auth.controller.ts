import AuthService from "./auth.service";

export default class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body as any;
        const user = await AuthService.getByEmail(email);
        //match password with hash password
        //generate refresh and access token with expiration time
    }

    static async register(req: Request, res: Response) {}

    static async handleRefreshToken(req: Request, res: Response) {}
}
