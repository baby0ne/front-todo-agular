import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { BehaviorSubject, catchError, delay, EMPTY } from 'rxjs'
import { NotificationService } from '../../core/services/notification.service'
import { environment } from '../../../environments/environment'
import { User, UsersResponse } from '../models/users.model'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  private _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  private _usersCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  users$ = this._users$.asObservable()
  usersCount$ = this._usersCount$.asObservable()

  getUsers(userName = '', pageNumber = 0, pageSize = 5) {
    this.http
      .get<UsersResponse>(
        `${environment.baseUrl}/profiles?name=${userName}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        this._users$.next(res.profiles)
        this._usersCount$.next(res.count)
      })
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.error)
    return EMPTY
  }
}
