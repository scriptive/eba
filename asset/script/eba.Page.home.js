// console.log(app.scMain);
// console.log(app.scMenu);
// console.log(app.scContent);
// console.log(app.scPanelCurrent);

var containerMessage = $('p');
var container = $(app.scContent).html(
  $('ul').appendChild(
    $('li').appendChild(
      containerMessage.html(configuration.lang.noLanguage)
    ),
    $('li').appendChild(
      $('p').html(configuration.lang.Update).click(function(evt) {
        doc.querySelector('.scriptive').classList.add(configuration.classname.inactive);
        $(evt.target).appendChild('i').addClass('icon-loading animate-spin');
        app.book.json().then(function(){
          console.log('success');
        },function(e){
          console.log('fail',e);
        }).then(function(){
          location.reload();
        });
      }).addClass('update')
    )
  ).addClass('msg notify')
);
var ul = container.appendChild('ul').addClass('home');
var random = new Date().getTime();

$(local.name.book).each(function(v,bId) {
  var status = app.book.isAvailable(bId)?true:false;
  ul.appendChild(
    $('li').appendChild(
      $('div').appendChild(
        $('div').appendChild(
          $('a').attr('href','#category?language=bId&i=random'.replace(/bId/,bId).replace(/random/,random)).html(v.name)
        ),
        $('div').html(status?configuration.lang.Remove:configuration.lang.Add).click(function(evt){
          var action = evt.target, li = action.parentNode.parentNode;
          if (app.book.isAvailable(bId)){
            action.innerHTML=configuration.lang.Removing;
            new app.Data(bId).delete().then(function(){
              // TODO: delete success
              action.innerHTML=configuration.lang.Add;
              li.removeAttribute('class',configuration.classname.active);
            },function(e){
              // TODO: delete error
              action.innerHTML=configuration.lang.Error;
            });
          } else {
            new app.Data(bId).download(function(){
              // TODO: loading
              // var icon = $('i').createElement().addClass('icon-loading animate-spin');
              // $(e).removeChild().appendChild(icon);
              // $(e).removeChild().appendChild(
              //   $('i').addClass('icon-loading animate-spin')
              // );

              // $(action).removeChild().appendChild('i').addClass('icon-loading animate-spin');
              $(action).html(
                $('i').addClass('icon-loading animate-spin')
              );
            },function(e){
              // console.log(e);
            }).then(function(e){
              return new app.Data(bId).save(e).then(function(){
                // NOTE: save success
                li.setAttribute('class',configuration.classname.active);
                action.innerHTML=configuration.lang.Remove;
              },function(){
                // NOTE: save error
                action.innerHTML=configuration.lang.Error + ':01';
              });
            },function(e){
              // NOTE: download error
              if (navigator.onLine == false) {
                containerMessage.html('Please retry when internet connection is available!');
              }
              action.innerHTML=configuration.lang.Add;
            });
          }
        })
      )
    ).attr('id',bId).toggleClass(configuration.classname.active,status)
  );
});
resolve();