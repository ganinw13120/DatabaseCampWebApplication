// IProfileStore.ts
/**
 * This file used to be a interface of profile store.
*/
import { User } from "@model/User"

export default interface IProfileStore {

    /**
     * On user enter profile page, fetching target profile
     *
     * @remarks
     * This method is part of profile store, manipulating profile and profile'data.
     *
     * @param userId target user's indentifier
     *
     * @param onSuccess on success callback function
     *
     * @param onError on error callback function
     */
    FetchUserProfile(userId: number, onSuccess: (res: User) => void, onError: () => void): void

    /**
     * On user changes profile's name, updating user's name
     *
     * @remarks
     * This method is part of profile store, manipulating profile and profile'data.
     *
     * @param name new user's name
     *
     * @param onSuccess on success callback function
     */
    UpdateName(name: string, onSuccess: any): Promise<any>
}
