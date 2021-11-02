import { AuthStore } from "./stores/AuthStore";
import { OverviewStore } from "./stores/OverviewStore";

export default class RootStore {
  public authStore = new AuthStore(this);
  public overviewStore = new OverviewStore(this);

}