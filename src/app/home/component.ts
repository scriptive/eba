import { Component, OnInit } from "@angular/core";

import { CoreNavigation, CoreUtility } from "../shared";
import { Book, BookService } from "../shared/book";

@Component({
  selector: "home",
  moduleId: module.id,
  templateUrl: "./component.html",
  // styleUrls:["./component.css"]
})

export class HomeComponent implements OnInit {
  activePageTitle:string="EBA";
  books: Book[];

  constructor(
    // private router: Router,
    private bookService: BookService,
    private nav:CoreNavigation,
    private util:CoreUtility
  ) {
    // NOTE: ?
  }
  ngOnInit(): void {
  }
}