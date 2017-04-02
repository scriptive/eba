catalog:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-catalog');
  new app.Content(local.name.query.book).xml().then(function(e){
    e.section(ol).then(function(e){
      // reader Done
      // console.log(e);
    },function(e){
      // reader Fail
      console.log(e);
    });
  },function(e){
    // XML fail
    ol.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.isNotFound.replace('{is}',local.name.query.book);
  }).then(function(){
    // XML Done
    resolve();
  });
},