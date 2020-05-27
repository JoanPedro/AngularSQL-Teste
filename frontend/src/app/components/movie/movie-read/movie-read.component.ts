import { MovieService } from './../movie.service';
import { Movie } from './../movie.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-movie-read',
  templateUrl: './movie-read.component.html',
  styleUrls: ['./movie-read.component.css']
})
export class MovieReadComponent implements OnInit {

  movies: Movie[]
  dataSource: any

  displayedColumns = ['name', 'sinopses', 'actors', 'action']

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.read().subscribe(movies => {
      this.movies = movies
      this.dataSource = new MatTableDataSource(movies)
      console.log(this.dataSource)
    })
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
