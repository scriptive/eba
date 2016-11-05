var query = eba.db.name.query;
var bookmark = eba.db.name.bookmark;
if (query.language && !$.isEmptyObject(bookmark)){
  var xmlDoc = $(eba.xml.data[query.language]);
  var container = $( "<ul>",{class:'content bookmark'} ).appendTo($('div.container').empty());
  $.each(bookmark,function(category,vCategory){
    $( "<li>" ).append(
      $( "<h2>").append(xmlDoc.find('index').children('section[id="0"]'.replace('0', category)).text())
    ).appendTo(container);
    var xmlCategory = xmlDoc.find('book').find('category[id="0"]'.replace(0, category));
    $.each(vCategory,function(book,vBook){
      $.each(vBook,function(chapter,vChapter){
        $.each(vChapter,function(vVerse,verse){
          var xmlVerse = xmlCategory.find('verse[book="711"][chapter="712"][verse="713"]'.replace(711, book).replace(712, chapter).replace(713, verse));
          var bookName=xmlDoc.find('bookname').children('row[id="0"]'.replace('0', book)).text();
          $( "<li>",{class:eba.setting.classname.active}).append(
            $( "<h3>" ).append(
              $( "<i>",{class:'icon-bookmark'} ).bind(clickHandler, function(e) {
                eba.task.bookmark($(this).parents('li'),category,book,chapter,verse);
              }),
              '0 1:2'.replace(0, bookName).replace(1, chapter).replace(2, verse)
            ),
            $( "<p>" ).append(
              xmlVerse.text()
            )
          ).appendTo(container);
        });
      });
    });
  });
} else if ($.isEmptyObject(bookmark)) {
  $('div.container').html($( "<div>",{class:'msg error'}).html('No bookmark!'));
} else {
  $('div.container').html($( "<div>",{class:'msg error'}).html('Language has not been selected!'));
}
