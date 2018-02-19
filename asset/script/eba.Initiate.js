configuration.pageHome=Object.keys(configuration.page)[0];
var process = function() {
  // =require eba.Initiate.process.js
};
var template = function(e) {
  // =require eba.Initiate.template.js
};
var terminal = function() {
  // =require eba.Initiate.terminal.js
};
var route = function() {
  // =require eba.Initiate.route.js
};
// {"class":{"fontsize":"size-normal","background":"color-white"}}
// {"version":"1.0.0","build":"1.0.1","class":{"fontsize":"size-normal","background":"color-white"}}
new Promise(function(resolve, reject) {
  process().then(function(){
    doc.body.classList.add('config_Screen');
    if(local.name.setting.hasOwnProperty('class')){
      $(local.name.setting.class).each(function(i,v){
        doc.body.classList.add(v);
      });
    } else {
      local.name.setting.class={};
    }
    if(local.name.setting.hasOwnProperty('available')){
      // available
    } else {
      local.name.setting.available={};
    }
    return template();
  },function(e){
    return e;
  }).then(function(e) {
    if (e) {
      reject(e);
    } else {
      resolve();
    }
  });
}).then(function() {
  $(configPanel).intPanel(function(s){
    var lmSB = document.getElementById("lCm").getElementsByClassName("lmSB")[0];
    s.open(function(o){
      // console.log(o);
      var ul = o.panel.querySelector('ul');

      $(ul).removeChild();
      $(configuration.page).each(function(i,v){
        if (v.name) {
          $(ul).appendChild('li').addClass(i).toggleClass('active',local.name.query.page==i).appendChild('a').attr('href','#'+i).setContent(v.name)
        }
      });
      // var OpenCounter = o.panel.querySelector('.OpenCounter');
      // if (OpenCounter) {
      //   OpenCounter.innerHTML= parseInt(OpenCounter.innerHTML) + 1;
      // }
      if (o.overlay === true){
        lmSB.style.opacity = 0.2;
      }
    });
    s.close(function(){
      lmSB.style.opacity =1;
    });
    s.drag(function(o){
      if (o.overlay === true){
        lmSB.style.opacity = parseFloat(1.0 - o.percentage/170).toFixed(2);
      }
    });
  });
  app.resizeEvent(function(){
  });
  app.hashChange(function(e) {
    if(e)configuration.hash=e;
    // configuration.hash=e;
    terminal().then(function(e) {
      // NOTE: if page error
      if (e)console.log('page error',e);
    });
  });
  var searchForm = document.querySelector('form.search');

  if (searchForm) {
    // var searchInput = searchForm.querySelector('input#sch');
    // // console.log(searchInput);
    // searchInput.addEventListener("focus", function(){
    //   console.log('focus');
    // });
    // searchInput.addEventListener("blur", function(evt){
    //   console.log('blur');
    // });
    // searchForm.addEventListener("submit", function(evt){
    //   console.log('submit');
    //
    //   // window.location.hash = {q:q,i:new Date().getTime()}.paramater(['#lookupresult'])
    //   window.location.hash = 'result?q='+searchInput.value+'&i='+new Date().getTime();
    //   // console.log(searchInput.value);
    //   evt.preventDefault();
    // });
    // searchInput.addEventListener("focusin", function(){
    //   console.log('focusin');
    // });
    // searchInput.addEventListener("focusout", function(){
    //   console.log('focusout');
    // });
  }

}, function(e) {
  if (typeof e === 'object' && e.hasOwnProperty('message')) {
    app.notification(e.message);
  } else if (typeof e === 'string') {
    app.notification(e);
  }
});