import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
// import { RouterModule, Routes } from '@angular/router';

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { authProviders, appRoutes } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { CoreNavigation, CoreUtility } from "./shared";

import { HomeModule } from "./home/module";

import { SettingModule } from "./setting/module";
// import { AboutModule } from "./about/module";
// import { BookmarkModule } from "./bookmark/module";
// import { ContactModule } from "./contact/module";
// import { RandomModule } from "./random/module";

// import { CategoryModule } from "./book/category";
// import { SectionModule } from "./book/section";
// import { SearchModule } from "./book/search";
// import { ReaderModule } from "./book/reader";

// import { LanguageListModule } from "./book/language.list";
// import { LanguageDetailModule } from "./book/language.detail";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    // AppRoutingModule,
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    HomeModule,
    SettingModule
  ],
  exports: [

  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    CoreUtility,
    CoreNavigation
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }