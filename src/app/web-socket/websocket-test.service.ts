import { Injectable } from '@angular/core'
import { Stomp } from '@stomp/stompjs'
import * as SockJS from 'sockjs-client'
import { BehaviorSubject } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: any
  private messageSubject = new BehaviorSubject<string>('')

  constructor() {
    this.initializeWebSocket()
  }

  initializeWebSocket() {
    const ws = new SockJS(`${environment.baseUrl}/websocket`)
    this.stompClient = Stomp.over(ws)
  }
  connect() {
    this.stompClient.connect({}, () => {
      console.log('Connected to STOMP server!')

      this.stompClient.subscribe('/topic/messages', (message: { body: string }) => {
        this.messageSubject.next(JSON.parse(message.body).sender)
      })
    })
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect()
      console.log('Disconnected to STOMP server!')
    }
  }

  // Метод для отправки сообщения
  sendMessage(message: string) {
    this.stompClient.send('/app/send', {}, JSON.stringify({ content: message }))
  }

  // Метод для прослушивания сообщений
  onMessageReceived() {
    return this.messageSubject.asObservable()
  }
}
