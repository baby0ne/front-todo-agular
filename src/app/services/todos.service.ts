import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { environment } from '../../environments/environment'

interface BaseResponse<D> {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}

export interface Todo {
  id: number
  title: string
  tasks: any
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: {
      // 'Access-Control-Allow-Origin': '*',
    },
  }

  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`, this.httpOptions)
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
      .delete<BaseResponse<{}>>(`${environment.baseUrl}/todo-lists/${todoId}`, this.httpOptions)
      .pipe(
        catchError(this.catchErrorHandler),
        map(() => {
          const actualTodos = this.todos$.getValue()
          const filterTodos = actualTodos.filter(todo => todo.id !== todoId)

          return filterTodos
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }

  updateTodo(todoId: number, title: string) {
    this.http
      .patch(`${environment.baseUrl}/todo-lists/${todoId}`, { title }, this.httpOptions)
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
