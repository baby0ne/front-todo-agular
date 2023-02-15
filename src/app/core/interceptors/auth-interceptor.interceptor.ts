import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('login') && !req.url.includes('registration')) {
      req = req.clone({
        headers: new HttpHeaders().append(
          'Authorization',
          `Bearer ${localStorage.getItem('jwt-token')}`
        ),
      })
    }
    return next.handle(req)
  }
}
