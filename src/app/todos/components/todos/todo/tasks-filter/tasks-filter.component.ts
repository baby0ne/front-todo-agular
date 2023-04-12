import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FilterType } from '../../../../models/todos.model'
import { MatButtonToggleChange } from '@angular/material/button-toggle'

@Component({
  selector: 'todo-tasks-filter',
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.css'],
})
export class TasksFilterComponent {
  @Input() filter!: FilterType
  @Output() changeFilterEvent = new EventEmitter<FilterType>()

  changeFilterHandler(filter: FilterType) {
    this.changeFilterEvent.emit(filter)
  }

  onToggleGroupChange(event: MatButtonToggleChange) {
    this.changeFilterEvent.emit(event.value)
  }
}
