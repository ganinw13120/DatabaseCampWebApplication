import { User } from "@model/User";

export default interface IAuthStore {
  DecreaseUserPoint(point: number): void,
  SetUserPoint(point: number): void,
  VerifyToken(token: string): Promise<void>,
  Logout(cb?: any): void,
  Login(email: string, password: string, cb: any): Promise<void>,
  Register(name: string, email: string, password: string, cb: any): Promise<void>,
  store : Store
}

export type Store = {
  userData: User | null
  token: string
  isLoading: boolean
}
