import { Injectable } from "@angular/core"
// import * as NativeScriptApplication from "tns-core-modules/application";
// import { Page } from "tns-core-modules/ui/page";
import { Page } from "ui/page";

@Injectable()

export class AppActionBar {
  constructor(
    private page: Page
  ) {
    // setTimeout(()=>{
    //   this.sideDrawerContainer = <RadSideDrawer>getRootView();
    //   console.log('??')
    // }, 100);
  }
  toggle() {
    this.page.actionBarHidden = !this.page.actionBarHidden;
    // console.log(this.page)
  }
  show() {
    this.page.actionBarHidden = false;
  }
  hide() {
    this.page.actionBarHidden = true;
  }
}