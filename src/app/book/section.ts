import { Component, AfterViewInit,OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Color } from "tns-core-modules/color";
import {Page} from "ui/page";
import {
  ListViewEventData,
  RadListView,
  ListViewScrollEventData,
  PullToRefreshStyle,
  ListViewLinearLayout,
  LoadOnDemandListViewEventData
} from "nativescript-ui-listview";

import {
  AppConfiguration,
  AppSideDrawer,
  AppActionBar,
  AppNavigation,
  AppUtilization,
  AppFileSystem,
  AppHttp
} from "../shared";

import { BookItem, SectionItem, BookService } from "./service";

@Component({
  selector:'eba',
  moduleId: module.id,
  templateUrl: "./section.html",
  providers:[]
})

export class SectionComponent implements OnInit {
  private layout: ListViewLinearLayout;

  // private masterItems: SectionItem[];
  private masterItems: any;
  // private masterItems: ObservableArray<SectionItem>;
  private copyItems: ObservableArray<SectionItem>;
  private bookId:number;
  private sectionId:number;
  private categoryId:number;

  private actionItemVisibility:string="visible";
  private actionTitle:string="Section";

  private ActivityIndicatorMsg:string="...";
  private ActivityIndicatorBusy:boolean=true;


  // private idBook:number;
  // private idSection:number;
  // private idCategory:number;

  constructor(
    private actionBar: AppActionBar,
    private sideDrawer: AppSideDrawer,
    private bookService: BookService,
    private page: Page,
    private activatedRoute: ActivatedRoute,
    private nav: AppNavigation
  ) {
    // NOTE: ?
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.layout = new ListViewLinearLayout();
    this.layout.scrollDirection = "Vertical";
    this.dataInit();
  }
  private dataInit() {
    this.bookId=this.bookService.Id('book');
    this.bookService.requestContent(this.bookId).then(()=>{
      this.bookService.sectionObserve();
      this.masterItems = this.bookService.section;
      // this.masterItems = new ObservableArray<SectionItem>(this.bookService.section);
      this.copyItems = new ObservableArray<SectionItem>();
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
  get dataItems():ObservableArray<SectionItem> {
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
  // NOTE: (itemTap)="itemTap($event)"
  itemTap(args: any) {
    var itemView = args.view, section = <SectionItem>itemView.bindingContext;
    // itemView.backgroundColor = new Color(this.bookService.highlightColor);
    this.bookService.Id('section',Number(section.id));
    this.nav.to(['category']);
    // itemView.backgroundColor ='red';
    // itemView.color ='red';
    // itemView.backgroundColor = new Color("red");
    // itemView.animate({ backgroundColor: new Color("green"), duration:100 });
    itemView.opacity = 0.3;
    itemView.animate({opacity: 1, duration: 200});

    // itemView.animate({
    //     translate: { x: 100, y: 100 },
    //     duration: 100
    // }).then(function() {
    //     return itemView.animate({
    //         opacity: 0,
    //         duration: 100
    //     });
    // });
  }
}