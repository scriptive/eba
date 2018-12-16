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
  BookService,
  BookDatabase
} from "./service";

import { SectionComponent } from "./section";
import { CategoryComponent } from "./category";
import { WelcomeComponent } from "./welcome";
import { BookTestComponent } from "./test";
// import { SearchModule } from "./search";

const page: Routes = [
  {
    path: "section", component: SectionComponent,
    data:{
      name: "Section", icon: String.fromCharCode(0xe814)
    }
  },
  {
    path: "category", component: CategoryComponent,
    data:{
      name: "Category", icon: String.fromCharCode(0xe801)
    }
  },
  {
    path: "welcome", component: WelcomeComponent,
    data:{
      name: "Welcome", icon: String.fromCharCode(0xe817)
    }
  },
  // {
  //   path: "booktest", component: BookTestComponent,
  //   data:{
  //     name: "Book Test", icon: String.fromCharCode(0xf128)
  //   }
  // }
];

@NgModule({
    imports: [
      NativeScriptCommonModule,
      NativeScriptUIListViewModule,
      NativeScriptRouterModule.forChild(page),
    ],
    declarations: [
      SectionComponent,
      CategoryComponent,
      WelcomeComponent,
      BookTestComponent
    ],
    providers: [
      AppFileSystem,
      BookService
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class BookModule { }
