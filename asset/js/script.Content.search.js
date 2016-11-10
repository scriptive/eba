var query = app.localStorage.name.query;
// query.q = 'numei';
var searchVerse = function(){
  var suggestion = app.localStorage.name.suggestion;
  var searchResult = 0;
  var searchResultCategory = 0;
  if (query.language && query.q){
    app.xml.get(query.language).done(function(xml) {
      var xmlDoc = $(app.xml.data[query.language]);
      var container = $( "<ul>",{class:'content search'} ).appendTo($('div.container').empty());
      // "verse:contains('0')".replace(0, 'Bangin')
      xmlDoc.find('book').find('category').children('verse').each(function(){
        var obj= $(this), 
        book=obj.attr('book'),chapter=obj.attr('chapter'),verse=obj.attr('verse'),tag=obj.attr('tag'),
        bookName=xmlDoc.find('bookname').children('row[id="0"]'.replace('0', book)).text(),
        verseText=obj.text(), verseMatch=verseText.search(new RegExp(query.q, "i")),
        category = obj.parent().attr('id');
    
        if (verseMatch >= 0) {
          searchResult ++;
          if (searchResultCategory != category){
            $( "<li>" ).append(
              $( "<h2>").append(xmlDoc.find('index').children('section[id="0"]'.replace('0', category)).text())
            ).appendTo(container).promise().done(function(){
              searchResultCategory = category;
            });
          }
            var hasBookmark = app.task.hasBookmark(category,book,chapter,verse);
            var activeBookmarkClass = (hasBookmark?app.setting.classname.active:app.setting.classname.inactive);
            $( "<li>" ).addClass(activeBookmarkClass).append(
             $( "<h3>" ).append(
               $( "<i>",{class:'icon-bookmark'} ).bind(app.config.Handler, function(e) {
                 app.task.bookmark($(this).parents('li'),category,book,chapter,verse);
               }),
               '0 1:2'.replace(0, bookName).replace(1, chapter).replace(2, verse)
             ),
             $( "<p>" ).html(
               app.task.textReplace(verseText,query.q)
             )
            ).appendTo(container);
        }
      }).promise().done(function(){
        if (searchResult) {
          suggestion[query.q]=searchResult;
          app.localStorage.update('suggestion');
        } else {
          $('div.container').html(
            $( "<div>",{class:'msg error'}).html('"0" did not match any verses!'.replace(0,query.q))
          );
        }
      });
    });
  } else if(!query.q) {
    $('div.container').html($( "<div>",{class:'msg error'}).html('Try a word or two!'));
  } else {
    $('div.container').html($( "<div>",{class:'msg error'}).html('Language has not been selected!'));
  }
  searchSuggestion();
  var date = new Date();
  console.log(date);
}
var searchSuggestion = function(){
  var suggestion = app.localStorage.name.suggestion;
  $.each(suggestion,function(k,v){
    console.log(k,v);
  });
}
searchVerse();
$('form').submit(function( event ) {
  query.q=$(this).children('input').val();
  app.localStorage.update('query');
  searchVerse();
});