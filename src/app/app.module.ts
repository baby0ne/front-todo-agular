import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TodolistsComponent } from './components/todolists/todolists.component'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component'

@NgModule({
  declarations: [AppComponent, TodolistsComponent, LoginComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
