import AuthRepository from '../../../data/repository/auth/AuthRepository';
import ILoginUseCase from './ILoginUseCase';

export default class LoginUseCase implements ILoginUseCase {

  private authRepository: AuthRepository;

  public constructor() {
    const authRepository = new AuthRepository();
    this.authRepository = authRepository;
  }

  public async Login(email: string, password: string): Promise<string> {
    const result = await this.authRepository.Login({
      email: email,
      password : password,
    }).then((res) => {
      console.log(res)
      return ''
    }).catch((err) => {
      return err.message;
    })
    return result;
  }
}