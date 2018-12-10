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

import { EventData } from "tns-core-modules/data/observable";
// import { TextField } from "ui/text-field";
import { Label } from "tns-core-modules/ui/label";
// import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { FormattedString } from "tns-core-modules/text/formatted-string";
import { Span } from "tns-core-modules/text/span";

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

  private masterItems: any;
  // private masterItems: ObservableArray<CategoryItem>;
  private copyItems: ObservableArray<CategoryItem>;
  private bookId:number;
  private sectionId:number;
  private categoryId:number;

  private actionItemVisibility:string="visible"; //collapsed
  private actionTitle:string="Category";

  private ActivityIndicatorMsg:string="...";
  private ActivityIndicatorBusy:boolean=true;

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
      this.actionTitle = this.bookService.sectionName(this.sectionId);
      this.bookService.categoryObserve(this.sectionId);
      this.masterItems = this.bookService.category;
      this.copyItems = new ObservableArray<CategoryItem>();
      this.chunkItems(2);
      this.ActivityIndicatorMsg = null;
    },(error)=>{
      if (error instanceof Object) {
        if (error.hasOwnProperty('statusText')) {
          this.ActivityIndicatorMsg = error.statusText;
        } else {
          this.ActivityIndicatorMsg = JSON.stringify(error);
        }
      } else {
        this.ActivityIndicatorMsg = "Error";
      }
    }).then(()=>{
      this.ActivityIndicatorBusy=false;
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
          this.chunkItems((total < limit)?total:limit);
          listView.notifyLoadOnDemandFinished();
        }, 100);
        // this.chunkItems((total < limit)?total:limit);
        // listView.notifyLoadOnDemandFinished();
        args.returnValue = true;
    } else {
        args.returnValue = false;
        listView.notifyLoadOnDemandFinished(true);
    }
  }
  // NOTE: (textChange)="itemDescriptionFormat($event)"
  itemDescriptionFormat(args: any) {
    // var itemView = args.view, section = <SectionItem>itemView.bindingContext;
    const container = <Label>args.object;
    var item = container.bindingContext;
    const formattedString = new FormattedString(), spans = [];

    var tmp = item.desc.split('[');
    if (tmp.length > 1) {
      tmp = tmp.filter(Boolean);
      for (var i in tmp) {
        var itm = tmp[i].split(']');
        var itmNumber = itm[0];
        var itmText = itm[1];
        let span = new Span();
        // span.fontSize = 11;
        // span.fontWeight = "bold";
        span.color = new Color("red");
        // span.color = new Color("#b54c00");
        span.text = this.bookService.digit(itmNumber);
        formattedString.spans.push(span);

        span = new Span();
        span.text = itmText;
        formattedString.spans.push(span);
      }
    } else if (item.desc) {
      // NOTE: just One
      let span = new Span();
      span.text = item.desc;
      formattedString.spans.push(span);
    }
    container.formattedText = formattedString;
    /*
    (<Label>args.object).formattedText = formattedString;
    */
  }
  // NOTE: (textChange)="itemBookFormat($event)"
  itemBookFormat(args: any) {
    const container = <Label>args.object;
    var item = container.bindingContext;
    const formattedString = new FormattedString(), spans = [];

    let span = new Span();
    span.text = this.bookService.bookName(item.book);
    formattedString.spans.push(span);

    span = new Span();
    span.text = " ";
    formattedString.spans.push(span);

    span = new Span();
    span.text = this.bookService.digit(item.chapter);
    formattedString.spans.push(span);

    span = new Span();
    span.text = ":";
    span.color = new Color("#b2aeab");
    formattedString.spans.push(span);

    span = new Span();
    span.text = this.bookService.digit(item.verse);
    formattedString.spans.push(span);

    container.formattedText = formattedString;

  }
}