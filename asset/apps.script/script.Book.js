book:{
  get:function(timeStamp){
    // var param = {timeAttempt:timeStamp,sheetName:app.sheetName.book,sheetStore:app.sheetStore.book(),relational:{language:configuration.language}};
    return app.data.get({sheetName:app.sheetName.book,sheetStore:app.sheetStore.book(),relational:{language:configuration.language}});
  },
  home:function(timeStamp){
    this.get(timeStamp).progress(function(msg) {
      app.notification(msg);
    }).done(function(response) {
      app.book.list().progress(function(msg) {
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
    ul = $('<ul>',{class:'lt book'}).appendTo(app.container.scrollbar('book'));
    deferred.notify('Appending');
    $.each(app.sheet[app.sheetStore.book()].row, function( key, row ) {
      if (typeof row.i == 'object'){
        $('<li>',{id:row.i.id}).append(
          $('<div>',{class:'material-icons fixed'}).html('mode_edit').bind(configuration.handler, function(e){
            app.book.edit(row.i);
          }),
          $('<div>',{class:'context','data-num':row.i.id}).html(row.i.name)
        ).appendTo(ul);
      } else {
        $('<li>',{id:row.i}).append(
          $('<div>',{class:'material-icons fixed'}).html('text_fields').bind(configuration.handler, function(e){
            app.book.edit({timestamp:'',id:row.i,name:'',language:configuration.language});
          }),
          $('<div>',{class:'context','data-num':row.i}).html('Unknown')
        ).appendTo(ul);
      }
    });
    ul.promise().done(function() {
      deferred.resolve();
    });
    return deferred.promise();
  },
  add:function(){
    // NOTE: header add call this method
    var json=[];
    $.each(app.sheet[app.sheetStore.book()].row, function( key, row ) {
      if (typeof row.i == 'object'){
        json.push(row.i);
      } else {
        json.push({
          id:row.i,
          language:configuration.language,
          name:'Unknown',
        });
      }
    });
    app.notification(
      $('<form>').append(
        $('<div>').append(
          $('<p>').html('JSON'),
          $('<textarea>',{name:'data'}).html(JSON.stringify(json,null,'\t'))
        ),
        $('<div>',{class:'info'}).append(
          $('<input>',{type:'submit',name:'submit',value:'Import'}),
          $('<input>',{type:'button',name:'cancel',value:'Cancel'}).bind(configuration.handler, function(e) {
            app.notification();
          }),
          $('<p>',{class:'msg'}).html('Hehpihna tawh "name" value bekbek nang hoihsak dan in na modify ve lawm... adang value te a empty zenzen hang hihmun ah khiatna nei hi.'),
          $('<p>',{class:'notice'}).html('best: copy everything to your favorite IDE, make change then replace your fresh data with these and then, only then click Import!')
        )
      ).submit( function(event) {
        var status = true;
        try {
          app.book.data = JSON.parse($(this).find('textarea').val());
        } catch (e) {
          app.notification(e,true);
          status = false;
        } finally {
          if (status){
            app.book.import();
          }
        }
        event.preventDefault();
      })
    );
  },
  import:function(){
    var json=this.data, param = json.shift();
    param.sheetName=app.sheet[app.sheetStore.book()].column.i.option.relational;
    param.indexName={key:'timestamp'};
    if (param.timestamp)param.indexName.value=param.timestamp;
    if (json.length) {
      param.relational=true;
    } else {
      param.sheetStore = app.sheetStore.book();
      param.relational={language:configuration.language};
    }
    app.data.post(param).progress(function(msg) {
      app.notification(msg);
    }).done(function(res) {
      if (json.length) {
        app.book.import();
      } else {
        app.book.home(0);
      }
    }).fail(function(error) {
      app.notification(error);
    });
  },
  edit:function(row){
    app.notification(
      $('<form>').append(
        $('<div>').append(
          $('<p>').html('Name'),
          $('<input>',{type:'text',name:'name',placeholder:'Name',value:row.name})
        ),
        $('<div>').append(
          $('<input>',{type:'hidden',name:'id',value:row.id}),
          $('<input>',{type:'hidden',name:'language',value:row.language}),
          $('<input>',{type:'submit',name:'submit',value:'Edit'}),
          $('<input>',{type:'button',name:'cancel',value:'Cancel'}).bind(configuration.handler, function(e) {
            app.notification();
          })
        )
      ).submit( function(event) {
        var form = $(this),  
        inputs = form.find("input, select, button, textarea"), 
        formStatus = true,
        serialized = form.serializeArray(),
        param={
          timeAttempt:0, 
          sheetName:app.sheet[app.sheetStore.book()].column.i.option.relational,
          sheetStore:app.sheetStore.book(),
          indexName:{key:'timestamp',value:row.timestamp},
          relational:{language:row.language}
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
            }).done(function(res) {
              app.book.home(event.timestamp);
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
  }
},