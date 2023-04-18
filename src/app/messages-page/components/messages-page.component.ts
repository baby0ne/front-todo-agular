import { Component, OnInit } from '@angular/core'
import { Messages, Sender } from '../models/messages-page.model'
import { MessagesPageService } from '../services/messages-page.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'todo-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css', '../../shared/styles.css'],
})
export class MessagesPageComponent implements OnInit {
  senders: Sender[] = [
    {
      id: 1,
      username: 'Kokoshibo',
      picture: 'https://mobimg.b-cdn.net/v3/fetch/f8/f8ec8ccc16c2f75e2ed32a8364467f0b.jpeg',
    },
    {
      id: 2,
      username: 'Douma',
      picture: 'https://i.pinimg.com/originals/6c/a9/46/6ca9460c6bec8d06310775184f68855f.jpg',
    },
    {
      id: 3,
      username: 'Akaza',
      picture:
        'https://scontent-fra5-2.xx.fbcdn.net/v/t39.30808-6/212511540_546713863412692_5125984561600086310_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wITsYVfDGeMAX_B2kmG&_nc_oc=AQlCRCieYw7mtlhRABlCtv9dEW5P2O9h_INL3HqPQIqn7yR_VCTyP5r9AYp5_Pq1vMs&_nc_ht=scontent-fra5-2.xx&oh=00_AfA_nsyKxIJjFEaksdDjVk_ukhsPLaA5L1YiIKaqweqhMQ&oe=644281E2',
    },
    {
      id: 4,
      username: 'Hantengu',
      picture: 'https://i.pinimg.com/originals/48/31/c6/4831c6f44b951ea9a98f19ae6eee96f6.jpg',
    },
    {
      id: 5,
      username: 'Gyokko',
      picture: 'https://pbs.twimg.com/media/EaaBTtyWkAE7MeZ.jpg:small',
    },
    {
      id: 6,
      username: 'Gyotaro',
      picture: 'https://mobimg.b-cdn.net/v3/fetch/36/36926bc48fc410e07f7d961d4904d486.jpeg',
    },
    {
      id: 7,
      username: 'Akaza',
      picture:
        'https://scontent-fra5-2.xx.fbcdn.net/v/t39.30808-6/212511540_546713863412692_5125984561600086310_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wITsYVfDGeMAX_B2kmG&_nc_oc=AQlCRCieYw7mtlhRABlCtv9dEW5P2O9h_INL3HqPQIqn7yR_VCTyP5r9AYp5_Pq1vMs&_nc_ht=scontent-fra5-2.xx&oh=00_AfA_nsyKxIJjFEaksdDjVk_ukhsPLaA5L1YiIKaqweqhMQ&oe=644281E2',
    },
    {
      id: 8,
      username: 'Hantengu',
      picture: 'https://i.pinimg.com/originals/48/31/c6/4831c6f44b951ea9a98f19ae6eee96f6.jpg',
    },
    {
      id: 9,
      username: 'Gyokko',
      picture: 'https://pbs.twimg.com/media/EaaBTtyWkAE7MeZ.jpg:small',
    },
    {
      id: 10,
      username: 'Gyotaro',
      picture: 'https://mobimg.b-cdn.net/v3/fetch/36/36926bc48fc410e07f7d961d4904d486.jpeg',
    },
  ]
  messages: Messages = {
    1: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Kokoshibo!', my: true },
    ],
    2: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Douma!', my: true },
    ],
    3: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Akaza!', my: true },
    ],
    4: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Hantengu!', my: true },
    ],
    5: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Gyokko!', my: true },
    ],
    6: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Gyotaro!', my: true },
    ],
    7: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Akaza!', my: true },
    ],
    8: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Hantengu!', my: true },
    ],
    9: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Gyokko!', my: true },
    ],
    10: [
      { id: 1, text: 'hi!', my: false },
      { id: 2, text: 'hello, Gyotaro!', my: true },
    ],
  }

  dialogsId = 0

  ngOnInit() {
    this.dialogsId = this.activatedRoute.snapshot.params['id']
    this.messagesPageService.getSenders()
  }

  changeDialogsIdHandler(id: number) {
    this.dialogsId = id
  }

  constructor(
    private messagesPageService: MessagesPageService,
    private activatedRoute: ActivatedRoute
  ) {}
}
