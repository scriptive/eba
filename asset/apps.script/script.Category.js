category:{
  get:function(timeStamp){
    // var param = {timeAttempt:timeStamp,sheetName:app.sheetName.category,sheetStore:app.sheetStore.category(),relational:{language:configuration.language}};
    return app.data.get({sheetName:app.sheetName.category,sheetStore:app.sheetStore.category(),relational:{language:configuration.language}});
  },
  home:function(timeStamp){
    this.get(timeStamp).progress(function(msg) {
      app.notification(msg);
    }).done(function(response) {
      app.category.list().progress(function(msg) {
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
    ul = $('<ul>',{class:'lt category'}).appendTo(app.container.scrollbar('category'));
    deferred.notify('Appending');
    // .slice(0).sort(function(a,b) {return a.sort - b.sort;})
    // app.sheet[app.sheetStore.category()].row
    $.each(app.sheet[app.sheetStore.category()].row.slice(0).sort(function(a,b) {return a.i.sort - b.i.sort;}), function( key, row ) {
      // row.i.constructor === Object
      if (typeof row.i == 'object'){
        $('<li>',{id:row.i.id}).append(
          $('<div>',{class:'material-icons fixed',title:'edit'}).html('mode_edit').bind(configuration.handler, function(e){
            app.category.edit(row.i);
          }),
          $('<div>',{class:'material-icons fixed danger',title:'remove'}).html('remove').bind(configuration.handler, function(e){
            app.category.delete(e.timestamp,row.i);
          }),
          $('<div>',{class:'context','data-name':row.i.name}).html(row.i.desc).bind(configuration.handler, function(e){
            configuration.category=row.i.id;
            app.verse.home(0);
          }),
          $('<div>',{class:'fixed num'}).append($('<p>').html(row.i.id))
        ).appendTo(ul);
      } else {
        $('<li>',{id:row.i}).append(
          $('<div>',{class:'material-icons fixed',title:'edit'}).html('text_fields').bind(configuration.handler, function(e){
            app.category.edit({timestamp:'',id:row.i,language:configuration.language,name:'',desc:''});
          }),
          $('<div>',{class:'material-icons fixed',title:'remove'}).html('remove').bind(configuration.handler, function(e){
            app.notification('None exists row can not be removed',true);
          }),
          $('<div>',{class:'context','data-name':'Unknown'}).html('Unknown').bind(configuration.handler, function(e){
            configuration.category=row.i;
            app.verse.home(0);
          }),
          $('<div>',{class:'fixed num'}).append($('<p>').html(row.i))
        ).appendTo(ul);
      }
    });
    ul.promise().done(function() {
      deferred.resolve();
    });
    return deferred.promise();
  },
  addImport:function(){
    // NOTE: header add call this method
    var json=[];
    $.each(app.sheet[app.sheetStore.category()].row, function( key, row ) {
      if (typeof row.i == 'object'){
        json.push(row.i);
      } else {
        json.push({
          id:row.i,
          language:configuration.language,
          sort:1,
          group:1,
          name:'Unknown',
          desc:'Unknown'
        });
      }
    });
    app.notification(
      $('<form>').append(
        $('<div>').append(
          $('<textarea>',{name:'data'}).html(JSON.stringify(json,null,'\t'))
        ),
        $('<div>',{class:'info'}).append(
          $('<input>',{type:'submit',name:'submit',value:'Import'}),
          $('<input>',{type:'button',name:'cancel',value:'Cancel'}).bind(configuration.handler, function(e) {
            app.notification();
          }),
          $('<p>',{class:'msg'}).html('Sort, Group, Name and Desc are yours!')
        )
      ).submit( function(event) {
        var status = true;
        try {
          app.category.data = JSON.parse($(this).find('textarea').val());
        } catch (e) {
          app.notification(e,true);
          status = false;
        } finally {
          if (status){
            app.category.import();
          }
        }
        event.preventDefault();
      })
    );
  },
  import:function(){
    var json=this.data, param = json.shift();
    param.sheetName=app.sheet[app.sheetStore.category()].column.i.option.relational;
    param.indexName={key:'timestamp'};
    if (param.timestamp)param.indexName.value=param.timestamp;
    if (json.length) {
      param.relational=true;
    } else {
      param.relational={language:configuration.language};
      param.sheetStore = app.sheetStore.category();
    }
    app.data.post(param).progress(function(msg) {
      app.notification(msg);
    }).done(function(res) {
      if (json.length) {
        app.category.import();
      } else {
        app.category.home(0);
      }
    }).fail(function(error) {
      app.notification(error);
    });
  },
  add:function(){
    // NOTE: header add call this method
    app.notification(
      $('<form>').append(
        $('<div>').append(
          $('<p>').html('Id Numeric'),
          $('<input>',{type:'text',name:'id',placeholder:'Id'})
        ),
        $('<div>').append(
          $('<p>').html('Name'),
          $('<input>',{type:'text',name:'name',placeholder:'Name'})
        ),
        $('<div>').append(
          $('<p>').html('Sort Numeric'),
          $('<input>',{type:'text',name:'sort',placeholder:'Sort'})
        ),
        $('<div>').append(
          $('<p>').html('Group'),
          $('<input>',{type:'text',name:'group',placeholder:'Group'})
        ),
        $('<div>').append(
          $('<p>').html('Description'),
          $('<textarea>',{name:'desc',placeholder:'Description'})
        ),
        $('<div>',{class:'info'}).append(
          // $('<input>',{type:'hidden',name:'id',value:row.id}),
          $('<input>',{type:'hidden',name:'language',value:configuration.language}),
          $('<input>',{type:'submit',name:'submit',value:'Add'}),
          $('<input>',{type:'button',name:'cancel',value:'Cancel'}).bind(configuration.handler, function(e) {
            app.notification();
          }),
          $('<input>',{type:'button',name:'import',value:'JSON'}).bind(configuration.handler, function(e) {
            app.category.addImport();
          }),
          $('<p>',{class:'notice'}).html('JSON button will take you to where you would be working with JSON data!')
        )
      ).submit( function(event ) {
        // event.timestamp
        var form = $(this), 
        formStatus = true,
        serialized = form.serializeArray(), 
        inputs = form.find("input, select, button, textarea"), 
        // param={sheetName:app.sheetName.category,indexName:{key:'id'}};
        param={
          timeAttempt:0, 
          sheetName:app.sheet[app.sheetStore.category()].column.i.option.relational,
          sheetStore:app.sheetStore.category(),
          indexName:{key:'timestamp'},
          relational:{language:configuration.language}
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
            // app.data.post(param).progress(function(msg) {
            //   app.notification(msg);
            // }).done(function() {
            //   app.category.home(event.timestamp);
            // }).fail(function(error) {
            //   app.notification(error);
            // });
            app.data.post({sheetName:app.sheetName.category,indexName:{key:'i'},i:param.id}).progress(function(msg) {
              app.notification(msg);
            }).done(function() {
              app.data.post(param).progress(function(msg) {
                app.notification(msg);
              }).done(function() {
                app.category.home(event.timestamp);
              }).fail(function(error) {
                app.notification(error);
              });
            }).fail(function(error) {
              app.notification(error.message,true);
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
          $('<p>').html('Name'),
          $('<input>',{type:'text',name:'name',placeholder:'Name',value:row.name})
        ),
        $('<div>').append(
          $('<p>').html('Sort Numeric'),
          $('<input>',{type:'text',name:'sort',placeholder:'Sort',value:row.sort})
        ),
        $('<div>').append(
          $('<p>').html('Group'),
          $('<input>',{type:'text',name:'group',placeholder:'Group',value:row.group})
        ),
        $('<div>').append(
          $('<p>').html('Description'),
          $('<textarea>',{name:'desc',placeholder:'Description'}).html(row.desc)
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
        // e.timestamp
        var form = $(this),  
        inputs = form.find("input, select, button, textarea"), 
        formStatus = true,
        serialized = form.serializeArray(),
        // param={timeAttempt:0, sheetName:app.sheetName.category,indexName:{key:'id',value:row.id}};
        param={
          timeAttempt:0, 
          sheetName:app.sheet[app.sheetStore.category()].column.i.option.relational,
          sheetStore:app.sheetStore.category(),
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
            }).done(function() {
              app.category.home(event.timestamp);
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
      sheetName:app.sheet[app.sheetStore.category()].column.i.option.relational,
      sheetStore:app.sheetStore.category(),
      indexName:{key:'timestamp',value:row.timestamp,task:'delete'},
      relational:{language:row.language}
    };
    app.data.post({sheetName:app.sheetName.category,indexName:{key:'i',value:row.id,task:'delete'}}).progress(function(msg) {
      app.notification(msg);
    }).done(function() {
      app.data.post(param).progress(function(msg) {
        app.notification(msg);
      }).done(function() {
        app.category.home(timestamp);
      }).fail(function(error) {
        app.notification(error.message,true);
      });
    }).fail(function(error) {
      app.notification(error.message,true);
    });
  }
},