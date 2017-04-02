/*!
    eba -- Effortless bible analysis
    Version '1.0.0'
    https://scriptive.github.io/eba
    (c) 2016
*/
(function(app) {
  app.merge({
    initiate:function(){
      this.init().progress(function(msg) {
        if ($.isNumeric(msg)){
          app.notification("title", msg+'%');
        } else {
          app.notification(msg);
        }
      }).done(function(msg) {
        $('body').append($( "<header>" )).append(app.layout.main.create()).promise().done(function() {
          $('.screen').fadeOut(500).promise().done(app.watch.go());
        });
      }).fail(function(msg) {
        app.notification(msg).setAttribute('class','blink');
      }).always(function(msg){
        app.notification(msg);
      });
    },
    setting:{
      // =require script.Static.setting.js
    },
    xml:{
      // =require script.Static.xml.js
    },
    page:{
      // =require script.Static.page.js
    },
    watch:{
      go:function(page){
        if (!page || !app.content.hasOwnProperty(page)){
          page = app.localStorage.name.query.page;
          if (!app.content.hasOwnProperty(page)){
            page = 'menu';
          }
        }
        app.layout.identity(page);
        return app.content[page];
      },
      filter:function(evt){
        // if (evt.hasClass('active')){}
        evt.toggleClass(app.setting.classname.active);
      }
    },
    layout:{
      header:{
        change:function(q){
          var container=$( "<ul>" );
          if (app.page[q].hasOwnProperty('header')){
            $.each(app.page[q].header, function(k, v) {
              $( "<li>",v.attr).append(
                function(){
                  if (v.child){
                    var action = $(v.child.tag,v.child.attr);
                    return action.html(function(){
                      if (v.child.hasOwnProperty('job')){
                        return v.child.job(action);
                      }
                    });
                  }
                }
              ).bind(app.config.Handler, function(e) {
                var into = $(this).attr("go");
                if (into) {
                  app.watch.go(into)();
                } 
                // if ($(this).hasClass(app.setting.classname.filter)) {
                //   app.watch.filter($(this));
                // }
              }).appendTo(container);
            });
            return container;
          }
        }
      },
      main:{
        create: function(){
          return $( "<main>" ).append(
            $( "<div>",{class:'container active'} ).append(
              $( "<div>",{class:'msg'} ).append(
                // $( "<input>",{class:'msg'} ).append(
                //   'A moment please...'
                // )
              )
            )
          );
        }
      },
      footer: function(){
      },
      identity:function(name){
        $('body').attr('id',name);
        $('header').html(this.header.change(name)).promise().done(function(){
          app.localStorage.name.query.page=name;
          app.localStorage.update('query');
        });
      }
    },
    init: function(milliseconds) {
      /*
      device, setting, xml, prepare, done(success, fail, always)->{mesg}
      */
      var deferred = $.Deferred();
      deferred.notify('initiating');
      setTimeout(function() {
        $('body').addClass(app.config.Screen).promise().then(function() {
          deferred.notify('configuration');
          setTimeout(function() {
            var configuration = app.localStorage.select('setting');
            if(configuration.name.setting.hasOwnProperty('class')){
              $.each(configuration.name.setting.class, function(k, v) {
                $('body').addClass(v);
              });
            } else {
              configuration.name.setting.class={};
            }
            app.localStorage.select('bookmark').select('query').select('suggestion').select('language');
          },200);
        }).then(function() {
          setTimeout(function() {
            deferred.notify('XML');
            app.xml.get(null,function(evt){
              var done = 70;
              if (evt.lengthComputable) {
                done=Math.round(evt.loaded / evt.total * 70);
              } 
              deferred.notify(done);
            }).done(function(xml) {
              deferred.notify('Data');
            }).fail(function(response, error) {
              deferred.notify(90);
              if (response.statusText){
                deferred.reject(response.statusText);
              } else {
                deferred.reject(error);
              }
            });
          },400);
        }).then(function(){
          setTimeout(function() {
            if (app.config.Screen) {
              deferred.notify(90);
            } else {
              deferred.notify(99).reject('connecting to device');
            }
          },600);
        }).then(function() {
          /*
          setTimeout(function() {
            document.addEventListener('deviceready', function(){
              deferred.notify(100).resolve('ready');
            },false);
          },800);
          */
          /*
          document.addEventListener('deviceready', function(){
            deferred.notify(100).resolve('ready');
          }, function() {
            deferred.notify(99).reject('device is not suppport');
            console.log('what');
          });
          */
          setTimeout(function() {
            deferred.notify(100).resolve('ready');
          },800);
          $(document).on("submit", "form", function(event){
            event.preventDefault();
          });
        });
      }, 100);
      return deferred.promise();
    },
    msg:function(msg){
      if ($('div.msg').length) {
        $( "div.msg" ).fadeToggle( "fast", function() {
            $(this).html(msg);
        });
      } else {
        return $('<div>',{class:'msg'}).html(msg).prependTo('div.container');
      }
    },
    task:{
      bookmark:function(container,category,book,chapter,verse){
        var bookmarks = app.localStorage.name.bookmark;
        if (container.hasClass(app.setting.classname.active)){
         bookmarks[category][book][chapter].splice(bookmarks[category][book][chapter].indexOf(verse), 1);
         if (bookmarks[category][book][chapter].length <= 0) {
           delete bookmarks[category][book][chapter];
           if ($.isEmptyObject(bookmarks[category][book])){
             delete bookmarks[category][book];
             if ($.isEmptyObject(bookmarks[category])){
               delete bookmarks[category];
             }
           }
         }
         if (container.parent().hasClass('bookmark')) {
           container.fadeOut(300);
         }
        } else {
         if (!bookmarks.hasOwnProperty(category)){
           bookmarks[category]={};
         }
         if (!bookmarks[category].hasOwnProperty(book)){
           bookmarks[category][book]={};
         }
         if (!bookmarks[category][book].hasOwnProperty(chapter)){
           bookmarks[category][book][chapter]=[];
         }
         bookmarks[category][book][chapter].push(verse.toString());
        }
        container.toggleClass(app.setting.classname.active).promise().done(function(){
          app.localStorage.update('bookmark');
        });
      },
      hasBookmark:function(category,book,chapter,verse){
        var bookmarks = app.localStorage.name.bookmark;
        if (bookmarks.hasOwnProperty(category)){
          if (bookmarks[category].hasOwnProperty(book)){
            if (bookmarks[category][book].hasOwnProperty(chapter)){
              return ($.inArray(verse, bookmarks[category][book][chapter]) >= 0);
            }
          }
        }
      },
      textReplace:function(s,n){
        //TODO s.replace(/(([^\s]+\s\s*){20})(.*)/,"$1…")
        return ($.type(n) === "string"?s.replace(new RegExp(n, "gi"), '<b>$&</b>'):s);
      },
      numReplace:function(s){
        return s.replace(/\d+/g, '<sup>$&</sup>');
      }
    },
    content: {
      menu:function(){
        // =require script.Content.menu.js
      },
      setting:function(){
        // =require script.Content.setting.js
      },
      language:function(){
        // =require script.Content.language.js
      },
      about:function(){
        // =require script.Content.about.js
      },
      category:function(){
        // =require script.Content.category.js
      },
      verse:function(){
        // =require script.Content.verse.js
      },
      search:function(){
        // =require script.Content.search.js
      },
      bookmark:function(){
        // =require script.Content.bookmark.js
      },
      daily:function(){
        // =require script.Content.daily.js
      }
    }
  });
}(scriptive("eba")));