import { Component, OnInit } from '@angular/core'
import { AuthService } from './core/services/auth.service'
import { Observable } from 'rxjs'
import { AppService } from './app.service'

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private appService: AppService) {}

  isLoading$!: Observable<boolean>
  isAuth$!: Observable<boolean>

  ngOnInit() {
    this.isLoading$ = this.appService.isLoading$
    this.isAuth$ = this.authService.isAuth$
    this.authService.me()
  }
}
