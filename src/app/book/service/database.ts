// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ObservableArray } from "tns-core-modules/data/observable-array";
var SQLite = require("nativescript-sqlite");
// import { setTimeout } from "tns-core-modules/timer";
import * as appSettings from "tns-core-modules/application-settings";

import { dataBook } from "./data.book";
import { LangModel } from "./model";

// @Injectable()

export class BookDatabase {
  protected notifyCallback:Function;
  protected IdStore:string[];

  public lId:number;
  public sId:number;
  public langCurrent:any;
  public bookList:any[];
  public sectionList:any[];
  public lang: ObservableArray<LangModel>;

  private database: any;
  private databaseName: string ="eba.db";

  public constructor() {
    this.IdStore = ['lId','sId'];
    this.open()
    // SQLite.deleteDatabase(this.databaseName);
    new SQLite(this.databaseName,(_error:any,db:any)=>{
      db.resultType(SQLite.RESULTSASOBJECT);
      this.database = db;
      db.version((_error:any, version:number)=> {
         if (version === 0) {
           db.version(1);
           db.execSQL('CREATE TABLE IF NOT EXISTS lang (id INTEGER PRIMARY KEY, name TEXT, lang TEXT, desc TEXT, version INTEGER, launched TEXT, available INTEGER, updated INTEGER)').then(() => {
             this.lang_prepare(dataBook);
           }, (_error:any) => {
             console.log("CREATE TABLE ERROR", _error);
           });
           db.execSQL('CREATE TABLE IF NOT EXISTS testament (lid INTEGER, id INTEGER, name TEXT, shortname TEXT)');
           db.execSQL('CREATE TABLE IF NOT EXISTS book (lid INTEGER, id INTEGER, name TEXT, shortname TEXT)');
           db.execSQL('CREATE TABLE IF NOT EXISTS section (lid INTEGER, id INTEGER, name TEXT, desc TEXT, groupname TEXT, total INTEGER)');
           db.execSQL('CREATE TABLE IF NOT EXISTS category (lid INTEGER, id INTEGER, book INTEGER, chapter INTEGER, verse TEXT, desc TEXT, tag TEXT)');
           db.execSQL('CREATE TABLE IF NOT EXISTS bookmark (lid INTEGER, book INTEGER, chapter INTEGER, verse TEXT)');
         }
       });
    }).then(()=>{
      // NOTE: init on load, if 'requestLang' is active the 'langObserve' is no longer require! this.requestLang();
      this.langObserve();
    });
  }
  public save(){
    for (const k of this.IdStore) appSettings.setNumber(k,this[k]);
  }
  public open(){
    for (const k of this.IdStore) this[k] = appSettings.getNumber(k,1);
  }

  protected langObserve() {
    return this.database.all('SELECT * FROM lang WHERE available > -1',[],(_error:any,lang:LangModel)=>{
      this.lang = new ObservableArray<LangModel>(lang);
    });
  }
  protected lang_select_byId(lId:number,callback?:any) {
    return this.database.get('SELECT * FROM lang WHERE id=?', [lId], callback);
  }
  protected lang_prepare(value:any) {
    let taskPrimary = [];
    let ram = Math.random();
    for (let lId in value) {
      if (value.hasOwnProperty(lId)) {
        taskPrimary.push(new Promise((resolve, reject) => {
          this.lang_select_byId(Number(lId), (_error:any, row:any)=> {
            var o = value[lId];
            if (row && row.hasOwnProperty('id') && row.id) {
              this.lang_update([o.name, o.lang, o.desc, o.version, o.launched, lId]).then((k:any)=>k?resolve():reject());
            } else {
              this.lang_insert([lId, o.name, o.lang, o.desc,o.version,o.launched, 0, 0]).then((k:any)=>k?resolve():reject());
            }
          });
        }));
      }
    }
    return Promise.all(taskPrimary)
  }
  protected lang_insert(value:any[]) {
    return this.database.execSQL('INSERT INTO lang (id, name, lang, desc, version, launched, available, updated) VALUES (?,?,?,?,?,?,?,?)', value);
  }
  protected lang_update(value:any[]) {
    return this.database.execSQL('UPDATE lang SET name=?, lang=?, desc=?, version=?, launched=? WHERE id=?', value);
  }
  protected langAvailable(value:number) {
    return this.database.execSQL('UPDATE lang SET available=? WHERE id=?', [value, this.lId]);
  }
  public testament(lid:number) {
    return this.database.all('SELECT * FROM testament WHERE lid=?', [lid]);
  }
  protected testament_insert(value:any,callback?:any) {
    return this.database.execSQL('INSERT INTO testament (lid, id, name, shortname) VALUES (?,?,?,?)', value, callback);
  }
  protected testament_prepare(value:any[]) {
    return new Promise((resolve, reject) => {
      for (const Id in value) {
        if (value.hasOwnProperty(Id)) {
          const o = value[Id];
          this.testament_insert([this.lId, Id, o.name, o.shortname]);
        }
      }
      resolve('testament')
    })
  }

  public book(lId?:number) {
    return this.database.all('SELECT * FROM book WHERE lid=?', [lId || this.lId]);
  }
  protected book_insert(value:any,callback?:any) {
    this.database.execSQL('INSERT INTO book (lid, id, name, shortname) VALUES (?,?,?,?)', value, callback);
  }
  protected book_prepare(value:any[]) {
    return new Promise((resolve, reject) => {
      for (const Id in value) {
        if (value.hasOwnProperty(Id)) {
          const o = value[Id];
          this.book_insert([this.lId, Id, o.name, o.shortname]);
        }
      }
      resolve('book');
    })
  }

  public section(lId?:number) {
    return this.database.all('SELECT * FROM section WHERE lid=?', [lId || this.lId]);
  }
  protected section_insert(value:any,callback?:any) {
    return this.database.execSQL('INSERT INTO section (lid, id, name, desc, groupname, total) VALUES (?,?,?,?,?,?)', value, callback);
  }

  public category(lId?:number,sId?:number) {
    return this.database.all('SELECT * FROM category WHERE lid=? AND id=?', [lId || this.lId, sId || this.sId]);
  }
  protected category_insert(value:any,callback?:any) {
    this.database.execSQL('INSERT INTO category (lid, id, book,chapter,verse, desc, tag) VALUES (?,?,?,?,?,?,?)', value, callback);
  }
  protected category_prepare(value:any) {
    return new Promise((resolve, reject) => {
      let taskPrimary = [];
      let categories = value.category;
      for (const sId in categories) {
        if (categories.hasOwnProperty(sId)) {
          var category = categories[sId];
          var section = value.section.filter((o:any) => o.id == sId)[0];
          taskPrimary.push(this.category_eachChild(Number(sId),section,category));
        }
      }
      Promise.all(taskPrimary).then(value=>{
        resolve(value);
      }).catch(error=>{
        reject(error);
      })
    });
  }
  private category_eachChild(sId:number,section:any,category:any[]) {
    return new Promise((resolve, reject) => {
      let taskPrimary = [];
      let total = 0;
      for (const o of category) {
        taskPrimary.push(new Promise((resolve, reject) => {
          this.category_insert([this.lId, sId, o.book, o.chapter, o.verse, o.desc, o.tag],(error:any, row:any)=> {
            if (error) {
              reject(error)
            } else {
              ++total;
              resolve();
            }
          });
        }));
      }
      Promise.all(taskPrimary).then(value=>{
        this.section_insert([this.lId, sId, section.name, section.desc, section.group, total],(error:any, row:any)=> {
          if (error) {
            reject(error)
          } else {
            resolve(total);
          }
        });
      }).catch(error=>{
        reject(error)
      })
    });
  }
}