import { Component, AfterViewInit,OnInit,ChangeDetectorRef, ViewChild } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {Page} from "ui/page";

import {
  ListViewEventData,
  RadListView,
  ListViewScrollEventData,
  PullToRefreshStyle,
  ListViewLinearLayout,
  LoadOnDemandListViewEventData
} from "nativescript-ui-listview";

import { RadListViewComponent } from "nativescript-ui-listview/angular";
// import { android as androidApplication } from "tns-core-modules/application";
import { setTimeout } from "tns-core-modules/timer";
// import { Color } from "tns-core-modules/color";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import {Color} from "tns-core-modules/color";



import {
  AppConfiguration,
  AppSideDrawer,
  AppActionBar,
  AppNavigation,
  AppUtilization,
  AppFileSystem,
  AppHttp
} from "../shared";

import { BookItem, SectionItem, CategoryItem, BookService } from "./service";

@Component({
  selector:'eba',
  moduleId: module.id,
  templateUrl: "./category.html",
  providers:[]
})

export class CategoryComponent implements OnInit {

  private masterItems: ObservableArray<CategoryItem>;
  private copyItems: ObservableArray<CategoryItem>;
  private bookId:number;
  private sectionId:number;
  private categoryId:number;

  private actionItemVisibility:string="visible"; //collapsed
  private actionTitle:string="Category";

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private actionBar: AppActionBar,
    private sideDrawer: AppSideDrawer,
    private bookService: BookService,
    private page: Page,
    private nav: AppNavigation
  ) {
    // NOTE: ?
    this.page.actionBarHidden = true;
  }

  @ViewChild("listView") listViewComponent: RadListViewComponent;
  ngOnInit() {
    this.changeDetectionRef.detectChanges();
    this.dataInit();
  }
  private dataInit() {
    this.bookId=this.bookService.Id('book');
    this.sectionId=this.bookService.Id('section');
    this.bookService.requestContent(this.bookId).then(()=>{
      this.bookService.categoryObserve(this.sectionId);
      this.masterItems = this.bookService.category;
      this.copyItems = new ObservableArray<CategoryItem>();
      this.chunkItems(2);
    },(error)=>{
      console.log(error)
    });
  }
  get dataItems():ObservableArray<CategoryItem> {
    return this.copyItems;
  }
  private chunkItems(chunkSize: number) {
    let items = this.masterItems.splice(0, chunkSize);
    this.copyItems.push(items);
  }
  // NOTE: loadOnDemandMode="Auto" (loadMoreDataRequested)="itemMoreDataRequested($event)"
  itemMoreDataRequested(args: LoadOnDemandListViewEventData) {
    const listView: RadListView = args.object;
    var total = this.masterItems.length, limit = 7;
    if (total > 0) {
        setTimeout(()=> {
          // var chuckSize = (total < limit) ? total:limit;
          this.chunkItems((total < limit)?total:limit);
          listView.notifyLoadOnDemandFinished();
        }, 500);
        args.returnValue = true;
    } else {
        args.returnValue = false;
        listView.notifyLoadOnDemandFinished(true);
    }
  }
  /*
  onTap(index:number,item:any){
    // this._items{}
    // var id = item.id;
    item.available = !item.available;
    this._items.setItem(index, item);
      // console.log(index,item);
  }
  get dataItems() {
    return this._items;
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
  */
}

