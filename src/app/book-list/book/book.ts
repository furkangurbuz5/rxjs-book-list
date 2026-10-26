import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Book as CurrentBook } from '../../interface/book.interface';

@Component({
  imports: [],
  selector: 'fwdl-book',
  templateUrl: 'book.html',
  styleUrl: 'book.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Book {
  readonly book = input.required<CurrentBook>();
}
