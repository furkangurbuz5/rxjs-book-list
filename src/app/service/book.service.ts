import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable, map, of, share } from 'rxjs';
import { Book, BookDetails, BookResponse } from '../interface/book.interface';

@Service()
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly dbooksUrl = 'https://www.dbooks.org/api';

  public getBooks(search: string): Observable<Book[]> {
    return this.http
      .get<BookResponse>(`${this.dbooksUrl}/search/${search}`)
      .pipe(map((response) => response.books));
  }

  public getBookDetail(id: string): Observable<BookDetails> {
    return this.http.get<BookDetails>(`${this.dbooksUrl}/book/${id}`);
  }

  public getRecentBooks(): Observable<Book[]> {
    return this.http.get<BookResponse>(`${this.dbooksUrl}/recent`).pipe(
      map((response) => response.books),
      share(),
    );
  }
}
