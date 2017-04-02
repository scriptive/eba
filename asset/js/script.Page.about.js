about:function(resolve, reject){
  var configuration = app.config, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-about');
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
}
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