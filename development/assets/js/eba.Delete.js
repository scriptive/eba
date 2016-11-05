/*
$('form[name=search]').submit(function( event ) {
  var obj = $(this), input = obj.children('input:first'), val=input.val(), key=input.attr('name');
  // eba.db.name.query[key]=val;
  // eba.watch.go(obj.attr('name'))();
  console.log('searching on ', obj.attr('name'),' with ',val );
  event.preventDefault();
});
*/
// $(document).on("submit", "form", function(event){
//   var obj = $(this), input = obj.children('input:first'), val=input.val(), key=input.attr('name');
//   eba.db.name.query[key]=val;
//   eba.watch.go(obj.attr('name'));
//   // console.log(val);
//   console.log('searching on', obj.attr('name'), 'with ', val);
//   event.preventDefault();
// });