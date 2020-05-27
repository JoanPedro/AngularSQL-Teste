import { MovieDeleteComponent } from './components/movie/movie-delete/movie-delete.component';
import { MovieUpdateComponent } from './components/movie/movie-update/movie-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './view/home/home.component';
import { MovieCrudComponent } from './view/movie-crud/movie-crud.component';
import { MovieCreateComponent } from './components/movie/movie-create/movie-create.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
  path: "",
  component: HomeComponent
  }, {
    path: "movies",
    component: MovieCrudComponent
  },
  {
    path: "movies/create",
    component: MovieCreateComponent
  }, 
  {
    path: "movies/update/:id",
    component: MovieUpdateComponent
  },   
  {
    path: "movies/delete/:id",
    component: MovieDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
