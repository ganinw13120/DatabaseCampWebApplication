import { Overview } from "@model/Learning";

export default interface IOverviewStore {
    FetchOverview(): Promise<Overview | null>
}
