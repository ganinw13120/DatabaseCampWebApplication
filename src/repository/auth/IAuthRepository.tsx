export default interface IAuthRepository {
  Login(data: any): Promise<any>;
}