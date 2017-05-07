contact:function(resolve, reject){
  var configuration = app.config,local = app.localStorage, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-information');
  
  var info={
    email:'supereffortless@gmail.com',
    introduction:'Please give proper title/subject for your email.',
    list:[
      'Advice',
      'Broken Report',
      'Copyrights',
      'Discussion',
      'Donation',
      'Mistaken Verse',
      'Question'
    ],
    conclusion:'You will be replied as soon as possible.'
  };
  ol.appendChild(app.elementCreate('li')).innerHTML=info.email;
  ol.appendChild(app.elementCreate('li')).innerHTML=info.introduction;
  
  var li = ol.appendChild(app.elementCreate('li'));
  info.list.each(function(i,v) {
    li.appendChild(app.elementCreate('p')).addAttr('data-title',v).innerHTML='xxxxxxx';
  });
  ol.appendChild(app.elementCreate('li')).innerHTML=info.conclusion;
  resolve();
}


/*
Email: supereffortless@gmail.com
Please give proper title/subject for your email.

Advice
Broken Report
Copyrights
Discussion
Donation
Mistaken Verse
Question
etc.

You will be replied as soon as possible.
*/