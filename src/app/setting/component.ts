import { Component, OnInit } from "@angular/core";

import {Config, CoreNavigation, CoreUtility } from "../shared";
import { Book, BookService } from "../shared/book";

import { getString, setString } from "tns-core-modules/application-settings";


@Component({
  selector: "home",
  moduleId: module.id,
  templateUrl: "./component.html",
  // styleUrls:["./component.css"]
})

export class SettingComponent implements OnInit {
  books: Book[];

  constructor(
    // private router: Router,
    private bookService: BookService,
    private nav:CoreNavigation,
    private util:CoreUtility
  ) {
    // NOTE: ?
  }
  ngOnInit(): void {
    // setString('language','3');
    // let test = getString('language');
    // console.log(test);
    // console.log(JSON.stringify(Config.books));
  }
}


/*
https://docs.nativescript.org/ns-framework-modules/application-settings
import * as Application from "tns-core-modules/application";
import * as applicationModul from "tns-core-modules/application";
import { getString, setString } from "application-settings";

export class BackendService {

    static isLoggedIn(): boolean {
        return !!getString("token");
    }

    static get token(): string {
        return getString("token");
    }

    static set token(theToken: string) {
        setString("token", theToken);
    }
}
*/