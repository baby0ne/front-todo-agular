import { Component, OnInit } from '@angular/core'
import { UsersService } from '../services/users.service'
import { Observable } from 'rxjs'
import { User } from '../models/users.model'
import { PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'todo-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  ngOnInit() {
    this.usersService.getUsers()

    this.users$ = this.usersService.users$
    this.usersCount$ = this.usersService.usersCount$
  }

  users$: Observable<User[]> = new Observable<User[]>()
  usersCount$: Observable<number> = new Observable<number>()
  userFindValue = ''
  pageNumberValue = 0
  pageSizeValue = 5

  changePageHandler(event: PageEvent) {
    this.pageNumberValue = event.pageIndex
    this.pageSizeValue = event.pageSize

    this.usersService.getUsers(this.userFindValue, event.pageIndex, event.pageSize)
  }

  findUserHandler() {
    this.usersService.getUsers(this.userFindValue, this.pageNumberValue, this.pageSizeValue)

    this.users$ = this.usersService.users$
  }

  constructor(private usersService: UsersService) {}
}
