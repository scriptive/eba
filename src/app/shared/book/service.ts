import { Injectable } from "@angular/core";
import { Book } from "./model";

// @Injectable()
@Injectable({
    providedIn: "root"
})
export class BookService {
  private books = new Array<Book>(
    {
      id:1,name:"Zomi",updated:12355467
    },
    {
      id:2,name:"English",updated:12355467
    },
    {
      id:3,name:"Myanmar", updated:12355467
    },
    {
      id:4,name:"NoDaat",updated:12355467
    }
  );

  getBooks(): Book[] {
    return this.books;
  }

  getBook(id: number): Book {
    return this.books.filter(book => book.id === id)[0];
  }
  // tmp(book: Book) {
  //     return new Promise((resolve, reject) => {
  //     });
  // }
}
