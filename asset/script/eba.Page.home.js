// console.log(app.scMain);
// console.log(app.scMenu);
// console.log(app.scContent);
// console.log(app.scPanelCurrent);
$(app.scContent).removeChild();

var ul = doc.createElement('ul');
ul.setAttribute('class','home');
if(local.name.query.hasOwnProperty('pageBlock')) {

  var ulNote = doc.createElement('ul');
  ulNote.setAttribute('class','msg notify');

  var ulNoteMessage = app.scContent.appendChild(ulNote);
  // console.log(abc);

  $(ulNoteMessage).appendChild('li')
    .appendChild('p')
    .setContent(configuration.lang.noLanguage);

  $(ulNoteMessage).appendChild('li')
    .appendChild('p')
    .addClass('update')
    .setContent(configuration.lang.Update).click(function(evt) {
      doc.querySelector('.scriptive').classList.add(configuration.classname.inactive);
      var icon = $('i').createElement().addClass('icon-loading animate-spin');
      $(evt.target).appendChild(icon.element);

      app.book.json().then(function(){
        console.log('success');
      },function(e){
        console.log('fail',e);
      }).then(function(){
        location.reload();
        // $(e).setContent(configuration.lang.Update);
        // container.classList.remove(configuration.classname.inactive);
      });
    });


  // $(app.scContent).appendChild('ul')
  //   .addClass('msg notify')
  //   .appendChild('li')
  //   .appendChild('p')
  //   .setContent(configuration.lang.noLanguage);
}
app.scContent.appendChild(ul);

$(local.name.book).each(function(bId,v) {
  var li = doc.createElement('li'),
  wrap = doc.createElement('div'),
  name = doc.createElement('div'),
  link = doc.createElement('a'),
  action = doc.createElement('div');
  li.setAttribute('id',bId);
  wrap.appendChild(name);
  name.appendChild(link);
  wrap.appendChild(action);
  // $(action).addClass('icon-loading animate-spin');

  var random = new Date().getTime();
  $(link).attr('href','#category?language=bId&i=random'.replace(/bId/,bId).replace(/random/,random)).setContent(v.name);
  $(action).click(function(evt){
    var e = evt.target;
    // console.log(e.parentNode.parentNode);
    if (app.book.isAvailable(bId)){
      action.innerHTML=configuration.lang.Removing;
      new app.Data(bId).delete().then(function(){
        // TODO: delete success
        action.innerHTML=configuration.lang.Add;
        li.removeAttribute('class',configuration.classname.active);
      },function(e){
        // TODO: delete error
        // $(action).setContent('Error');
        action.innerHTML=configuration.lang.Error;
      });
    } else {
      new app.Data(bId).download(function(){
        // TODO: loading
        // action.emptyElement().appendChild(app.elementCreate('span').attr('class','icon-loading animate-spin'));
        // action.innerHTML=configuration.lang.addingLang;
        // var icon= doc.createElement('i')
        // var icon = app.createElement('i');
        var icon = $('i').createElement().addClass('icon-loading animate-spin');
        $(e).removeChild().appendChild(icon.element);
      }).then(function(e){
        return new app.Data(bId).save(e).then(function(){
          // NOTE: save success
          li.setAttribute('class',configuration.classname.active);
          action.innerHTML=configuration.lang.Remove;
        },function(){
          // NOTE: save error
          action.innerHTML=configuration.lang.Error + ':01';
        });
      },function(e){
        // NOTE: download error
        action.innerHTML=configuration.lang.Error + ':02';
      });
    }
  }).setContent(configuration.lang.Add);

  if (app.book.isAvailable(bId)){
    li.setAttribute('class',configuration.classname.active);
    action.innerHTML=configuration.lang.Remove;

    // var icon = $('i').createElement().addClass('icon-loading animate-spin');
    // $(action).removeChild().appendChild(icon.element);
  }
  li.appendChild(wrap);
  ul.appendChild(li);
});

resolve();
