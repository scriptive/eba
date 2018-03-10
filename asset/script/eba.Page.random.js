var ul = $('ul').addClass('reader');
$(app.scContent).html(ul);


var randomGet = false, randomDay = new Date().toLocaleDateString().toString().replace(/\//g,'');

new Promise(function(res, rej) {
  if (local.name.randomverse && $(local.name.randomverse).isObject() && !$(local.name.randomverse).isEmpty()){
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
    e.bookmark(ul,local.name.randomverse.verse).then(function(e){
      // NOTE: reader Done
    },function(e){
      // NOTE: reader Fail
      ul.html(
        $('li').appendChild(
          $('div').html(e)
        )
      ).attr('class','msg error');
    });
  },function(e){
    // NOTE: XML fail
    ul.html(
      $('li').appendChild(
        $('div').html(configuration.lang.Error)
      )
    ).attr('class','msg error');
  }).then(function(){
    // NOTE: XML Done
    resolve();
  });
});