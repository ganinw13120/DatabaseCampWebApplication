export interface loginBody {
  email: string,
  password: string,
}

export interface loginResult {
  user_id? : number,
  name?: string,
  point?: number,
  access_token?: string,
  Useremail?: string
}

export interface request extends loginBody, loginResult { }