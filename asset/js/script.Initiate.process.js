var localBook = local.select('book').name.book;
return new Promise(function(resolve, reject) {
  app.fileStorage = fileStorage(configuration.fileStorage, {
    success: function() {
      // resolve();
      app.fileStorage.download({
        url:configuration.file.lang
      }).then(function(e){
        app.book.all = JSON.parse(e.data);
        if (!localBook.isObject())localBook={};
        if (!localBook.isEmpty())app.book.all=JSON.parse(JSON.stringify(localBook)).merge(app.book.all);
        if (configuration.requireUpdate || localBook.isEmpty()){
          for (var i in app.book.all) {
            if (app.book.all.hasOwnProperty(i)) {
              if (!localBook.hasOwnProperty(i))localBook[i]={};
              if (!localBook[i].hasOwnProperty('id'))localBook[i].id={};
              if (!app.book.all[i].hasOwnProperty('id'))app.book.all[i].id={};
            }
          }
          local.update('book');
        }
        resolve();
      },function(e){
        reject(e);
      });
    },
    fail: function(e) {
      reject(e);
    }
  }
 );
}).then(function(){
  return true;
},function(e){
  return e;
});