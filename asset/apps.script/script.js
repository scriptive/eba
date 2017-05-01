$(function() {
  // https://script.google.com/macros/s/AKfycbwRWaAAZdLmKHJBXy0efzsthWxlszSu_jngvW8AkHDJrOegDZw/exec
  var doc = document, xmlDoc, xmlBible;
  var configuration={
    handler:('ontouchstart' in doc.documentElement)? "touchstart" : "click",
    // name:'EBA'
    name:'Effortless bible analysis',
    page:{
      language:{
        name:'Language'
      },
      category:{
        name:'Category'
      },
      testament:{
        name:'Testament'
      },
      book:{
        name:'Book'
      },
      verse:{
        name:'Verse'
      },
      user:{
        name:'User'
      },
      export:{
        name:'Export'
      }
    },
    language:1,
    category:1,
    testament:1,
    book:1,
    freshData:1
  };
  var app={
    container:{
      main:function(){
        return $('main');
      },
      scrollbar:function(className){
        return this.main().html($('<div>').addClass(className?className:'scrollbar')).children();
      }
    },
    notification:function(message,confirm) {
      var container = $('div#dialog');
      if (message){
        container.html(
          $('<ul>').append(
            $( "<li>").append(message)
          )
        ).promise().done(function() {
          if (confirm) {
            confirm = typeof (confirm) =='string'?confirm:'Ok';
            $(this).children().children().append(
              $("<div>",{class:"action"}).append(
                $("<p>",{class:"close"}).html(confirm).bind(configuration.handler, function(){
                  container.empty();
                })
              )
            );
          }
        });
      } else {
        container.empty();
      }
      return container;
    },
    start:function(){
      this.data.userCheck().progress(function(msg) {
        app.notification(msg);
      }).done(function(response) {
        $('body').append(
          $('<div>',{class:'main'}).append(
            $('<nav>',{style:'display:none'}).append(
              $('<dl>').append(
                $('<dt>').append(
                  $('<p>').html('Effortless bible analysis')
                ),
                $('<dd>')
                // $('<dd>').append(app.nav())
              )
            ),
            $('<header>').append(
              $('<ul>').append(
                $('<li>',{class:'fixed'}).append(
                  $('<p>',{class:'material-icons',title:'Panel'}).html('menu').bind(configuration.handler, function() {
                    var e = $('nav');
                    // var navContent = $('nav dl dd');
                    e.addClass('slide').show("slide", {direction: "left" }, 350).promise().done(function(){
                      app.nav();
                      e.removeClass('slide').bind(configuration.handler, function(evt) {
                        if (!$( evt.target ).closest(e.children()).length)e.addClass('slide').hide("slide", {direction: "left" }, 250);
                        evt.stopPropagation();
                      });
                    });
                  })
                ),
                $('<li>',{class:'title'}),
                $('<li>',{class:'fixed user',title:'User'}).append(
                  $('<p>',{class:'material-icons'}).html('person').bind(configuration.handler, function(evt) {
                    var e = $(this), container=e.parent();
                    var currentUser = app.sheet.currentUser.row[0];
                    var removeContainer=function(evt){
                      e.removeClass('active');
                      e.next().remove().promise().done(function(){
                        $('body').unbind(configuration.handler, closestContainer);
                      });
                    };
                    var closestContainer=function(evt){
                      if (!$( evt.target ).closest( container ).length)removeContainer();
                      evt.stopPropagation();
                    };
                    if (e.next().length){
                      removeContainer();
                    } else {
                      container.append(
                        $('<ul>').append(
                          $('<li>').append(
                            $('<p>',{'data-icon':'fingerprint'}).html(currentUser.email),
                            $('<p>',{class:'name'}).html(currentUser.name),
                            $('<p>',{class:'msg'}).html(currentUser.message),
                            $('<p>',{class:'reply'}).html(currentUser.reply)
                          )
                        )
                      ).promise().done(function(){
                        e.addClass('active');
                        $('body').bind(configuration.handler, closestContainer);
                      });
                    }
                  })
                ),
                $('<li>',{class:'fixed addnew',title:'Add'}).append(
                  $('<p>',{class:'material-icons'}).html('add').bind(configuration.handler, function() {
                    var fn = app.container.main().children().attr('class');
                    if (fn){
                      fn = fn.split(' ')[0];
                      // if (app.add.hasOwnProperty(fn))app.add[fn]();
                      if (app[fn].hasOwnProperty('add'))app[fn].add();
                    }
                  })
                )
              )
            ),
            $('<main>')
          )
        ).promise().done(function(e) {
          app.notification('Getting ready...');
          app.data.get({timeAttempt:0,sheetName:app.sheetName.user}).progress(function(msg) {
            app.notification(msg);
          }).done(function(response) {
            app.user.home(0);
          }).fail(function(error) {
            app.notification(error.message,true);
          });
        });
      }).fail(function(error) {
        if (error.message) {
          app.notification(error.message);
        } else {
          var user = error.row[0];
          if (user.userStatus == 1) {
            // userRegistration
            app.user.registration(error);
          } else {
            // userRegistered but require approval, or probabbly banned!
            app.notification(user.message);
          }
        }
      });
    },
    nav:function(){
      var ul = $('nav dl dd').html($('<ul>')).children();
      // var ul = $('<ul>');
      for (var i in configuration.page) {
        if (configuration.page.hasOwnProperty(i)) {
          if (app.hasOwnProperty(i) && app[i].hasOwnProperty('home') ){
            var dataNum=(configuration.hasOwnProperty(i))?configuration[i]:'';
            $('<li>').append(
              $('<p>',{class:i,'data-num':dataNum}).html(configuration.page[i].name).bind(configuration.handler, function(evt) {
                // evt.timestamp
                var fn=$(this).attr('class');
                if (app.hasOwnProperty(fn) && app[fn].hasOwnProperty('home')) {
                  app[fn].home();
                  $('nav').addClass('slide').hide("slide", {direction: "left" }, 250);
                }
              })
            ).appendTo(ul);
          }
        }
      }
      $('<li>').append(
        $('<p>',{class:i,'data-num':'#'}).html((configuration.freshData == 1)?'Single Admin':'Multi Admin').bind(configuration.handler, function(evt) {
          if (configuration.freshData == 1) {
            configuration.freshData = 2;
            $(this).html('Multi Admin');
          } else {
            configuration.freshData = 1;
            $(this).html('Single Admin');
          }
          $(this).attr('data-num','#');
        })
      ).appendTo(ul);
      return ul;
    },
    sheet:{},
    sheetName:{
      language:'Language', 
      category:'Category', 
      testament:'Testament', 
      book:'Book', 
      tag:'Tag', 
      verse:'Verse', 
      user:'User'
    },
    sheetStore:{
      testament:function(e){
        return "1.0".replace(/0/, app.sheetName.testament).replace(/1/, e || configuration.language);
        // return app.sheetName.testament;
      },
      book:function(e){
        return "1.0".replace(/0/, app.sheetName.book).replace(/1/, e || configuration.language);
        // return app.sheetName.book;
      },
      category:function(e){
        return "1.0".replace(/0/, app.sheetName.category).replace(/1/, e || configuration.language);
        // return app.sheetName.category;
      },
      verse:function(e){
        return "1.0".replace(/0/, app.sheetName.verse).replace(/1/, e || configuration.category);
        // return app.sheetName.verse;
      }
    },
    // =require script.Language.js
    // =require script.Export.js
    // =require script.Category.js
    // =require script.Testament.js
    // =require script.Book.js
    // =require script.Verse.js
    // =require script.User.js
    // =require script.Data.js
  };
  app.start();
});