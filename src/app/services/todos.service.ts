import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, map } from 'rxjs'
import { environment } from '../../environments/environment'

interface BaseResponse<D> {
  data: D
  fieldsErrors: []
  messages: []
  resultCode: 0
}

export interface Todo {
  id: string
  title: string
  addedDate: string
  order: string
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    withCredentials: true,
    headers: {
      'api-key': environment.apiKey,
    },
  }

  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])

  getTodos() {
    this.http.get<Todo[]>(`${environment.baseUrl}/todo-lists`, this.httpOptions).subscribe(res => {
      this.todos$.next(res)
    })
  }

  createTodo(title: string) {
    this.http
      .post<BaseResponse<{ item: Todo }>>(
        `${environment.baseUrl}/todo-lists`,
        { title },
        this.httpOptions
      )
      .pipe(
        map(res => {
          const newTodo = res.data.item
          const actualTodos = this.todos$.getValue()

          return [newTodo, ...actualTodos]
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }

  deleteTodo(todoId: string) {
    this.http
      .delete<BaseResponse<{}>>(`${environment.baseUrl}/todo-lists/${todoId}`, this.httpOptions)
      .pipe(
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
}
