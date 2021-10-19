import AuthRepository from '../../../data/repository/auth/AuthRepository';
import { AuthStore } from '../../entity/state/stores/AuthStore';

export default class LoginUseCase {

  private authRepository: AuthRepository;
  private authStore: AuthStore;

  public constructor(authRepository: AuthRepository, authStore : AuthStore) {
    this.authRepository = authRepository;
    this.authStore = authStore;
  }

  public async Login(email: string, password: string): Promise<{issuccess : boolean, message? : string}> {
    const result = await this.authRepository.Login({
      email: email,
      password : password,
    }).then((res) => {
      this.authStore.Login(res)
      return {
        issuccess: true,
        message : ''
      }
    }).catch((err) => {
      return {
        issuccess: false,
        message : err.message
      }
    })
    // console.log(this.authStore)
    return result
  }
}