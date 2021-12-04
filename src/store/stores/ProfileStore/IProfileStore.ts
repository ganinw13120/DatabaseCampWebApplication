import { User } from "@model/User"

export default interface IProfileStore {
    FetchUserProfile(userId: number, onSuccess: (res : User) => void, onError : () => void): void
    UpdateName(name: string, cb: any): Promise<any>
}
