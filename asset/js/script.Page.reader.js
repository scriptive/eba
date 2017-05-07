reader:function(resolve, reject){
  
  // var configuration = app.config, local = app.localStorage, olMain=app.elementCreate('ol'), main=app.Toggle.main(true);
  // // app.config.page[local.name.query.page].title='abc';
  // main.appendChild(olMain).setAttribute('class','main-reader');
  
  var configuration = app.config, local = app.localStorage, olMain=app.elementCreate('ol'), main=app.Toggle.main(true), query=local.name.query, pID=query.page, lID = query.language;
  
  app.config.page[pID].title=app.book.all[lID].name;
  main.appendChild(olMain).setAttribute('class','main-reader');
  new app.Content(lID).xml().then(function(e){
    e.reader(olMain,query.category).then(function(e){
      // reader Done
      // console.log(e);
    },function(e){
      // reader Fail
      olMain.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=e;
    });
  },function(e){
    // XML fail
    olMain.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.isNotFound.replace('{is}',lID);
  }).then(function(){
    // XML Done
    resolve();
  });
  
  
  var footer = main.appendChild(app.elementCreate('ol').addAttr('class','main-footer')), footerContainer = footer.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('ul'));
  footerContainer.appendChild(app.elementCreate('li')).addClass(configuration.classname.active).eventClick(function(event){
    var e = event.target;
    olMain.querySelectorAll('ol li ol li.OT').each(function(i,v){
      v.toggleDisplay();
    });
    if (e.hasClass(configuration.classname.active)){
      e.removeClass(configuration.classname.active).addClass(configuration.classname.inactive);
    } else {
      e.removeClass(configuration.classname.inactive).addClass(configuration.classname.active);
    }
  }).innerHTML='OT';
  footerContainer.appendChild(app.elementCreate('li')).addClass(configuration.classname.active).eventClick(function(event){
    var e = event.target;
    olMain.querySelectorAll('ol li ol li.NT').each(function(i,v){
      v.toggleDisplay();
    });
    if (e.hasClass(configuration.classname.active)){
      e.removeClass(configuration.classname.active).addClass(configuration.classname.inactive);
    } else {
      e.removeClass(configuration.classname.inactive).addClass(configuration.classname.active);
    }
  }).innerHTML='NT';
  // OldTestament.innerHTML='OT';
  // NewTestament.innerHTML='NT';
},

// var hasBookmark = app.book.hasBookmark(category,book,chapter,verse);
// var activeBookmarkClass = app.book.hasBookmark(category,book,chapter,verse)?configuration.classname.active:configuration.classname.inactive;

// e.querySelector('index section[id="0"]'.replace(0, category))
// e.querySelector('book category[id="0"]'.replace(0, category)).querySelectorAll('verse').each(function(i,v){});
/*
var obj= $(this), 
book=obj.attr('book'),chapter=obj.attr('chapter'),verse=obj.attr('verse'),tag=obj.attr('tag'),
bookName=xmlDoc.find('bookname').children('row[id="0"]'.replace('0', book)).text(),
verseText=obj.text(),
testament = (book<=39?1:2);

<li class="basic inactive thuciam-lui">
  <div class="icon-bookmark"></div>
  <div data-title="Paunak 5:3-6">Numei paktatte' kampau khuaizu bangin khum mahmahin a thugente uh a neel dakdak hangin, <sup>4</sup> a tawpna-ah lungkhamna leh natna simloh nangma tungah bangmah dang hong guanlo hi. <sup>5</sup> Amah in sihna gamah nang hong paipih ding
      a, ama tot lampi pen sihna mun tun'na lampi ahi hi. <sup>6</sup> Nuntakna lampi-ah amah omlo a, nang na phawkloh hangin amah lam pialin a vakvai ahi hi.
      <p>
        <span>Lorem</span><span>ipsum</span><span>snim</span>
      </p>
  </div>
</li>
*/