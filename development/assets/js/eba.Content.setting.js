var options={
  fontsize:{
    title:'font size',
    style:'body {font-size:$100%;}',
    option:{
      '80%':{title:'1',class:'size-small-extra'},
      '90%':{title:'2',class:'size-small'},
      '100%':{title:'3',class:'size-normal'},
      '120%':{title:'4',class:'size-large'},
      '150%':{title:'5',class:'size-large-extra'}
    }
  },
  background:{
    title:'background color',
    style:'body {background-color:$white;}',
    option:{
      '#ffffff':{class:'color-white'},
      '#e1e1e1':{class:'color-lightgray'},
      '#7f7f7f':{class:'color-dimgrey'},
      '#b97a59':{class:'color-chocolate'},
      '#880016':{class:'color-darkred'},
      '#ed1b24':{class:'color-red'},
      '#fef102':{class:'color-gold'},
      '#24b04d':{class:'color-green'},
      '#3f47cc':{class:'color-darkblue'}
    }
  }
}
var container = $( "<ul>",{class:'setting'} ).appendTo($('div.container').empty());
// var db = eba.db.select('css',true);
var configuration = eba.db.select('setting',true);
if(!configuration.name.setting.hasOwnProperty('class')){configuration.name.setting.class={};}
$.each(options, function(k, setting) {
  $( "<li>",{class:'title'}).append(
    setting.title
  ).appendTo(container);
  $( "<li>",{class:k}).append(function(){
    var childContainer = $(this);
    $.each(setting.option, function(x, y) {
      if(configuration.name.setting.class.hasOwnProperty(k)){
        var activeStatusClass = (configuration.name.setting.class[k]==y.class?eba.setting.classname.active:eba.setting.classname.inactive);
      } else {
        var activeStatusClass = eba.setting.classname.inactive;
      }
      $( "<span>",y).addClass('icon-').addClass(activeStatusClass).bind(clickHandler, function(e) {
        // var style = setting.style.replace(/(\$.*)(\;)/gi,x+'$2');
        $(this).addClass(eba.setting.classname.active).siblings().removeClass(eba.setting.classname.active);
        if(configuration.name.setting.class.hasOwnProperty(k)){
          if($('body').hasClass(configuration.name.setting.class[k])){
            $('body').removeClass(configuration.name.setting.class[k]);
          }
        }
        if(!$('body').hasClass(y.class)){
          $('body').addClass(y.class);
        }
        configuration.name.setting.class[k] = y.class;
        configuration.update('setting');
      }).appendTo(childContainer);
    });
  }).appendTo(container);
});