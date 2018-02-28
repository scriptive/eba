var ulMain = $(app.scContent).removeChild().appendChild('ul').attr('class','reader');
var query=local.name.query, pID=query.page, lID = query.language;

// configuration.page[pID].title=local.name.book[lID].name;
// var ulMain=app.elementCreate('ol'), main=app.Toggle.main(true), query=local.name.query, pID=query.page, lID = query.language;
// app.config.page[pID].title=app.book.all[lID].name;
// main.appendChild(ulMain).setAttribute('class','main-reader');
new app.Content(lID).xml().then(function(e){
  e.reader(ulMain.element,query.category).then(function(e){
    // reader Done
    // console.log(e);
  },function(e){
    // reader Fail
    // console.log(e);
    // ulMain.attr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=e;
  });
},function(e){
  // XML fail
  // console.log(e);
  // ulMain.attr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.isNotFound.replace('{is}',lID);
}).then(function(){
  // XML Done
  configuration.page[pID].title=app.book.category.name;
  resolve();
});


var ulNotify = doc.createElement('ul');
ulNotify.setAttribute('class','msg notify');
app.scContent.insertBefore(ulNotify, app.scContent.firstChild);

var containerMessage = $(ulNotify).appendChild('li').appendChild('p').attr('class','toggle').click(function(evt){
  var e = evt.target;
  var ulTestament = doc.querySelectorAll('ul.reader li ol li.1'.replace('1',e.dataset.id));
  $(e).toggleClass('active');
  $(ulTestament).each(function(i,v){
    if (v.style.display === 'none') {
      v.style.display='';
    } else {
      v.style.display='none';
    }
  });
});

$(containerMessage.element).appendChild('span').attr('data-id','OT').setContent('OT');
$(containerMessage.element).appendChild('span').attr('data-id','NT').setContent('NT');

// var footer = main.appendChild(app.elementCreate('ol').attr('class','main-footer')), footerContainer = footer.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('ul'));
// footerContainer.appendChild(app.elementCreate('li')).addClass(configuration.classname.active).eventClick(function(event){
//   var e = event.target;
//   ulMain.querySelectorAll('ol li ol li.OT').each(function(i,v){
//     v.toggleDisplay();
//   });
//   if (e.hasClass(configuration.classname.active)){
//     e.removeClass(configuration.classname.active).addClass(configuration.classname.inactive);
//   } else {
//     e.removeClass(configuration.classname.inactive).addClass(configuration.classname.active);
//   }
// }).innerHTML='OT';
// footerContainer.appendChild(app.elementCreate('li')).addClass(configuration.classname.active).eventClick(function(event){
//   var e = event.target;
//   ulMain.querySelectorAll('ol li ol li.NT').each(function(i,v){
//     v.toggleDisplay();
//   });
//   if (e.hasClass(configuration.classname.active)){
//     e.removeClass(configuration.classname.active).addClass(configuration.classname.inactive);
//   } else {
//     e.removeClass(configuration.classname.inactive).addClass(configuration.classname.active);
//   }
// }).innerHTML='NT';
// OldTestament.innerHTML='OT';
// NewTestament.innerHTML='NT';