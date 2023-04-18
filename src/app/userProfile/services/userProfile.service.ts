import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { BehaviorSubject, catchError, EMPTY } from 'rxjs'
import { NotificationService } from '../../core/services/notification.service'
import { environment } from '../../../environments/environment'
import { Profile } from '../models/userProfile.model'

@Injectable()
export class UserProfileService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  private _profile$: BehaviorSubject<Profile> = new BehaviorSubject<Profile>({} as Profile)
  profile$ = this._profile$.asObservable()

  getProfile(userId: number) {
    if (String(userId) === localStorage.getItem('myID')) {
      this.router.navigate(['profile'])
    } else {
      this.http
        .get<Profile>(`${environment.baseUrl}/profile/${userId}`)
        .pipe(catchError(this.errorHandler.bind(this)))
        .subscribe(profile => {
          this._profile$.next(profile)
        })
    }
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.error)
    return EMPTY
  }
}
