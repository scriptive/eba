import { Injectable } from '@angular/core';
// import { EventEmitter, BehaviorSubject } from '@angular/core';
import {getNumber, setNumber} from "tns-core-modules/application-settings";
// import { setTimeout } from "tns-core-modules/timer";

import { ObservableArray } from "tns-core-modules/data/observable-array";
import { BookModel } from "./model";
import { Book } from './book.provider';
import { Bible } from './bible.provider';

@Injectable()
// NOTE: extends BookDatabase
export class BookService {
  private bookProvider:Book;
  public lang:ObservableArray<BookModel>;

  public srcBook:any;
  public srcTestament:any;
  public srcSection:any;

  private IdStore:string[] = ['lId','sId'];
  public lId:number;
  public sId:number;

  constructor() {
    this.openStore();
    this.bookProvider = new Book();
    this.bookProvider.connect().then(()=>this.booksObserve());
  }
  // saveStore, openStore
  public saveStore(){
    for (const k of this.IdStore) setNumber(k,this[k]);
  }
  private openStore(){
    for (const k of this.IdStore) this[k] = getNumber(k,1);
  }
  private booksObserve(){
    return this.bookProvider.bookUser((_error:any,b:BookModel[])=>this.lang = new ObservableArray<BookModel>(b));
  }
  public requestBook(){
    return this.bookProvider.request().then(()=>this.booksObserve());
  }
  public requestBible(){
    return new Promise<any>((resolve, reject) => {
      var connection = new Bible(this.lId);
      connection.connect().then(()=>{
        resolve(connection)
      },(error:string)=>{
        connection.download().then(()=>{
          this.bibleDownload().then(()=>{
            connection.connect().then(()=>{
              resolve(connection);
            },(error:string)=>{
              reject(error);
            })
          },(error:string)=>{
            reject(error)
          })
        },(error:string)=>{
          reject(error);
        })
      })
    });
  }
  public bibleDownload(lId?:number){
    return new Promise<any>((resolve, reject) => {
      lId = lId || this.lId;
      new Bible(lId).download().then(()=>{
        this.bookProvider.bookAvailable(lId,1).then(()=>{
          this.lang.forEach((v,i,a) => {
            if (v.id == lId) v.available = 1;
          });
          resolve();
        },()=>{
          reject('booklist fail to update')
        })
      },(error:string)=>{
        reject(error);
      })
    });
  }
  public bibleDelete(lId?:number){
    return new Promise<any>((resolve, reject) => {
      lId = lId || this.lId;
      this.bookProvider.bookAvailable(lId,0).then(()=>{
        new Bible(lId).delete();
        this.lang.forEach((v,i,a) => {
          if (v.id == lId) v.available = 0;
        });
        resolve();
      },()=>{
        reject('booklist fail to update')
      })
    });
  }
  // nameDigit, nameBook, nameSection, currentBook, current
  digit(n:any,lName?:string) {
    var num = {'my':{0: "၀", 1: "၁", 2: "၂", 3: "၃", 4: "၄", 5: "၅", 6: "၆", 7: "၇", 8: "၈", 9: "၉"}};
    lName = this.lang.filter((l:any)=> l.id == this.lId)[0].lang;
    if (num.hasOwnProperty(lName)){
      var digit = num[lName];
      return n.toString().replace(/[0-9]/g, (i:number) => digit[i]);
    }
    return n;
  }

  bookName(bId:number){
    var book = this.srcBook.filter((b:any)=> b.id == bId);
    if (book.length) {
      return book[0].name;
    }
    return bId.toString();
  }
  sectionName(sId?:number){
    sId = sId || this.sId;
    var section = this.srcSection.filter((s:any)=> s.id == sId);
    if (section.length) {
      return section[0].name;
    }
    return sId.toString();
  }
}
