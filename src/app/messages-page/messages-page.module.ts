import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MessagesPageRoutingModule } from './messages-page-routing.module'
import { MessagesPageComponent } from './components/messages-page.component'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { MatListModule } from '@angular/material/list'
import { SenderComponent } from './components/senders/sender/sender.component'
import { DialogPageComponent } from './components/dialog-page/dialog-page.component'
import { SendersComponent } from './components/senders/senders.component'

@NgModule({
  declarations: [
    MessagesPageComponent,
    SenderComponent,
    SendersComponent,
    SenderComponent,
    DialogPageComponent,
  ],
  imports: [
    CommonModule,
    MessagesPageRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatListModule,
  ],
})
export class MessagesPageModule {}
