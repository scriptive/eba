import { Injectable } from '@angular/core';

@Injectable()

export class BookModel {
  constructor(
    public id: number,
    public name: string,
    public lang: string,
    public desc: string,
    public version: number,
    public launched?: string,
    public available?: number,
    public updated?: number
  ) {}
}

export class TestamentModel{
  constructor(
    public id: number,
    public name: string,
    public shortname: string
  ) {}
}

export class SectionModel {
  constructor(
    public lid: number,
    public id: number,
    public name: string,
    public desc: string,
    public groupname: string,
    public total: number
  ) {}
}

export class CategoryModel {
  constructor(
    public id: number,
    public book: number,
    public chapter: number,
    public verse: string,
    public desc: string,
    public tag: string
  ) {}
}

// TODO: removed ???

export class InfoModel {
  constructor(
    public name: string,
    public desc: string,
    public lang: string,
    public version: number,
    public launched: string
  ) {}
}
export class AuthorModel {
  constructor(
    public name?: string,
    public email?: string,
    public url?: string
  ) {}
}
export class TestamentNameModel{
  constructor(
    public id: number,
    public name: string,
    public shortname: string
  ) {}
}
export class BookNameModel {
  constructor(
    public id: number,
    public name: string,
    public shortname?: string
  ) {}
}