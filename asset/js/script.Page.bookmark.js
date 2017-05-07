bookmark:function(resolve, reject){
  // resolve();
  var configuration = app.config, local = app.localStorage, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-reader');
  new app.Content(local.name.query.language).xml().then(function(e){
    e.bookmark(ol,local.name.bookmark).then(function(e){
      // reader Done
      console.log(e);
    },function(e){
      // reader Fail
      ol.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=e;
    });
  },function(e){
    // XML fail
    ol.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.isNotFound.replace('{is}',local.name.query.language);
  }).then(function(){
    // XML Done
    resolve();
  });
},