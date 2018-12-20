import { Injectable } from "@angular/core";

import { knownFolders, path } from "tns-core-modules/file-system";
import { request, HttpResponse } from "tns-core-modules/http";
import { isAndroid, isIOS } from "tns-core-modules/platform";
var utilsModule = require("tns-core-modules/utils/utils");
var nativescript_sqlite = require("nativescript-sqlite");

@Injectable()
/**
 * new SQLite(1).database
 */

export class SQLite {
  private databaseObject: any;
  public constructor(protected databaseName: string) {
    this.databaseName = '*.db'.replace('*', databaseName);
  }
  protected connection(connectOrCreate?: boolean): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // new sql(dbname, options, callback)
      if (this.isExists || connectOrCreate === true) {
        if (this.isDatabase) {
          resolve(this.database);
        } else {
          new nativescript_sqlite(this.databaseName, (error: any, db: any) => {
            if (error) return reject(error);
            db.resultType(this.sql.RESULTSASOBJECT);
            this.databaseObject = db;
            resolve(db);
          });
        }
      } else {
        reject('Not found');
      }
    });
  }
  protected get sql(): any {
    return nativescript_sqlite;
  }
  protected get database(): any {
    return this.databaseObject;
  }
  protected get isExists(): boolean {
    return this.sql.exists(this.databaseName);
  }
  protected get isDatabase(): boolean {
    return this.sql.isSqlite(this.database);
  }
  protected get isOpen(): any {
    if (this.database) {
      return this.database.isOpen();
    }
    return false;
  }
  protected isVersion(callback: Function) {
    this.database.version(callback);
    // this.database.version((_error:any, version:number)=> {
    //     if (version === 0) {
    //         // this.database.version(1);
    //     }
    // });
  }
  protected deleteDatabase() {
    if (this.isExists) {
      if (this.isOpen) {
        this.close();
      }
      this.sql.deleteDatabase(this.databaseName);
    }
  }
  protected copyFromDirectory() {
    this.sql.copyDatabase(this.databaseName);
  }

  protected copyFromURL(uri:string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      request({ url: uri.replace('*', this.databaseName), method: "GET" }).then((res: HttpResponse) => {
        if (res.statusCode == 200) {
          if (isAndroid) {
            // appModule.android.context
            var context = utilsModule.ad.getApplicationContext(),
              db: string = context.getDatabasePath(this.databaseName).getAbsolutePath();
          } else {
            var dbFolder = knownFolders.documents(),
              db: string = path.join(dbFolder.path, this.databaseName);
          }
          resolve(res.content.toFile(db));
        } else if (res.statusCode == 404) {
          reject('Not found');
        } else {
          reject(res.content.toString());
        }
      }, (error) => {
        console.log(error)
        reject('Error');
      })
    });
  }
  protected close() {
    return this.database.close();
  }

  // get(){
  //     // (statement, Params, Callback)
  //     // this.database.get()
  // }
  // all(){
  //     // (statement, Params, Callback)
  //     // this.database.all()
  // }
  // execSQL(){
  //     // (statement, Params, Callback)
  //     // this.database.execSQL()
  // }
  // each(){
  //     // (statement, Params, Callback)
  //     // this.database.each()
  // }
  test_book() {
    this.database.all('SELECT * FROM book', function (_e: any, raw: any) {
      console.log(raw);
    });
  }
}