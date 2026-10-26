import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Book } from '../../interface/book.interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'fwdl-book',
  templateUrl: 'book.html',
  styleUrl: 'book.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPage {
  readonly book = input.required<Book>();
}
