import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { books } from './books.model';

@Injectable()
export class BooksService {
  selectedbooks: books[] = [];
  books: books[] = [];
  readonly baseURL = 'http://localhost:3000/books';


  constructor(private http: HttpClientModule) { }

  postbooks(bok: books) {
    return this.http.post(this.baseURL, bok);

  }
  getbooksList() {
    return this.http.get(this.baseURL);
  }

  putbooks(bok: books) {
    return this.http.put(this.baseURL + `/${bok._id}`, bok);
  }
  deletebooks(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }


}
