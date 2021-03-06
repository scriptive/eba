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
  SwipeActionsEventData,
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

import { BookModel, BookService } from "../book/service";

@Component({
  selector: "eba",
  moduleId: module.id,
  templateUrl: "./component.html",
  providers:[]
})

export class HomeComponent implements OnInit {
  private actionTitle:string="Welcome"; //EBA
  private actionItemVisibility:string='visible'; //collapsed, visible
  private deleteItemVisibility:string='collapsed'; //collapsed, visible
  private downloadItemVisibility:string='collapsed'; //collapsed, visible
  private itemGroupbyLanguage: (item: any) => any;


  private _templateSelector: (item: BookModel, index: number, items: any) => string;
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
    // this.changeDetectionRef.detectChanges();
    this.listViewIndicator();
    this.itemGroupbyLanguage = (item: BookModel) => {
      return item.lang  ? item.lang.toUpperCase() : this.defaultCategoryName.toUpperCase();
    }
    this.listViewComponent.listView.groupingFunction = this.itemGroupFunction;
  }
  ngAfterContentInit() {
  }
  ngOnDestroy() {
  }
  get dataItems(): ObservableArray<BookModel> {
    return this.bookService.lang;
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
    const listView = args.object;
    this.bookService.requestBook().then(()=>{
      listView.notifyPullToRefreshFinished();
    });
  }

  // NOTE: (itemSwipeProgressStarted)="itemSwipeProgressStarted($event)"
  itemSwipeProgressStarted(args: ListViewEventData) {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args.object;
    // const leftItem = swipeView.getViewById<View>('swipeViewLeft');
    const rightItem = swipeView.getViewById<View>('swipeViewRight');
    swipeLimits.left = 0;
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;

    // let data = args.mainView.bindingContext;
    var item = this.dataItems.getItem(args.index);
    if (item.available > 0) {
      this.deleteItemVisibility = 'visible';
      this.downloadItemVisibility = 'collapsed';
    } else {
      this.deleteItemVisibility = 'collapsed';
      this.downloadItemVisibility = 'visible';
    }

  }
  // NOTE: (itemSwipeProgressChanged)="itemSwipeProgressChanged($event)"
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
  itemSwipeProgressEnded(args: ListViewEventData) {}

  // NOTE: loadOnDemandMode="Auto" (loadMoreDataRequested)="itemMoreDataRequested($event)"
  // itemMoreDataRequested(args: LoadOnDemandListViewEventData) {}

  // NOTE: (itemTap)="itemTap($event)"
  itemTap(args: any) {
    var itemView = args.view, item = <BookModel>itemView.bindingContext;

    var itemClassDefault = itemView.class;
    itemView.class = itemClassDefault + ' tap';
    setTimeout(()=>{
      this.bookService.lId=Number(item.id);
      this.nav.to(['section']);
      itemView.class = itemClassDefault;
    },100)

    // console.log('NOTE: testing')

     //or, if you need the entire list as well,
     // get it from the Page's bindingContext
     // as each View has a ref to the Page it's on
     // var pageBindingContext = itemView.page.bindingContext,
     //     fullItemsList = pageBindingContext.connections,
     //     itemForTap = fullItemsList[args.index];
  }
  // NOTE: (itemTap)="itemDownload($event)"
  itemDownload(args: ListViewEventData) {
    var itemObject = args.object,
        item = <BookModel>itemObject.bindingContext;

    this.bookService.bibleDownload(Number(item.id)).then(()=>{
      // item.available=1;
    },error => {
      item.desc = error;
    }).then(()=>{
      this.listViewComponent.listView.notifySwipeToExecuteFinished();
    });

    // this.bookService.downloadBook(Number(item.id));
  }
  // NOTE: (itemTap)="itemClear($event)"
  itemClear(args: ListViewEventData) {
    let itemObject = args.object,
        item = <BookModel>itemObject.bindingContext;
    // console.log('...working');
    // this.bookService.connectBook(Number(item.id));

  }
  // NOTE: (itemTap)="itemDelete($event)"
  itemDelete(args: ListViewEventData) {
    let itemObject = args.object,
        item = <BookModel>itemObject.bindingContext;
    // let item = args.object.bindingContext
    // let index = this.dataItems.indexOf(item);
    this.bookService.bibleDelete(Number(item.id)).then(()=>{
      // item.available=0;
    },error => {
      console.log(error);
    }).then(()=>{
      this.listViewComponent.listView.notifySwipeToExecuteFinished();
    });

    // const listView = this.listViewComponent.listView;
    // listView.refresh();
    // this.dataItems.forEach( (v,i,a) => {
    //   if (v.id == lang.id){
    //     if (isAndroid)listView.groupingFunction = undefined;
    //     if (a.length > 1 ) {
    //       a.splice(i, 1);
    //     } else {
    //       a.shift();
    //     }
    //     if (isAndroid)listView.groupingFunction = this.itemGroupFunction;
    //     listView.refresh();
    //     listView.notifySwipeToExecuteFinished();
    //   }
    // });
  }

  // [groupingFunction]="itemGroupFunction"
  get itemGroupFunction(): (item: any) => any {
    return this.itemGroupbyLanguage;
  }
  set itemGroupFunction(value: (item: any) => any) {
    this.itemGroupbyLanguage = value;
  }
  // [itemTemplateSelector]="templateSelector"
  get templateSelector(): (item: BookModel, index: number, items: any) => string {
    return this._templateSelector;
  }
  set templateSelector(value: (item: BookModel, index: number, items: any) => string) {
    this._templateSelector = value;
  }
  public templateSelectorFunction = (item: BookModel, index: number, items: any) => {
    return item.lang || this.defaultCategoryName;
  }
}