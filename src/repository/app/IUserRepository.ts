import { User, AuthUser, Ranking } from "@model/User";

export default interface IUserReposirory {
    fetchPointRanking(token: string) : Promise<Ranking>
    fetchProfile(token: string, userID: number) : Promise<User>
    updateName(token: string, name: string) : Promise<any>
}