import AuthRepository from '../../../data/repository/auth/AuthRepository';
import ILoginUseCase from './ILoginUseCase';

export default class LoginUseCase implements ILoginUseCase {

  private authRepository: AuthRepository;

  public constructor() {
    const authRepository = new AuthRepository();
    this.authRepository = authRepository;
  }

  public async Login(email: string, password: string): Promise<{issuccess : boolean, message? : string}> {
    const result = await this.authRepository.Login({
      email: email,
      password : password,
    }).then((res) => {
      console.log(res)
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
    return result
  }
}