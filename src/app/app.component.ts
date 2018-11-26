import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, Route } from "@angular/router";

import * as applicationModul from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";

import { getString, setString, getNumber, setNumber } from "tns-core-modules/application-settings";

import { Config,CoreNavigation, CoreUtility } from "./shared";

@Component({
  selector: "ns-app",
  moduleId: module.id,
  templateUrl: "./app.component.html",
})

export class AppComponent implements OnInit {
  private sideDrawerTransitionBase: DrawerTransitionBase;
  private sideDrawerMenu:any;
  // private pages = new Array(
  //   { name: "Home", icon: String.fromCharCode(0xf2bd), url: "/home" },
  //   { name: "Language", icon: String.fromCharCode(0xf015), url: "/language" },
  //   { name: "Search", icon: String.fromCharCode(0xf002), url: "/search" },
  // );
  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private nav:CoreNavigation,
    private util:CoreUtility)
  {
  }

  ngOnInit(): void {
    this.sideDrawerTransitionBase = new SlideInOnTopTransition();
    this.sideDrawerMenuFilter();
    // this.check_setting();

  }

  check_setting(): void {
    Config.language = getNumber('language',Config.language);
    Config.category = getNumber('category',Config.category);
    Config.section = getNumber('section',Config.section);
    // setString('page','home');
    Config.page = getString('page',Config.page);
    Config.books = JSON.parse(getString('books',JSON.stringify(Config.books)));

    // this.router.navigate(Config.page);
    // console.log(Config.page);

    // setString('language','3');
    // let test = getString('language');
    // console.log('configured routes: ', JSON.stringify(Config.books));
    // setNumber('language',Config.language);
    // console.log(Config.language);

    // console.log(JSON.stringify(Config.books));
    // getString('language');
    // static language = 1;
    // static category = 1;
    // static section = 1;
    // static page = "home";

  }
  sideDrawerMenuFilter(): void {
    // console.log('configured routes: ', JSON.stringify(this.router.config));
    this.sideDrawerMenu = this.router.config.filter(page => page.data && page.data.hasOwnProperty('name') && !page.data.hasOwnProperty('skip') );
  }
  get sideDrawerTransition(): DrawerTransitionBase {
    return this.sideDrawerTransitionBase;
  }
}