home:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, olMain=app.elementCreate('ol'), main=app.Toggle.main(true);
  // app.config.page[local.name.query.page].title='abc';
  main.appendChild(olMain).setAttribute('class','main-home common-box-main');
  
  // console.log(local.name.language);
  // configuration.page.each(function(i,v) {
  //   var li = ol.appendChild(app.elementCreate('li')), div = li.appendChild(app.elementCreate('div'));
  //   div.innerHTML=v.name;
  // });
  /*
  app.book.all.each(function(i,v) {
    // console.log(i,v);
    var li = ol.appendChild(app.elementCreate('li')), div = li.appendChild(app.elementCreate('div'));
    div.innerHTML=v.name;
  });
  */
  /*
  configuration.page.each(function(i,v) {
  var li = ol.appendChild(app.elementCreate('li')), a = li.appendChild(app.elementCreate('a'));
  a.addClass(v.class).addAttr('href','#'+i).innerHTML=v.name;
});
*/
  var bookAvailable=function(){
    olMain.emptyElement();
    local.name.language.each(function(i,v) {
      var li = olMain.appendChild(app.elementCreate('li')), div = li.appendChild(app.elementCreate('div'));

      // console.log({langauge:i}.paramater(['#category']));
      div.eventClick(function(){
        window.location.hash = {language:i}.paramater(['#category']);
      }).innerHTML=v.name;
    });
  };
  var isAvailable=function(i){
    if (local.name.hasOwnProperty('language') && local.name.language.isObject() && !local.name.language.isEmpty()){
      if (i) return local.name.language.hasOwnProperty(i);
      return true;
    }
    return false;
  };
  var footer = main.appendChild(app.elementCreate('ol').addAttr('class','main-footer')), footerContainer = footer.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('ul'));
  var addLanguages = footerContainer.appendChild(app.elementCreate('li'));
  addLanguages.innerHTML=configuration.lang.manageLanguage;
  if (isAvailable())bookAvailable();
  
  if (app.hasOwnProperty('nav')){
    if (app.nav.hasOwnProperty('container')){
      var nav = app.nav.container(), dl=nav.firstElementChild, dt=dl.firstElementChild, dd=dt.nextElementSibling;
      var dataContentOpen = function() {
        app.fileStorage.download({
          url:configuration.file.lang
        }).then(function(e){
          nav.style.display='block';
          dd.emptyElement();
          app.book.language = JSON.parse(e.data);
          var ul = dd.appendChild(app.elementCreate('ul'));
          app.book.language.each(function(bId,v){
            var li = app.elementCreate('li'), name = app.elementCreate('div'), action = app.elementCreate('div');
            name.innerHTML=v.name;
            action.eventClick(function(e){
              if (isAvailable(bId)){
                new app.xml(bId).delete().then(function(){
                  // NOTE: delete success
                  action.innerHTML=configuration.lang.addLanguage;
                },function(){
                  // NOTE: delete error
                }).then(function(){
                  bookAvailable();
                });
              } else {
                new app.xml(bId).download(function(){
                  action.emptyElement().appendChild(app.elementCreate('span').addAttr('class','icon-loading animate-spin'));
                }).then(function(e){
                  return new app.xml(bId).save(e).then(function(){
                    // NOTE: save success
                    action.innerHTML=configuration.lang.removeLanguage;
                  },function(e){
                    // NOTE: save error
                    action.innerHTML=configuration.lang.addLanguage;
                  });
                },function(){
                  // NOTE: download error
                  action.innerHTML=configuration.lang.isError;
                }).then(function(){
                  bookAvailable();
                });
              }
            }).innerHTML=configuration.lang.addLanguage;
            if (isAvailable(bId)){
              li.setAttribute('class',configuration.classname.active);
              action.innerHTML=configuration.lang.removeLanguage;
            }
            li.appendChild(name); li.appendChild(action); ul.appendChild(li);
          });
        },function(e){
          // NOTE: language download error
          console.log(e);
        });
      };
      var dataContentTarget = function(event) {
        if (!dl.contains(event.target) && isAvailable())dataContentClose();
        event.stopPropagation();
      };
      var dataContentClose = function() {
        dd.emptyElement();
        if (!document.body.classList.contains('nav'))document.body.removeClick(dataContentTarget);
        nav.styleDisplay('none');
      };
      var dataContentEvent = function(event) {
        nav.toggleDisplay(function(){
          dataContentOpen();
          if (!document.body.classList.contains('nav'))document.body.eventClick(dataContentTarget);
        },function(){
          dataContentClose();
        });
        if (event)event.stopPropagation();
      };
      if (!isAvailable())dataContentEvent();
      addLanguages.eventClick(dataContentEvent,false);
    }
  }
  resolve();
},