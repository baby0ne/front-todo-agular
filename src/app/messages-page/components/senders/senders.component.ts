import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Sender } from '../../models/messages-page.model'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'todo-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.css'],
})
export class SendersComponent implements OnInit {
  @Input() senders!: Sender[]
  @Output() changeDialogsIdEvent = new EventEmitter<number>()

  dialogsId!: number

  ngOnInit() {
    this.dialogsId = this.activatedRoute.snapshot.params['id']
  }

  changeDialogsIdHandler(id: number) {
    this.changeDialogsIdEvent.emit(id)
    this.dialogsId = id
  }
  constructor(private activatedRoute: ActivatedRoute) {}
}
