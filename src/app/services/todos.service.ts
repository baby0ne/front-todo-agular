import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
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

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseUrl}/todo-lists`, this.httpOptions)
  }

  createTodo(title: string): Observable<BaseResponse<{ item: Todo }>> {
    return this.http.post<BaseResponse<{ item: Todo }>>(
      `${environment.baseUrl}/todo-lists`,
      { title },
      this.httpOptions
    )
  }

  deleteTodo(todoId: string): Observable<BaseResponse<{}>> {
    return this.http.delete<BaseResponse<{}>>(
      `${environment.baseUrl}/todo-lists/${todoId}`,
      this.httpOptions
    )
  }
}
