import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Registration } from '../models/registration.model'
import { environment } from '../../../environments/environment'
import { catchError, EMPTY } from 'rxjs'
import { NotificationService } from '../../core/services/notification.service'
import { AppService } from '../../app.service'

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
    private appService: AppService
  ) {}

  registration(payload: Partial<Registration>) {
    this.appService.setLoading(true)
    this.http
      .post<{ 'jwt-token': string }>(`${environment.baseUrl}/auth/registration`, payload)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(() => {
        this.router.navigate(['check'])
        this.appService.setLoading(false)
      })
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.error)
    return EMPTY
  }
}
