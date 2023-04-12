import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Login, AuthResponse, MyProfile } from '../models/auth.model'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { NotificationService } from './notification.service'
import { Router } from '@angular/router'

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

  private _myProfile$: BehaviorSubject<MyProfile> = new BehaviorSubject<MyProfile>({} as MyProfile)
  myProfile$ = this._myProfile$.asObservable()
  private _isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isAuth$ = this._isAuth$.asObservable()

  login(payload: Partial<Login>) {
    this.http
      .post<AuthResponse>(`${environment.baseUrl}/auth/login`, payload, {})
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        localStorage.setItem('jwt-token', res['jwt-token'])
        this._isAuth$.next(true)
        this.router.navigate([''])
      })
  }

  logout() {
    localStorage.removeItem('jwt-token')
    localStorage.removeItem('myID')
    this._isAuth$.next(false)
    this.router.navigate(['/login'])
  }

  me() {
    this.resolveAuthRequest()
    if (localStorage.getItem('jwt-token')) {
      this._isAuth$.next(true)
      this.http
        .get<MyProfile>(`${environment.baseUrl}/profile/me`)
        .pipe(catchError(this.meError))
        .subscribe(profile => {
          localStorage.setItem('myID', String(profile.id))
          this._myProfile$.next(profile)
        })
    } else {
      this._isAuth$.next(false)
      this.router.navigate(['/login'])
    }
  }

  changeProfileImage(newImage: string) {
    this.http
      .patch<MyProfile>(`${environment.baseUrl}/profile/changeImage`, newImage)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(res => {
          const actualProfile = this._myProfile$.getValue()
          actualProfile.picture = newImage
          return actualProfile
        })
      )
      .subscribe(res => {
        this._myProfile$.next(res)
      })
  }

  changeProfileName(newName: string) {
    this.http
      .patch<MyProfile>(`${environment.baseUrl}/profile/changeUsername`, newName)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(res => {
          const actualProfile = this._myProfile$.getValue()
          actualProfile.username = newName
          return actualProfile
        })
      )
      .subscribe(res => {
        this._myProfile$.next(res)
      })
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.error)
    return EMPTY
  }

  private meError() {
    localStorage.removeItem('jwt-token')
    return EMPTY
  }
}
