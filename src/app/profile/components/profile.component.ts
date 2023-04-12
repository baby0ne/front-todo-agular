import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../../core/services/auth.service'
import { Observable, Subscription } from 'rxjs'
import { MyProfile } from '../../core/models/auth.model'
import { convertFileToBase64 } from '../models/profile.model'

@Component({
  selector: 'todo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../shared/styles.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined
  constructor(private authService: AuthService) {}

  myProfile$!: Observable<MyProfile>
  myProfile = {} as MyProfile
  newName = ''
  isEditMode = false

  ngOnInit() {
    this.authService.me()
    this.myProfile$ = this.authService.myProfile$
    this.subscription = this.myProfile$.subscribe(res => (this.myProfile = res))
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  setNewProfileImageHandler(event: Event) {
    //@ts-ignore
    const file = (event.currentTarget as HTMLInputElement).files[0]
    convertFileToBase64(file, this.authService.changeProfileImage.bind(this.authService))
  }

  setNewProfileNameHandler() {
    this.authService.changeProfileName(this.newName)
    this.isEditMode = false
  }

  activateEditMode() {
    this.newName = this.myProfile.username
    this.isEditMode = true
  }

  logoutHandler() {
    this.authService.logout()
  }
}
