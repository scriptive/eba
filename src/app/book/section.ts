import { Component, AfterViewInit,OnInit, ViewChild} from "@angular/core";
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

import { RadListViewComponent } from "nativescript-ui-listview/angular";

import {
  AppConfiguration,
  AppSideDrawer,
  AppActionBar,
  AppNavigation,
  AppUtilization,
  AppFileSystem,
  AppHttp
} from "../shared";

import { BookService, SectionModel, BookDatabase } from "./service";

@Component({
  selector:'eba',
  moduleId: module.id,
  templateUrl: "./section.html",
  providers:[]
})

export class SectionComponent implements OnInit {
  private layout: ListViewLinearLayout;

  private masterItems: any;

  private copyItems: ObservableArray<SectionModel>;

  private actionItemVisibility:string="visible";
  private actionTitle:string="Section";

  private ActivityIndicatorMsg:string="...";
  private ActivityIndicatorBusy:boolean=true;

  private itemGroupbyLanguage: (item: SectionModel) => any;

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
  @ViewChild("listView") listViewComponent: RadListViewComponent;

  ngOnInit() {
    this.layout = new ListViewLinearLayout();
    this.layout.scrollDirection = "Vertical";

    this.itemGroupbyLanguage = (item: SectionModel) => {
      // if (item.group) {
      //   return item.group;
      // } else{
      //   return item.name.charAt(0).toUpperCase();
      // }
      item.groupname = item.name.charAt(0).toUpperCase();
      return item.groupname;
    }
    this.listViewComponent.listView.groupingFunction = this.itemGroupFunction;
    this.dataInit();
    this.copyItems = new ObservableArray<SectionModel>();
  }

  private dataInit() {
    this.bookService.requestBible().then((raw:any)=>{
      raw.section().then((rows:SectionModel)=>{
        this.bookService.srcSection=rows;
        this.masterItems = rows;
        this.copyItems = new ObservableArray<SectionModel>();
        this.copyItems.push(this.masterItems);
        this.ActivityIndicatorMsg = null;
      })
    },(error) => {
      this.ActivityIndicatorMsg = error;
    }).then(() => {
      this.ActivityIndicatorBusy=false;
    });
  }
  get dataItems():ObservableArray<SectionModel> {
    return this.copyItems;
  }
  public digit(num:any) {
    return this.bookService.digit(num);
  }
  // NOTE: (itemTap)="itemTap($event)"
  itemTap(args: any) {
    var itemView = args.view, item = <SectionModel>itemView.bindingContext;
    var itemClassDefault = itemView.class;
    itemView.class = itemClassDefault + ' tap';
    setTimeout(()=>{
      this.bookService.sId = Number(item.id);
      this.nav.to(['category']);
      itemView.class = itemClassDefault;
    },100)
  }
  // [groupingFunction]="itemGroupFunction"
  get itemGroupFunction(): (item: any) => any {
    return this.itemGroupbyLanguage;
  }
  set itemGroupFunction(value: (item: any) => any) {
    this.itemGroupbyLanguage = value;
  }
  groupName(name:string) {
    var tmp = name.charAt(0);
    return name;
  }
}