import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task } from '../../../../../models/todos.model'
import { MatCheckboxChange } from '@angular/material/checkbox'

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() deleteTaskEvent = new EventEmitter<number>()
  @Output() updateTaskActiveEvent = new EventEmitter<{ taskId: number; newActive: boolean }>()
  @Output() updateTaskTitleEvent = new EventEmitter<{ taskId: number; title: string }>()

  isEditMode = false
  newTitle = ''

  deleteTaskHandler() {
    this.deleteTaskEvent.emit(this.task.id)
  }

  updateTaskActiveHandler(event: MatCheckboxChange) {
    const newActive = event.checked
    this.updateTaskActiveEvent.emit({ taskId: this.task.id, newActive })
  }

  editTaskTitleHandler() {
    this.isEditMode = false

    this.updateTaskTitleEvent.emit({ taskId: this.task.id, title: this.newTitle })
  }

  activateEditMode() {
    this.newTitle = this.task.task

    this.isEditMode = true
  }
}
