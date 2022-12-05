import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationComponent } from './components/navigation/navigation.component'
import { RouterModule } from '@angular/router'
import { NotifyComponent } from './components/notify/notify.component'

@NgModule({
  declarations: [NavigationComponent, NotifyComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigationComponent, NotifyComponent],
})
export class SharedModule {}
