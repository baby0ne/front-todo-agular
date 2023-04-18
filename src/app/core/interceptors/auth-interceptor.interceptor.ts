import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { AppService } from '../../app.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private appService: AppService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('login') && !req.url.includes('registration')) {
      req = req.clone({
        headers: new HttpHeaders().append(
          'Authorization',
          `Bearer ${localStorage.getItem('jwt-token')}`
        ),
      })
    }
    return next.handle(req).pipe(
      tap({
        next: () => {
          this.appService.setLoading(true)
        },
        finalize: () => {
          this.appService.setLoading(false)
        },
      })
    )
  }
}
