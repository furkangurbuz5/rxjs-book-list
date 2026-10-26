import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, tap, finalize, startWith } from 'rxjs';
import { BookService } from '../service/book.service';
import { Book } from '../interface/book.interface';
import { Spinner } from '../util/spinner/spinner';
import { Book as FwdlBook } from './book/book';

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

  private INITIAL_SEARCH = 'java';

  protected readonly search = this.fb.nonNullable.control<string>(this.INITIAL_SEARCH);

  protected readonly searched = signal<string>('');
  protected readonly isLoading = signal<boolean>(false);
  protected readonly books = signal<Book[]>([]);

  protected readonly books$ = this.search.valueChanges.pipe(
    startWith(this.INITIAL_SEARCH),
    debounceTime(100),
    tap((search: string) => {
      this.isLoading.set(true);
      this.searched.set(search);
    }),
    switchMap((search: string) => {
      console.log(search);
      return this.bookService.getBooks(search).pipe(finalize(() => this.isLoading.set(false)));
    }),
    tap((books) => this.books.set(books)),
  );

  ngOnInit(): void {}
}
