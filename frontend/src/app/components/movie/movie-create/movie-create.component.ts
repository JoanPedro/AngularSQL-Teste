import { Movie } from './../movie.model';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  movie: Movie = {
    name: '',
    sinopses: '',
    actors: ''
  }

  constructor(private movieService: MovieService,
      private router: Router) { }

  ngOnInit(): void {
    
  }

  createMovie(): void {
    this.movieService.create(this.movie).subscribe(() => {
      this.movieService.showMessage('Filme registado com sucesso!')
      this.router.navigate(['/movies'])
    })
  }

  cancel(): void {
    this.router.navigate(['/movies'])
  }

}
