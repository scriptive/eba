/*
import { Injectable } from '@angular/core';

// import { fromObject, fromObjectRecursive, Observable, PropertyChangeData } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
// import { Observable } from 'rxjs/Observable';
// import { Observable, of} from 'rxjs';
import * as appSettings from "tns-core-modules/application-settings";
// import { getString, setString, getNumber, setNumber } from "tns-core-modules/application-settings";

// import { AppConfiguration } from "../configuration";
import { BookMock } from "./book.mock";
import { BookItem } from "./book.item";


// const namesAndEmails = require("./NamesAndEmails.json");
// const posts = require("./posts.json");
// const listItems = require("./item-layouts/listItems.json");

@Injectable()
export class BookService {
  data: ObservableArray<BookItem>;
  constructor(
  ) {
    // appSettings.clear();
    this.data = new ObservableArray(this.bookStore);
    // this.bookObserve();
    // this.testObservable();
  }
  get book(): ObservableArray<BookItem> {
      return this.data;
  }
  setBook(index:number ,value:BookItem) {
    this.data.setItem(index, value);
  }
  get bookMock(): BookItem[] {
    return BookMock;
  }
  bookObserve() {
    this.data.on(ObservableArray.changeEvent, (args: any) => {
        // console.log(args.index); // Index of the changed item (in this case 7).
        // console.log(args.action); // Action (In this case "update")
        // console.log(args.addedCount); // Number of added items (In this case 1).
        // console.log(args.removed); // Array of removed items (in this case 33).
        console.log(this.data);
    });
  }
  private get bookStore():any {
    return JSON.parse(appSettings.getString('books',JSON.stringify(this.bookMock)));
  }
  private set bookStore(value:any) {
    appSettings.setString('books',JSON.stringify(value))
  }

  testObservable() {
    // let arrayObs = Observable.of(['one', 'two', 'three']);
    // console.log(arrayObs);
    // arrayObs.subscribe(
    //     array => {
    //         // This will be called every time you get an update
    //         console.log("Updated data: ", array);
    //     },
    //     error => {
    //         // This will be called upon error
    //         console.error(error);
    //     },
    //     () => {
    //         // This will be called upon completion,
    //         // after this is called, no further data will
    //         // be provided
    //         console.log("Observable is done.");
    //     }
    // );
  }
}
*/
