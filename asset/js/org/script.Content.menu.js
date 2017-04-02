var container = $( "<ul>",{class:'menu'} ).appendTo($('div.container').empty());
$.each(app.page, function(k, v) {
  if(v.name){
    $( "<li>" ).append(
      v.name
    ).bind(app.config.Handler, function(e) {
      app.watch.go(k)();
    }).appendTo(container);
  }
});