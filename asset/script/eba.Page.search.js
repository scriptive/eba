var container = doc.getElementById("lCm").getElementsByClassName("scSB")[0],
ul=app.createElement('ul');
$(container).removeChild().appendChild(ul).addClass('search');


// var olMain=app.createElement('ul');
// app.Toggle.main(true).appendChild(olMain).setAttribute('class','main-lookup common-box-main');

$(ul).appendChild('li').appendChild('div').appendChild('input').attr('type','search').attr('name','q').attr('id','q').attr('placeholder','search...');

$(ul).appendChild('li').appendChild('div').click(function(evt){
  var e = evt.target;
  if (e.nextElementSibling){
    e.nextElementSibling.remove();
  } else {
    var olLanguage = app.createElement('ol');
    $(e.parentNode).appendChild(olLanguage).click(function(evt){
      var e=evt.target, id = e.getAttribute('id');
      if (id && local.name.query.language != id){
        e.parentNode.querySelector('.'+configuration.classname.active).classList.remove(configuration.classname.active);
        $(e).addClass(configuration.classname.active);
        local.name.query.language=id;
      }
    });

    // var olLanguage = e.parentNode.appendChild(app.elementCreate('ol')).click(function(event){
    //   var elm=event.target, id = elm.getAttribute('id');
    //   if (id && local.name.query.language != id){
    //     elm.parentNode.querySelector('.'+configuration.classname.active).removeClass(configuration.classname.active);
    //     elm.addClass(configuration.classname.active);
    //     local.name.query.language=id;
    //   }
    // });
    // local.name.language.each(function(i,v) {
    //   olLanguage.appendChild(app.elementCreate('li').addAttr('id',i).addClass((local.name.query.language == i?configuration.classname.active:configuration.classname.inactive))).innerHTML=v.name;
    // });
    $(local.name.book).each(function(i,v) {
      // $(olLanguage).appendChild(app.elementCreate('li').addAttr('id',i).addClass((local.name.query.language == i?configuration.classname.active:configuration.classname.inactive))).innerHTML=v.name;
      $(olLanguage).appendChild('li').attr('id',i).addClass((local.name.query.language == i?configuration.classname.active:configuration.classname.inactive)).setContent(v.name);
    });
  }
}).setContent('Language');
var divTestament = app.createElement('div');
$(ul).appendChild('li').addClass('lsi').appendChild(divTestament).click(function(evt){
  var e=evt.target, id = e.getAttribute('id');
  if (id && local.name.query.testament != id){
    var elmContainer = e.parentNode.querySelector('.'+configuration.classname.active)
    if (elmContainer){
      elmContainer.classList.remove(configuration.classname.active);
    }
    $(e).addClass(configuration.classname.active);
    local.name.query.testament=id;
  }
});

$(divTestament).appendChild('p').attr('id','1').addClass(local.name.query.testament == 1?configuration.classname.active:configuration.classname.inactive).setContent('OT');
$(divTestament).appendChild('p').attr('id','2').addClass(local.name.query.testament == 2?configuration.classname.active:configuration.classname.inactive).setContent('NT');
// $(divTestament).appendChild(app.elementCreate('p').addAttr('id','1').addClass(local.name.query.testament == 1?configuration.classname.active:configuration.classname.inactive)).innerHTML='OT';
// $(divTestament).appendChild(app.elementCreate('p').addAttr('id','2').addClass(local.name.query.testament == 2?configuration.classname.active:configuration.classname.inactive)).innerHTML='NT';

$(ul).appendChild('li').appendChild('div').click(function(){
  var q = doc.getElementById('q').value;
  if (q && local.name.query.language && local.name.query.testament) {
    // console.log(q);
    // window.location.hash =
    window.location.hash = '#result?q=123&i=234'.replace(/123/,q).replace(/234/,new Date().getTime());
    // window.location.hash = {q:q,i:new Date().getTime()}.paramater(['#lookupresult'])
  }
}).setContent('Enter');
resolve();