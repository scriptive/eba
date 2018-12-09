import { Injectable } from '@angular/core';

@Injectable()

export class BookItem {
  constructor(
    public id: number,
    public name: string,
    public lang: string,
    public desc: string,
    public version: number,
    public launched?: string,
    public available?: boolean,
    public update?: boolean
  ) {}
}


export class InfoItem {
  constructor(
    public name: string,
    public desc: string,
    public lang: string,
    public version: number,
    public launched: string
  ) {}
}
export class AuthorItem {
  constructor(
    public name?: string,
    public email?: string,
    public url?: string
  ) {}
}
export class TestamentNameItem{
  constructor(
    public id: number,
    public name: string,
    public shortname: string
  ) {}
}
export class BookNameItem {
  constructor(
    public id: number,
    public name: string,
    public shortname?: string
  ) {}
}
export class SectionItem {
  constructor(
    public id: number,
    public name: string,
    public desc: string,
    public group: string
  ) {}
}
export class CategoryItem {
  constructor(
    public book: number,
    public chapter: number,
    public verse: string,
    public desc: string,
    public tag: string
  ) {}
}

export class SectionItem_test {
  // private o: SectionItem[];
  public id: number;
  public name: string;
  public desc: string;
  public group: string;
  constructor(private o:SectionItem
  ) {
    console.log('SectionItem_test')
    this.id=Number(this.o.id);
    this.name=this.o.name;
    this.desc=this.o.desc;
    this.group=this.o.group;
  }
}
export class DataItem {
  constructor(
    public info: InfoItem,
    public author: any,
    public modification: any,
    public testament: TestamentNameItem,
    public book: BookNameItem,
    public section: SectionItem_test,
    public category: CategoryItem
  ) {}
}
// export interface BookInterface {
//   id: number;
//   name: string;
//   lang: string;
//   desc: string;
//   version: number;
//   launched?: string;
//   available?: boolean;
//   update?: boolean;
// }
// export interface SectionInterface {
//   id: number;
//   name: string;
//   desc: string;
//   group: string;
// }
// export interface CategoryInterface {
//   book: number;
//   chapter: number;
//   verse: string;
//   desc: string;
//   tag: string
// }

// export interface BookItem {
//   id: number;
//   name: string;
//   image: any;
//   selected: boolean;
// }
// "name": "Zolai",
// "desc": "Zolai Version",
// "lang": "zo",
// "version": "1",
// "launched": "10/12/18"