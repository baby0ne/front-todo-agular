import { Component, OnInit } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'
import { Todo } from '../../models/todos.model'

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  todos$: Observable<Todo[]> = new Observable<Todo[]>()

  ngOnInit() {
    this.todosService.getTodos()

    this.todos$ = this.todosService.todos$
  }
}
