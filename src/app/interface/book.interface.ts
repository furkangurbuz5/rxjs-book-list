export interface BookResponse {
  readonly status: string;
  readonly total: string;
  readonly books: Book[];
}

export interface Book {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly authors: string;
  readonly image: string;
  readonly url: string;
}

export interface BookDetails {
  readonly status: string;
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly authors: string;
  readonly publisher: string;
  readonly pages: string;
  readonly year: string;
  readonly image: string;
  readonly url: string;
  readonly download: string;
}
