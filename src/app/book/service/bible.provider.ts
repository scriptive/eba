import {SQLite} from "../../shared/sqlite";

export class Bible extends SQLite {

  public constructor(sqlName:any) {
    super(sqlName)
    // this.delete();
  }
  public connect() {
    return this.connection();
  }
  public download() {
    return this.copyFromURL(this.requestURL);
  }
  public delete() {
    this.deleteDatabase();
  }
  public hasAvailable() {
    return this.isExists;
  }
  public hasOpen() {
    return this.isOpen;
  }

  public testament() {
    return this.database.all('SELECT * FROM testament');
  }
  public book() {
    return this.database.all('SELECT * FROM book');
  }
  public section() {
    return this.database.all('SELECT * FROM section');
  }
  public category(cId:number) {
    return this.database.all('SELECT * FROM category WHERE id=?',cId);
  }
  private get requestURL():string{
    return "*/gnal/retsam/abe/evitpircs/moc.tnetnocresubuhtig.war//:sptth".split("").reverse().join("");
  }
}
// var lId=3;
// new Bible(lId).section().then(()=>{
//   this.bookProvider.bookAvailable(lId,1).then(()=>{

//   },()=>{

//   })
// },(error:string)=>{

// })

/*
new Bible(lId).download().then(()=>{
  this.bookProvider.bookAvailable(lId,1).then(()=>{
    resolve();
  },()=>{
    reject('booklist fail to update')
  })
},(error:string)=>{
  reject(error);
})
*/
/*
  service.section().then((rows:ObservableArray<SectionModel>)=>{
    this.masterItems = rows;
    this.copyItems = new ObservableArray<SectionModel>();
    this.copyItems.push(this.masterItems);
    this.ActivityIndicatorMsg = null;
    // this.masterItems = new ObservableArray<SectionModel>(service.sId);
  })
*/