verse:{
  get:function(categoryId){
    // var param = {timeAttempt:timeStamp,sheetName:app.sheetName.verse,sheetStore:app.sheetStore.verse(),relational:{category:configuration.category}};
    // var param = {sheetName:app.sheetName.verse,sheetStore:app.sheetStore.verse(),relational:{category:id || configuration.category}};
    var id = categoryId || configuration.category;
    return app.data.search({sheetName:app.sheetName.verse,sheetStore:app.sheetStore.verse(id),relational:{category:id}});
  },
  home:function(timeStamp){
    app.data.get({timeAttempt:timeStamp,sheetName:app.sheetName.book,sheetStore:app.sheetStore.book(),relational:{language:configuration.language}}).progress(function() {
      app.notification('getting Book');
    }).done(function(response) {
      app.verse.get(configuration.category).progress(function() {
        app.notification('getting Category');
      }).done(function(response) {
        app.verse.list().progress(function(msg) {
          app.notification(msg);
        }).done(function() {
          app.notification();
        }).fail(function(error) {
          app.notification(error.message,true);
        });
      }).fail(function(error) {
        app.notification(error.message,true);
      });
    }).fail(function(error) {
      app.notification(error.message,true);
    });
  },
  list:function(){
    var deferred = $.Deferred(),
    ul = $('<ul>',{class:'lt verse'}).appendTo(app.container.scrollbar('verse'));
    deferred.notify('Appending');
    $.each(app.sheet[app.sheetStore.verse()].row, function( key, row ) {
      $('<li>',{id:row.timestamp}).append(
        $('<div>',{class:'material-icons fixed',title:'edit'}).html('mode_edit').bind(configuration.handler, function(e){
          app.verse.edit(row);
        }),
        $('<div>',{class:'material-icons fixed danger',title:'remove'}).html('remove').bind(configuration.handler, function(e){
          app.verse.delete(e.timestamp,row);
        }),
        $('<div>',{class:'context'}).html(app.verse.getBookname(row.book)+' '+row.chapter +':'+row.verse).bind(configuration.handler, function(e){
          // app.verse.home(0);
          // (app.sheet[app.sheetStore.book()].row row.book)
        })
      ).appendTo(ul);
    });
    ul.promise().done(function() {
      deferred.resolve();
    });
    return deferred.promise();
  },
  getBookname:function(bId){
    var bookName;
    $.each(app.sheet[app.sheetStore.book()].row, function( key, row ) {
      if (typeof row.i == 'object' && row.i.id == bId){
        bookName = row.i.name;
      } else if (row.i == bId) {
        bookName = 'Unknown';
      }
    });
    return bookName;
  },
  getBooklist:function(bId){
    /*
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
    */
    
    var selectName = $('<select>',{name:'book'});
    $.each(app.sheet[app.sheetStore.book()].row, function( key, row ) {
      var bookId,bookName;
      if (typeof row.i == 'object') {
        bookName = row.i.name;
        bookId = row.i.id;
      } else {
        bookName = 'Unknown';
        bookId = row.i;
      }
      var param = {value:bookId};
      if (bId && bookId == bId) param.selected='selected';
      // selected:(bookId === bId)?'selected':'none'
      // var selectId = (bId && bId == bookId)?'selected':'';
      $('<option>',param).html(bookName).appendTo(selectName);
    });
    return selectName;
  },
  add:function(){
    // NOTE: header add call this method
    app.notification(
      $('<form>').append(
        $('<div>').append(
          $('<p>').html('Book'),
          app.verse.getBooklist()
        ),
        // $('<div>').append(
        //   $('<p>').html('Book'),
        //   $('<input>',{type:'text',name:'book',placeholder:'Book'})
        // ),
        $('<div>').append(
          $('<p>').html('Chapter'),
          $('<input>',{type:'text',name:'chapter',placeholder:'Chapter'})
        ),
        $('<div>').append(
          $('<p>').html('Verse'),
          $('<input>',{type:'text',name:'verse',placeholder:'Verse'})
        ),
        $('<div>',{class:'info'}).append(
          // $('<input>',{type:'hidden',name:'tag',value:row.tag}),
          $('<input>',{type:'hidden',name:'category',value:configuration.category}),
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
        param={
          timeAttempt:0, 
          sheetName:app.sheetName.verse,
          indexName:{key:'timestamp'},
          sheetStore:app.sheetStore.verse(),
          relational:{category:configuration.category}
        };
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
              app.verse.home(event.timestamp);
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
      $('<form>').append(
        $('<div>').append(
          $('<p>').html('Book'),
          app.verse.getBooklist(row.book)
          // $('<input>',{type:'text',name:'book',placeholder:'Book',value:row.book})
        ),
        $('<div>').append(
          $('<p>').html('Chapter'),
          $('<input>',{type:'text',name:'chapter',placeholder:'Chapter',value:row.chapter})
        ),
        $('<div>').append(
          $('<p>').html('Verse'),
          $('<input>',{type:'text',name:'verse',placeholder:'Verse',value:row.verse})
        ),
        $('<div>').append(
          // $('<input>',{type:'hidden',name:'tag',value:row.tag}),
          $('<input>',{type:'hidden',name:'category',value:row.category}),
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
        // param={timeAttempt:0, sheetName:app.sheetName.category,indexName:{key:'id',value:row.id}};
        param={
          timeAttempt:0,
          sheetName:app.sheetName.verse,
          sheetStore:app.sheetStore.verse(row.category),
          indexName:{key:'timestamp',value:row.timestamp},
          relational:{category:row.category}
        };
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
              app.verse.home(event.timestamp);
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
    var param={
      timeAttempt:0, 
      sheetName:app.sheetName.verse,
      sheetStore:app.sheetStore.verse(row.category),
      indexName:{key:'timestamp',value:row.timestamp,task:'delete'},
      relational:{category:row.category}
    };
    app.data.post(param).progress(function(msg) {
      app.notification(msg);
    }).done(function() {
      app.verse.home(timestamp);
    }).fail(function(error) {
      app.notification(error.message,true);
    });
  }
},