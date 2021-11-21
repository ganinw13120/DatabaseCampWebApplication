export default interface IProfileStore {
    FetchUserProfile(userId: number, cb: any): void
    UpdateName(name: string, cb: any): Promise<any>
}
