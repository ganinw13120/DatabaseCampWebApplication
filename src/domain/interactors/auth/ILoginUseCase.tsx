export default interface ILoginUseCase {
  Login(email:string, password:string): Promise<string>;
}