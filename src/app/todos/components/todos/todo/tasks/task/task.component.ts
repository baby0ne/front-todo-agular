import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task } from '../../../../../models/todos.model'

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

  updateTaskActiveHandler(event: MouseEvent) {
    const newActive = (event.currentTarget as HTMLInputElement).checked
    debugger
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
