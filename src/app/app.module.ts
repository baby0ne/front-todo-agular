import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms'
import { TodolistsComponent } from './components/todolists/todolists.component'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent, TodolistsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
