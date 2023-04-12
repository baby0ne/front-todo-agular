import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../core/services/auth.service'
import { AppService } from '../../../app.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'todo-registration',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../shared/styles.css'],
})
export class LoginComponent {
  isLoading$: Observable<boolean> = new Observable<boolean>()

  constructor(private authService: AuthService, private appService: AppService) {}
  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,5}$'),
      ],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  })

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  onLoginSubmit() {
    this.isLoading$ = this.appService.isLoading$

    this.authService.login({
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    })
  }
}
