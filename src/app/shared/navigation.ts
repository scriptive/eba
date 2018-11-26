import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import * as Application from "tns-core-modules/application";
import { getString, setString, getNumber, setNumber } from "tns-core-modules/application-settings";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()

export class CoreNavigation {
  activePageName: string;
  activePageTitle: string;
  title: string;

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {
    this.hasPage();
  }
  sideDrawerShow(): void {
    if (this.sideDrawer()) this.sideDrawer().showDrawer();
  }
  sideDrawerHide(): void {
    if (this.sideDrawer()) this.sideDrawer().closeDrawer();
  }
  sideDrawer(){
    return <RadSideDrawer>Application.getRootView();
  }
  to(currentRouteName: string,routeTransition:string='fade'): void {
    // NOTE: flip,fade
    this.routerExtensions.navigate([currentRouteName], {
        transition: {
            name: routeTransition
        }
    });
    this.sideDrawerHide();
  }
  isPage(currentRouteName: string): boolean {
    return currentRouteName === this.router.url.replace(/^\//, '');
  }
  hasPage() {
    // this.activatedRoute.url.subscribe(url =>{ });
    this.router.events.subscribe(e => {
      // NavigationStart, NavigationEnd
      if(e.constructor.name === "NavigationEnd") {
        setString('page',this.router.url);
      }
    });
  }
}