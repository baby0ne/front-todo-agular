import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { MyProfile } from '../../core/models/auth.model'
import { UserProfileService } from '../services/userProfile.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'todo-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css', '../../shared/styles.css'],
  providers: [UserProfileService],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined
  constructor(private profileService: UserProfileService, private activatedRoute: ActivatedRoute) {}

  profile$!: Observable<MyProfile>
  profile = {} as MyProfile

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params)
    this.profileService.getProfile(this.activatedRoute.snapshot.params['id'])

    this.profile$ = this.profileService.profile$
    this.subscription = this.profile$.subscribe(res => (this.profile = res))
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
