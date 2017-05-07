home:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, olMain=app.elementCreate('ol'), main=app.Toggle.main(true);
  // app.config.page[local.name.query.page].title='abc';
  main.appendChild(olMain).setAttribute('class','main-home common-box-main');
  // var bookAvailable=function(){
  //   olMain.emptyElement();
  //   local.name.language.each(function(i,v) {
  //     var li = olMain.appendChild(app.elementCreate('li')), div = li.appendChild(app.elementCreate('div'));
  //     div.eventClick(function(){
  //       window.location.hash = {language:i}.paramater(['#category']);
  //     }).innerHTML=v.name;
  //   });
  // };
  
  if (app.book.isAvailable())app.book.listName();
  if (!app.book.isAvailable())app.book.menuName().dataContentEvent();
  // if (app.book.isAvailable())bookAvailable();
  // if (!app.book.isAvailable())app.languageMenu(bookAvailable).dataContentEvent();

  // var footer = main.appendChild(app.elementCreate('ol').addAttr('class','main-footer')), footerContainer = footer.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('ul'));
  // var addLanguages = footerContainer.appendChild(app.elementCreate('li'));
  // addLanguages.innerHTML=configuration.lang.manageLanguage;
  
  // var languageMenu = app.languageMenu(bookAvailable);
  // if (!app.book.isAvailable())languageMenu.dataContentEvent();
  // addLanguages.eventClick(languageMenu.dataContentEvent,false);

  resolve();
},