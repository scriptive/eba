reader:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-reader');
  new app.Content(local.name.query.book).xml().then(function(e){
    e.reader(ol,local.name.query.category).then(function(e){
      // reader Done
      // console.log(e);
    },function(e){
      // reader Fail
      ol.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=e;
    });
  },function(e){
    // XML fail
    ol.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.isNotFound.replace('{is}',local.name.query.book);
  }).then(function(){
    // XML Done
    resolve();
  });
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