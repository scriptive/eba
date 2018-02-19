var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
// container.remove();
// container.innerHTML = '';
$(container).removeChild();
// app.removeChild(container);
var ul = doc.createElement('ul');
ul.setAttribute('class','home');
if(local.name.query.hasOwnProperty('pageBlock'))$(container).appendChild('ul').addClass('msg notify').appendChild('li').appendChild('p').setContent(configuration.lang.noLanguage);
container.appendChild(ul);

// container.innerHTML = ol;
$(local.name.book).each(function(bId,v) {
  // console.log(i,v);
  var li = doc.createElement('li'),wrap = doc.createElement('div'), name = doc.createElement('div'), link = doc.createElement('a'), action = doc.createElement('div');
  li.setAttribute('id',bId);
  // li.setAttribute('class',bId);
  wrap.appendChild(name);
  wrap.appendChild(action);
  // action.

  // new Hammer(self.element).on('tap', callback);
  // action.innerHTML='Click Me';
  /*
  var ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-home common-box-main');
  app.localStorage.name.language.each(function(lID,v) {
    ol.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('a')).attr('href',{language:lID}.paramater(['#category'])).innerHTML=v.name;
  });
  */
  // var tmpContainer = doc.querySelector('input#sch');
  // $(name).click(function(evt){
  //   var e = evt.target;
  //   window.location.hash = '#category?language=lID'.replace(/lID/,e.dataset.bid);
  //   // e.preventDefault();
  // }).attr('data-bid',bId).setContent(v.name);

  name.appendChild(link);


  var random = new Date().getTime();

  $(link).attr('href','#category?language=bId&i=random'.replace(/bId/,bId).replace(/random/,random)).setContent(v.name);



  $(action).click(function(evt){
    var e = evt.target;
    // console.log(e.parentNode.parentNode);
    if (app.book.isAvailable(bId)){
      action.innerHTML=configuration.lang.removingLang;
      new app.Data(bId).delete().then(function(){
        // TODO: delete success
        action.innerHTML=configuration.lang.addLang;
      },function(e){
        // TODO: delete error
        // console.log(e);
        // $(action).setContent('Error');
        // tmpContainer.value=e;
        action.innerHTML=configuration.lang.isError;
      });
    } else {
      new app.Data(bId).download(function(){
        // TODO: loading
        // action.emptyElement().appendChild(app.elementCreate('span').attr('class','icon-loading animate-spin'));
        action.innerHTML=configuration.lang.addingLang;
      }).then(function(e){
        return new app.Data(bId).save(e).then(function(){
          // NOTE: save success
          action.innerHTML=configuration.lang.removeLang;
        },function(){
          // NOTE: save error
          action.innerHTML=configuration.lang.isError + ':01';
          // action.innerHTML=configuration.lang.addLang;
          // console.log('save',e);
          // tmpContainer.value='save error';
          // var msgContainer = doc.createElement('p');
          // msgContainer.innerHTML=JSON.stringify(e);
          // container.appendChild(msgContainer);
        });
      },function(e){
        // NOTE: download error
        // action.innerHTML=configuration.lang.isError;
        // console.log('download',e);
        // tmpContainer.value='download error';
        action.innerHTML=configuration.lang.isError + ':02';
      });
    }
  }).setContent(configuration.lang.addLang);

  if (app.book.isAvailable(bId)){
    li.setAttribute('class',configuration.classname.active);
    action.innerHTML=configuration.lang.removeLang;
  }

  li.appendChild(wrap);
  ul.appendChild(li);
});

resolve();
// console.log('home page method executed!');
// reject('what???');
// TODO: check storage, check update

// var localLanguage = local.name.language;
// if (app.isEmpty(localLanguage)) {
//   console.log(localLanguage);
//   console.log('what');
// }
/*
var abc={
  1:{
    name:"Zomi",updated:"12355467",
    information:{
      name:"Zolai",desc:"Zolai",lang:"??",version:"Zolai Version",launched:"Zolai Launched",size:"2.88 MB"
    }
  },
  2:{
    name:"English",updated:"12355467",
    information:{
      name:"English",desc:"English",lang:"??",version:"English Version",launched:"English Launched",size:"2.54 MB"
    }
  },
  3:{
    name:"Myanmar",updated:"12355467",
    information:{
      name:"Burmese",desc:"Burmese",lang:"??",version:"Burmese Version",launched:"Burmese Launched",size:"6.84 MB"
    }
  }
};
var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
// container.remove();
// container.innerHTML = '';
$(container).removeChild();
// app.removeChild(container);
var ul = doc.createElement('ul');
ul.setAttribute('class','lmList');
// var li = doc.createElement('li');
container.appendChild(ul);
// container.innerHTML = ol;
$(abc).each(function(i,v) {
  // console.log(i,v);
  var li = doc.createElement('li'),wrap = doc.createElement('div'),div = doc.createElement('div'), button = doc.createElement('div');
  div.innerHTML=v.name;
  wrap.appendChild(div);
  wrap.appendChild(button);
  li.appendChild(wrap);
  ul.appendChild(li);
});
*/
