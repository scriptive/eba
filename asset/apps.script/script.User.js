user:{
  home:function(timeStamp){
    // var currentUser = app.sheet.currentUser.row[0];
    // $('<ul>').append(
    //   $('<li>').append(
    //     $('<p>',{class:'msg'}).html(currentUser.message),
    //     $('<p>',{class:'reply'}).html(currentUser.reply)
    //   )
    // ).appendTo(app.container.scrollbar());
    // https://script.google.com/macros/s/AKfycbytDOI3TwaOpQWSM4z0rVvmfPndbb9PRIs_sW8F/exec
    // https://script.google.com/macros/s/AKfycbwRWaAAZdLmKHJBXy0efzsthWxlszSu_jngvW8AkHDJrOegDZw/exec
    // https://script.google.com/macros/s/AKfycbxSlpzb8Krc1j5vtHKRNYL8l69O5VUevTMDdoGp3g0/dev
    // https://script.google.com/macros/s/AKfycbwRWaAAZdLmKHJBXy0efzsthWxlszSu_jngvW8AkHDJrOegDZw/exec
    app.data.get({timeAttempt:timeStamp,sheetName:app.sheetName.user}).progress(function(msg) {
      app.notification(msg);
    }).done(function(response) {
      app.user.list().progress(function(msg) {
        app.notification(msg);
      }).done(function(msg) {
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
    ul = $('<ul>',{class:'lt user'}).appendTo(app.container.scrollbar('user')),
    currentUser = app.sheet.currentUser.row[0];
    deferred.notify('Appending');
    $.each(app.sheet.User.row, function( key, row ) {
      if (row.email == currentUser.email){
        currentUser=app.sheet.currentUser.row[0]=row;
        var userPermission=true;
      } else {
        var userPermission=false;
      }
      var adminPermission=currentUser.role == 7;
      var defaultPermission = 'other', classPermission = userPermission?'owner':adminPermission?'admin':defaultPermission;
      $('<li>',{id:row.email,class:classPermission}).append(
        $('<div>',{title:'Puahpha'}).addClass('material-icons fixed').html('mode_edit').bind(configuration.handler, function(e) {
          if (classPermission == defaultPermission) {
            app.notification('Editing permission is not granted!',true);
          } else {
            app.user.edit(row);
          }
        }),
        $('<div>',{class:'material-icons fixed danger',title:'Puahkhai'}).html('remove').bind(configuration.handler, function(e) {
          if (classPermission == defaultPermission) {
            app.notification('Deleting permission is not granted!',true);
          } else {
            app.user.delete(e.timestamp, row);
          }
        }),
        $('<div>',{title:'Puahkhai',class:adminPermission?'admin':'user'}).addClass('material-icons fixed gear').html('flag').bind(configuration.handler, function(e) {
          if (adminPermission) {
            app.user.gear(row);
          } else {
            app.notification('Request permission is not granted!',true);
          }
        }),
        $('<div>',{class:'context','data-name':row.email}).append(
          $('<span>').html(row.name).append(' : '),
          $('<span>').html(row.about)
        )
      ).appendTo(ul);
    });
    ul.promise().done(function() {
      deferred.notify(100).resolve('Ready');
    });
    return deferred.promise();
  },
  add:function(){
    // NOTE: header add call this method
    // timeStamp
    // console.log('add');
    // app.user.invitation();
    this.invitation();
  },
  gear:function(row){
    app.notification(
      $('<form>',{name:'invitation'}).append(
        $('<div>').append(
          $('<p>').html('Name'),
          $('<input>',{type:'text',name:'name',placeholder:'Name',value:row.name})
        ),
        $('<div>').append(
          $('<p>').html('About'),
          $('<textarea>',{name:'about',placeholder:'About'}).html(row.about)
        ),
        $('<div>').append(
          $('<p>').html('Role'),
          $('<input>',{type:'text',name:'role',placeholder:'Role',value:row.role})
        ),
        $('<div>').append(
          $('<p>').html('Message for ').append(row.name),
          $('<textarea>',{name:'message',placeholder:'Message'}).html(row.message)
        ),
        $('<div>').append(
          $('<input>',{type:'hidden',name:'email',value:row.email}),
          $('<input>',{type:'submit',name:'submit',value:'Submit'}),
          $('<input>',{type:'button',name:'cancel',value:'Cancel'}).bind(configuration.handler, function(e) {
            app.notification();
          })
        )
      ).submit( function(e) {
        // e.timestamp
        var form = $(this),  
        inputs = form.find("input, select, button, textarea"), 
        formStatus = true,
        serialized = form.serializeArray(),
        param={timeAttempt:0, sheetName:app.sheetName.user,indexName:{key:'email',value:row.email}};
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
            }).done(function(response) {
              app.user.home(e.timestamp);
            }).fail(function(error) {
              app.notification(error.message);
            });
          } else {
            form.find("input[name=name],textarea[name=about]").fadeTo('slow', 0.2).fadeTo('slow', 1.0).promise().done(inputs.prop("disabled", false));
          }
        });
        event.preventDefault();
      })
    );
  },
  edit:function(row){
    app.notification(
      $('<form>',{name:'invitation'}).append(
        $('<div>').append(
          $('<p>').html('Name'),
          $('<input>',{type:'text',name:'name',placeholder:'Name',value:row.name})
        ),
        $('<div>').append(
          $('<p>').html('About'),
          $('<textarea>',{name:'about',placeholder:'About'}).html(row.about)
        ),
        $('<div>').append(
          $('<input>',{type:'hidden',name:'email',value:row.email}),
          $('<input>',{type:'submit',name:'submit',value:'Submit'}),
          $('<input>',{type:'button',name:'cancel',value:'Cancel'}).bind(configuration.handler, function(e) {
            app.notification();
          })
        )
      ).submit( function(e) {
        // e.timestamp
        var form = $(this),  
        inputs = form.find("input, select, button, textarea"), 
        formStatus = true,
        serialized = form.serializeArray(),
        param={timeAttempt:0, sheetName:app.sheetName.user,indexName:{key:'email',value:row.email}};
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
            }).done(function(response) {
              app.user.home(e.timestamp);
            }).fail(function(error) {
              app.notification(error.message);
            });
          } else {
            form.find("input[name=name],textarea[name=about]").fadeTo('slow', 0.2).fadeTo('slow', 1.0).promise().done(inputs.prop("disabled", false));
          }
        });
        event.preventDefault();
      })
    );
  },
  view:function(row){
  },
  delete:function(timestamp, row){
    app.data.post({indexName:{key:'email',value:row.email,task:'delete'},timeAttempt:timestamp, sheetName:app.sheetName.user}).progress(function(msg) {
      app.notification(msg);
    }).done(function(response) {
      app.user.home(timestamp);
      // app.user.home().progress(function(msg) {
      //   app.notification(msg);
      // }).done(function(msg) {
      //   app.notification();
      // }).fail(function(error) {
      //   app.notification(error.message,true);
      // });
    }).fail(function(error) {
      app.notification(error.message,true);
    });
  },
  registration:function(query){
    var user = query.row[0];
    var task=[
      {question:'Li leh Giat gawm', answer:'12'},
      {question:'Nih leh Nga gawm', answer:'7'},
      {question:'Nga leh Sawm gawm', answer:'15'},
      {question:'Kua leh Li gawm', answer:'13'}
    ];
    var taskKey = Math.floor(Math.random() * task.length);
    // configuration.name
    app.notification(
      $('<form>',{name:'registration'}).append(
        $('<h1>').html('Registration'),
        $('<div>').append(
          $('<p>').html('Name'),
          $('<input>',{type:'text',name:'name',placeholder:'Name'})
        ),
        $('<div>').append(
          $('<p>').html('About'),
          $('<textarea>',{name:'about',placeholder:'How do we know you that you are interested in participating?'})
        ),
        $('<div>',{class:'task'}).append(
          $('<p>').append(
            'What is "', $('<b>').html(task[taskKey].question),'"?'
          ),
          $('<input>',{type:'text',name:'task',placeholder:'Task'})
        ),
        $('<div>',{class:'info'}).append(
          $('<input>',{type:'submit',name:'submit',value:'Register'}),
          $('<p>',{class:'msg'}).html(user.message),
          $('<p>',{class:'notice'}).html(user.userNotices)
        )
      ).submit( function(event ) {
        // event.timestamp
        var form = $(this),  
        inputs = form.find("input, select, button, textarea"), 
        formStatus = true,
        serialized = form.serializeArray(),
        formTask = form.find('input[name=task]'),
        param={timeAttempt:0, sheetName:app.sheetName.user,indexName:{key:'email',value:user.email}, email:user.email, name:'',role:3,about:'',message:''};
        inputs.prop("disabled", true);
        if (formTask.val() == task[taskKey].answer){
          $.when.apply($, serialized.map(function(item) {
            if (query.column.name.indexOf(item.name) > -1){
              if (item.value){
                param[item.name]=item.value;
              } else {
                formStatus = false;
              }
            }
          })).then(function() {
            if (formStatus){
              app.data.post(param).progress(function(msg) {
                app.notification(msg);
              }).done(function(response) {
                app.start();
              }).fail(function(error) {
                app.notification(error.message);
              });
            } else {
              form.find("input[name=name],textarea[name=about]").fadeTo('slow', 0.2).fadeTo('slow', 1.0).promise().done(inputs.prop("disabled", false));
            }
          });
        } else {
          formTask.fadeTo('slow', 0.2).fadeTo('slow', 1.0);
          inputs.prop("disabled", false);
        }
        event.preventDefault();
      })
    );
  },
  invitation:function(){
    app.notification(
      $('<form>',{name:'invitation'}).append(
        $('<div>').append(
          $('<p>').html('Email'),
          $('<input>',{type:'text',name:'email',placeholder:'Email'})
        ),
        $('<div>').append(
          $('<p>').html('Name'),
          $('<input>',{type:'text',name:'name',placeholder:'Name'})
        ),
        $('<div>').append(
          $('<p>').html('Message'),
          $('<textarea>',{name:'message',placeholder:'Message?'})
        ),
        $('<div>',{class:'info'}).append(
          $('<input>',{type:'submit',name:'submit',value:'Invite'}),
          $('<input>',{type:'button',name:'cancel',value:'Cancel'}).bind(configuration.handler, function(e) {
            app.notification();
          }),
          $('<p>',{class:'msg'})
        )
      ).submit( function(event ) {
        // event.timestamp
        var form = $(this), Message = form.find('p.msg'), serialized = form.serializeArray(), inputs = form.find("input, select, button, textarea"), param={};
        inputs.prop("disabled", true);
        $.when.apply($, serialized.map(function(item) {
          param[item.name]=item.value;
        })).then(function() {
          app.data.userInvitation(param).progress(function(msg) {
            Message.html(msg);
          }).done(function(response) {
            Message.html(response);
          }).fail(function(error) {
            Message.html(error.message);
          }).always(function(){
            inputs.prop("disabled", false);
          });
        });
        event.preventDefault();
      })
    );
  },
  form:{
    create:function(row){
    },
    menu:function(container){
    },
    input:function(row,container){
    },
    submit:function(form){   
    }
  }
},