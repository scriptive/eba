import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router, Route, ActivatedRoute } from "@angular/router";

import { RouterExtensions } from "nativescript-angular/router";

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
    this.bookService.initiate();
    this.nav.initiate();
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