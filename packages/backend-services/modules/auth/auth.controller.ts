import { RequestType } from "../../types/request.types";

export class AuthController {
    static login = async (req: any, res: any) => {
        const { email, password } = req.body;
        //find email user
        //check password
        return {
            //access token,
            //refresh token,
            //access token expiration time, access_expiration_in
            //refresh token expiration time refresh_expiration_in
            //user data
        };
    };

    static register = async (req: any, res: any) => {
        const { email, password } = req.body;
    };
}
