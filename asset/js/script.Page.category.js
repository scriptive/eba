category:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, olMain=app.elementCreate('ol'), container=app.Toggle.main(true), query=local.name.query, pID=query.page, lID = query.language;
  app.config.page[pID].title=app.book.all[lID].name;
  container.appendChild(olMain).setAttribute('class','main-category');
  new app.Content(lID).xml().then(function(e){
    e.section(olMain).then(function(e){
      // reader Done
      // console.log(e);
    },function(e){
      // reader Fail
      console.log(e);
    });
  },function(e){
    // XML fail
    olMain.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.isNotFound.replace('{is}',local.name.query.language);
  }).then(function(){
    // XML Done
    resolve();
    var alphabet = [], olIndex=app.elementCreate('ol');
    // alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    container.appendChild(olIndex).eventClick(function(event){
      var e = event.target, id =e.getAttribute('class');
      var position = document.getElementById(id);
      app.main.container().firstElementChild.scrollTop = position.offsetTop;

    }).setAttribute('class','main-index');
    olMain.querySelectorAll('li.alpha').each(function(i,v){
      // var char = v.dataset.char, id = v.getAttribute('id');
      // if (!alphabet.has(char)){
      //   alphabet.push(char);
      //   olIndex.appendChild(app.elementCreate('li').addAttr('class',id)).innerHTML=char;
      // }
      var char = v.innerHTML, id = v.getAttribute('id');
      olIndex.appendChild(app.elementCreate('li').addAttr('class',id)).innerHTML=char;
      // console.log(v.dataset.alpha);
    });
    // console.log(alphabet);
    // var olIndex=app.elementCreate('ol'), alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    // container.appendChild(olIndex).setAttribute('class','main-index');
    // alphabet.each(function(i,v){
    //   // console.log(i,v);
    //   olIndex.appendChild(app.elementCreate('li')).innerHTML=v;
    // });
  });
  /*
  var olIndex=app.elementCreate('ol'), alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  container.appendChild(olIndex).setAttribute('class','main-index');
  // alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  alphabet.each(function(i,v){
    // console.log(i,v);
    olIndex.appendChild(app.elementCreate('li')).innerHTML=v;
  });
  */
  
},