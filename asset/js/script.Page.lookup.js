lookup:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, olMain=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(olMain).setAttribute('class','main-lookup common-box-main');
  
  olMain.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).appendChild(app.elementCreate('input')).addAttr('type','search').addAttr('name','q').addAttr('id','q').addAttr('placeholder','search...');
  
  olMain.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).eventClick(function(event){
    var e = event.target;
    if (e.nextElementSibling){
      e.nextElementSibling.removeElement();
    } else {
      var olLanguage = e.parentNode.appendChild(app.elementCreate('ol')).eventClick(function(event){
        var elm=event.target, id = elm.getAttribute('id');
        if (id && local.name.query.language != id){
          elm.parentNode.querySelector('.'+configuration.classname.active).removeClass(configuration.classname.active);
          elm.addClass(configuration.classname.active);
          local.name.query.language=id;
        }
      });
      local.name.language.each(function(i,v) {
        olLanguage.appendChild(app.elementCreate('li').addAttr('id',i).addClass((local.name.query.language == i?configuration.classname.active:configuration.classname.inactive))).innerHTML=v.name;
      });
    }
  }).innerHTML='Language';
  
  var divTestament = olMain.appendChild(app.elementCreate('li').addAttr('class','lsi')).appendChild(app.elementCreate('div')).eventClick(function(event){
    var elm=event.target, id = elm.getAttribute('id');
    if (id && local.name.query.testament != id){
      var elmContainer = elm.parentNode.querySelector('.'+configuration.classname.active)
      if (elmContainer){
        elmContainer.removeClass(configuration.classname.active);
      }
      elm.addClass(configuration.classname.active);
      local.name.query.testament=id;
    }
  });
  divTestament.appendChild(app.elementCreate('p').addAttr('id','1').addClass(local.name.query.testament == 1?configuration.classname.active:configuration.classname.inactive)).innerHTML='OT';
  divTestament.appendChild(app.elementCreate('p').addAttr('id','2').addClass(local.name.query.testament == 2?configuration.classname.active:configuration.classname.inactive)).innerHTML='NT';
  
  olMain.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).eventClick(function(){
    var q = document.getElementById('q').value;
    if (q && local.name.query.language && local.name.query.testament) {
      // console.log(q);
      // window.location.hash = 
      window.location.hash = {q:q,i:new Date().getTime()}.paramater(['#lookupresult'])
    }
  }).innerHTML='Enter';
  resolve();
},