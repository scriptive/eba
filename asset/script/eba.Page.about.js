var ul = $('ul').addClass('about');
$(app.scContent).html(ul);

ul.appendChild(
  $('li').appendChild(
    $('p').html(configuration.description).addClass('desc')
  ).addClass('description')
);

$(local.name.setting.available).each(function(v,i) {
  ul.appendChild(
    $('li').appendChild(
      $('h3').html(v.name),
      $('p').attr('data-title','Version').html(v.version),
      $('p').html(v.desc),
      $('p').attr('data-title','Size').html(v.hasOwnProperty('size')?v.size:'...')
    ).addClass(configuration.classname.available)
  );
});
resolve();