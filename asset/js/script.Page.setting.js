setting:function(resolve, reject){
  var configuration = app.config, 
  local = app.localStorage, 
  localSetting = local.name.setting, 
  ol=app.elementCreate('ol'),
  sizeNcolor={
    fontsize:{
      title:'font size',
      style:'body {font-size:$100%;}',
      option:{
        '80%':{title:'1',class:'size-small-extra'},
        '90%':{title:'2',class:'size-small'},
        '100%':{title:'3',class:'size-normal',defaults:true},
        '120%':{title:'4',class:'size-large'},
        '150%':{title:'5',class:'size-large-extra'}
      }
    },
    background:{
      title:'background color',
      style:'body {background-color:$white;}',
      option:{
        '#ffffff':{class:'color-white'},
        // '#e1e1e1':{class:'color-lightgray'},
        '#F8F8F8':{class:'color-lightgray',defaults:true},
        '#7f7f7f':{class:'color-dimgrey'},
        '#b97a59':{class:'color-chocolate'},
        '#880016':{class:'color-darkred'},
        '#ed1b24':{class:'color-red'},
        '#fef102':{class:'color-gold'},
        '#24b04d':{class:'color-green'},
        '#3f47cc':{class:'color-darkblue'}
      }
    }
  };
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-setting');
  if(!localSetting.hasOwnProperty('class')){localSetting.class={};}
  sizeNcolor.each(function(k, name) {
    var liParent = ol.appendChild(app.elementCreate('li'));
    liParent.appendChild(app.elementCreate('h3')).innerHTML=name.title;
    var container = liParent.appendChild(app.elementCreate('ol')).addClass(k);
    name.option.each(function(i,o){
      var li = container.appendChild(app.elementCreate('li')).addClass(o.class).addClass('icon-ok');
      if (o.hasOwnProperty('title')) li.addAttr('data-title',o.title);
      if(localSetting.class.hasOwnProperty(k)){
        var activeStatusClass = (localSetting.class[k]==o.class?configuration.classname.active:configuration.classname.inactive);
      } else if(o.hasOwnProperty('defaults')) {
        var activeStatusClass = configuration.classname.active;
      } else {
        var activeStatusClass = configuration.classname.inactive;
      }
      li.addClass(activeStatusClass).eventClick(function(event){
        // var style = name.style.replace(/(\$.*)(\;)/gi,i+'$2');console.log(style);
        var evt = event.target;
        if (!evt.hasClass(configuration.classname.active)){
          evt.parentNode.getElementsByClassName(configuration.classname.active).each(function(i,eCurrent){
            eCurrent.removeClass(configuration.classname.active);
          });
          evt.addClass(configuration.classname.active);
          if(localSetting.class.hasOwnProperty(k) && document.body.hasClass(localSetting.class[k]))document.body.removeClass(localSetting.class[k]);
          if(!document.body.hasClass(o.class))document.body.addClass(o.class);
          localSetting.class[k] = o.class;
          local.update('setting');
        }
      });
    });
  });
  resolve();
},