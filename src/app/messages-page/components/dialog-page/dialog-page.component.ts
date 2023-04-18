import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Message } from '../../models/messages-page.model'
import { WebSocketService } from '../../../web-socket/websocket-test.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'todo-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.css'],
})
export class DialogPageComponent implements OnInit, OnDestroy {
  constructor(private webSocketService: WebSocketService) {}
  @Input() messages!: Message[]

  private messageSubscription!: Subscription
  message!: string

  ngOnInit() {
    this.webSocketService.connect()
    this.messageSubscription = this.webSocketService.onMessageReceived().subscribe(message => {})
  }

  ngOnDestroy() {
    this.webSocketService.disconnect()
    this.messageSubscription.unsubscribe()
  }

  sendMessageHandler() {
    this.webSocketService.sendMessage(this.message)
  }
}
