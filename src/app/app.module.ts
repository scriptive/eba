import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
// import { RouterModule, Routes } from '@angular/router';

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
// import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";


// import { NativeScriptModule } from "nativescript-angular/nativescript.module";
// import { NativeScriptRouterModule } from "nativescript-angular/router";
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";


import { AppNavigation, AppSideDrawer, AppActionBar, AppUtilization } from "./shared";
import { BookService, BookDatabase } from "./book/service";

import { appRoutes } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HomeModule } from "./home";
import { BookModule } from "./book";
import { SettingModule } from "./setting";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUIListViewModule,
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    HomeModule,
    SettingModule,
    BookModule
  ],
  exports: [

  ],
  declarations: [
    AppComponent
  ],
  providers: [
    BookService,
    AppNavigation
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }