export interface registerBody {
    name: string,
    email: string,
    password: string,
}
  

export interface registerResult {
    user_id? : number,
    userName?: string,
    point?: number,
    access_token?: string,
    userEmail?: string
}

export interface registerData {
    user_id? : number,
    point? : number,
    access_token?: string,
    name: string,
    email: string,
    password: string,
}

export interface registerRequest extends registerBody, registerResult { }


