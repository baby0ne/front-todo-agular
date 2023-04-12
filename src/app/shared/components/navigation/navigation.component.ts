import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { MyProfile } from '../../../core/models/auth.model'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'todo-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService) {}

  myProfile$: Observable<MyProfile> = new Observable<MyProfile>()
  isAuth$: Observable<boolean> = new Observable<boolean>()

  ngOnInit() {
    this.isAuth$ = this.authService.isAuth$
    this.myProfile$ = this.authService.myProfile$
  }
}
