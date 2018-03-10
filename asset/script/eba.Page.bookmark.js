var ul = $('ul').addClass('reader');
$(app.scContent).html(ul);

new app.Content(local.name.query.language).xml().then(function(e){
  e.bookmark(ul,local.name.bookmark).then(function(e){
    // NOTE: reader Done
  },function(e){
    // NOTE: reader Fail
    // ul.attr('class','msg error').appendChild('li').appendChild('div').html(e);
    ul.html(
      $('li').appendChild(
        $('div').html(e)
      )
    ).attr('class','msg error');
  });
},function(e){
  // NOTE: XML fail
  // ul.attr('class','msg error').appendChild('li').appendChild('div').html(configuration.lang.isNotFound.replace('{is}',local.name.query.language));
  ul.html(
    $('li').appendChild(
      $('div').html(configuration.lang.isNotFound.replace('{is}',local.name.query.language))
    )
  ).attr('class','msg error');
}).then(function(){
  // NOTE: XML Done
  resolve();
});