import { User, AuthUser } from "@model/User";

export default interface IUserReposirory {
    VerifyToken(token: string) : Promise<User>;
    Login(data: any): Promise<AuthUser>;
    Register(data: any): Promise<AuthUser>;
}