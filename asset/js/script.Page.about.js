about:function(resolve, reject){
  var configuration = app.config,local = app.localStorage, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-information');
  var li = ol.appendChild(app.elementCreate('li'));
  li.innerHTML=configuration.description;
  
  local.name.language.each(function(i,v) {
    var li = ol.appendChild(app.elementCreate('li')).addClass(i);
    li.appendChild(app.elementCreate('h3')).innerHTML=v.name;
    if (v.hasOwnProperty('information') && !v.information.isEmpty()){
      li.appendChild(app.elementCreate('p')).addAttr('data-title','Version').innerHTML=v.information.version;
      if (v.information.hasOwnProperty('size')) {
        li.appendChild(app.elementCreate('p')).addAttr('data-title','Size').innerHTML=v.information.size;
      } else {
        li.appendChild(app.elementCreate('p')).addAttr('data-title','Size').innerHTML='size view required to readd language';
        
      }
      // li.appendChild(app.elementCreate('p')).addAttr('data-title','Launched').innerHTML=v.information.launched;
    }
  });
  
  /*
  var options={
    name:configuration.name,
    version:configuration.version,
    description:configuration.description,
    author:configuration.author
  };
  options.each(function(i,v){
    // app.elementCreate('li');
    var li = ol.appendChild(app.elementCreate('li')).addClass(i);
    li.innerHTML=v;
  }),resolve();
  */
  resolve();
},
/*
var info={
  name:'Effortless bible analysis',
  version:'version: 1.0.0',
  description:'this is it!',
  author:'tuang'
};
var container = $( "<ul>",{class:'about'} ).appendTo($('div.container').empty());
$.each(info, function(k, v) {
  $( "<li>",{class:k}).append(
    v
  ).appendTo(container);
});
*/