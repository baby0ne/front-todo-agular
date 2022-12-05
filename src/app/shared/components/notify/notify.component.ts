import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../../../core/services/notification.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'todo-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
})
export class NotifyComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  notify$!: Observable<string | null>

  ngOnInit(): void {
    this.notify$ = this.notificationService.notify$
  }

  closeNotification() {
    this.notificationService.clear()
  }
}
