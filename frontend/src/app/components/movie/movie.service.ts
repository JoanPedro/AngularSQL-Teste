import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './movie.model';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // baseUrl = "http://localhost:3333/movies"
  baseUrl = "http://localhost:3333"

  constructor(private snackbar: MatSnackBar,
    private http : HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success'],
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
    ).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  read(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Movie> {
    const url = `${this.baseUrl}/movie/${id}`
    return this.http.get<Movie>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(movie: Movie): Observable<Movie> {
    const url = `${this.baseUrl}/movie/${movie.id}`
    return this.http.put<Movie>(url, movie).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Movie> {
    const url = `${this.baseUrl}/movie/${id}`
    return this.http.delete<Movie>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage(e.error.error, true)
    return EMPTY
  }
}
