import { AuthStore } from "./stores/AuthStore";
import { AppStore } from "./stores/AppStore";
import { OverviewStore } from "./stores/OverviewStore";

export default class RootStore {
  public authStore = new AuthStore(this);
  public appStore = new AppStore(this);
  public overviewStore = new OverviewStore(this);

}