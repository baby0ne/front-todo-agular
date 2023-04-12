import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AppService } from '../../app.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}
  error!: string

  handleError(error: any) {
    if (error.message) {
      this.error = error.message
    } else {
      this.error = error.violations[0].message
    }
    this._snackBar.open(this.error, '✖', {
      duration: 5000,
      horizontalPosition: 'left',
    })
  }
}
