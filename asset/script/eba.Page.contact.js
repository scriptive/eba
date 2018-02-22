// resolve();
var container = doc.getElementById("lCm").getElementsByClassName("scSB")[0];

$(container).removeChild();
var ul=app.createElement('ul');
container.appendChild(ul).setAttribute('class','about');

var info = configuration.information;
ul.appendChild(app.createElement('li')).innerHTML=info.email;
ul.appendChild(app.createElement('li')).innerHTML=info.introduction;

// var li = $(ul).appendChild('li');
var li=app.createElement('li');

$(ul).appendChild(li);
$(info.list).each(function(i,v) {
  $(li).appendChild('p').attr('data-title',v.name).setContent(v.desc);
});
ul.appendChild(app.createElement('li')).innerHTML=info.conclusion;
resolve();