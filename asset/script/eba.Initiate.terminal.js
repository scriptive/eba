// return route().then(function(e){
//   if (e === true)
//     return new Promise(function(resolve, reject) {
//       app.page[local.name.query.page](resolve, reject);
//     }).then(function(){
//       doc.body.setAttribute('id',local.name.query.page);
//       return true;
//       // return app.Toggle.header().then(function(e){
//       //   try {
//       //     app.dataContent();
//       //   } catch (e) {
//       //     return e;
//       //   }
//       //   return true;
//       // });
//     },function(e){
//       return e;
//     });
//   return e;
// });
return route().then(function() {
  local.update('query');
  // console.log(local.name.query);
  return new Promise(function(resolve, reject) {
    app.page[local.name.query.page](resolve, reject);
  }).then(function(){
    doc.body.setAttribute('id',local.name.query.page);
    app.header.content();
    // return app.Toggle.header().then(function(e){
    //   try {
    //     app.dataContent();
    //   } catch (e) {
    //     return e;
    //   }
    //   return true;
    // });
  },function(e){
    return e;
  });
}, function(e) {
  return e;
});