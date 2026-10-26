import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Book as CurrentBook } from '../../interface/book.interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'fwdl-book',
  templateUrl: 'book.html',
  styleUrl: 'book.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Book {
  readonly book = input.required<CurrentBook>();
}
