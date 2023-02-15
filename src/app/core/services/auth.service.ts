import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Login } from '../models/auth.model'
import { BehaviorSubject, catchError, EMPTY } from 'rxjs'
import { NotificationService } from './notification.service'
import { Router } from '@angular/router'

interface AuthResponse {
  id: number
  email: string
  password: string
  'jwt-token': string
}

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  resolveAuthRequest: Function = () => {}
  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  isAuth$ = new BehaviorSubject<boolean>(false)
  token$ = new BehaviorSubject<string | null>(null)

  login(payload: Partial<Login>) {
    this.http
      .post<AuthResponse>(`${environment.baseUrl}/auth/login`, payload, {})
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        localStorage.setItem('jwt-token', res['jwt-token'])
        this.isAuth$.next(true)
        this.router.navigate([''])
      })
  }

  logout() {
    localStorage.removeItem('jwt-token')
    this.isAuth$.next(false)
    this.router.navigate(['login'])
  }

  me() {
    this.resolveAuthRequest()
    this.token$.next(localStorage.getItem('jwt-token'))
    this.isAuth$.next(this.token$.getValue() !== null)
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message)
    return EMPTY
  }
}
