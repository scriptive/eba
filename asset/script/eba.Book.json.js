return new Promise(function(resolve, reject) {
  url = (url)?url:configuration.file.book;
  file.download({
    url:url
  }).then(function(e){
    // app.book.all = JSON.parse(e.data);
    // JSON.parse(JSON.stringify(localBook))
    app.book.all=$(local.name.book).merge(JSON.parse(e.data));
    local.update('book');
    resolve();
  },function(e){
    // TODO: show message that connect has down!
    reject(e);
  });
});