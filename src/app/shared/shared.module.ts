import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationComponent } from './components/navigation/navigation.component'
import { RouterModule } from '@angular/router'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { CheckComponent } from './components/check/check.component'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component'

@NgModule({
  declarations: [NavigationComponent, CheckComponent, NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [NavigationComponent],
})
export class SharedModule {}
