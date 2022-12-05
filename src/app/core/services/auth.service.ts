import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: Partial<{ email: string | null; password: string | null }>) {
    this.http.post(`${environment.baseUrl}/auth/login`, payload).subscribe(res => {
      debugger
    })
  }

  logout() {
    this.http.delete(`${environment.baseUrl}/auth/me`).subscribe(res => {
      debugger
    })
  }
}
