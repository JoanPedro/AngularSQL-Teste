import { Movie } from './../movie.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Movie[] = [
  {id: 1, name: 'Hydrogen', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 2, name: 'Helium', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 3, name: 'Lithium', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 4, name: 'Beryllium', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 5, name: 'Boron', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 6, name: 'Carbon', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 7, name: 'Nitrogen', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 8, name: 'Oxygen', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 9, name: 'Fluorine', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 10, name: 'Neon', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 11, name: 'Sodium', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 12, name: 'Magnesium', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 13, name: 'Aluminum', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 14, name: 'Silicon', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 15, name: 'Phosphorus', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 16, name: 'Sulfur', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 17, name: 'Chlorine', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 18, name: 'Argon', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 19, name: 'Potassium', sinopses: 'Alô', actors: 'Allo Allow'},
  {id: 20, name: 'Calcium', sinopses: 'Alô', actors: 'Allo Allow'},
];

/**
 * Data source for the MovieRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MovieRead2DataSource extends DataSource<Movie> {
  data: Movie[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Movie[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Movie[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Movie[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
