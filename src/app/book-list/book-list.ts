import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  switchMap,
  tap,
  finalize,
  catchError,
  of,
  filter,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { BookService } from '../service/book.service';
import { Book } from '../interface/book.interface';
import { Spinner } from '../util/spinner/spinner';
import { BookPage as FwdlBook } from './book/book';

@Component({
  imports: [AsyncPipe, ReactiveFormsModule, FwdlBook, Spinner],
  selector: 'fwdl-book-list',
  templateUrl: 'book-list.html',
  styleUrl: 'book-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookList implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly fb = inject(FormBuilder);

  private INITIAL_SEARCH = '';
  private DEBOUNCE_TIME_IN_MS = 300;

  protected readonly search = this.fb.nonNullable.control<string>(this.INITIAL_SEARCH);

  protected readonly searched = signal<string>('');
  protected readonly isLoading = signal<boolean>(false);
  protected readonly isRecent = signal<boolean>(true);
  protected readonly recentBooks = signal<Book[]>([]);

  protected readonly books$ = this.search.valueChanges.pipe(
    distinctUntilChanged(),
    filter((search: string) => search !== ''),
    tap((search: string) => {
      this.isLoading.set(true);
      this.searched.set(search);
      this.isRecent.set(false);
    }),
    debounceTime(this.DEBOUNCE_TIME_IN_MS),
    switchMap((search: string) => {
      return this.bookService.getBooks(search).pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(() => {
          this.searched.set('');
          return of([] as Book[]);
        }),
      );
    }),
    map((books: Book[]) => {
      return books.filter((book: Book) => {
        return !book.id.includes('X');
      });
    }),
    tap((books: Book[]) => console.log(books)),
  );

  protected readonly recentBooks$ = this.bookService.getRecentBooks().pipe(
    tap(() => {
      this.isLoading.set(true);
    }),
    finalize(() => this.isLoading.set(false)),
    catchError(() => {
      return of([] as Book[]);
    }),
    map((books: Book[]) => {
      return books.filter((book: Book) => {
        return !book.id.includes('X');
      });
    }),
  );

  protected onShowRecent(): void {
    this.isRecent.set(true);
    this.search.setValue('');
  }

  ngOnInit(): void {
    this.refreshRecentBooks();
  }

  refreshRecentBooks(): void {
    this.recentBooks$.subscribe((books) => this.recentBooks.set(books));
  }
}
