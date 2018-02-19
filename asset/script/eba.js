/*!
    scriptive -- Javascript application service
    Version {package.version}-{application.buildDate}
    https://scriptive.github.io/core
*/
var configPanel={
  main:'#lCm',
  mainActive:'.lmSB',
  menu:'#lMn',
  // open:'right'
},
configMain={
  idUnique:'eba:unique'
},
configuration={
  // =require eba.Configuration.js
};
scriptive(configMain).ready(function(app,$){
  // TODO: load user configuration, setup template, initiate UI
  var file, doc=document,local = app.storage;
  // var localBook={};
  // console.log(app.isEmpty());
  // $({a:1,b:2}).each(function(i,v){
  //   console.log(i,v);
  // });
  // app.each({a:1,b:2},function(i,v){
  //   console.log(i,v);
  // });
  // Niang Shan Ciang
  // CPOBMMMY
  // 0033 1012 0000 8257
  // CO OPERATIVE BANK LIMITED (PUBLIC BANK)
  // No.5 69th Street. 39thx40th Between Mandalay, Myanmar
  app.on('error',function(e) {
    console.log('error',e);
  });


  app.extension({
    notification:function(e){
      console.log('notification',e);
    },
    initiate:function(){
      // =require eba.Initiate.js
    },
    Data:function(bId){
      // =require eba.Data.js
    },
    Content:function(bId){
      // =require eba.Content.js
    },
    book:{
      // =require eba.Book.js
    },
    // =require eba.Common.js
    page:{
      home:function(resolve, reject){
        // =require eba.Page.home.js
      },
      category:function(resolve, reject){
        // =require eba.Page.category.js
      },
      reader:function(resolve, reject){
        // =require eba.Page.reader.js
      },
      search:function(resolve, reject){
        // =require eba.Page.search.js
      },
      result:function(resolve, reject){
        // =require eba.Page.result.js
      },
      bookmark:function(resolve, reject){
        // =require eba.Page.bookmark.js
      },
      random:function(resolve, reject){
        // =require eba.Page.random.js
      },
      setting:function(resolve, reject){
        // =require eba.Page.setting.js
      },
      about:function(resolve, reject){
        // =require eba.Page.about.js
      },
      contact:function(resolve, reject){
        // =require eba.Page.contact.js
      }
    },
    header:{
      content:function(){
        // console.log(local.name.query.page);
        // console.log('abc');
        var lMn = doc.getElementById('lMn');
        var homeElement= lMn.querySelector('.icon-panel')
        var titleElement = lMn.querySelector('#lmD');
        var backElement = lMn.querySelector('#backLink');
        // titleElement.innerHTML = configuration.page[local.name.query.page].title;
        titleElement.setAttribute('data-title',configuration.page[local.name.query.page].title);
        // console.log(local.name.query.page, local.name.query.pagePrevious);
        if (local.name.query.page != local.name.query.pagePrevious){
          if (!backElement) {
            backElement= doc.createElement('li');
            backElement.setAttribute('class','icon-left');
            backElement.setAttribute('id','backLink');
            // test.parentNode.appendChild(back);
            lMn.insertBefore(backElement, lMn.firstChild);

            homeElement.style.display='none';
            $(backElement).click(function(){
              // console.log('abc');
              window.location.hash = '#123'.replace(/123/,local.name.query.pagePrevious);
            });
          }
          // console.log('abc');
        } else if (backElement){
          backElement.remove();
          homeElement.style.display='';
        }
        // console.log(backLink);
        // if (backLink) {
        //   if (local.name.query.page == 'category') {
        //
        //   }
        // }
        // if (local.name.query.page == 'category') {
        //   var test = doc.querySelector('.icon-panel');
        //   console.log(test);
        //   var back = doc.createElement('li');
        //   // back.innerHTML='Back';
        //   // back.innerHTML='Effortless';
        //   back.setAttribute('class','icon-left');
        //   // test.parentNode.appendChild(back);
        //
        //   test.parentNode.insertBefore(back, test.parentNode.firstChild);
        //   console.log(test.parentNode);
        //   test.style.display='none';
        // }
      }
    }
  }).initiate();
});