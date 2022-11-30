import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/internal/Subscription'
import { Todo, TodosService } from '../../services/todos.service'

@Component({
  selector: 'todo-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.css'],
})
export class TodolistsComponent implements OnInit, OnDestroy {
  constructor(private todosService: TodosService) {}

  todos: Todo[] = []
  error = ''
  subscriptions: Subscription = new Subscription()

  ngOnInit(): void {
    this.getTodos()
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getTodos() {
    this.subscriptions.add(
      this.todosService.getTodos().subscribe({
        next: res => {
          this.todos = res
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.message
        },
      })
    )
  }

  createTodo(title: string) {
    this.subscriptions.add(
      this.todosService.createTodo(title).subscribe(res => {
        if (res.resultCode === 0) {
          this.todos.unshift(res.data.item)
        }
      })
    )
  }

  deleteTodo(todoId: string) {
    this.subscriptions.add(
      this.todosService.deleteTodo(todoId).subscribe(res => {
        if (res.resultCode === 0) {
          this.todos = this.todos.filter(todo => todo.id !== todoId)
        }
      })
    )
  }

  createTodoHandler($event: Event) {
    this.createTodo(($event.currentTarget as HTMLInputElement).value)
  }
}
