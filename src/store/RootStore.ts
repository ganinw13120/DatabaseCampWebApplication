import { AuthStore } from "./stores/AuthStore/AuthStore";
import { AppStore } from "./stores/AppStore/AppStore";
import { OverviewStore } from "./stores/OverviewStore/OverviewStore";
import { PointRankingStore } from "./stores/PointRankingStore/PointRankingStore";
import { LearningStore } from "./stores/LearningStore/LearningStore";
import { ProfileStore } from "./stores/ProfileStore/ProfileStore";
import { ExaminationStore } from "./stores/ExaminationStore/ExaminationStore";

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
