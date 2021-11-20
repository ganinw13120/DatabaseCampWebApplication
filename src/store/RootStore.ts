import { AuthStore } from "./stores/AuthStore";
import { AppStore } from "./stores/AppStore";
import { OverviewStore } from "./stores/OverviewStore";
import { PointRankingStore } from "./stores/PointRankingStore";
import { LearningStore } from "./stores/LearningStore";
import { ProfileStore } from "./stores/ProfileStore";
import { ExaminationStore } from "./stores/ExaminationStore";

/**
 * Initialize and store mobx stores, which root store is included in every store(For communicating between stores).
 * 
 * @remarks
 * Intitializing stores in only root store, provide in every component.
 */
export default class RootStore {
  public authStore = new AuthStore(this);
  public appStore = new AppStore(this);
  public overviewStore = new OverviewStore(this);
  public pointRankingStore = new PointRankingStore(this);
  public learningStore = new LearningStore(this);
  public profileStore = new ProfileStore(this);
  public examinationStore = new ExaminationStore(this);
}
