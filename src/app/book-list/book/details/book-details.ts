import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { BookService } from '../../../service/book.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { delay, filter, finalize, switchMap } from 'rxjs';
import { BookDetails } from '../../../interface/book.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Spinner } from '../../../util/spinner/spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'fwdl-book-details',
  templateUrl: 'book-details.html',
  styleUrl: 'book-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Spinner, AsyncPipe],
})
export class BookDetailsPage {
  private readonly bookService = inject(BookService);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly id = signal<string | null>(this.activatedRoute.snapshot.paramMap.get('id'));

  protected readonly isLoading = signal<boolean>(true);
  protected readonly details$ = toObservable(this.id).pipe(
      filter((id) => id !== null),
      delay(300),
      switchMap((id) =>
        this.bookService.getBookDetail(id).pipe(finalize(() => this.isLoading.set(false))),
      ),
    )
}
