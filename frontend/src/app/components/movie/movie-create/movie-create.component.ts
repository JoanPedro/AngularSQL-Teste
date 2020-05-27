import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  constructor(private movieService: MovieService,
      private router: Router) { }

  ngOnInit(): void {
    
  }

  createMovie(): void {
    this.movieService.showMessage('Filme registado com sucesso!')
  }

  cancel(): void {
    this.router.navigate(['/movies'])
  }

}
