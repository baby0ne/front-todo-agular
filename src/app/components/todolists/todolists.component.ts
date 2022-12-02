import { Component, OnInit } from '@angular/core'
import { Todo, TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'todo-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.css'],
})
export class TodolistsComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  todos$!: Observable<Todo[]>
  error = ''

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$

    this.getTodos()
  }

  getTodos() {
    this.todosService.getTodos()
  }

  createTodo(title: string) {
    this.todosService.createTodo(title)
  }

  deleteTodo(todoId: number) {
    this.todosService.deleteTodo(todoId)
  }

  updateTodo(todoId: number, title: string) {
    this.todosService.updateTodo(todoId, title)
  }

  createTodoHandler($event: Event) {
    this.createTodo(($event.currentTarget as HTMLInputElement).value)
  }
}
