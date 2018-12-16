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

import { BookItem,  BookService, SectionModel, BookDatabase } from "./service";

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
  }

  private dataInit() {
    this.bookService.requestContent().then((service:any)=>{
      // console.log('section',_msg);
      service.section().then((rows:ObservableArray<SectionModel>)=>{
        this.masterItems = rows;
        this.copyItems = new ObservableArray<SectionModel>();
        this.copyItems.push(this.masterItems);
        this.ActivityIndicatorMsg = null;
        // this.masterItems = new ObservableArray<SectionModel>(service.sId);
      })
    }).catch(error => {
      if (error instanceof Object) {
        if (error.hasOwnProperty('statusText')) {
          this.ActivityIndicatorMsg = error.statusText;
        } else {
          this.ActivityIndicatorMsg = JSON.stringify(error);
        }
      } else {
        this.ActivityIndicatorMsg = "Error";
      }
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
    var itemView = args.view, section = <SectionModel>itemView.bindingContext;
    // itemView.backgroundColor = new Color(this.bookService.highlightColor);
    this.bookService.sId = Number(section.id);
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