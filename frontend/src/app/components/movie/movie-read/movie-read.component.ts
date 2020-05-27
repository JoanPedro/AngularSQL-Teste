import { MovieService } from './../movie.service';
import { Movie } from './../movie.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-read',
  templateUrl: './movie-read.component.html',
  styleUrls: ['./movie-read.component.css']
})
export class MovieReadComponent implements OnInit {

  movies: Movie[]

  displayedColumns = ['name', 'sinopses', 'actors']

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.read().subscribe(movies => {

      this.movies = movies
      
      console.log(movies)
    })
  }



}
