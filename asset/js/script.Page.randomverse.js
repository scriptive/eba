randomverse:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-reader');
  var randomGet = false, randomDay = new Date().toLocaleDateString().toString().replace(/\//g,'');

  new Promise(function(res, rej) {
    if (local.name.randomverse && local.name.randomverse.isObject() && !local.name.randomverse.isEmpty()){
      if (local.name.randomverse.id != randomDay){
        local.name.randomverse.id = randomDay;
        randomGet=true;
      }
    } else {
      randomGet=true;
      local.name.randomverse.id = randomDay;
    }
    if (randomGet){
      new app.Content(local.name.query.language).xml().then(function(e){
        e.randomverse().then(function(e){
          local.name.randomverse.verse=e.information;
          local.update('randomverse');
          res();
        });
      });
    } else {
      res();
    }
  }).then(function(){
    new app.Content(local.name.query.language).xml().then(function(e){
      e.bookmark(ol,local.name.randomverse.verse).then(function(e){
        // reader Done
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
  });
},