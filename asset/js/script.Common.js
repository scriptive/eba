// NOTE: divided into platform,device,view

page: {
  // =require script.Page.home.js
  // =require script.Page.book.js
  // =require script.Page.catalog.js
  // =require script.Page.reader.js
  // =require script.Page.lookup.js
  // =require script.Page.bookmark.js
  // =require script.Page.setting.js
  // =require script.Page.about.js
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
  }
}
