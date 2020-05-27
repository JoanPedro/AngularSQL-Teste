import { Movie } from './../movie.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {

  movie: Movie = {
    name: '',
    sinopses: '',
    actors: ''
  }

  constructor(private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.movieService.readById(id).subscribe(movies => {
      this.movie = movies
    })
  }

  updateMovie(): void {
    this.movieService.update(this.movie).subscribe(() => {
      this.movieService.showMessage('Produto Atualizado com Sucesso.')
      this.router.navigate(['/movies'])
    })
  }

  cancel(): void {
    this.router.navigate(['/movies'])
  }

}
