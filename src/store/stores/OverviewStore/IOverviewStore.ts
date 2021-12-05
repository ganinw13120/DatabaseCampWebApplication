// IOverviewStore.ts
/**
 * This file used to be a interface of overview store.
*/
import { Overview } from "@model/Learning";

export default interface IOverviewStore {

    /**
     * On user enter overview page, fetching overview information
     *
     * @remarks
     * This method is part of overview store, manipulating overview and overview'data.
     *
     * @returns Overview information
     */
    FetchOverview(): Promise<Overview | null>
}
