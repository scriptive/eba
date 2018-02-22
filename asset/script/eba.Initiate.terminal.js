return route().then(function() {
  local.update('query');
  return new Promise(function(resolve, reject) {
    app.page[local.name.query.page](resolve, reject);
  }).then(function(){
    doc.body.setAttribute('id',local.name.query.page);
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