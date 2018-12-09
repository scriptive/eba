import { Component, OnInit, AfterContentInit, OnDestroy, ChangeDetectorRef, ViewChild } from "@angular/core";
// import { Router, Route } from "@angular/router";
// import { RouterExtensions } from "nativescript-angular/router";

import { ObservableArray } from "tns-core-modules/data/observable-array";

// import * as NativeScriptApplication from "tns-core-modules/application";
// import { Device, platformNames } from "tns-core-modules/platform";
// import { DEVICE } from "nativescript-angular/platform-providers";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import {Page} from "ui/page";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { Repeater } from "tns-core-modules/ui/repeater";
import { View } from "tns-core-modules/ui/core/view";

import { topmost } from "tns-core-modules/ui/frame";

import {
  ListViewEventData,
  RadListView,
  ListViewScrollEventData,
  PullToRefreshStyle,
  ListViewLinearLayout,
  LoadOnDemandListViewEventData
} from "nativescript-ui-listview";

import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { setTimeout } from "tns-core-modules/timer";
import { Color } from "tns-core-modules/color";

import {
  AppConfiguration,
  AppSideDrawer,
  AppActionBar,
  AppNavigation,
  AppUtilization,
  AppFileSystem,
  AppHttp
} from "../shared";

import { BookItem, BookService } from "../book/service";

@Component({
  selector: "eba",
  moduleId: module.id,
  templateUrl: "./component.html",
  providers:[]
})

export class HomeComponent implements OnInit {
  message:string;
  // sub: Subscription;

  private actionTitle:string="Welcome"; //EBA
  private actionItemVisibility:string='visible'; //collapsed, visible
  private _dataItems: ObservableArray<BookItem>;
  // private _sourceDataItems: ObservableArray<BookItem>;
  private itemGroupbyLanguage: (item: any) => any;


  private _templateSelector: (item: BookItem, index: number, items: any) => string;
  private defaultCategoryName:string = '...other';

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private actionBar: AppActionBar,
    private sideDrawer: AppSideDrawer,
    private page: Page,
    private bookService: BookService,
    private nav: AppNavigation
  ) {
  }

  @ViewChild("listView") listViewComponent: RadListViewComponent;
  ngOnInit() {
    this.page.actionBarHidden = true;
    this._templateSelector = this.templateSelectorFunction;
    // this._dataItems = this.bookService.book;
    this.changeDetectionRef.detectChanges();
    // this.dataStore();
    this.listViewIndicator();
    this.itemGroupbyLanguage = (item: BookItem) => {
      return item.lang  ? item.lang.toUpperCase() : this.defaultCategoryName.toUpperCase();
    }
    this.listViewComponent.listView.groupingFunction = this.itemGroupFunction;
  }
  ngAfterContentInit() {
  }
  ngOnDestroy() {
  }
  get dataItems(): ObservableArray<BookItem> {
    return this.bookService.books;
  }

  private dataStore() {
    // this._dataItems = this.bookService.books;
    // const book = this.bookService.books;
    // this._dataItems = new ObservableArray<BookItem>(book);
    // this._dataItems = new ObservableArray(book);
    // this._dataItems = new ObservableArray<BookItem>();
    //  for (let i = 0; i < book.length; i++) {
    //    const tmp = new BookItem(book[i].id, book[i].name, book[i].lang, book[i].desc,book[i].version);
    //      if (isAndroid) {
    //        this._dataItems.push(tmp);
    //      } else if (isIOS) {
    //        this._dataItems.setItem(i,tmp);
    //      }
    //      // this._dataItems.splice(0,0,tmp);;
    //  }
  }
  // NOTE: pullToRefresh="true"
  private listViewIndicator(){
    if (this.listViewComponent && this.listViewComponent.listView) {
      let style = new PullToRefreshStyle();
      style.indicatorColor = '#D1CCB3';
      style.indicatorBackgroundColor = '#efefef';
      this.listViewComponent.listView.pullToRefreshStyle = style;
    }
  }
  // NOTE: (loaded)="listViewLoaded($event)"
  public listViewLoaded(args: ListViewEventData){
    const listView = args.object;
    if (isIOS) {
      listView.ios.pullToRefreshView.backgroundColor = (new Color('#efefef')).ios;
    }
  }
  // (pullToRefreshInitiated)="listViewPullToRefreshInitiated($event)"
  public listViewPullToRefreshInitiated(args: ListViewEventData) {
    // setTimeout(()=> {
    //   const lang = ['en','my','zo','other'];
    //   const initialNumberOfItems = this.dataItems.length;
    //
    //   this.bookService.sendMessage(lang[Math.floor((Math.random()*lang.length))]);
    //   for (let i = initialNumberOfItems; i < initialNumberOfItems + 2; i++) {
    //     var language = lang[Math.floor((Math.random()*lang.length))];
    //     if (isIOS) {
    //       this.dataItems.setItem(i,new BookItem(i, 'setItem:'+i, language, language+'-s item description',0));
    //     } else {
    //       this.dataItems.push(new BookItem(i, 'push:'+i, language, language+'-s item description',0));
    //       // this.dataItems.splice(0,0,new BookItem(i, 'isAndroid:'+i, language, language+'-s item description'));
    //     }
    //   }
    //   const listView = args.object;
    //   listView.notifyPullToRefreshFinished();
    // }, 300);
    const listView = args.object;
    this.bookService.requestBook('book').then((result)=>{
      listView.notifyPullToRefreshFinished();
    },(error)=>{
      listView.notifyPullToRefreshFinished();
    });
  }

  // NOTE: (itemSwipeProgressStarted)="itemSwipeProgressStarted($event)"
  itemSwipeProgressStarted(args: ListViewEventData) {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args['object'];
    const leftItem = swipeView.getViewById<View>('swipeViewLeft');
    // const rightItem = swipeView.getViewById<View>('swipeViewRight');
    swipeLimits.left = leftItem.getMeasuredWidth();
    // swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
  }
  // NOTE: (itemSwipeProgressEnded)="itemSwipeProgressEnded($event)"
  itemSwipeProgressChanged(args: ListViewEventData) {
    // const swipeLimits = args.data.swipeLimits;
    // const currentItemView = args.object;
    // if (args.data.x > 200) {
    //     console.log("Notify perform left action");
    // } else if (args.data.x < -200) {
    //     console.log("Notify perform right action");
    // }
  }
  // NOTE: (itemSwipeProgressEnded)="itemSwipeProgressEnded($event)"
  itemSwipeProgressEnded(args: ListViewEventData) {
  }
  // NOTE: loadOnDemandMode="Auto" (loadMoreDataRequested)="itemMoreDataRequested($event)"
  itemMoreDataRequested(args: LoadOnDemandListViewEventData) {
  }
  // NOTE: (itemTap)="itemTap($event)"
  itemTap(args: any) {
    var itemView = args.view, book = <BookItem>itemView.bindingContext;
    itemView.opacity = 0.3;
    itemView.animate({
      opacity: 1,
      duration: 100
    });
    this.bookService.Id('book',Number(book.id));
    this.nav.to(['section']);

     //or, if you need the entire list as well,
     // get it from the Page's bindingContext
     // as each View has a ref to the Page it's on
     // var pageBindingContext = book.page.bindingContext,
     //     fullItemsList = pageBindingContext.connections,
     //     itemForTap = fullItemsList[args.index];
  }

  itemClear(args: ListViewEventData) {
  }
  itemDelete(args: ListViewEventData) {
    let itemView = args.object;
    let book = <BookItem>itemView.bindingContext;
    // let book = args.object.bindingContext
    let index = this.dataItems.indexOf(book);
    const listView = this.listViewComponent.listView;
    // listView.refresh();
    this.dataItems.forEach( (v,i,a) => {
      if (v.id == book.id){
        if (isAndroid)listView.groupingFunction = undefined;
        if (a.length > 1 ) {
          a.splice(i, 1);
        } else {
          a.shift();
        }
        if (isAndroid)listView.groupingFunction = this.itemGroupFunction;
        listView.refresh();
        listView.notifySwipeToExecuteFinished();
      }
    });
    // this.dataItems.shift();
    // this.dataItems.splice(0);
    // this.dataItems.length = 0;
    // this.dataItems.splice(0);
  }

  // [groupingFunction]="itemGroupFunction"
  get itemGroupFunction(): (item: any) => any {
    return this.itemGroupbyLanguage;
  }
  set itemGroupFunction(value: (item: any) => any) {
    this.itemGroupbyLanguage = value;
  }
  // [itemTemplateSelector]="templateSelector"
  get templateSelector(): (item: BookItem, index: number, items: any) => string {
    return this._templateSelector;
  }
  set templateSelector(value: (item: BookItem, index: number, items: any) => string) {
    this._templateSelector = value;
  }
  public templateSelectorFunction = (item: BookItem, index: number, items: any) => {
    return item.lang || this.defaultCategoryName;
  }
}