import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // baseUrl = "http://localhost:3333/movies"
  baseUrl = "http://localhost:3333"

  constructor(private snackbar: MatSnackBar,
    private http : HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    })
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/movies`, 
      movie, {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        observe: 'body'
      }
    )
  }

  read(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`)
  }

  readById(id: string): Observable<Movie> {
    const url = `${this.baseUrl}/movie/${id}`
    return this.http.get<Movie>(url)
  }

  update(movie: Movie): Observable<Movie> {
    const url = `${this.baseUrl}/movie/${movie.id}`
    return this.http.put<Movie>(url, movie)
  }
}
