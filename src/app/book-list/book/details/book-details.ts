import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { BookService } from '../../../service/book.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { BookDetails } from '../../../interface/book.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'fwdl-book-details',
  templateUrl: 'book-details.html',
  styleUrl: 'book-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class BookDetailsPage {
  private readonly bookService = inject(BookService);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly id = signal<string | null>(this.activatedRoute.snapshot.paramMap.get('id'));

  protected readonly details = toSignal(
    toObservable(this.id).pipe(
      filter((id) => id !== null),
      switchMap((id) => this.bookService.getBookDetail(id)),
    ),
    { initialValue: {} as BookDetails },
  );
}
