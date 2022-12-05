import { Component, OnInit } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'
import { TodoDomainType } from '../../models/todos.model'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService, private authService: AuthService) {}

  todos$: Observable<TodoDomainType[]> = new Observable<TodoDomainType[]>()
  todoTitle!: string

  ngOnInit() {
    this.todosService.getTodos()

    this.todos$ = this.todosService.todos$
  }

  addTodoHandler() {
    this.todosService.addTodo(this.todoTitle)
    this.todoTitle = ''
  }

  deleteTodoHandler(todoId: number) {
    this.todosService.deleteTodo(todoId)
  }

  editTodoHandler(payload: { todoId: number; title: string }) {
    this.todosService.editTodo(payload.todoId, payload.title)
  }

  logoutHandler() {
    this.authService.logout()
  }
}
