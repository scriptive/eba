import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// import { fromObject, fromObjectRecursive, Observable, PropertyChangeData } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import * as appSettings from "tns-core-modules/application-settings";

import { AppFileSystem } from "../../shared";
import { BookItem, SectionItem, CategoryItem,DataItem } from "./model";
import { dataBook } from "./data.book";

const dataCollection:any={
  list:[],
  data:{},
  Id:{
    book:1,
    section:1
  }
};

@Injectable()
// NOTE: EventEmitter, BehaviorSubject
export class BookService {
  public highlightColor:string= "#564e44";
  private book_list: ObservableArray<BookItem>;
  private section_list: ObservableArray<SectionItem>;
  private category_list: ObservableArray<CategoryItem>;

  private books_storeName: string = 'books';
  public message = new EventEmitter();

  constructor(
    private http: HttpClient,
    private file: AppFileSystem
  ) {
    // this.section = dataSection;
  }
  // TODO: temporary
  sendMessage(data: string) {
    this.message.emit(data);
  }

  public initiate(): void {
    this.booksOpen();
  }

  // TODO: temporary... ??
  private booksOpen(){
    var data = appSettings.getString(this.books_storeName,JSON.stringify(dataBook));
    try {
      dataCollection.list = JSON.parse(data);
    } catch(e){
      dataCollection.list = dataBook;
    }
    this.booksObserve();
  }
  public booksSave(books:any){
    dataCollection.list = Object.assign(dataCollection.list,books);
    appSettings.setString(this.books_storeName, JSON.stringify(dataCollection.list));
    this.booksObserve();
  }
  public get books(): ObservableArray<BookItem> {
    return this.book_list;
  }
  private booksObserve(){
    this.book_list = new ObservableArray<BookItem>();
    for (var i in dataCollection.list) {
      var o = dataCollection.list[i];
      this.book_list.push(new BookItem(Number(i), o.name, o.lang, o.desc,Number(o.version)));
    }
  }
  public get section(): ObservableArray<SectionItem> {
    return this.section_list;
  }
  public sectionObserve(bookId?:number){
    // this.section_list = new ObservableArray<SectionItem>(this.active(bookId).section);
    this.section_list = new ObservableArray<SectionItem>(<Array<SectionItem>>this.active(bookId).section);
    // this.section_list = new ObservableArray<SectionItem>(<Array<SectionItem>>dataCollection.data[bookId].section);
    // this.section_list = new ObservableArray<SectionItem>(dataCollection.data[bookId].section);
    // this.section_list = dataCollection.data[bookId].section;
    // this.section_list = new ObservableArray<SectionItem>();
    // for (var i in dataCollection.data[bookId].section) {
    //   var o = dataCollection.data[bookId].section[i];
    //   this.section_list.push(new SectionItem(Number(o.id), o.name, o.desc, o.group));
    // }
  }

  public get category(): ObservableArray<CategoryItem> {
    return this.category_list;
  }
  public categoryObserve(sectionId:number,bookId?:number){
    this.category_list = new ObservableArray<CategoryItem>(<Array<CategoryItem>>this.active(bookId).category[sectionId]);
    // this.category_list = new ObservableArray<CategoryItem>(<Array<CategoryItem>>dataCollection.data[bookId].category[sectionId]);
    // this.category_list = new ObservableArray<CategoryItem>(dataCollection.data[bookId].category[sectionId]);
    // this.category_list = new ObservableArray<CategoryItem>();
    // for (var i in dataCollection.data[bookId].category[sectionId]) {
    //   var o = dataCollection.data[bookId].category[sectionId][i];
    //   const data = new CategoryItem(Number(o.book),Number(o.chapter), o.verse, o.desc, o.tag);
    //   this.category_list.push(data);
    // }
  }
  bookName(id:number,bookId?:number) {
    return this.active(bookId).book[id].name;
  }
  testamentName(id:number,bookId?:number) {
    return this.active(bookId).testament[id].name;
  }
  sectionName(id:number,bookId?:number) {
    return this.active(bookId).section[id].name;
  }
  active(bookId?:number) {
    if (bookId){
      return dataCollection.data[bookId];
    } else {
      return dataCollection.data[dataCollection.Id.book];
    }
  }
  digit(n:any,bookId?:number) {
    var num = {
        'my':{
          0: "၀",
          1: "၁",
          2: "၂",
          3: "၃",
          4: "၄",
          5: "၅",
          6: "၆",
          7: "၇",
          8: "၈",
          9: "၉"
        }
    };
    // var digit = this.num(l).digit;
    var Id = bookId || dataCollection.Id.book;
    if (Id && dataCollection.list.hasOwnProperty(Id)) {
      var lang = dataCollection.list[Id].lang;
      if (num.hasOwnProperty(lang)){
        var digit = num[lang];
        return n.toString().replace(/[0-9]/g, (i) => digit[i]);
      }
    }
    return n;
  }

  Id(name: string,value?: number){
    if (name) {
      if (value) {
        dataCollection.Id[name]=value;
      }
      if (dataCollection.Id.hasOwnProperty(name) && dataCollection.Id[name]) {
        return dataCollection.Id[name];
      }
    }
    return 1;
    // if (name) {
    //   if (value) {
    //     appSettings.setNumber(name,value);
    //   }
    //   return appSettings.getNumber(name,1);
    // }
  }

  private requests(Name:any) {
    return new Promise((resolve, reject) => {
      var Url = "https://raw.githubusercontent.com/scriptive/eba/master/lang/*.json".replace('*',Name);
      let headers = this.requestJSONheader();
      this.http.get(Url,{headers:headers}).subscribe((books) => {
          resolve(books);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  private requestJSONheader() {
    return new HttpHeaders({
      "Content-Type": "application/json"
    });
  }
  requestBook(fileName:string) {
    return new Promise((resolve, reject) => {
      this.requests(fileName).then((Contents) => {
        this.booksSave(Contents);
        resolve();
      }).catch((error) => {
        reject(error);
      })
    });
  }
  requestContent(Id:number) {
    return new Promise((resolve, reject) => {
      if (dataCollection.data.hasOwnProperty(Id)){
        resolve();
      } else {
        var fileName = Id.toString();
        var localFile = 'lang/0.json'.replace('0',fileName);
        if (this.file.fileExists(localFile)) {
          this.file.read(localFile).then((Contents) => {
            dataCollection.data[Id] = JSON.parse(Contents);
            resolve();
          }).catch((error) => {
            reject(error);
          });
        } else {
          this.requests(fileName).then((Contents)=>{
            this.file.write(localFile, JSON.stringify(Contents)).then((res) => {
              dataCollection.data[Id] = Contents;
              resolve();
            }).catch((error) => {
              reject(error);
            });
          },(error)=>{
            reject(error);
          });
        }
      }
    });
  }
}
