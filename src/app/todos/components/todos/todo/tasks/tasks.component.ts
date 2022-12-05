import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from '../../../../services/tasks.service'
import { map, Observable, combineLatest } from 'rxjs'
import { Task } from '../../../../models/todos.model'
import { TodosService } from '../../../../services/todos.service'

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private tasksService: TasksService, private todosService: TodosService) {}

  tasks$: Observable<Task[]> = new Observable<Task[]>()
  @Input() todoId!: number

  ngOnInit(): void {
    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const tasks = res[0]
        let tasksForTodo = tasks[this.todoId]
        const todos = res[1]
        const activeTodo = todos.find(tl => tl.id === this.todoId)

        if (activeTodo?.filter === 'complete') {
          tasksForTodo = tasksForTodo.filter(task => task.active === true)
        }
        if (activeTodo?.filter === 'active') {
          tasksForTodo = tasksForTodo.filter(task => task.active === false)
        }

        return tasksForTodo
      })
    )

    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.tasksService.addTask(this.todoId)
  }

  deleteTaskHandler(taskId: number) {
    this.tasksService.deleteTask(this.todoId, taskId)
  }

  updateTaskActiveHandler(payload: { taskId: number; newActive: boolean }) {
    this.tasksService.updateTask({
      todoId: this.todoId,
      taskId: payload.taskId,
      active: payload.newActive,
    })
  }

  updateTaskTitleHandler(payload: { taskId: number; title: string }) {
    this.tasksService.updateTask({
      todoId: this.todoId,
      taskId: payload.taskId,
      title: payload.title,
    })
  }
}
