import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { BoardthreeComponent } from './boardthree/boardthree.component';
import { BoardoneComponent } from './boardone/boardone.component';
import { BoardfourComponent } from './boardfour/boardfour.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HomeComponent,
    BoardthreeComponent,
    BoardoneComponent,
    BoardfourComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
