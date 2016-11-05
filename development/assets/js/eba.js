/*!
    EBA -- Effortless bible analysis
    Version 1.0.0
    https://khensolomon.github.io/effortless-bible-analysis
    (c) 2016
*/
$(function() {
  var clickHandler = ('ontouchstart' in document.documentElement ? "click" : "click"); //touchstart
  window.eba ={
    navUA:navigator.userAgent,
    device: function() {
      var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry'];
      for(i in agents) {
        if(this.navUA.toLowerCase().indexOf(agents[i]) !== -1){
          return this.setting.device=agents[i];
        }
      }
      return 'desktop';
    },
    // =require eba.Delete.js
    setting:{
      // =require eba.Static.setting.js
    },
    db:{
      // =require eba.Static.db.js
    },
    xml:{
      // =require eba.Static.xml.js
    },
    page:{
      // =require eba.Static.page.js
    },
    watch:{
      go:function(page){
        if (!page || !eba.content.hasOwnProperty(page)){
          page = eba.db.name.query.page;
          if (!eba.content.hasOwnProperty(page)){
            page = 'menu';
          }
        }
        eba.layout.identity(page);
        return eba.content[page];
      },
      filter:function(evt){
        // if (evt.hasClass('active')){
        //   
        // }
        evt.toggleClass(eba.setting.classname.active);
      }
    },
    layout:{
      header:{
        change:function(q){
          var container=$( "<ul>" );
          if (eba.page[q].hasOwnProperty('header')){
            $.each(eba.page[q].header, function(k, v) {
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
              ).bind(clickHandler, function(e) {
                var into = $(this).attr("go");
                if (into) {
                  eba.watch.go(into)();
                } 
                // if ($(this).hasClass(eba.setting.classname.filter)) {
                //   eba.watch.filter($(this));
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
          eba.db.name.query.page=name;
          eba.db.update('query');
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
        $('body').addClass(eba.device()).promise().then(function() {
          deferred.notify('configuration');
          setTimeout(function() {
            var configuration = eba.db.select('setting',true);
            if(configuration.name.setting.hasOwnProperty('class')){
              $.each(configuration.name.setting.class, function(k, v) {
                $('body').addClass(v);
              });
            } else {
              configuration.name.setting.class={};
            }
            eba.db.select('bookmark',true);
            eba.db.select('query',true);
            eba.db.select('suggestion',true);
            eba.db.select('language',true);
          },200);
        }).then(function() {
          setTimeout(function() {
            deferred.notify('XML');
            eba.xml.get(null,function(evt){
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
            if (eba.setting.device) {
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
        var bookmarks = eba.db.name.bookmark;
        if (container.hasClass(eba.setting.classname.active)){
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
        container.toggleClass(eba.setting.classname.active).promise().done(function(){
          eba.db.update('bookmark');
        });
      },
      hasBookmark:function(category,book,chapter,verse){
        var bookmarks = eba.db.name.bookmark;
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
        // =require eba.Content.menu.js
      },
      setting:function(){
        // =require eba.Content.setting.js
      },
      language:function(){
        // =require eba.Content.language.js
      },
      about:function(){
        // =require eba.Content.about.js
      },
      category:function(){
        // =require eba.Content.category.js
      },
      verse:function(){
        // =require eba.Content.verse.js
      },
      search:function(){
        // =require eba.Content.search.js
      },
      bookmark:function(){
        // =require eba.Content.bookmark.js
      },
      daily:function(){
        // =require eba.Content.daily.js
      }
    }
  };
  // eba.init();
  // eba.init(1000).then(function(msg) {
  //   console.log('msg:', msg);
  // });
  eba.init().progress(function(msg){
    if ($.isNumeric(msg)){
      $("p").attr("title", msg+'%');
    } else {
      $("p").html(msg);
    }
  }).done(function(msg) {
    $('body').append($( "<header>" )).append(eba.layout.main.create()).promise().done(function() {
      $('.screen').fadeOut(500).promise().done(eba.watch.go());
    });
    // document.addEventListener('deviceready', function(){
    //   // deferred.notify(100).resolve('ready');
    // },false);
  }).fail(function(msg) {
    $("p").html(msg).addClass('blink');
  }).always(function(msg){
    $("p").html(msg);
  });
});
/*
// document.addEventListener('deviceready', this.onDeviceReady, false);
document.addEventListener('deviceready', function(event){
  console.log(cordova);
  // console.log(event);
  // console.log(device);
}, false);
*/