import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CheckComponent } from './shared/components/check/check.component'
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component'

const routes: Routes = [
  { path: 'check', component: CheckComponent },
  {
    path: 'login',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('../app/todos/todos.module').then(m => m.TodosModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('../app/registration/registration.module').then(m => m.RegistrationModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('../app/profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: `messages`,
    loadChildren: () =>
      import('../app/messages-page/messages-page.module').then(m => m.MessagesPageModule),
  },
  {
    path: `messages/:id`,
    loadChildren: () =>
      import('../app/messages-page/messages-page.module').then(m => m.MessagesPageModule),
  },
  {
    path: `users`,
    loadChildren: () => import('../app/users/users.module').then(m => m.UsersModule),
  },
  {
    path: `user-profile/:id`,
    loadChildren: () =>
      import('../app/userProfile/userProfile.module').then(m => m.UserProfileModule),
  },
  { path: '**', component: NotFoundPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
