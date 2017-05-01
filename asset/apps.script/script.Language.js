language:{
  home:function(timeStamp){
    app.data.get({timeAttempt:timeStamp,sheetName:app.sheetName.language}).progress(function(msg) {
      app.notification(msg);
    }).done(function(response) {
      app.language.list().progress(function(msg) {
        app.notification(msg);
      }).done(function() {
        app.notification();
      }).fail(function(error) {
        app.notification(error.message,true);
      });
    }).fail(function(error) {
      app.notification(error.message,true);
    });
  },
  list:function(){
    var deferred = $.Deferred(),
    ul = $('<ul>',{class:'lt language'}).appendTo(app.container.scrollbar('language'));
    deferred.notify('Appending');
    $.each(app.sheet.Language.row, function( key, row ) {
      $('<li>',{id:row.id}).append(
        $('<div>',{class:'material-icons fixed',title:'edit'}).html('mode_edit').bind(configuration.handler, function(e){
          app.language.edit(row);
        }),
        $('<div>',{class:'material-icons fixed danger',title:'remove'}).html('remove').bind(configuration.handler, function(e){
          app.language.delete(e.timestamp,row);
        }),
        $('<div>',{class:'context','data-name':row.name}).html(row.desc).bind(configuration.handler, function(e){
          configuration.language=row.id;
          app.category.home();
        }),
        $('<div>',{class:'material-icons fixed',title:'Testament'}).html('bubble_chart').bind(configuration.handler, function(e){
          configuration.language=row.id;
          app.testament.home();
        }),
        $('<div>',{class:'material-icons fixed',title:'Book'}).html('timeline').bind(configuration.handler, function(e){
          configuration.language=row.id;
          app.book.home();
        })
      ).appendTo(ul);
    });
    ul.promise().done(function() {
      deferred.resolve();
    });
    return deferred.promise();
  },
  add:function(){
    // NOTE: header add call this method
    app.notification(
      $('<form>',{name:'language'}).append(
        $('<div>').append(
          $('<p>').html('Id Numeric'),
          $('<input>',{type:'text',name:'id',placeholder:'Id'})
        ),
        $('<div>').append(
          $('<p>').html('Name'),
          $('<input>',{type:'text',name:'name',placeholder:'Name'})
        ),
        $('<div>').append(
          $('<p>').html('Description'),
          $('<textarea>',{name:'desc',placeholder:'Description'})
        ),
        $('<div>').append(
          $('<p>').html('Language'),
          $('<input>',{type:'text',name:'lang',placeholder:'Language'})
        ),
        $('<div>',{class:'info'}).append(
          $('<input>',{type:'submit',name:'submit',value:'Add'}),
          $('<input>',{type:'button',name:'cancel',value:'Cancel'}).bind(configuration.handler, function(e) {
            app.notification();
          })
        )
      ).submit( function(event ) {
        // event.timestamp
        var form = $(this), 
        formStatus = true,
        serialized = form.serializeArray(), 
        inputs = form.find("input, select, button, textarea"), 
        param={sheetName:app.sheetName.language,indexName:{key:'id'}};
        inputs.prop("disabled", true);
        $.when.apply($, serialized.map(function(item) {
          if (item.value){
            param[item.name]=item.value;
          } else {
            formStatus = false;
          }
        })).then(function() {
          if (formStatus){
            app.data.post(param).progress(function(msg) {
              app.notification(msg);
            }).done(function() {
              app.language.home(event.timestamp);
            }).fail(function(error) {
              app.notification(error);
            });
          } else {
            inputs.fadeTo(0, 0.2).fadeTo(100, 1.0).promise().done(inputs.prop("disabled", false));
          }
        });
        event.preventDefault();
      })
    );
  },
  edit:function(row){
    app.notification(
      $('<form>',{name:'language'}).append(
        $('<div>').append(
          $('<p>').html('Name'),
          $('<input>',{type:'text',name:'name',placeholder:'Name',value:row.name})
        ),
        $('<div>').append(
          $('<p>').html('Description'),
          $('<textarea>',{name:'desc',placeholder:'Description'}).html(row.desc)
        ),
        $('<div>').append(
          $('<p>').html('Language'),
          $('<input>',{type:'text',name:'lang',placeholder:'Language',value:row.lang})
        ),
        $('<div>').append(
          $('<input>',{type:'hidden',name:'id',value:row.id}),
          $('<input>',{type:'submit',name:'submit',value:'Edit'}),
          $('<input>',{type:'button',name:'cancel',value:'Cancel'}).bind(configuration.handler, function(e) {
            app.notification();
          })
        )
      ).submit( function(event) {
        // e.timestamp
        var form = $(this),  
        inputs = form.find("input, select, button, textarea"), 
        formStatus = true,
        serialized = form.serializeArray(),
        param={timeAttempt:0, sheetName:app.sheetName.language,indexName:{key:'id',value:row.id}};
        inputs.prop("disabled", true);
        $.when.apply($, serialized.map(function(item) {
          if (item.value){
            param[item.name]=item.value;
          } else {
            formStatus = false;
          }
        })).then(function() {
          if (formStatus){
            app.data.post(param).progress(function(msg) {
              app.notification(msg);
            }).done(function() {
              app.language.home(event.timestamp);
            }).fail(function(error) {
              app.notification(error);
            });
          } else {
            inputs.fadeTo(0, 0.2).fadeTo(100, 1.0).promise().done(inputs.prop("disabled", false));
          }
        });
        event.preventDefault();
      })
    );
  },
  // view:function(row){},
  delete:function(timestamp, row){
    app.data.post({indexName:{key:'id',value:row.id,task:'delete'},timeAttempt:timestamp, sheetName:app.sheetName.language}).progress(function(msg) {
      app.notification(msg);
    }).done(function() {
      app.language.home(timestamp);
    }).fail(function(error) {
      app.notification(error.message,true);
    });
  }
},