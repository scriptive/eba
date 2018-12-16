import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import {
  AppConfiguration,
  AppSideDrawer,
  AppActionBar,
  AppNavigation,
  AppUtilization,
  AppFileSystem,
  AppHttp
} from "../shared";
import {
  BookService
} from "../book/service";

import { HomeComponent } from "./component";

const page: Routes = [
  {
    path: "home", component: HomeComponent,
    data:{
      // name: "Home", icon: String.fromCharCode(0xf015),
      name: "Home", icon: String.fromCharCode(0xe804)
    }
  }
];

@NgModule({
    imports: [
      NativeScriptCommonModule,
      NativeScriptUIListViewModule,
      NativeScriptRouterModule.forChild(page),
    ],
    declarations: [
      HomeComponent
    ],
    providers: [
      BookService,
      AppNavigation,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
