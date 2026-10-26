import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Book, BookDetails, BookResponse } from '../interface/book.interface';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly dbooksUrl = 'https://www.dbooks.org/api';

  public getBooks(search: string): Observable<Book[]> {
    if (isEmpty(search)) {
      return of([] as Book[]);
    }
    return this.http
      .get<BookResponse>(`${this.dbooksUrl}/search/${search}`)
      .pipe(map((response) => response.books));
  }

  public getBookDetail(id: string): Observable<BookDetails> {
    return this.http.get<BookDetails>(`${this.dbooksUrl}/book/${id}`);
  }

  public getRecentBooks(): Observable<Book[]> {
    return this.http
      .get<BookResponse>(`${this.dbooksUrl}/recent`)
      .pipe(map((response) => response.books));
  }
}

function isEmpty(str: string): boolean {
  if (str.length === 0) {
    return true;
  } else {
    return false;
  }
}
