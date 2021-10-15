import { AuthStore } from "./stores/AuthStore";

export default class RootStore {

  public authStore = new AuthStore(this);

}