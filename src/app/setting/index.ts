import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {
  AppConfiguration,
  AppSideDrawer,
  AppActionBar,
  AppNavigation,
  AppUtilization,
  AppFileSystem,
  AppHttp
} from "../shared";

import { SettingComponent } from "./component";

const page: Routes = [
  {
    path: "setting", component: SettingComponent,
    data:{
      name: "Setting", icon: String.fromCharCode(0xf013), type: 1
    }
  }
];

@NgModule({
    imports: [
      NativeScriptCommonModule,
      NativeScriptRouterModule.forChild(page)
    ],
    declarations: [
      SettingComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SettingModule { }
