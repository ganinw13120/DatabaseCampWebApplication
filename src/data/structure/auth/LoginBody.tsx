export interface loginBody {
  email: string,
  password: string,
}

export interface loginResult {
  userId? : number,
  name?: string,
  points?: number,
  token?: string,
  Useremail?: string
}

export interface request extends loginBody, loginResult { }