import { Component, AfterViewInit,OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {Page} from "ui/page";

import {
  AppConfiguration,
  AppSideDrawer,
  AppActionBar,
  AppNavigation,
  AppUtilization,
  AppFileSystem,
  AppHttp
} from "../shared";

import { BookItem, BookService } from "./service";

@Component({
  selector:'eba',
  moduleId: module.id,
  templateUrl: "./welcome.html",
  providers:[]
})

export class WelcomeComponent implements OnInit {
  private actionItemVisibility:string="collapsed";
  private actionTitle:string="Effortless bible analysis";

  constructor(
    private page: Page,
    private actionBar: AppActionBar,
    private sideDrawer: AppSideDrawer,
    private bookService: BookService,
    private nav: AppNavigation
  ) {
    // NOTE: ?
    this.page.actionBarHidden = true;
  }
  ngOnInit() {

  }
  // NOTE: (tap)="itemButton($event)"
  itemButton(bookId: number) {
    this.bookService.Id('book',bookId);
    this.nav.to(['section']);
  }
  get dataItems() {
    return this.bookService.books;
  }
}

/*
// this.nav.sideDrawerToggle();
// this.nav.gesturesEnabled=true;
// this.nav.actionBarToggle();
// console.log(this._items);
this._items = this.bookService.book;
// this._items = new ObservableArray(this.bookService.bookMock());
// this._items.on(ObservableArray.changeEvent, (args: any) => {
//     console.log(args.index); // Index of the changed item (in this case 7).
//     console.log(args.action); // Action (In this case "update")
//     console.log(args.addedCount); // Number of added items (In this case 1).
//     console.log(args.removed); // Array of removed items (in this case 33).
//     console.log('------------------- ok');
// });


// this.fs.read('test.txt');
// this.fs.read('bible/tests.txt').then(function(a){
//   console.log(a)
// })
// this.fs.read('bible/testss.txt').then((res) => {
//   console.log('yes',res);
// }).catch((err) => {
//   console.log(err);
// });
// console.log(this.fs.fileExists('bible/testss.txt'));
// console.log(this.fs.currentApp());

// this.fs.documents().getEntities().then((res) => {
//   console.log('yes',res);
// }).catch((err) => {
//   console.log(err);
// });
// this.fromPath(fileName).readText().then((res) => {
//   console.log('yes',res);
// }).catch((err) => {
//   console.log(err);
// });
// this.fs.getDocumentsEntities('bible').then((res) => {
//   console.log('yes',res);
// }).catch((err) => {
//   console.log(err);
// });
// this.fromPath(fileName).readText().then((res) => {
//   console.log('yes',res);
// }).catch((err) => {
//   console.log(err);
// });
*/
