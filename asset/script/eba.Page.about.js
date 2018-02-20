var container = doc.getElementById("lCm").getElementsByClassName("scSB")[0];
var ul = app.createElement('ul');
$(container).removeChild().appendChild(ul).addClass('about').appendChild('li').addClass('description').appendChild('p').addClass('desc').setContent(configuration.description);
$(local.name.book).each(function(i,v) {
  var li = app.createElement('li');
  $(ul).appendChild(li);
  $(li).addClass(configuration.classname.available).appendChild('h3').setContent(v.name);
  if (v.hasOwnProperty('information') && !$(v.information).isEmpty()){
    $(li).appendChild('p').attr('data-title','Version').setContent(v.information.version);
    if (v.information.hasOwnProperty('size')) {
      $(li).appendChild('p').attr('data-title','Size').setContent(v.information.size);
    } else {
      $(li).appendChild('p').attr('data-title','Size').setContent('size view required to readd language');
    }
    // $(li).appendChild('p').attr('data-title','Launched').setContent(v.information.launched);
  } else {
    $(li).addClass(configuration.classname.inactive);
  }
  // $(ul).appendChild(li);
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