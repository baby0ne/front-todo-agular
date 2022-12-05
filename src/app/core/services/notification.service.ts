import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class NotificationService {
  notify$ = new BehaviorSubject<string | null>(null)

  handleError(message: string) {
    this.notify$.next(message)
  }

  clear() {
    this.notify$.next(null)
  }
}
