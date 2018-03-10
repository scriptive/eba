file:{
},
category:{

},
digit:function(n) {
  // var digit = this.active(l).digit;
  var num = {
      3:{
        0: "၀",
        1: "၁",
        2: "၂",
        3: "၃",
        4: "၄",
        5: "၅",
        6: "၆",
        7: "၇",
        8: "၈",
        9: "၉"
      }
  };
  // var digit = this.num(l).digit;
  if (num.hasOwnProperty(local.name.query.language)){
    var digit = num[local.name.query.language];
    return n.toString().replace(/[0-9]/g, function(i) {
      return digit[i];
    });
  }
  return n;
},
addBookmark:function(container,category,book,chapter,verse){
  var bookmarks = local.name.bookmark;
  if (container.classList.contains(configuration.classname.active)){
   bookmarks[category][book][chapter].splice(bookmarks[category][book][chapter].indexOf(verse), 1);
   if (bookmarks[category][book][chapter].length <= 0) {
     delete bookmarks[category][book][chapter];
     if (Object.keys(bookmarks[category][book]).length === 0){
       delete bookmarks[category][book];
       if (Object.keys(bookmarks[category]).length === 0){
         delete bookmarks[category];
       }
     }
   }
   container.classList.remove(configuration.classname.active);
   container.classList.add(configuration.classname.inactive);
  } else {
   if (!bookmarks.hasOwnProperty(category))bookmarks[category]={};
   if (!bookmarks[category].hasOwnProperty(book)) bookmarks[category][book]={};
   if (!bookmarks[category][book].hasOwnProperty(chapter))bookmarks[category][book][chapter]=[];
   bookmarks[category][book][chapter].push(verse.toString());
   container.classList.add(configuration.classname.active);
   container.classList.remove(configuration.classname.inactive);
  }
  local.update('bookmark');
},
hasBookmark:function(category,book,chapter,verse){
  var bookmarks = local.name.bookmark;
  if (bookmarks.hasOwnProperty(category)){
    if (bookmarks[category].hasOwnProperty(book)){
      if (bookmarks[category][book].hasOwnProperty(chapter)){
        return bookmarks[category][book][chapter].indexOf(verse) > -1;
      }
    }
  }
},
isAvailable:function(i){
  // if (!$(local.name.book).isEmpty()) {
  //   if (i) return local.name.book.hasOwnProperty(i);
  //   return true;
  // }
  // return false;
  // if (!$(local.name.book).isEmpty() && local.name.book.hasOwnProperty(i) && local.name.book[i].hasOwnProperty('information')) {
  //   return true;
  // }
  if (!$(local.name.setting.available).isEmpty() && local.name.setting.available.hasOwnProperty(i)) {
    return true;
  }
},
json:function(url){
  // =require eba.Book.json.js
}