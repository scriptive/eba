import { Component, OnInit } from "@angular/core";
// import * as xmlModule from "tns-core-modules/xml";

// import * as XmlObjects from "nativescript-xmlobjects";
// nativescript-xmlobjects
// import { AppConfiguration, AppNavigation, AppUtilization, AppFileSystem, AppHttp } from "../shared";
// import { BookItem, BookService } from "./service";
// tns plugin add
@Component({
  selector: "test",
  moduleId: module.id,
  templateUrl: "./test.html",
  providers:[]
})

export class BookTestComponent implements OnInit {
  actionTitle:string="Testing";
  // xmlsss:string= '<?xml version="1.0"?> <eba> <info> <row id="name">Zolai</row> <row id="desc">Zolai</row> <row id="lang">??</row> <row id="version">Zolai Version</row> <row id="launched">Zolai Launched</row> </info> <author> <row id="name">Team</row> <row id="email">khensolomon@gmail.com</row> <row id="url"/> </author> <modification> <added> <job date="September 25, 2016">We started converting our data into XML!</job> </added> <updated> <job/> </updated> <removed> <job/> </removed> </modification> <testament> <row id="1" shortname="TL">Thuciam Lui</row> <row id="2" shortname="TT">Thuciam Thak</row> </testament> <book> <row id="1">Piancil</row> <row id="2">Paikhiatna</row> <row id="3">Siampi Laibu</row> <row id="66">Mangmuhna</row> </book> <section> <row id="1" name="Ai, Aisanna" group="1">Sorcerer</row> <row id="2" name="AIDS Natna" group="1">AIDS Disease</row> <row id="140" name="Zuauna, Zuaukhemna" group="1">Lie, Lying</row> </section> <category id="1"> <row book="1" chapter="30" verse="14-16" tag="">[14] Mangbuh</row> <row book="2" chapter="7" verse="11" tag="">[11] Tua ciangin </row> <row book="58" chapter="5" verse="14" tag="">[14] Ahi zongin anta</row> <row book="66" chapter="2" verse="17" tag="">[17] Tua ahih </row> <row book="66" chapter="22" verse="2" tag="">[2] khuapi sung lampi</row> </category> <category id="4"> <row book="7" chapter="20" verse="26" tag="">[26] Tua ciangin Israel mite khemp</row> <row book="9" chapter="7" verse="6" tag="">[6] Tua ahih ciangin amaute </row> <row book="60" chapter="4" verse="3-4" tag="">[3] hong kosia uh hi.</row> <row book="60" chapter="4" verse="7" tag="">[7] Na khempeuh a bei nading </row> </category> <category id="140"> <row book="19" chapter="37" verse="25" tag="">[25] Thuman mi a </row> <row book="19" chapter="37" verse="39" tag="">[39] TOPA in thuman</row> <row book="20" chapter="19" verse="5" tag="">[5] Thuman gen lo te.</row> <row book="20" chapter="19" verse="9" tag="">[9] Thuman lo teci .</row> <row book="20" chapter="19" verse="22" tag="">[22] Duhhopna pen mindaina</row> <row book="20" chapter="21" verse="6" tag="">[6] Zuaugenna tawh.</row> </category> </eba>';
  // private url:string = 'https://raw.githubusercontent.com/scriptive/eba/master/lang/1.xml';
  private headers:any = {
    // "Content-Type": "application/xml",
    // 'X-Requested-With' :'XMLHttpRequest'
    responseType: 'text'
  };
  constructor(
    // private http: AppHttp
    // private xmlParse: parseString
    // private router: Router,
    // private bookService: BookService,
    // private nav:AppNavigationProvider,
    // private utl:AppUtilizationProvider
  ) {
    // NOTE: ?
  }
  ngOnInit(): void {
    // let abc = this.xmlToJson(this.xmlsss);
    // console.log(JSON.stringify(abc));

  }
  /*
  private xmlToJson(xml: string): any {
      let doc = XmlObjects.parse(xml);
      var rootElement = doc.root;
      var result:any = {};
      var categoryElements = rootElement.elements('category');
      result.category={};
      for (var i = 0; i < categoryElements.length; i++) {
          var ae = categoryElements[i];
          var Id = ae.attribute('id').value;
          result.category[Id]={};
          var row = ae.elements('row');
          for (var r = 0; r < row.length; r++) {
            var cat = row[r];
            result.category[Id].book= cat.attribute('book').value;
            result.category[Id].chapter = cat.attribute('chapter').value;
            result.category[Id].verse = cat.attribute('verse').value;
            result.category[Id].tag = cat.attribute('tag').value;
            result.category[Id].text = cat.value;
          }
      }
      result.section={};
      var sectionElements = rootElement.elements('section')[0].elements('row');
      for (var i = 0; i < sectionElements.length; i++) {
        var ae = sectionElements[i];
        var Id = ae.attribute('id').value;
        result.section[Id]={};
        result.section[Id].name = ae.attribute('name').value;
        result.section[Id].group = ae.attribute('group').value;
        result.section[Id].text=ae.value;
      }
      result.book={};
      var bookElements = rootElement.elements('book')[0].elements('row');
      for (var i = 0; i < bookElements.length; i++) {
        var ae = bookElements[i];
        var Id = ae.attribute('id').value;
        result.book[Id]=ae.value;
      }
      result.testament={};
      var testamentElements = rootElement.elements('testament')[0].elements('row');
      for (var i = 0; i < testamentElements.length; i++) {
        var ae = testamentElements[i];
        var Id = ae.attribute('id').value;
        result.testament[Id]={};
        result.testament[Id].shortname=ae.attribute('shortname').value;
        result.testament[Id].text=ae.value;
      }
      result.info={};
      var infoElements = rootElement.elements('info')[0].elements('row');
      for (var i = 0; i < infoElements.length; i++) {
        var ae = infoElements[i];
        var Id = ae.attribute('id').value;
        result.info[Id]=ae.value;
      }
      result.author={};
      var authorElements = rootElement.elements('author')[0].elements('row');
      for (var i = 0; i < authorElements.length; i++) {
        var ae = authorElements[i];
        var Id = ae.attribute('id').value;
        result.author[Id]=ae.value;
      }
      return result;
  }
  */
}