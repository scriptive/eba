import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router, Route, ActivatedRoute } from "@angular/router";

import { RouterExtensions } from "nativescript-angular/router";

// import * as NativeScriptApplicationModule from "tns-core-modules/application";
// import { getString, setString, getNumber, setNumber } from "tns-core-modules/application-settings";
// import { RadSideDrawer, DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
// import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";

import {
  AppConfiguration,
  AppSideDrawer,
  AppActionBar,
  AppNavigation,
  AppUtilization,
  AppFileSystem,
  AppHttp
} from "./shared";

import { BookService } from "./book/service";

@Component({
  selector:'eba',
  moduleId: module.id,
  templateUrl: "./app.component.html",
  styleUrls:['./app.scss'],
  providers:[
    AppConfiguration,
    AppSideDrawer,
    AppActionBar,
    AppNavigation,
    AppUtilization,
    AppFileSystem,
    AppHttp
  ]
})

export class AppComponent implements AfterViewInit, OnInit {
  message:string;
  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private router: Router,
    private routerExtensions: RouterExtensions,
    private sidedrawer: AppSideDrawer,
    private actionBar: AppActionBar,
    private nav:AppNavigation,
    private utl:AppUtilization,
    private bookService: BookService
  )
  {
  }
  ngOnInit(): void {
    // this.bookService.bookRequest();
    this.bookService.initiate();
    // this.bookService.message.subscribe(data => console.log(data));
    // this.bookService.request().subscribe(res => {
    //   // this.message = (<any>res).json.data.username;
    //   console.log(res);
    // });

    // this.activatedRoute.snapshot.paramMap.get(name);
    // this.routerExtensions.subscribe(params =>{
    //   console.log(params );
    // });
  }
  ngAfterViewInit() {
    // this.changeDetectionRef.detectChanges();
    // this.router.navigate(['welcome'])
    // this.nav.actionBarToggle();
  }
  get appShortName() {
    return 'EBA'
  }
  get appQuotes() {
    return 'Sawltak 17:11'
  }
  get appName() {
    return 'Effortless bible analysis'
  }
  get appDescription() {
    return 'Lai Siangtho, A thu zui-in khenna'
  }
  get appMenu() {
    return this.router.config.filter(
      i => i.data && i.data.hasOwnProperty('name') && (!i.data.hasOwnProperty('type') || !i.data.type)
    );
  }
}
/*
initConfiguration(): void {
  // AppConfiguration.language = getNumber('language',AppConfiguration.language);
  // AppConfiguration.category = getNumber('category',AppConfiguration.category);
  // AppConfiguration.section = getNumber('section',AppConfiguration.section);
  // AppConfiguration.books = JSON.parse(getString('books',JSON.stringify(AppConfiguration.books)));
  // AppConfiguration.page = getString('page',AppConfiguration.page);
  // setString('page','home');

  // this.router.navigate(AppConfiguration.page);
  // console.log(AppConfiguration.page);

  // setString('language','3');
  // let test = getString('language');
  // console.log('configured routes: ', JSON.stringify(AppConfiguration.books));
  // setNumber('language',AppConfiguration.language);
  // console.log(AppConfiguration.language);

  // console.log(JSON.stringify(AppConfiguration.books));
  // getString('language');
  // static language = 1;
  // static category = 1;
  // static section = 1;
  // static page = "home";

}
*/
/*
new Array(
  { name: "Home", icon: String.fromCharCode(0xf2bd), url: "/home" },
  { name: "Language", icon: String.fromCharCode(0xf015), url: "/language" },
  { name: "Search", icon: String.fromCharCode(0xf002), url: "/search" },
);
*/