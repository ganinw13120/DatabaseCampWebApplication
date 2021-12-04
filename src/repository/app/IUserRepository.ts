// IUserReposirory.ts
/**
 * This file used to be a interface of user repository.
*/
import { User, Ranking } from "@model/User";

export default interface IUserReposirory {
    /**
     * Fetch `Point` information of all users shown on point ranking page.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @return Ranking of users information shown on point ranking page
     */
    fetchPointRanking(token: string): Promise<Ranking>

    /**
     * Fetch `Profile` information of target user shown on profile page.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param userID identifier of target user
     *
     * @return Users information shown on profile page
     */
    fetchProfile(token: string, userID: number): Promise<User>

    /**
     * Update `User's Name` of current user.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param name user's new name
     *
     * @return Result of action
     */
    updateName(token: string, name: string): Promise<any>
}