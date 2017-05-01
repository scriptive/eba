verse:function(category){
  var configuration = app.config, local = app.localStorage;

  return new app.Content(local.name.query.book).xml().then(function(e){
    e.exportVerse(category).then(function(e){
      return e;
    },function(e){
      return e;
    });
  },function(e){
    return configuration.lang.isNotFound.replace('{is}',local.name.query.book);
  });
}