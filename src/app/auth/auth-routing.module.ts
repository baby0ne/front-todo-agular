import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { TodosGuard } from '../core/guards/todos.guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [TodosGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
