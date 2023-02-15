import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Registration } from '../models/registration.model'
import { environment } from '../../../environments/environment'
import { catchError, EMPTY } from 'rxjs'
import { NotificationService } from '../../core/services/notification.service'

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  registration(payload: Partial<Registration>) {
    this.http
      .post<{ 'jwt-token': string }>(`${environment.baseUrl}/auth/registration`, payload)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(() => {
        this.router.navigate(['login'])
      })
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message)
    return EMPTY
  }
}
