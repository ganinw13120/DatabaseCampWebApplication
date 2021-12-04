import { AuthUser, User } from "@model/User";

export default interface IAuthRepository {
  Login(data: any): Promise<any>
  Register(data: any): Promise<AuthUser>
  VerifyToken(token: string) : Promise<User>
}