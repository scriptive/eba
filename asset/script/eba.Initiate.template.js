return file.download({
  url:configuration.file.template.replace(/z/, ["default","all"].join('.')),
  // url:configuration.file.template.replace(/z/, configuration.DeviceTemplate.join('.')),
  before:function(e){
    e.overrideMimeType('text/html; charset=utf-8');
    e.responseType = 'document';
  }
}).then(function(html){
  return new Promise(function(resolve, reject) {
    try {
      var bOD = html.data.body;
      while(bOD.firstChild)doc.body.appendChild(bOD.firstChild);
      app.panelEvent(function(panel){
        panel.open(function(o){
          // var ul = app.scPanelCurrent.querySelector('ul');
          var ul = $(app.scPanelCurrent).selectElement('ul.lmList').removeChild();
          $(configuration.page).each(function(v,i){
            if (v.name) {
              ul.appendChild(
                $('li').appendChild(
                  $('a').html(v.name).attr('href','#'+i)
                ).addClass(i).toggleClass('active',local.name.query.page==i)
              );
              // $(ul).appendChild(
              //   $('li').appendChild(
              //     $('a').html(v.name).attr('href','#'+i)
              //   ).addClass(i).toggleClass('active',local.name.query.page==i)
              // );

              // $(ul).appendChild('li').appendChild('a').html(v.name).attr('href','#'+i)

              // $('li').appendChild(
              //   $('a').html(v.name).attr('href','#'+i)
              // ).addClass(i).toggleClass('active',local.name.query.page==i).appendTo(ul);

            }
          });
          if (o.overlay === true){
            app.scContent.style.opacity = 0.2;
          }
        });
        panel.close(function(){
          app.scContent.style.opacity =1;
        });
        panel.drag(function(o){
          if (o.overlay === true){
            app.scContent.style.opacity = parseFloat(1.0 - o.percentage/170).toFixed(2);
          }
        });
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  }).then(function(){
    return terminal().then(function(e) {
      var splashScreen = doc.querySelector('div#screen');
      if (e) {
        return e;
      } else if (splashScreen) {
        splashScreen.remove();
      }
    });
  },function(e){
    return e;
  });
},function(e){
  return e;
}).then(function(e){
  return e;
});