/*!
    EBA
    Version {package.version}-{application.buildDate}
    https://scriptive.github.io/eba
*/
(function($) {
  'use strict';
  var configPanel={
    // main:'#lCm',
    // mainActive:'.scSB',
    // menu:'#lMn',
    // // open:'right'
  },
  configMain={
    main:'#lCm',
    mainActive:'.scSB',
    menu:'#lMn',
    // open:'right',
    idUnique:'eba:unique'
  },
  configuration={
    // =require eba.Configuration.js
  };
  $(configMain).ready(function(app){
    // TODO: load user configuration, setup template, initiate UI
    var file, doc=document,local = app.storage;

    // console.log(app);
    // app.loveMe='hateMe';
    // eMain = (typeof config.main == 'string')?doc.querySelector(config.main):config.main;
    // var apple = doc.querySelector('#lCm');
    // app.scMain = doc.querySelector('#lCm');
    // app.scMenu = doc.querySelector('#lMn');
    // app.scContent = app.scMain.querySelector('.scSB');
    // app.querySelector('.scSB');
    // var abc = $('.scSB');
    // console.log(apple);

    // console.log(app.scMain);
    // console.log(app.scMenu);
    // console.log(app.scContent);

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
        }
      }
    }).initiate();
  });
}(scriptive));