import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FilterType, TodoDomainType } from '../../../models/todos.model'
import { TasksService } from '../../../services/tasks.service'
import { TodosService } from '../../../services/todos.service'

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css', '../../../../shared/styles.css'],
})
export class TodoComponent {
  @Input() todo!: TodoDomainType
  @Output() deleteTodoEvent = new EventEmitter<number>()
  @Output() editTitleEvent = new EventEmitter<{ todoId: number; title: string }>()

  constructor(private taskService: TasksService, private todosService: TodosService) {}

  isEditMode = false
  newTaskTitle = ''
  newTitle = ''

  deleteTodoHandler() {
    this.deleteTodoEvent.emit(this.todo.id)
  }

  activateEditMode() {
    this.newTitle = this.todo.title
    this.isEditMode = true
  }

  editTitleHandler() {
    this.isEditMode = false
    this.editTitleEvent.emit({ todoId: this.todo.id, title: this.newTitle })
  }

  addTaskHandler() {
    this.taskService.addTask(this.todo.id, this.newTaskTitle)
    this.newTaskTitle = ''
  }

  changeFilterHandler(filter: FilterType) {
    this.todosService.changeFilter(this.todo.id, filter)
  }
}
