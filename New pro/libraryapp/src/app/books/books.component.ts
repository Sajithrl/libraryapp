import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BooksService } from '../shared/books.service';
import { books } from '../shared/books.model';

declare var M: any;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BooksService]
})
export class BooksComponent implements OnInit {

  constructor(public booksService: BooksService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshbooksList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
      this.booksService.selectedbooks = {
        _id: "",
        name: "",
        authur: "",
        year: null
      }

    }


  onSubmit(form: NgForm) {
    if (form.value._id == "") {
    this.booksService.postbooks(form.value).subscribe((res) => {
      this.resetForm(form);
        this.refreshbooksList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else{
      this.booksService.putbooks(form.value).subscribe((res) => {
        this.resetForm(form);
          this.refreshbooksList();
          M.toast({ html: 'Updated successfully', classes: 'rounded' });
        });
    }

  }


    refreshbooksList() {
      this.booksService.getbooksList().subscribe((res) => {
        this.booksService.books = res as books[];
      });
    }
  
    onEdit(bok: books) {
      this.booksService.selectedbooks = bok;
    }
    
    onDelete(_id: string, form: NgForm) {
      if (confirm('Are you sure to delete this record ?') == true) {
        this.booksService.deletebooks(_id).subscribe((res) => {
          this.refreshbooksList();
          this.resetForm(form);
          M.toast({ html: 'Deleted successfully', classes: 'rounded' });
        });
      }

}
}
