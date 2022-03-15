export interface User {
  email: string
  password: string
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface UserRequest extends User{
  returnSecureToken: boolean
}

export interface Post {
  id?: string,
  title: string,
  text: string
  author: string,
  date: Date,
  name?: string
}

export interface AuthResponse {
  idToken:	string
  email:	string
  refreshToken:	string
  expiresIn:	string
  localId:	string
  registered:	boolean
}

export interface FbCreateResponse {
  name?: string
}
