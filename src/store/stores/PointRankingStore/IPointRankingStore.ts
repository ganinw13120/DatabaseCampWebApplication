import { Ranking } from "@model/User";

export default interface IPointRankingStore {
    fatchRanking(): Promise<any>
    store: Store
}

export type Store = {
    data: Ranking | null,
    isLoading: boolean
}