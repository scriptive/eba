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
} from "./service";

import { SectionComponent } from "./section";
import { CategoryComponent } from "./category";
import { WelcomeComponent } from "./welcome";
import { BookTestComponent } from "./test";
// import { CategoryModule } from "./category";
// import { SectionModule } from "./section";
// import { SearchModule } from "./search";
// import { ReaderModule } from "./reader";

const page: Routes = [
  {
    path: "section", component: SectionComponent,
    data:{
      name: "Section", icon: String.fromCharCode(0xf015)
    }
  },
  {
    path: "category", component: CategoryComponent,
    data:{
      name: "Category", icon: String.fromCharCode(0xf647)
    }
  },
  {
    path: "welcome", component: WelcomeComponent,
    data:{
      name: "Welcome", icon: String.fromCharCode(0xf518)
    }
  },
  {
    path: "booktest", component: BookTestComponent,
    data:{
      name: "Book Test", icon: String.fromCharCode(0xf128)
    }
  },
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
