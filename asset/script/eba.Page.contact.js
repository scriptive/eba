// resolve();
var container = doc.getElementById("lCm").getElementsByClassName("scSB")[0];

$(container).removeChild();
var ul=app.createElement('ul');
container.appendChild(ul).setAttribute('class','about');

// var info={
//   email:'supereffortless@gmail.com',
//   introduction:'Please give proper title/subject for your email.',
//   // lists:[
//   //   'Advice',
//   //   'Broken Report',
//   //   'Copyrights',
//   //   'Discussion',
//   //   'Donation',
//   //   'Mistaken Verse',
//   //   'Question'
//   // ],
//   list:[
//     {name:'Advice',desc:'xxxxxxx'},
//     {name:'Broken Report',desc:'xxxxxxx'},
//     {name:'Copyrights',desc:'xxxxxxx'},
//     {name:'Discussion',desc:'xxxxxxx'},
//     {name:'Donation',desc:'xxxxxxx'},
//     {name:'Mistaken Verse',desc:'xxxxxxx'},
//     {name:'Question',desc:'xxxxxxx'}
//   ],
//   conclusion:'You will be replied as soon as possible.'
// };
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