var language = eba.db.name.language;
var query = eba.db.name.query;
var container = $( "<ul>",{class:'language'} ).appendTo($('div.container').empty());
$.each(eba.setting.language, function(k, v) {
  if(language.hasOwnProperty(k)){
    var activeStatusClass = eba.setting.classname.active;
  } else{
    var activeStatusClass = eba.setting.classname.inactive;
  }
  $( "<li>",{class:k}).addClass(activeStatusClass).append(
    $( "<p>",{class:'lang icon-flag-empty'}).append(v.name).bind(app.config.Handler, function(e) {
      if(language.hasOwnProperty(k)){
        query.language=k;
        eba.watch.go('category')(k);
      } else{
        eba.msg('Selected language is not activited!');
      }
    }),
    $( "<p>",{class:'download icon-'}).append($( "<span>",{text:'download'})).bind(app.config.Handler, function(e) {
      $(this).parent().toggleClass(eba.setting.classname.active).promise().done(function(){
        if(language.hasOwnProperty(k)){
          delete language[k];
          if (Object.keys(language)[0]){
            query.language = Object.keys(language)[0];
          } else {
            delete query.language;
          }
          // var languageChange = language[Object.keys(language)[0]];
          // if (languageChange){
          //   console.log(languageChange,Object.keys(language)[0]);
          //   query.language = languageChange;
          // } else {
          //   delete query.language;
          // }
        } else{
          query.language=k;
          language[k]={};
        }
        eba.db.update('query');
        eba.db.update('language');
      });
    })
  ).appendTo(container);
});