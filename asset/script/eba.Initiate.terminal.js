return route().then(function() {
  local.update('query');
  var pageCurrent = local.name.query.page;
  return new Promise(function(resolve, reject) {
    app.page[pageCurrent](resolve, reject);
  }).then(function(){
    doc.body.setAttribute('id',pageCurrent);
    app.header.content();
    // return app.Toggle.header().then(function(e){
    //   try {
    //     app.dataContent();
    //   } catch (e) {
    //     return e;
    //   }
    //   return true;
    // });

  },function(e){
    return e;
  });
}, function(e) {
  return e;
});