var ul = $('ul').addClass('search');
$(app.scContent).html(ul);

ul.appendChild(
  $('li').appendChild(
    $('div').appendChild(
      $('input').attr('type','search').attr('name','q').attr('id','q').attr('placeholder','search...')
    )
  ),
  $('li').appendChild(
    $('div').html('Language').click(function(evt){
      var e = evt.target;
      if (e.nextElementSibling){
        e.nextElementSibling.remove();
      } else {
        var ol = $(e.parentNode).appendChild('ol').click(function(evt){
          var e=evt.target, id = e.getAttribute('id');
          if (id && local.name.query.language != id){
            // e.parentNode.querySelector('.'+configuration.classname.active).classList.remove(configuration.classname.active);
            // $(e).addClass(configuration.classname.active);
            // local.name.query.language=id;
            local.name.query.language=id;

            // var abc = e.parentNode.getElementsByClassName(configuration.classname.active);
            // console.log(abc.length);
            $(e.parentNode.childNodes).each(function(v){
              if (v == e) {
                v.classList.add(configuration.classname.active);
              } else if (v.classList.contains(configuration.classname.active)) {
                v.classList.remove(configuration.classname.active);
              }
            });
            // $(e).silbingClass(configuration.classname.active);
          }
        });

        $(local.name.setting.available).each(function(v,k) {
          ol.appendChild(
            $('li').html(
              v.name
            ).attr('id',k).addClass((local.name.query.language == k?configuration.classname.active:configuration.classname.inactive))
          )
        });
      }
    })
  ),
  $('li').appendChild(
    $('div').appendChild(
      $('p').html('OT').attr('id','1').toggleClass(configuration.classname.active,local.name.query.testament == 1),
      $('p').html('NT').attr('id','2').toggleClass(configuration.classname.active,local.name.query.testament == 2)
    )
  ).click(function(evt){
    var e=evt.target, id = e.getAttribute('id');
    $(e.parentNode.childNodes).each(function(silb,i){
      $(silb).toggleClass(configuration.classname.active,silb == e);
    });
    local.name.query.testament=id;
  }).addClass('lsi'),
  $('li').appendChild(
    $('div').html('Enter').click(function(evt){
      var q = doc.getElementById('q').value;
      if (q && local.name.query.language && local.name.query.testament) {
        window.location.hash = '#result?q=123&i=234'.replace(/123/,q).replace(/234/,new Date().getTime());
      }
    })
  )
);

// $(app.scContent).html(
//   $('ul').appendChild(
//   )
// );


resolve();


// $(ul).appendChild('li').appendChild('div').appendChild('input').attr('type','search').attr('name','q').attr('id','q').attr('placeholder','search...');
//
// $(ul).appendChild('li').appendChild('div').click(function(evt){
//   var e = evt.target;
//   if (e.nextElementSibling){
//     e.nextElementSibling.remove();
//   } else {
//     var olLanguage = app.createElement('ol');
//     $(e.parentNode).appendChild(olLanguage).click(function(evt){
//       var e=evt.target, id = e.getAttribute('id');
//       if (id && local.name.query.language != id){
//         e.parentNode.querySelector('.'+configuration.classname.active).classList.remove(configuration.classname.active);
//         $(e).addClass(configuration.classname.active);
//         local.name.query.language=id;
//       }
//     });
//
//     // var olLanguage = e.parentNode.appendChild(app.elementCreate('ol')).click(function(event){
//     //   var elm=event.target, id = elm.getAttribute('id');
//     //   if (id && local.name.query.language != id){
//     //     elm.parentNode.querySelector('.'+configuration.classname.active).removeClass(configuration.classname.active);
//     //     elm.addClass(configuration.classname.active);
//     //     local.name.query.language=id;
//     //   }
//     // });
//     // local.name.language.each(function(v,i) {
//     //   olLanguage.appendChild(app.elementCreate('li').addAttr('id',i).addClass((local.name.query.language == i?configuration.classname.active:configuration.classname.inactive))).innerHTML=v.name;
//     // });
//     $(local.name.book).each(function(v,i) {
//       // $(olLanguage).appendChild(app.elementCreate('li').addAttr('id',i).addClass((local.name.query.language == i?configuration.classname.active:configuration.classname.inactive))).innerHTML=v.name;
//       $(olLanguage).appendChild('li').attr('id',i).addClass((local.name.query.language == i?configuration.classname.active:configuration.classname.inactive)).html(v.name);
//     });
//   }
// }).html('Language');
// var divTestament = app.createElement('div');
// $(ul).appendChild('li').addClass('lsi').appendChild(divTestament).click(function(evt){
//   var e=evt.target, id = e.getAttribute('id');
//   if (id && local.name.query.testament != id){
//     var elmContainer = e.parentNode.querySelector('.'+configuration.classname.active)
//     if (elmContainer){
//       elmContainer.classList.remove(configuration.classname.active);
//     }
//     $(e).addClass(configuration.classname.active);
//     local.name.query.testament=id;
//   }
// });
//
// $(divTestament).appendChild('p').attr('id','1').addClass(local.name.query.testament == 1?configuration.classname.active:configuration.classname.inactive).html('OT');
// $(divTestament).appendChild('p').attr('id','2').addClass(local.name.query.testament == 2?configuration.classname.active:configuration.classname.inactive).html('NT');
// // $(divTestament).appendChild(app.elementCreate('p').addAttr('id','1').addClass(local.name.query.testament == 1?configuration.classname.active:configuration.classname.inactive)).innerHTML='OT';
// // $(divTestament).appendChild(app.elementCreate('p').addAttr('id','2').addClass(local.name.query.testament == 2?configuration.classname.active:configuration.classname.inactive)).innerHTML='NT';
//
// $(ul).appendChild('li').appendChild('div').click(function(){
//   var q = doc.getElementById('q').value;
//   if (q && local.name.query.language && local.name.query.testament) {
//     // console.log(q);
//     // window.location.hash =
//     window.location.hash = '#result?q=123&i=234'.replace(/123/,q).replace(/234/,new Date().getTime());
//     // window.location.hash = {q:q,i:new Date().getTime()}.paramater(['#lookupresult'])
//   }
// }).html('Enter');
// resolve();