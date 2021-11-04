import { AuthStore } from "./stores/AuthStore";
import { OverviewStore } from "./stores/OverviewStore";
import { PointRankingStore } from "./stores/PointRanking.Store";

export default class RootStore {
  public authStore = new AuthStore(this);
  public overviewStore = new OverviewStore(this);
  public pointRankingStore = new PointRankingStore(this);
}