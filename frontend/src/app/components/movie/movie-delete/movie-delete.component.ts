import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from './../movie.service';
import { Movie } from './../movie.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-delete',
  templateUrl: './movie-delete.component.html',
  styleUrls: ['./movie-delete.component.css']
})
export class MovieDeleteComponent implements OnInit {

  movie: Movie

  constructor(private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.movieService.readById(id).subscribe(movies => {
      this.movie = movies
    })
  }

  deleteMovie(): void {
    this.movieService.delete(this.movie.id).subscribe(() => {
      this.movieService.showMessage('Filme excluido com sucesso.')
      this.router.navigate(['/movies'])
    })
  }

  cancel(): void {
    this.router.navigate(['/movies'])
  }

}
