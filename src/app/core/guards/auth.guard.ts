import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.authService.authRequest
    let isAuth: boolean

    const subscribe = this.authService.isAuth$.subscribe(res => {
      isAuth = res.valueOf()

      if (!isAuth) {
        this.router.navigate(['/login'])
      }
    })

    subscribe.unsubscribe()

    // @ts-ignore
    return isAuth
  }
}
