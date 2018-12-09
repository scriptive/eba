import { Injectable } from "@angular/core";
import { knownFolders, Folder, File, path } from "tns-core-modules/file-system";

@Injectable()

export class AppFileSystem {
  constructor(
  ) {
  }
  write(name:any, data:any) {
    return this.file(name).writeText(data);
    /*
    this.fromPath(fileName).writeText(fileContext).then((res) => {
      console.log('yes',res);
    }).catch((err) => {
      console.log(err);
    });
    */
  }
  read(name:string) {
    return this.file(name).readText();
    /*
    return this.file(fileName).readText().then((res) => {
      return res;
    }).catch((err) => {
      // console.log(err);
    });
    */
    /*
    this.fromPath(fileName).readText().then((res) => {
      console.log('yes',res);
    }).catch((err) => {
      console.log(err);
    });
    */
  }
  private rename(name:string) {
    // this.file(fileName).rename(`${fileName}.txt`)
  }
  private delete(name:string) {
  }
  file(name:string)  {
    // let docs = this.documents(),
    //     filePath  = path.join(docs.path, name);
    return this.fileFromPath(this.path_resolve(name));
  }
  folder(name:string){
    // let docs = this.documents(),
    //     dirPath  = path.join(docs.path, name);
    return this.folderFromPath(this.path_resolve(name));
  }
  getDocumentsEntities(name?:string){
    if (name) {
      return this.folder(name).getEntities();
    }
    return this.documents().getEntities();
    /*
    this.getDocumentsEntities(/app).then((entities) => {
      entities.forEach((entity) => {
          array.push(
              {
                  name: entity.name,
                  path: entity.path,
                  lastModified: entity.lastModified.toString()
              }
          );
      });
    }).catch((err) => {
      console.log(err);
    });
    */
  }
  getTempEntities(){
    return this.temp().getEntities();
    /*
    this.getFolderEntities('/app').then((res) => {
      console.log('yes',res);
    }).catch((err) => {
      console.log(err);
    });
    */
  }
  private currentApp(): Folder {
    return knownFolders.currentApp();
  }
  private documents(): Folder {
    return knownFolders.documents();
  }
  private temp(): Folder {
    return knownFolders.temp();
  }
  private fileFromPath(name: string): File {
    return File.fromPath(name);
  }
  private folderFromPath(name: string): Folder {
    return Folder.fromPath(name);
  }
  private path_resolve(name: string): any {
    return path.join(this.documents().path, name);
  }
  fileExists(name: string): boolean {
    return File.exists(this.path_resolve(name));
  }
  folderExists(name: string): boolean {
    return Folder.exists(this.path_resolve(name));
  }
}
