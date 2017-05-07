/*!
    eba -- Effortless bible analysis
    Version {application.version}-{application.buildDate}
    https://scriptive.github.io/eba
    (c) 2017
*/
(function(app) {
  // app.plugin({});
  app.merge({
    config: {
      // =require script.Configuration.js
    },
    initiate: function() {
      var configuration = app.config, local = app.localStorage;
      configuration.pageHome=Object.keys(configuration.page)[0];
      var process = function() {
        // =require script.Initiate.process.js
      };
      var route = function() {
        // =require script.Initiate.route.js
      };
      var template = function() {
        // =require script.Initiate.template.js
      };
      var terminal = function() {
        // =require script.Initiate.terminal.js
      };
      // {"class":{"fontsize":"size-normal","background":"color-white"}}
      // {"version":"1.0.0","build":"1.0.1","class":{"fontsize":"size-normal","background":"color-white"}}
      new Promise(function(resolve, reject) {
        local.select('setting').select('query').select('language').select('randomverse').select('todo');
        local.select('bookmark').select('suggestion');
        // NOTE: Private
        if (local.name.setting.hasOwnProperty('build')) {
          if (local.name.setting.build == configuration.build) {
            // NOTE: ONLOAD
            configuration.requireUpdate = 0;
          } else {
            // NOTE: ONUPDATE
            configuration.requireUpdate = 2;
          }
        } else {
          // NOTE: ONINSTALL
          configuration.requireUpdate = 1;
          // NOTE: Private
        }
        if (configuration.requireUpdate) {
          local.name.setting.version = configuration.version;
          local.name.setting.build = configuration.build;
          local.update('setting');
        }
        process().then(function(e) {
          document.body.classList.add(app.config.Screen);
          // return setTimeout(function() {},200);
          if(local.name.setting.hasOwnProperty('class')){
            local.name.setting.class.each(function(i,v){
              document.body.classList.add(v);
            });
          } else {
            local.name.setting.class={};
          }
          if (e === true) return template();
          return e;
        }).then(function(e) {
          if (e === true) {
            resolve();
          } else {
            reject(e);
          }
        });
      }).then(function() {
        app.hashChange(function() {
          terminal().then(function(e) {
            // NOTE: if page error
            if (e !== true)console.log('page error',e);
          });
        });
      }, function(e) {
        if (typeof e === 'object' && e.hasOwnProperty('message')) {
          app.notification(e.message);
        } else if (typeof e === 'string') {
          app.notification(e);
        }
      });
    },
    // NOTE: <dialog> used in page
    dialog: {
      container:function(){
        return app.elementSelect('div#dialog');
      }
    },
    // NOTE: <nav> used in device, dataLink, dataContent
    nav: {
      container:function(){
        return app.elementSelect('nav');
      },
      // NOTE: Private
      toHome:function(e){
        window.location.hash = app.config.pageHome;
      },
      toPrevious:function(e){
        window.location.hash = e.dataset.hasOwnProperty('page')?e.dataset.page:app.config.pagePrevious;
      },
      setNamePrevious:function(e){
        e.innerHTML=app.localStorage.name.query.page;
        e.eventClick(function(){
          window.location.hash = e.dataset.hasOwnProperty('page')?e.dataset.page:app.config.pagePrevious;
        });
      },
      setTitle:function(e){
        e.innerHTML= app.config.name;
      },
      setName:function(e){
        // e.innerHTML=app.config.page[app.localStorage.name.query.page].name || app.config.name;
        
        if (app.config.page[app.localStorage.name.query.page].hasOwnProperty('title')){
          e.innerHTML=app.config.page[app.localStorage.name.query.page].title;
        } else{
          e.innerHTML= app.config.name;
        }
        // e.innerHTML=app.localStorage.name.query.page;
        // e.innerHTML=app.config.page[app.localStorage.name.query.page].name;
      },
      toPage:function(e){
        // app.Toggle.nav(e);
        app.Toggle.nav(e).style.display = 'none';
      },
      setReader:function(e){
        app.Toggle.menu(e,function(container){
          var ol = container.appendChild(app.elementCreate('ol'));
          app.config.catalog.each(function(i,v){
            v.each(function(id,o){
              ol.appendChild(app.elementCreate('li').addAttr('data-cls',o.class).addAttr('data-title',o.total).eventClick(function(event){
                event.target.toggleClass('active');
                app.Toggle.main().querySelectorAll('ol li ol li').each(function(i,abc){
                  if (abc.hasClass(o.class)) abc.toggleDisplay();
                });
              }).addContent(o.name).addClass('active'));
            });
          });
          // https://drive.google.com/file/d/FILE_ID/edit?usp=sharing
          // https://drive.google.com/uc?export=download&id=FILE_ID
          // https://drive.google.com/open?id=0B_7bPVufJ-j4ZTJISGRUb0pYb3liUnJmX0pSMkZOQld6Y29Z
          // https://drive.google.com/uc?export=download&id=0B_7bPVufJ-j4ZTJISGRUb0pYb3liUnJmX0pSMkZOQld6Y29Z
          
          // https://drive.google.com/open?id=0B_7bPVufJ-j4R2NnUTNIWm55Tlk
          // https://drive.google.com/open?id=0B_7bPVufJ-j4b3ZiRFBPQkZZbXM
          // https://drive.google.com/uc?export=download&id=0B_7bPVufJ-j4b3ZiRFBPQkZZbXM
        },function(){
          // NOTE: onClose
        });
      }
    },
    // NOTE: <header> used in device, dataLink, dataContent
    header: {
      container:function(){
        return app.elementSelect('header');
      },
      lookup:function(e){
        /*
        // object.addEventListener("focus", function(){});
        var input = e.querySelector('input').addAttr('placeholder',app.localStorage.name.query.q||'search...');
        
        input.eventHandler("focus", function(){
          document.body.classList.add('lookup');
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
          // console.log('focus');
        });
        input.eventHandler("focusout", function(){
          document.body.classList.remove('lookup');
          // console.log('focusout');
        });
        e.eventHandler('submit', function(o){
          var qN={q:o.target.elements.q.value}, hash = app.config.hash;
          if (qN.q == hash.q && hash.page == o.target.name)qN.i=new Date().getTime();
          window.location.hash = qN.paramater([o.target.name]);
          // window.location.reload(true);
          o.preventDefault();
        });
        */
      }

    },
    // NOTE: <main> used in page
    main: {
      container:function(){
        return app.elementSelect('main');
      }
    },
    // NOTE: <footer> used in none
    footer: {
      container:function(){
        return app.elementSelect('footer');
      }
    },
    // Toggle:{},
    // NOTE: Common
    // =require script.Common.js
  });
}(scriptive("app")));