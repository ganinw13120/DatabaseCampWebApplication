import AuthRepository from "../../../data/repository/auth/AuthRepository";
import { AuthStore } from "../../entity/state/stores/AuthStore";



export default class RegisterUseCase {

    private authRepository: AuthRepository;
    private authStore: AuthStore;

    public constructor(authRepository: AuthRepository, authStore: AuthStore) {
        this.authRepository = authRepository;
        this.authStore = authStore;
    }
}