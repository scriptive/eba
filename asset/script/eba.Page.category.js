var ul = $('ul').addClass('category');
$(app.scContent).html(ul);

var query=local.name.query, pID=query.page, lID = query.language;
configuration.page[pID].title=local.name.book[lID].name;

new app.Content(lID).xml().then(function(e){
  e.section(ul).then(function(e){
    // NOTE: reader Done
  },function(e){
    // NOTE: reader Fail
  });
},function(e){
  // NOTE: XML fail
  ul.appendChild(
    $('li').appendChild(
      $('div').html(configuration.lang.isNotFound.replace('{is}',local.name.query.language))
    )
  ).attr('class','msg error');
}).then(function(){
  // NOTE: XML Done
  resolve();
  // TODO: ontouchstart/mousemove
  var categoryIndex = $(app.scContent).appendChild('ul').attr('class','category-index').appendChild('li').click(function(evt){
    var e = evt.target, id =e.getAttribute('class'), position = doc.getElementById(id);
    if (position) {
      app.scContent.scrollTop = position.offsetTop;
      // container.firstElementChild.scrollTop = position.offsetTop;
    }
  });
  ul.selectElement('li.alpha',true).each(function(v,i){
    categoryIndex.appendChild(
      $('p').attr('class',v.getAttribute('id')).html(v.innerHTML)
    )
  });
});