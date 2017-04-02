lookup:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-reader');
  new app.Content(local.name.query.book).xml().then(function(e){
    if (local.name.query.q){
      e.lookup(ol,local.name.query.q).then(function(e){
        // reader Done
      },function(e){
        // reader Fail
        ol.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=e.replace('{for}',local.name.query.q);
      });
    } else {
      ol.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.tryAWord;
    }
  },function(e){
    // XML fail
    ol.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.isNotFound.replace('{is}',local.name.query.book);
  }).then(function(){
    // XML Done
    resolve();
    console.log('done');
  });
},