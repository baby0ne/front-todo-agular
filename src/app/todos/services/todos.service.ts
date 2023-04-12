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
  private _todos$: BehaviorSubject<TodoDomainType[]> = new BehaviorSubject<TodoDomainType[]>([])
  todos$ = this._todos$.asObservable()

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

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
      .subscribe({
        next: (res: TodoDomainType[]) => {
          this._todos$.next(res)
        },
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
          const actualTodos = this._todos$.getValue()

          return [newTodo, ...actualTodos]
        })
      )
      .subscribe((res: TodoDomainType[]) => {
        this._todos$.next(res)
      })
  }

  deleteTodo(todoId: number) {
    this.http
      .delete(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          const actualTodos = this._todos$.getValue()

          return actualTodos.filter(todo => todo.id !== todoId)
        })
      )
      .subscribe(res => {
        this._todos$.next(res)
      })
  }

  editTodo(todoId: number, title: string) {
    this.http
      .patch(`${environment.baseUrl}/todo-lists/${todoId}`, { title })
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          const actualTodos = this._todos$.getValue()
          return actualTodos.map(tl => (tl.id === todoId ? { ...tl, title } : tl))
        })
      )
      .subscribe(res => {
        this._todos$.next(res)
      })
  }

  changeFilter(todoId: number, filter: FilterType) {
    const actualTodos = this._todos$.getValue()

    const newTodos = actualTodos.map(todo => (todo.id === todoId ? { ...todo, filter } : todo))

    this._todos$.next(newTodos)
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.error)
    return EMPTY
  }
}
