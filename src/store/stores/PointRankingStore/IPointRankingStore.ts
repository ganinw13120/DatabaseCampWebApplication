// IPointRankingStore.ts
/**
 * This file used to be a interface of point ranking store.
*/
import { Ranking } from "@model/User";

export default interface IPointRankingStore {

    /**
     * On user enter point ranking page, fetching ranking information and stores into store
     *
     * @remarks
     * This method is part of point ranking store, manipulating point ranking and point ranking'data.
     */
    fatchRanking(): Promise<any>

    /**
     * Store for storing datas
     *
     * @remarks
     * This method is part of point ranking store, manipulating point ranking and point ranking'data.
     */
    store: Store
}

export type Store = {
    data: Ranking | null
    isLoading: boolean
}