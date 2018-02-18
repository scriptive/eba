var query=local.name.query, pID=query.page, lID = query.language;

var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
var ulMain = $(container).removeChild().appendChild('ul').attr('class','category');
configuration.page[pID].title=local.name.book[lID].name;
// console.log(app.book.all[lID].name);
// console.log(app.book);
// console.log(local.name.book);
new app.Content(lID).xml().then(function(e){
  e.section(ulMain.element).then(function(e){
    // reader Done
    // console.log('reader Done',e);
  },function(e){
    // reader Fail
    // console.log('reader Fail',e);
  });
},function(e){
  // XML fail
  // console.log('XML fail',e);
  ulMain.attr('class','msg error').appendChild('li').appendChild('div').setContent(configuration.lang.isNotFound.replace('{is}',local.name.query.language));
}).then(function(){
  // XML Done
  resolve();
  // var ulIndex=app.createElement('ul');
  var liIndex=app.createElement('li');

  $(container).appendChild('ul').attr('class','category-index').appendChild(liIndex).click(function(evt){
      var e = evt.target, id =e.getAttribute('class'), position = doc.getElementById(id);
      if (position) {
        container.scrollTop = position.offsetTop;
        // container.firstElementChild.scrollTop = position.offsetTop;
      }
  });
  // ulMain.selectChild('li.alpha',true).each(function(i,v){
  //   $(ulIndex).appendChild('li').attr('class',v.getAttribute('id')).setContent(v.innerHTML);
  // });
  ulMain.selectChild('li.alpha',true).each(function(i,v){
    $(liIndex).appendChild('p').attr('class',v.getAttribute('id')).setContent(v.innerHTML);
  });
});
/*
var ulIndex=app.elementCreate('ol'), alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
container.appendChild(ulIndex).setAttribute('class','main-index');
// alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
alphabet.each(function(i,v){
  // console.log(i,v);
  ulIndex.appendChild(app.elementCreate('li')).innerHTML=v;
});
*/