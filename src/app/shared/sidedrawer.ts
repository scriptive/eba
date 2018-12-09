import { Injectable } from "@angular/core";

// import * as NativeScriptApplication from "tns-core-modules/application";
import { getRootView } from "tns-core-modules/application";
import { RadSideDrawer, DrawerTransitionBase, RevealTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";

@Injectable()

export class AppSideDrawer {
  private sideDrawerTransition: DrawerTransitionBase;
  private sideDrawerContainer:any;
  constructor()
  {
    /*
    // NOTE: https://docs.telerik.com/devtools/nativescript-ui/Controls/Angular/SideDrawer/transitions
    Any of below item can be use, but need to import it first!
    FadeTransition
    PushTransition
    RevealTransition
    ReverseSlideOutTransition
    ScaleDownPusherTransition
    ScaleUpTransition
    SlideAlongTransition
    SlideInOnTopTransition
    */
    this.sideDrawerTransition = new RevealTransition();
  }
  get drawer(){
    // this.drawer = this.drawerComponent.sideDrawer;
    // this.drawer = <RadSideDrawer>getRootView()
    // this.drawer = <RadSideDrawer>NativeScriptApplication.getRootView()
    // use setTimeout otherwise there is no getRootView valid reference
    return new Promise((resolve, reject) =>{
      if (this.sideDrawerContainer) resolve(this.sideDrawerContainer);
      setTimeout(()=>{
        this.sideDrawerContainer = <RadSideDrawer>getRootView();
        resolve(this.sideDrawerContainer);
      }, 100);
    });
  }
  gesturesEnabled(value:boolean) {
    this.drawer.then(()=>{
      this.sideDrawerContainer.gesturesEnabled = value;
    });
  }
  public toggle() {
    this.drawer.then(()=>{
      this.sideDrawerContainer.toggleDrawerState();
    });
  }
  public open() {
    this.drawer.then(()=>{
      this.sideDrawerContainer.showDrawer();
    });
  }
  public close() {
    this.drawer.then(()=>{
      this.sideDrawerContainer.closeDrawer();
    });
  }

  get transition(): DrawerTransitionBase {
    return this.sideDrawerTransition;
  }
  set transition(value: DrawerTransitionBase) {
      this.sideDrawerTransition = value;
  }
}