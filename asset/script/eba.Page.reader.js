var ul = $('ul').addClass('reader');
$(app.scContent).html(ul);

var query=local.name.query, pID=query.page, lID = query.language;

new app.Content(lID).xml().then(function(e){
  e.reader(ul,query.category).then(function(e){
    // NOTE: reader Done
    // ul.target
  },function(e){
    // NOTE: reader Fail
    // console.log(e);
    // ul.attr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=e;
  });
},function(e){
  // NOTE: XML fail
  // console.log(e);
  // ul.attr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.isNotFound.replace('{is}',lID);
}).then(function(){
  // NOTE: XML Done
  configuration.page[pID].title=app.book.category.name;
}).then(function(){
  $(app.scContent).prependChild(
    $('ul').appendChild(
      $('li').appendChild(
        $('p').appendChild(
          $('span').attr('data-id','OT').html('OT'),
          $('span').attr('data-id','NT').html('NT')
        ).click(function(evt){
          var e = evt.target;
          var ulTestament = doc.querySelectorAll('ul.reader li ol li.1'.replace('1',e.dataset.id));
          $(e).toggleClass('active');
          $(ulTestament).each(function(v,i){
            if (v.style.display === 'none') {
              v.style.display='';
            } else {
              v.style.display='none';
            }
          });
        }).attr('class','toggle')
      )
    ).addClass('msg notify')
  );
  resolve();
});

