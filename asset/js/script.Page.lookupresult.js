lookupresult:function(resolve, reject){
  
  var configuration = app.config, local = app.localStorage, olMain=app.elementCreate('ol'), main=app.Toggle.main(true), query=local.name.query, pID=query.page, lID = query.language;
  
  app.config.page[pID].title=local.name.query.q;
  
  // var configuration = app.config, local = app.localStorage, olMain=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(olMain).setAttribute('class','main-reader');
  new app.Content(lID).xml().then(function(e){
    if (local.name.query.q){
      e.lookup(olMain,local.name.query.q).then(function(e){
        // reader Done
      },function(e){
        // reader Fail
        olMain.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=e.replace('{for}',local.name.query.q);
      });
    } else {
      olMain.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.tryAWord;
    }
  },function(e){
    // XML fail
    olMain.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.isNotFound.replace('{is}',local.name.query.book);
  }).then(function(){
    // XML Done
    resolve();
  });
},