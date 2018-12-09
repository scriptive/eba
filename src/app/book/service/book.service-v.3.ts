/*
import { Injectable } from '@angular/core';

// import { fromObject, fromObjectRecursive, Observable, PropertyChangeData } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
// import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs';
// import { Observable, of} from 'rxjs';
import { of } from 'rxjs';
import * as appSettings from "tns-core-modules/application-settings";
// import { getString, setString, getNumber, setNumber } from "tns-core-modules/application-settings";
import {knownFolders} from "tns-core-modules/file-system";

import { BookList } from "./book.list";
import { BookItem } from "./book.item";

@Injectable()

export class BookService {
  // public _book: ObservableArray<BookItem>;
  // public _bookData: BookItem[];
  private _books: any;
  constructor(
  ) {
    // appSettings.clear();
    // this._book = new ObservableArray(this.getBookStore());
    // this.bookObserve();
    // this.testObservable();
    // this.data.push({id:10,name:'Ok',language:'en',description:'hello'});
    this.open()
  }
  store(){
    return this._books;
  }
  open(){
    this._books = JSON.parse(appSettings.getString('books',JSON.stringify(BookList)));
  }
  save(value:any){
    appSettings.setString('books',JSON.stringify(value));
  }



  // get book(): ObservableArray<BookItem>{
  //     return this._book;
  // }
  // setBook(index:number ,value:BookItem) {
  //   this._book.setItem(index, value);
  // }
  // push(value:BookItem) {
  //   this._book.push(value);
  // }
  // bookObserve() {
  //   this._book.on(ObservableArray.changeEvent, (args: any) => {
  //       // console.log(args.index); // Index of the changed item (in this case 7).
  //       // console.log(args.action); // Action (In this case "update")
  //       // console.log(args.addedCount); // Number of added items (In this case 1).
  //       // console.log(args.removed); // Array of removed items (in this case 33).
  //       // this.setBookStore();
  //   });
  // }
  // store(value:BookItem[]){
  //   this._bookData=value;
  //   // let dataUpdate = this._book.map(v => v);
  //   // appSettings.setString('books',JSON.stringify(dataUpdate));
  // }
  // setBookStore(){
  //   let dataUpdate = this._book.map(v => v);
  //   appSettings.setString('books',JSON.stringify(dataUpdate));
  // }
}
  */
// let appFolder = knownFolders.currentApp();
// let cfgFile = appFolder.getFile("app/book/service/book.json");
// this._books = JSON.parse(cfgFile.readTextSync());