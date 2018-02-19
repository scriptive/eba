return file.download({
  url:configuration.file.template.replace(/z/, ["default","all"].join('.')),
  // url:configuration.file.template.replace(/z/, configuration.DeviceTemplate.join('.')),
  before:function(e){
    e.overrideMimeType('text/html; charset=utf-8');
    e.responseType = 'document';
  }
}).then(function(html){
  try {
    var bOD = html.data.body;
    while(bOD.firstChild)doc.body.appendChild(bOD.firstChild);
    return terminal().then(function(e) {
      var splashScreen = doc.querySelector('div#screen');
      if (e) {
        return e;
      } else if (splashScreen) {
        splashScreen.remove();
      }
    });
  } catch (e) {
    return e;
  }
},function(e){
  return e;
});
// #Nosuah, #kilawm, #Ngahsutsiam, #lungdam, #thupha, #lungdampih, #Hoihlua, #Nasialua, #kisun, #kituak, #Hampha
// return app.fileStorage.download({
//   url:configuration.file.template.replace(/z/, ["default","all"].join('.')),
//   // url:configuration.file.template.replace(/z/, configuration.DeviceTemplate.join('.')),
//   before:function(e){
//     e.overrideMimeType('text/html; charset=utf-8');
//     e.responseType = 'document';
//   }
// }).then(function(e){
//   try {
//     var html = e.data.body;
//     while(html.firstChild)doc.body.appendChild(html.firstChild);
//     return terminal().then(function(e) {
//       if (e === true)doc.querySelector('div#screen').remove();
//       return e;
//     });
//   } catch (e) {
//     return e;
//   }
// },function(e){
//   return e;
// });