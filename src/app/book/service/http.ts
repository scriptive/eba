import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
/*
https://raw.githubusercontent.com/scriptive/eba/master/lang/book.json
https://raw.githubusercontent.com/scriptive/eba/master/lang/1.json
https://raw.githubusercontent.com/scriptive/eba/master/lang/2.json
https://raw.githubusercontent.com/scriptive/eba/master/lang/3.json
*/
export class BookHttp {
  private serverUrl = "https://raw.githubusercontent.com/scriptive/eba/master/lang/book.json";

  constructor(private http: HttpClient) {}

  deleteData() {
    let headers = this.createRequestHeader();
    return this.http.get(this.serverUrl, { headers: headers });
  }

  private createRequestHeader() {
    // set headers here e.g.
    return new HttpHeaders({
      "Content-Type": "application/json",
    });
  }
}