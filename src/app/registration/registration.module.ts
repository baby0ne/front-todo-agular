import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RegistrationRoutingModule } from './registration-routing.module'
import { RegistrationComponent } from './components/registration/registration.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, RegistrationRoutingModule, ReactiveFormsModule],
})
export class RegistrationModule {}