// import { Injectable,OnInit,AfterViewInit } from "@angular/core";
import { Injectable } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router";

import * as NativeScriptApplication from "tns-core-modules/application";
import { getString, setString, getNumber, setNumber } from "tns-core-modules/application-settings";

import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";

// import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
// import { getRootView } from "tns-core-modules/application";
// import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { AppSideDrawer } from "./sidedrawer";

@Injectable()

export class AppNavigation {
  public currentRouteName: string;
  constructor(
    private sidedrawer: AppSideDrawer,
    private page: Page,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private routerExtensions: RouterExtensions

  ) {
    this.hasPage();
    // console.log(this.activatedRoute.snapshot.url);
    // console.log(activatedRoute.snapshot.url[0].path);
    // this.route.snapshot.pathFromRoot.map(o => o.url[0]).join('/')
  }

  actionBarToggle() {
    this.page.actionBarHidden = !this.page.actionBarHidden;
  }

  to(currentRouteName:any[],routeTransition:string='fade'): void {
    // NOTE: flip,fade
    // currentRouteName[0] = currentRouteName[0].replace(':Id',0);
    this.routerExtensions.navigate(currentRouteName, {
        transition: {
            name: routeTransition
        }
    });
    this.sidedrawer.close();
  }
  toBack(): void {
    this.routerExtensions.back();
    // this.routerExtensions.backToPreviousPage();
  }
  isPage(currentRouteName: string): boolean {
    // console.log(currentRouteName);
    return this.pageName(currentRouteName) === this.currentRouteName;
    // return currentRouteName === this.currentRouteName;
  }
  hasPage() {
    // this.activatedRoute.url.subscribe(url =>{ });
    this.router.events.subscribe(e => {
      // NavigationStart, NavigationEnd
      if(e.constructor.name === "NavigationEnd") {
        this.currentRouteName = this.pageName();
        setString('page',this.currentRouteName);
      }
    });
  }
  pageName(value?:string) {
    if (value) {
      return value.replace(/^\//, '').split('/')[0];
    }
    return this.router.url.replace(/^\//, '').split('/')[0];
  }
}