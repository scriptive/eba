// resolve();

var container = doc.getElementById("lCm").getElementsByClassName("scSB")[0];
var ul=app.createElement('ul');
$(container).removeChild().appendChild(ul).attr('class','reader');




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
      // reader Done
    },function(e){
      // reader Fail
      // $(ul).addClass('msg').appendChild('li').appendChild('div').setContent(e);
      // console.log(e);
    });
  },function(e){
    // XML fail
    // console.log(e);
    // $(ul).addClass('msg').appendChild('li').appendChild('div').setContent(configuration.lang.isNotFound.replace('{is}',local.name.query.language))
  }).then(function(){
    // XML Done
    resolve();
  });
});