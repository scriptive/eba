import { request, HttpResponse } from "tns-core-modules/http";
import {SQLite} from "../../shared/sqlite";
import { BookData } from "./book.data";
const databaseName:string = 'book';
export class Book extends SQLite {
  // private db:any;

  // private sql:any;
  public constructor() {
    super(databaseName);
    // this.delete();
  }
  public connect() {
    return this.connection(true).then((db:any)=>{
      db.version((_error:any, version:number)=> {
         if (version === 0) {
          db.version(1);
          db.execSQL('CREATE TABLE IF NOT EXISTS book (id INTEGER PRIMARY KEY, name TEXT, lang TEXT, desc TEXT, version INTEGER, launched TEXT, available INTEGER, updated INTEGER)').then(() => {
             this.bookPrepare(BookData);
           }, (_error:any) => {
             console.log("CREATE TABLE ERROR", _error);
           });
           db.execSQL('CREATE TABLE IF NOT EXISTS bookmark (lid INTEGER, book INTEGER, chapter INTEGER, verse TEXT)');
         }
       })
    });
  }
  // private open_usage():void{
  //   this.open().then(()=>{
  //     // NOTE: init on load, if 'request' is active the 'observe' is no longer require! this.requestLang();
  //     this.userBooks((_error:any,b:BookModel)=>{
  //       this.book = new ObservableArray<BookModel>(b);
  //     })
  //   });
  // }
  public request() {
    return new Promise((resolve, reject) => {
      // .split("").reverse().join("")
      request({ url: this.requestURL.replace('*', databaseName), method: "GET", headers: {"Content-Type": "application/json"} }).then((res: HttpResponse) => {
        if (res.statusCode == 200) {
          this.bookPrepare(res.content.toJSON()).then(()=>{
            resolve();
          },()=>{
            reject('Could not updated');
          });
          // resolve(res.content.toJSON());
        } else if (res.statusCode == 404) {
          reject('Not found');
        } else {
          reject(res.content.toString());
        }
      }, (error) => {
        reject(error);
      })
    });
  }
  // private request_usage():void{
  //   this.request().then(()=>{
  //     this.userBooks((_error:any,b:BookModel)=>{
  //       this.book = new ObservableArray<BookModel>(b);
  //     })
  //   },(error)=>{
  //     throw error;
  //     console.log(error);
  //   });
  // }
  private get requestURL():string{
    return "nosj.*/gnal/retsam/abe/evitpircs/moc.tnetnocresubuhtig.war//:sptth".split("").reverse().join("");
  }

  public bookUser(callback?:Function): Promise<any> {
    return this.database.all('SELECT * FROM book WHERE available > ?',['-1'],callback);
  }
  private bookPrepare(value:any) {
    let taskPrimary = [];
    let ram = Math.random();
    for (let lId in value) {
      if (value.hasOwnProperty(lId)) {
        taskPrimary.push(new Promise((resolve, reject) => {
          this.bookSelect(Number(lId), (_error:any, row:any)=> {
            var o = value[lId];
            if (row && row.hasOwnProperty('id') && row.id) {
              this.bookUpdate([o.name, o.lang, o.desc, o.version, o.launched, lId]).then((k:any)=>k?resolve():reject());
            } else {
              this.bookInsert([lId, o.name, o.lang, o.desc,o.version,o.launched, 0, 0]).then((k:any)=>k?resolve():reject());
            }
          })
        }));
      }
    }
    return Promise.all(taskPrimary)
  }
  protected bookSelect(lId?:any,callback?:Function): Promise<any> {
    if (typeof lId === 'function') {
      return this.database.all('SELECT * FROM book', lId);
    } else if (lId && typeof lId === 'number') {
      return this.database.get('SELECT * FROM book WHERE id=?', lId, callback);
    } else {
      return this.database.all('SELECT * FROM book');
    }
  }
  private bookInsert(value:any[]): Promise<any> {
    return this.database.execSQL('INSERT INTO book (id, name, lang, desc, version, launched, available, updated) VALUES (?,?,?,?,?,?,?,?)', value);
  }
  private bookUpdate(value:any[]): Promise<any> {
    return this.database.execSQL('UPDATE book SET name=?, lang=?, desc=?, version=?, launched=? WHERE id=?', value);
  }
  public bookAvailable(lId:number, value:number): Promise<any> {
    return this.database.execSQL('UPDATE book SET available=? WHERE id=?', [value, lId]);
  }
}