import { Routes } from '@angular/router';
import { BookDetailsPage } from './book-list/book/details/book-details';
import { BookList } from './book-list/book-list';

export const routes: Routes = [
  {
    title: 'Books',
    path: '',
    component: BookList,
  },
  {
    title: 'Book detail',
    path: 'book/:id',
    component: BookDetailsPage,
  },
];
