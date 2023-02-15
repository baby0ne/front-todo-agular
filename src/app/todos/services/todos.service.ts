import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { environment } from '../../../environments/environment'
import { FilterType, Todo, TodoDomainType } from '../models/todos.model'
import { NotificationService } from '../../core/services/notification.service'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  todos$: BehaviorSubject<TodoDomainType[]> = new BehaviorSubject<TodoDomainType[]>([])

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(res => {
          const newTodos: TodoDomainType[] = res.map(tl => ({ ...tl, filter: 'all' }))
          return newTodos
        })
      )
      .subscribe((res: TodoDomainType[]) => {
        this.todos$.next(res)
      })
  }

  addTodo(title: string) {
    this.http
      .post<Todo>(`${environment.baseUrl}/todo-lists`, { title }, {})
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(res => {
          const newTodo: TodoDomainType = {
            id: res.id,
            title: res.title,
            filter: 'all',
          }
          const actualTodos = this.todos$.getValue()

          return [newTodo, ...actualTodos]
        })
      )
      .subscribe((res: TodoDomainType[]) => {
        this.todos$.next(res)
      })
  }

  deleteTodo(todoId: number) {
    this.http
      .delete(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          const actualTodos = this.todos$.getValue()

          return actualTodos.filter(todo => todo.id !== todoId)
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }

  editTodo(todoId: number, title: string) {
    this.http
      .patch(`${environment.baseUrl}/todo-lists/${todoId}`, { title })
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          const actualTodos = this.todos$.getValue()
          return actualTodos.map(tl => (tl.id === todoId ? { ...tl, title } : tl))
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }

  changeFilter(todoId: number, filter: FilterType) {
    const actualTodos = this.todos$.getValue()

    const newTodos = actualTodos.map(todo => (todo.id === todoId ? { ...todo, filter } : todo))

    this.todos$.next(newTodos)
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message)
    return EMPTY
  }
}
