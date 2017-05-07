// NOTE: divided into platform,device,view

page: {
  // =require script.Page.home.js
  // =require script.Page.category.js
  // require script.Page.book.js
  // =require script.Page.reader.js
  // =require script.Page.randomverse.js
  // =require script.Page.lookup.js
  // =require script.Page.lookupresult.js
  // =require script.Page.bookmark.js
  // =require script.Page.setting.js
  // =require script.Page.about.js
  // =require script.Page.contact.js
},
export:{
  // =require script.Export.category.js
  // =require script.Export.testament.js
  // =require script.Export.book.js
  // =require script.Export.verse.js
},
xml:function(bId){
  // =require script.XML.js
},
Content:function(bId){
  // =require script.Content.js
},
book:{
  file:{
  },
  addBookmark:function(container,category,book,chapter,verse){
    var local = app.localStorage, bookmarks = local.name.bookmark;
    if (container.hasClass(app.config.classname.active)){
     bookmarks[category][book][chapter].splice(bookmarks[category][book][chapter].indexOf(verse), 1);
     if (bookmarks[category][book][chapter].length <= 0) {
       delete bookmarks[category][book][chapter];
       if (bookmarks[category][book].isEmpty()){
         delete bookmarks[category][book];
         if (bookmarks[category].isEmpty()){
           delete bookmarks[category];
         }
       }
     }
     container.removeClass(app.config.classname.active);
    } else {
     if (!bookmarks.hasOwnProperty(category))bookmarks[category]={};
     if (!bookmarks[category].hasOwnProperty(book)) bookmarks[category][book]={};
     if (!bookmarks[category][book].hasOwnProperty(chapter))bookmarks[category][book][chapter]=[];
     bookmarks[category][book][chapter].push(verse.toString());
     container.addClass(app.config.classname.active);
    }
    local.update('bookmark');
  },
  hasBookmark:function(category,book,chapter,verse){
    var bookmarks = app.localStorage.name.bookmark;
    if (bookmarks.hasOwnProperty(category)){
      if (bookmarks[category].hasOwnProperty(book)){
        if (bookmarks[category][book].hasOwnProperty(chapter)){
          return bookmarks[category][book][chapter].has(verse);
          // return ($.inArray(verse, bookmarks[category][book][chapter]) >= 0);
        }
      }
    }
  },
  isAvailable:function(i){
    var local = app.localStorage;
    if (local.name.hasOwnProperty('language') && local.name.language.isObject() && !local.name.language.isEmpty()){
      if (i) return local.name.language.hasOwnProperty(i);
      return true;
    }
    return false;
  },
  listName:function(){
    var ol=app.elementCreate('ol');
    app.Toggle.main(true).appendChild(ol).setAttribute('class','main-home common-box-main');
    app.localStorage.name.language.each(function(lID,v) {
      ol.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('a')).addAttr('href',{language:lID}.paramater(['#category'])).innerHTML=v.name;
    });
  },
  menuName:function(){
    var configuration = app.config, local = app.localStorage;
    var nav = app.nav.container(), dl=nav.firstElementChild, dt=dl.firstElementChild, dd=dt.nextElementSibling;
    var tmpPage = JSON.parse(JSON.stringify(local.name.query)).page;
    // console.log(tmpPage,configuration.pageHome);
    var me34={
      dataContentOpen:function() {
        local.name.query.page=configuration.pageHome;
        app.fileStorage.download({
          url:configuration.file.lang
        }).then(function(e){
          nav.style.display='block';
          local.update('query');
          dd.emptyElement();
          app.book.language = JSON.parse(e.data);
          var ul = dd.appendChild(app.elementCreate('ul'));
          app.book.language.each(function(bId,v){
            var li = app.elementCreate('li'), name = app.elementCreate('div'), action = app.elementCreate('div');
            name.innerHTML=v.name;
            action.eventClick(function(e){
              if (app.book.isAvailable(bId)){
                new app.xml(bId).delete().then(function(){
                  // NOTE: delete success
                  action.innerHTML=configuration.lang.addLanguage;
                },function(){
                  // NOTE: delete error
                });
              } else {
                new app.xml(bId).download(function(){
                  action.emptyElement().appendChild(app.elementCreate('span').addAttr('class','icon-loading animate-spin'));
                }).then(function(e){
                  return new app.xml(bId).save(e).then(function(){
                    // NOTE: save success
                    action.innerHTML=configuration.lang.removeLanguage;
                  },function(e){
                    // NOTE: save error
                    action.innerHTML=configuration.lang.addLanguage;
                  });
                },function(){
                  // NOTE: download error
                  action.innerHTML=configuration.lang.isError;
                });
              }
            }).innerHTML=configuration.lang.addLanguage;
            if (app.book.isAvailable(bId)){
              li.setAttribute('class',configuration.classname.active);
              action.innerHTML=configuration.lang.removeLanguage;
            }
            li.appendChild(name); li.appendChild(action); ul.appendChild(li);
          });
        },function(e){
          // NOTE: language download error
          console.log(e);
        });
      },
      dataContentTarget:function(event) {
        if (!dl.contains(event.target) && app.book.isAvailable())me34.dataContentClose();
        event.stopPropagation();
      },
      dataContentClose:function() {
        dd.emptyElement();
        if (!document.body.classList.contains('nav'))document.body.removeClick(me34.dataContentTarget);
        nav.styleDisplay('none');
        if (configuration.page[local.name.query.page].hasOwnProperty('name')){
          window.location.hash = {i:new Date().getTime()}.paramater(['#'+tmpPage]);
          // window.location.hash = {i:new Date().getTime()}.paramater(['#'+local.name.query.page]);
        }
        // if (local.name.query.page=='home')app.book.listName();
      },
      dataContentEvent : function(event) {
        nav.toggleDisplay(function(){
          me34.dataContentOpen();
          if (!document.body.classList.contains('nav'))document.body.eventClick(me34.dataContentTarget);
        },function(){
          me34.dataContentClose();
        });
        // if (event)event.stopPropagation();
      }
    };
    return me34;
  }
},
languageMenu:function(callback){

}
