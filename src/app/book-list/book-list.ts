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

  protected readonly books$ = this.search.valueChanges.pipe(
    filter((search) => search !== ''),
    distinctUntilChanged(),
    tap((search: string) => {
      this.isLoading.set(true);
      this.searched.set(search);
      this.isRecent.set(false);
    }),
    debounceTime(this.DEBOUNCE_TIME_IN_MS),
    switchMap((search: string) => {
      console.log(search);
      return this.bookService.getBooks(search).pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(() => {
          this.searched.set('');
          return of([] as Book[]);
        }),
      );
    }),
  );

  protected readonly recentBooks$ = this.bookService.getRecentBooks().pipe(
    tap(() => {
      this.isLoading.set(true);
    }),
    finalize(() => this.isLoading.set(false)),
    catchError(() => {
      return of([] as Book[]);
    }),
  );

  ngOnInit(): void {}

  protected onShowRecent(): void {
    this.isRecent.set(true);
    this.setSearchValue('');
  }
  protected setSearchValue(value: string) {
    this.search.setValue(value);
  }
}
