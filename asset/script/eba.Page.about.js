var ul = app.createElement('ul');
$(app.scContent).removeChild().appendChild(ul).addClass('about').appendChild('li').addClass('description').appendChild('p').addClass('desc').setContent(configuration.description);
$(local.name.setting.available).each(function(i,v) {
  var li = app.createElement('li');
  $(ul).appendChild(li);
  $(li).addClass(configuration.classname.available).appendChild('h3').setContent(v.name);
  $(li).appendChild('p').attr('data-title','Version').setContent(v.version);
  $(li).appendChild('p').setContent(v.desc);
  // $(li).appendChild('p').setContent(v.lang);
  if (v.hasOwnProperty('size')) {
    $(li).appendChild('p').attr('data-title','Size').setContent(v.size);
  } else {
    $(li).appendChild('p').attr('data-title','Size').setContent('...');
  }
});
resolve();