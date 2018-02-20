// resolve();

var container = doc.getElementById("lCm").getElementsByClassName("scSB")[0];
var ul=app.createElement('ul');
$(container).removeChild().appendChild(ul).attr('class','reader');

// var configuration = app.config, local = app.localStorage, ol=app.elementCreate('ol');
// app.Toggle.main(true).appendChild(ol).setAttribute('class','main-reader');
new app.Content(local.name.query.language).xml().then(function(e){
  e.bookmark(ul,local.name.bookmark).then(function(e){
    // reader Done
    // console.log(e);
  },function(e){
    // reader Fail
    $(ul).attr('class','msg error').appendChild('li').appendChild('div').setContent(e);
  });
},function(e){
  // XML fail
  $(ul).attr('class','msg error').appendChild('li').appendChild('div').setContent(configuration.lang.isNotFound.replace('{is}',local.name.query.language));
}).then(function(){
  // XML Done
  resolve();
});