export default interface ILoginUseCase {
  Login(email:string, password:string): Promise<{issuccess : boolean, message? : string}>;
}