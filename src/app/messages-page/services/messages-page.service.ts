import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MessagesPageService {
  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get(`${environment.baseUrl}/messages/${localStorage.getItem('myID')}/18`)
      .subscribe(res => {
        debugger
      })
  }
}
