/*
import { Component, OnInit,ChangeDetectorRef, ViewChild } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";

// import * as NativeScriptApplication from "tns-core-modules/application";
// import { Device, platformNames } from "tns-core-modules/platform";
// import { DEVICE } from "nativescript-angular/platform-providers";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import {Page} from "ui/page";
import { Repeater } from "tns-core-modules/ui/repeater";
import { View } from "tns-core-modules/ui/core/view";

import { ListViewEventData, RadListView, ListViewScrollEventData,PullToRefreshStyle } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { setTimeout } from "tns-core-modules/timer";
import { Color } from "tns-core-modules/color";

import {
  AppConfiguration,
  AppSideDrawer,
  AppActionBar,
  AppNavigation,
  AppUtilization,
  AppDocumentation,
  AppHttp
} from "../shared";

import { BookItem, BookService } from "../book/service";

@Component({
  selector: "tk-listview-multiple-templates",
  moduleId: module.id,
  templateUrl: "./component.html",
  // styleUrls:["./component.css"],
  providers:[BookService]
})

export class HomeComponent implements OnInit {
  actionTitle:string="Welcome"; //EBA
  actionItemVisibility:string='visible'; //collapsed, visible
  private _items: any;
  private _stateText: string = "State: ";
  private _templateSelector: (item: BookItem, index: number, items: any) => string;
  private _myGroupingFunc: (item: any) => any;
  private defaultCategoryName:string = 'other';

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private actionBar: AppActionBar,
    private sideDrawer: AppSideDrawer,
    private fs: AppDocumentation,
    private bookService: BookService,
    private page: Page,
    private nav: AppNavigation
  ) {
    // NOTE: ?
    // this.actionItemVisibility='collapsed';
    // this.page.actionBarHidden = true;
    // this.myGroupingFunc = (item: BookItem) => {
    //   return item.language ? item.language.toUpperCase() : this.defaultCategoryName.toUpperCase();
    // };
  }

  @ViewChild("listView") listViewComponent: RadListViewComponent;
  ngOnInit() {
    this.page.actionBarHidden = true;
    this._items = this.bookService.book;
    this._templateSelector = this.templateSelectorFunction;
    // this.sideDrawer.gesturesEnabled(false);
    // console.log(this._items);

    this.changeDetectionRef.detectChanges();
    this.listViewIndicator();
  }
  get dataItems() {
    return this._items;
  }
  onTap(index:number,item:any){
    // this._items{}

    // var id = item.id;
    // item.available = !item.available;
    // this._items.setItem(index, item);
      // console.log(index,item);
  }
  // pullToRefresh="true"
  private listViewIndicator(){
    if (this.listViewComponent && this.listViewComponent.listView) {
      let style = new PullToRefreshStyle();
      style.indicatorColor = '#D1CCB3';
      style.indicatorBackgroundColor = '#efefef';
      this.listViewComponent.listView.pullToRefreshStyle = style;
    }
  }
  // (loaded)="listViewLoaded($event)"
  public listViewLoaded(args: ListViewEventData){
    const listView = args.object;
    if (isIOS) {
      listView.ios.pullToRefreshView.backgroundColor = (new Color('#efefef')).ios;
    }
  }
  // (pullToRefreshInitiated)="listViewPullToRefreshInitiated($event)"
  public listViewPullToRefreshInitiated(args: ListViewEventData) {
    // https://docs.telerik.com/devtools/nativescript-ui/api/classes/listviewscrolleventdata.html
    const listView = args.object;
    // scrollOffset
    // RadListView.scrollStartedEvent, RadListView.scrolledEvent and RadListView.scrollEndedEvent events
    setTimeout(function () {
        listView.notifyPullToRefreshFinished();
    }, 500);
  }
  onSwipeToRight(args: ListViewEventData) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args.object;
    var rightItem = swipeView.getViewById<View>("swipeViewOptions");
    swipeLimits.left = rightItem.getMeasuredWidth();
    swipeLimits.right = 0;
    swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
  }
  onSwipeToLeft(args: ListViewEventData) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args.object;
    var rightItem = swipeView.getViewById<View>("swipeViewOptions");
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.left = 0;
    swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
  }

  // sssdelete(args: ListViewEventData) {
  //   // let grocery = <Grocery>args.object.bindingContext;
  //   // this.groceryService.delete(grocery.id)
  //   //   .subscribe(() => {
  //   //     let index = this.groceryList.indexOf(grocery);
  //   //     this.groceryList.splice(index, 1);
  //   //   });
  // }

  // [groupingFunction]="myGroupingFunc"
  public myGroupingFunc = (item: BookItem) => {
    return item.language ? item.language.toUpperCase() : this.defaultCategoryName.toUpperCase();
  }
  get myGroupingFunc(): (item: any) => any {
    return this._myGroupingFunc;
  }
  set myGroupingFunc(value: (item: any) => any) {
    this._myGroupingFunc = value;
  }


  // [itemTemplateSelector]="templateSelector"
  get templateSelector(): (item: BookItem, index: number, items: any) => string {
    return this._templateSelector;
  }
  set templateSelector(value: (item: BookItem, index: number, items: any) => string) {
    this._templateSelector = value;
  }
  public templateSelectorFunction = (item: BookItem, index: number, items: any) => {
    return item.language || this.defaultCategoryName;
  }

  // get stateText(): string {
  //   return this._stateText;
  // }
  //
  // set stateText(value: string) {
  //   this._stateText = value;
  // }

  // ngOnInit() {
  //   this._dataItemService.getIdenticalDataItems(25)
  //     this._dataItems = new ObservableArray();
  // }

  // (scrolled)="onScrolled($event)" (scrollStarted)="onScrollStarted($event)" (scrollEnded)="onScrollEnded($event)"
  public onScrolled(args: ListViewScrollEventData) {
    // this.stateText = "State: Scrolled with offset: " + args.scrollOffset;
  }

  public onScrollStarted(args: ListViewScrollEventData) {
    // this.stateText = "State: Scroll started with offset: " + args.scrollOffset;
  }

  public onScrollEnded(args: ListViewScrollEventData) {
    // this.stateText = "State: Scroll ended with offset: " + args.scrollOffset;
  }
}
*/