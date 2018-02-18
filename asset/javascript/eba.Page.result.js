var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
var ul=app.createElement('ul');
var query=local.name.query, pID=query.page, lID = query.language;
$(container).removeChild().appendChild(ul).attr('class','reader');

// configuration.page[pID].title=local.name.query.q;

new app.Content(lID).xml().then(function(e){
  if (local.name.query.q){
    e.lookup(ul,local.name.query.q).then(function(e){
      // reader Done
    },function(e){
      // reader Fail
      $(ul).attr('class','msg error').appendChild('li').appendChild('div').setContent(e.replace('{for}',local.name.query.q));
    });
  } else {
    $(ul).attr('class','msg error').appendChild('li').appendChild('div').setContent(configuration.lang.tryAWord);
  }
},function(e){
  // XML fail
  $(ul).attr('class','msg error').appendChild('li').appendChild('div').setContent(configuration.lang.isNotFound.replace('{is}',local.name.query.book));
}).then(function(){
  // XML Done
  resolve();
});