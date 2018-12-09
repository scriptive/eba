import { Component, AfterViewInit,OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
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
  private masterItems: ObservableArray<SectionItem>;
  private copyItems: ObservableArray<SectionItem>;
  private bookId:number;
  private sectionId:number;
  private categoryId:number;

  private actionItemVisibility:string="visible";
  private actionTitle:string="Section";


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
      // var bookName = this.bookService.bookName(1);
      // console.log(bookName);


      this.masterItems = this.bookService.section;//new ObservableArray<SectionItem>(this.bookService.section);
      // this.masterItems =  new ObservableArray<SectionItem>(this.bookService.section);
      // this.masterItems =  this.bookService.section;
      this.copyItems = new ObservableArray<SectionItem>();
      this.chunkItems(2);
    },(error)=>{
      console.log(error)
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
  // NOTE: (itemTap)="itemTap($event)"
  itemTap(args: any) {
    var sectionView = args.view, section = <SectionItem>sectionView.bindingContext;
    this.bookService.Id('section',Number(section.id));
    this.nav.to(['category']);
    // console.log(typeof section.id,section.id)
  }
}