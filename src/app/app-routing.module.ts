import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardoneComponent } from './boardone/boardone.component';
import { BoardComponent } from './board/board.component';
import { BoardthreeComponent } from './boardthree/boardthree.component';
import { BoardfourComponent } from './boardfour/boardfour.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'board-one', component: BoardoneComponent },
  { path: 'board-two', component: BoardComponent },
  { path: 'board-three', component: BoardthreeComponent },
  { path: 'board-four', component: BoardfourComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
