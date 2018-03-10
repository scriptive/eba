// console.log(app.scMain);
// console.log(app.scMenu);
// console.log(app.scContent);
// console.log(app.scPanelCurrent);

var ul = $('ul').addClass('contact about');
$(app.scContent).html(ul);
var info = configuration.information;
console.log(app,$);

for (var id in info) {
  if (info.hasOwnProperty(id)) {
    var name = info[id];
    var li = $('li').addClass(id);
    if (app.isString(name)){
      li.appendChild(
        $('p').html(name)
      ).appendTo(ul);
    } else {
      for (var i in name) {
        if (name.hasOwnProperty(i)) {
          li.appendChild(
            $('p').attr('data-title',name[i].name).html(name[i].desc)
          ).appendTo(ul);
        }
      }
    }
  }
}

return resolve();