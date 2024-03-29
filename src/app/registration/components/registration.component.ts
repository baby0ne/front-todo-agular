import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth.service'
import { RegistrationService } from '../services/registration.service'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AppService } from '../../app.service'

@Component({
  selector: 'todo-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../../shared/styles.css'],
})
export class RegistrationComponent {
  isLoading$: Observable<boolean> = new Observable<boolean>()

  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
    private appService: AppService
  ) {}

  registrationForm = new FormGroup({
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
    repeatPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  })

  get email() {
    return this.registrationForm.get('email')
  }

  get password() {
    return this.registrationForm.get('password')
  }

  get repeatPassword() {
    return this.registrationForm.get('repeatPassword')
  }

  onRegistrationSubmit() {
    this.isLoading$ = this.appService.isLoading$

    this.registrationService.registration({
      username: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
    })
  }
}
