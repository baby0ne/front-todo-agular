import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { DomainTask, Task } from '../models/todos.model'
import { NotificationService } from '../../core/services/notification.service'
import { AppService } from '../../app.service'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private appService: AppService
  ) {}

  tasks$: BehaviorSubject<DomainTask> = new BehaviorSubject<DomainTask>({})

  getTasks(todoId: number) {
    this.http
      .get<Task[]>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todoId] = res

        this.tasks$.next(stateTasks)
      })
  }

  addTask(todoId: number, title = 'new task') {
    this.http
      .post<Task>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`, { task: title })
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(res => {
          const newTask = res
          const actualTasks = this.tasks$.getValue()
          actualTasks[todoId] = [newTask, ...actualTasks[todoId]]
          return actualTasks
        })
      )
      .subscribe((res: DomainTask) => {
        this.tasks$.next(res)
      })
  }

  deleteTask(todoId: number, taskId: number) {
    this.http
      .delete(`${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          const actualTasks = this.tasks$.getValue()
          actualTasks[todoId] = actualTasks[todoId].filter(task => task.id !== taskId)
          return actualTasks
        })
      )
      .subscribe((res: DomainTask) => {
        this.tasks$.next(res)
      })
  }

  updateTask(payload: { todoId: number; taskId: number; title?: string; active?: boolean }) {
    const { title, todoId, taskId, active } = payload

    const actualTasks = this.tasks$.getValue()
    const mainTask = actualTasks[todoId].find(task => task.id === taskId)

    this.http
      .patch<Task>(
        `${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`,
        title ? { task: title, active: mainTask?.active } : { task: mainTask?.task, active }
      )
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(res => {
          const actualTasks = this.tasks$.getValue()
          actualTasks[todoId] = actualTasks[todoId].map(task =>
            task.id === taskId ? { ...task, task: res.task, active: res.active } : task
          )
          return actualTasks
        })
      )
      .subscribe(res => {
        this.tasks$.next(res)
      })
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.error)
    return EMPTY
  }
}
