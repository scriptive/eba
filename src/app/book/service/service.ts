import { Injectable, EventEmitter } from '@angular/core';
// import * as appSettings from "tns-core-modules/application-settings";
import { BookDatabase } from './database';
import { LangModel, SectionModel } from "./model";
// import { ObservableArray } from "tns-core-modules/data/observable-array";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { setTimeout } from "tns-core-modules/timer";

@Injectable()
// NOTE: EventEmitter, BehaviorSubject
export class BookService extends BookDatabase {
// IdStore
  constructor(private http: HttpClient) {
    super();
  }
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
    var book = this.bookList.filter((b:any)=> b.id == bId);
    if (book.length) {
      return book[0].name;
    }
    return bId;
  }
  sectionName(sId?:number){
    sId = sId || this.sId;
    var section = this.sectionList.filter((s:any)=> s.id == sId);
    if (section.length) {
      return section[0].name;
    }
    return sId;
  }
  public requestContent(lId?:number) {
    this.lId = lId || this.lId;
    return new Promise((resolve, reject) => {
      this.lang_select_byId(this.lId).then((row:LangModel)=>{
        if (row && row.hasOwnProperty('available') && row.available > 0) {
          resolve(this);
        } else {
          this.requestHTTP(this.lId).subscribe((json:any) => {
            let taskPrimary = [];
            taskPrimary.push(this.testament_prepare(json.testament));
            taskPrimary.push(this.book_prepare(json.book));
            taskPrimary.push(this.category_prepare(json));
            taskPrimary.push(new Promise((resolve, _reject) => {
              this.langAvailable(1).then(()=>{
                resolve(this)
              })
            }));
            taskPrimary.push(new Promise((resolve, _reject) => {
              this.langObserve().then(()=>{
                resolve(this)
              })
            }));
            Promise.all(taskPrimary).then(value=>{
              resolve(this);
            }).catch(error=>{
              reject(error);
            })
          },
          error => {
            reject(error);
          })
        }
      })
    })
  }
  public requestLang(notifyCallback?:Function) {
    // this.notifyCallback = notifyCallback;
    return new Promise((resolve, reject) => {
      // setInterval(() => {}, 100);
      setTimeout(() => {
        // this.requestNotify('Getting ready')
        this.requestHTTP('book').subscribe(rows => {
          // this.requestNotify('Preparing')
          this.lang_prepare(rows).then(()=>{
            this.langObserve().then(()=>{
              resolve(this)
            });
          });
        },
        error => {
          reject(error);
        })
      }, 100);

    });
  }
  private requestHTTP(Name:any) {
    let url = "https://raw.githubusercontent.com/scriptive/eba/master/lang/*.json".replace('*',Name);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.get(url,{headers:headers});
  }
  private requestNotify(msg:string) {
    if (this.notifyCallback)this.notifyCallback(msg);
  }
  // get lang(): ObservableArray<LangModel> {
  //   return this.db.lang;
  // }
  // request(lId?:number){
  //   this.lId = lId || this.lId;
  //   return this.db.requestContent(this.lId)
  // }
  // requestLang(){
  //   return this.db.requestLang();
  // }
  // requestLangDelete(){

  // }
  // requestTestament(){
  //   return this.db.testament(this.lId);
  // }
  // requestBook(){
  //   return this.db.book(this.lId);
  // }
  // requestSection(){
  //   return this.db.section(this.lId);
  // }
  // requestCategory(){
  //   return this.db.category(this.lId,this.sId);
  // }
}
