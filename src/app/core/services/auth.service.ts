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
  active: boolean
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

  login(payload: Partial<Login>) {
    this.http
      .post<AuthResponse>(`${environment.baseUrl}/auth/login`, payload)
      .pipe(catchError(this.ErrorHandler.bind(this)))
      .subscribe(res => {
        this.isAuth$.next(res.active)
        this.router.navigate([''])
      })
  }

  logout() {
    this.http
      .post<AuthResponse>(`${environment.baseUrl}/auth/logout`, { id: 1 })
      .pipe(catchError(this.ErrorHandler.bind(this)))
      .subscribe(res => {
        this.isAuth$.next(res.active)
        this.router.navigate(['/login'])
      })
  }

  me() {
    this.http.get<AuthResponse>(`${environment.baseUrl}/auth/me`).subscribe(res => {
      this.isAuth$.next(res.active)
      this.resolveAuthRequest()
    })
  }

  private ErrorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message)
    return EMPTY
  }
}
