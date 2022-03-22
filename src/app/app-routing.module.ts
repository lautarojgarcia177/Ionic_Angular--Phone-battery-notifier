import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ReminderComponent} from "./reminder/reminder.component";
import {HomePage} from "./home/home.page";

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: ':id',
    component: ReminderComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
