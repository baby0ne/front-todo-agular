import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { environment } from '../../../environments/environment'
import { BaseResponse, Todo } from '../models/todos.model'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(catchError(this.catchErrorHandler))
      .subscribe(res => {
        this.todos$.next(res)
      })
  }

  createTodo(title: string) {
    this.http
      .post<Todo>(`${environment.baseUrl}/todo-lists`, { title }, {})
      .pipe(
        catchError(this.catchErrorHandler),
        map(res => {
          const newTodo = {
            id: res.id,
            title: res.title,
            tasks: res.tasks,
          }
          const actualTodos = this.todos$.getValue()

          return [newTodo, ...actualTodos]
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }

  deleteTodo(todoId: number) {
    this.http
      .delete<BaseResponse<{}>>(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        catchError(this.catchErrorHandler),
        map(() => {
          const actualTodos = this.todos$.getValue()

          return actualTodos.filter(todo => todo.id !== todoId)
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }

  updateTodo(todoId: number, title: string) {
    this.http
      .patch(`${environment.baseUrl}/todo-lists/${todoId}`, { title })
      .pipe(
        catchError(this.catchErrorHandler),
        map(() => {
          const actualTodos = this.todos$.getValue()
          return actualTodos.map(tl => (tl.id === todoId ? { ...tl, title } : tl))
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }
  private catchErrorHandler(err: HttpErrorResponse) {
    console.log(err.message)
    return EMPTY
  }
}
