import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './view/home/home.component';
import { MovieCrudComponent } from './view/movie-crud/movie-crud.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
  path: "",
  component: HomeComponent
  }, {
    path: "movies",
    component: MovieCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
