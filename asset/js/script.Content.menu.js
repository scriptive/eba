var container = $( "<ul>",{class:'menu'} ).appendTo($('div.container').empty());
$.each(eba.page, function(k, v) {
  if(v.name){
    $( "<li>" ).append(
      v.name
    ).bind(app.config.Handler, function(e) {
      eba.watch.go(k)();
    }).appendTo(container);
  }
});