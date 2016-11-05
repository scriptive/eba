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