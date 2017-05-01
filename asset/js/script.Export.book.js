book:function(language){
  var configuration = app.config, local = app.localStorage;

  return new app.Content(local.name.query.book).xml().then(function(e){
    e.exportBook(language).then(function(e){
      return e;
    },function(e){
      return e;
    });
  },function(e){
    return configuration.lang.isNotFound.replace('{is}',local.name.query.book);
  });
},