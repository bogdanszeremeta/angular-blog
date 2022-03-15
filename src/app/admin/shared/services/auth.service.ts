import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, Subject, tap, throwError} from "rxjs";
import {FbAuthResponse, AuthResponse, User, UserRequest} from "../../../shared/interfaces";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const fbTokenExp = localStorage.getItem('fb-token-exp')
    if (fbTokenExp === null) {
      return null
    }
    const expData = new Date(fbTokenExp)
    if (new Date() > expData) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    const userRequest: UserRequest = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, userRequest)
      .pipe(
        tap(res => this.setToken(res)),
        catchError(this.handleError.bind(this)),
      )
  }

  logout() {
    this.setToken(null)
    // this.setToken = null;
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email address not found.')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Your password is invalid. Please try again.')
        break
      case 'USER_DISABLED':
        this.error$.next('The user account has been disabled by an administrator.')
        break
    }

    return throwError(() => error)
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn*1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}

