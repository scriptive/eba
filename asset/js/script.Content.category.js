var query = app.db.name.query;
if (query.language){
  app.xml.get(query.language).done(function(xml) { 
    var container = $( "<ol>",{class:'category'} ).appendTo($('div.container').empty());
    $(xml).find('index').children('section').each(function(){
      var obj = $(this), id=obj.attr('id'),name=obj.attr('name');
       $( "<li>" ).append(
         $( "<a>",{class:'icon-right-open'} ).append(name).bind(app.config.Handler, function(e) {
           query.category=id;
           app.watch.go('verse')(id);
         })
       ).appendTo(container);
    });
  });
} else {
  $('div.container').html($( "<div>",{class:'msg error'}).html('Language has not been selected!'));
}