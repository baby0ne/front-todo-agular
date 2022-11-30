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
    // this.todosService.getTodos().subscribe({
    //   next: res => {
    //     this.todos = res
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.error = error.message
    //   },
    // })
  }

  createTodo(title: string) {
    this.todosService.createTodo(title)
    // this.todosService.createTodo(title).subscribe(res => {
    //   if (res.resultCode === 0) {
    //     this.todos.unshift(res.data.item)
    //   }
    // })
  }

  deleteTodo(todoId: string) {
    this.todosService.deleteTodo(todoId)
    // this.todosService.deleteTodo(todoId).subscribe(res => {
    //   if (res.resultCode === 0) {
    //     this.todos = this.todos.filter(todo => todo.id !== todoId)
    //   }
    // })
  }

  createTodoHandler($event: Event) {
    this.createTodo(($event.currentTarget as HTMLInputElement).value)
  }
}
