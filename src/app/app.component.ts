import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router, Route, ActivatedRoute } from "@angular/router";

import { RouterExtensions } from "nativescript-angular/router";

import {
  exitEvent, suspendEvent,
  ApplicationEventData,
  on
} from "tns-core-modules/application";

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
    // this.nav.initiate();
    // this.bookService.stage.subscribe((data:any) => console.log(data));
    // this.bookService.stage = {lang:1,section:1};
    // this.bookService.stage = 'Hello';
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
    // console.log(this.nav.currentRouteName);
    // this.router.navigate(['welcome'])
    // this.nav.actionBarToggle();
    on(exitEvent, (args: ApplicationEventData) => {
      this.bookService.saveStore();
      this.nav.save();
    });
    on(suspendEvent, (args: ApplicationEventData) => {
      this.bookService.saveStore();
      this.nav.save();
    });
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