import { Component, Input } from '@angular/core'
import { Sender } from '../../../models/messages-page.model'

@Component({
  selector: 'todo-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css'],
})
export class SenderComponent {
  constructor() {}

  @Input() sender!: Sender
}
