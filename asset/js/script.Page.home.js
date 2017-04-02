home:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-home');
  configuration.page.each(function(i,v) {
    var li = ol.appendChild(app.elementCreate('li')), a = li.appendChild(app.elementCreate('a'));
    a.addClass(v.class).addAttr('href','#'+i).innerHTML=v.name;
  });
  resolve();
},