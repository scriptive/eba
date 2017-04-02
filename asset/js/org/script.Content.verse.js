var query = app.localStorage.name.query;
var xmlDoc, tags=[], testaments=[];
app.xml.get(query.language).done(function(xml) {
  var container = $( "<ul>",{class:'content'} ).appendTo($('div.container').empty());
  xmlDoc = $(xml);
  $('.title').html(xmlDoc.find('index').children('section[id="0"]'.replace('0', query.category)).text());

  xmlDoc.find('book').find('category[id="0"]'.replace(0, query.category)).children('verse').each(function(){
    
    // var obj = $(this),
    // book=obj.attr('book'),chapter=obj.attr('chapter'),verse=obj.attr('verse'),tag=obj.attr('tag'),
    // bookName=$(xml).find('bookname').children('row[id=0]'.replace('0', book)).text(),
    // text=obj.text();

    var obj= $(this), 
    book=obj.attr('book'),chapter=obj.attr('chapter'),verse=obj.attr('verse'),tag=obj.attr('tag'),
    bookName=xmlDoc.find('bookname').children('row[id="0"]'.replace('0', book)).text(),
    verseText=obj.text(),
    testament = (book<=39?1:2);

    tags.push(tag);
    testaments.push(testament);

    // var bookmarks = app.localStorage.name.bookmark;
    // var hasBookmark = false;
    // if (bookmarks.hasOwnProperty(query.category)){
    //   if (bookmarks[query.category].hasOwnProperty(book)){
    //     if (bookmarks[query.category][book].hasOwnProperty(chapter)){
    //       hasBookmark = ($.inArray(verse, bookmarks[query.category][book][chapter]) >= 0);
    //     }
    //   }
    // }
    var hasBookmark = app.task.hasBookmark(query.category,book,chapter,verse);
    var activeBookmarkClass = (hasBookmark?app.setting.classname.active:app.setting.classname.inactive);
    var tagClass = xmlDoc.find('tag').children('row[id="0"]'.replace('0', tag)).text().toLowerCase();
    var testamentClass = xmlDoc.find('testament').children('row[id="0"]'.replace('0', testament)).text().replace(' ', '-').toLowerCase();
     $( "<li>",{class:tagClass}).addClass(activeBookmarkClass).addClass(testamentClass).append(
       $( "<h3>" ).append(
         $( "<i>",{class:'icon-bookmark'} ).bind(app.config.Handler, function(e) {
           app.task.bookmark($(this).parents('li'),query.category,book,chapter,verse);
         }),
         '0 1:2'.replace(0, bookName).replace(1, chapter).replace(2, verse)
       ),
       $( "<p>" ).append(
         app.task.numReplace(verseText)
       )
     ).appendTo(container);
  });
}).then(function(){
  tags = $.unique( tags); testaments= $.unique( testaments);
  var container = $( "<li>").appendTo($( "<ul>").appendTo($('li.filter')));
  // var container = $( "<ul>",{class:'content filter'} ).appendTo($( "<ul>").append($( "<li>")).appendTo($('li.filter')));
  var containerTags = $( "<ul>").appendTo(container);
  $.each(tags,function(k,v){
    var tagName = xmlDoc.find('tag').children('row[id="0"]'.replace('0', v)).text();
    var tagClass = tagName.toLowerCase();
    $( "<li>",{class:'icon-ok active'}).addClass(tagClass).html(
      tagName
    ).bind(app.config.Handler, function(e) {
      $('div.container ul li').each(function(k,v){
        if ($(this).hasClass(tagClass)){
          $(this).fadeToggle( "fast");
        } 
      }).promise().done($(this).toggleClass('active'));
    }).appendTo(containerTags);
  });
  // var containerTestaments = $( "<ul>").appendTo(container);
  // $.each(testaments,function(k,v){
  //   var testamentName = xmlDoc.find('testament').children('row[id="0"]'.replace('0', v)).text();
  //   var testamentClass = testamentName.replace(' ', '-').toLowerCase();
  //   $( "<li>",{class:'icon-ok active'}).addClass(testamentClass).html(
  //     testamentName
  //   ).bind(app.config.Handler, function(e) {
  //     $('div.container ul li').each(function(){
  //       if ($(this).hasClass(testamentClass)){
  //         $(this).fadeToggle( "fast");
  //       } 
  //     }).promise().done($(this).toggleClass('active'));
  //   }).appendTo(containerTestaments);
  // });
});