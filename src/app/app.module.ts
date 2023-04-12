import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { TodosModule } from './todos/todos.module'
import { AuthModule } from './auth/auth.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'
import { RegistrationModule } from './registration/registration.module'
import { ProfileModule } from './profile/profile.module'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { UsersModule } from './users/users.module'
import { UserProfileModule } from './userProfile/userProfile.module'
import { MessagesPageModule } from './messages-page/messages-page.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TodosModule,
    AuthModule,
    RegistrationModule,
    ProfileModule,
    UsersModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    UserProfileModule,
    MessagesPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
