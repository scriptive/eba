var ul = $('ul').addClass('reader');
$(app.scContent).html(ul);

var query=local.name.query, pID=query.page, lID = query.language;

// configuration.page[pID].title=local.name.query.q;

new app.Content(lID).xml().then(function(e){
  if (local.name.query.q){
    e.lookup(ul,local.name.query.q).then(function(e){
      // NOTE: reader Done
    },function(e){
      // NOTE: reader Fail
      ul.html(
        $('li').appendChild(
          $('div').html(local.name.query.q)
        )
      ).attr('class','msg error');
    });
  } else {
    ul.html(
      $('li').appendChild(
        $('div').html(configuration.lang.tryAWord)
      )
    ).attr('class','msg error');
  }
},function(e){
  // NOTE: XML fail
  ul.appendChild(
    $('li').appendChild(
      $('div').html(configuration.lang.isNotFound.replace('{is}',local.name.query.book))
    )
  ).attr('class','msg error');
}).then(function(){
  // NOTE: XML Done
  resolve();
});