// RootStore.ts
/**
 * This file used as a root of mobx store, containing all stores.
*/
import { AuthStore } from "./stores/AuthStore/AuthStore";
import { AppStore } from "./stores/AppStore/AppStore";
import { OverviewStore } from "./stores/OverviewStore/OverviewStore";
import { PointRankingStore } from "./stores/PointRankingStore/PointRankingStore";
import { LearningStore } from "./stores/LearningStore/LearningStore";
import { ProfileStore } from "./stores/ProfileStore/ProfileStore";
import { ExaminationStore } from "./stores/ExaminationStore/ExaminationStore";
import IAppStore from "./stores/AppStore/IAppStore";
import IAuthStore from "./stores/AuthStore/IAuthStore";
import IExaminationStore from "./stores/ExaminationStore/IExaminationStore";
import ILearningStore from "./stores/LearningStore/ILearningStore";
import IOverviewStore from "./stores/OverviewStore/IOverviewStore";
import IPointRankingStore from "./stores/PointRankingStore/IPointRankingStore";
import IProfileStore from "./stores/ProfileStore/IProfileStore";

/**
 * Initialize and store mobx stores, which root store is included in every store(For communicating between stores).
 *
 * @remarks
 * Intitializing stores in only root store, provide in every component.
 */
export default class RootStore {
  public authStore : IAuthStore;
  public appStore : IAppStore;
  public overviewStore : IOverviewStore;
  public pointRankingStore : IPointRankingStore;
  public learningStore : ILearningStore;
  public profileStore : IProfileStore;
  public examinationStore : IExaminationStore;
  
  constructor () {
      this.authStore = new AuthStore(this);
      this.appStore = new AppStore(this);
      this.overviewStore = new OverviewStore(this);
      this.pointRankingStore = new PointRankingStore(this);
      this.learningStore = new LearningStore(this);
      this.profileStore = new ProfileStore(this);
      this.examinationStore = new ExaminationStore(this);
    
  }
}
