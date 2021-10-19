import AuthRepository from "../../../data/repository/auth/AuthRepository";
import { AuthStore } from "../../entity/state/stores/AuthStore";



export default class RegisterUseCase {

    private authRepository: AuthRepository;
    private authStore: AuthStore;

    public constructor(authRepository: AuthRepository, authStore: AuthStore) {
        this.authRepository = authRepository;
        this.authStore = authStore;
    }

    public async Register(name: string, email: string, password: string): Promise<{ issuccess: boolean, message?: string }> {
        const result = await this.authRepository.Register({
            name: name,
            email: email,
            password: password,
        }).then((res) => {
            this.authStore.Login(res)
            return {
                issuccess: true,
                message: ''
            }
        }).catch((err) => {
            return {
                issuccess: false,
                message: err.message
            }
        })
        return result
    }
}