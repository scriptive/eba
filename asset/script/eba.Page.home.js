// console.log(app.scMain);
// console.log(app.scMenu);
// console.log(app.scContent);
// console.log(app.scPanelCurrent);

$(app.scContent).removeChild();

var ul = doc.createElement('ul');
ul.setAttribute('class','home');
if(local.name.query.hasOwnProperty('pageBlock'))$(app.scContent).appendChild('ul').addClass('msg notify').appendChild('li').appendChild('p').setContent(configuration.lang.noLanguage);
app.scContent.appendChild(ul);

$(local.name.book).each(function(bId,v) {
  var li = doc.createElement('li'),wrap = doc.createElement('div'), name = doc.createElement('div'), link = doc.createElement('a'), action = doc.createElement('div');
  li.setAttribute('id',bId);
  wrap.appendChild(name);
  wrap.appendChild(action);

  name.appendChild(link);
  var random = new Date().getTime();
  $(link).attr('href','#category?language=bId&i=random'.replace(/bId/,bId).replace(/random/,random)).setContent(v.name);
  $(action).click(function(evt){
    var e = evt.target;
    // console.log(e.parentNode.parentNode);
    if (app.book.isAvailable(bId)){
      action.innerHTML=configuration.lang.removingLang;
      new app.Data(bId).delete().then(function(){
        // TODO: delete success
        action.innerHTML=configuration.lang.addLang;
      },function(e){
        // TODO: delete error
        // $(action).setContent('Error');
        action.innerHTML=configuration.lang.isError;
      });
    } else {
      new app.Data(bId).download(function(){
        // TODO: loading
        // action.emptyElement().appendChild(app.elementCreate('span').attr('class','icon-loading animate-spin'));
        action.innerHTML=configuration.lang.addingLang;
      }).then(function(e){
        return new app.Data(bId).save(e).then(function(){
          // NOTE: save success
          action.innerHTML=configuration.lang.removeLang;
        },function(){
          // NOTE: save error
          action.innerHTML=configuration.lang.isError + ':01';
        });
      },function(e){
        // NOTE: download error
        action.innerHTML=configuration.lang.isError + ':02';
      });
    }
  }).setContent(configuration.lang.addLang);

  if (app.book.isAvailable(bId)){
    li.setAttribute('class',configuration.classname.active);
    action.innerHTML=configuration.lang.removeLang;
  }
  li.appendChild(wrap);
  ul.appendChild(li);
});

resolve();
