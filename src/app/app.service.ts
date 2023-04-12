import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isLoading$ = this._isLoading$.asObservable()

  setLoading(isLoading: boolean) {
    this._isLoading$.next(isLoading)
  }
}
