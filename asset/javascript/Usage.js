scriptive({}).ready(function(app,$){
  var doc = document, lmSB = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
  $('#clickTest').click(function(e) {
    console.log('clickTest',e.target);
  });
  app.extend({
    close:function(e){
      lmSB.style.opacity =1;
    },
    open:function(o){
      var OpenCounter = o.panel.querySelector('.OpenCounter');
      if (OpenCounter) {
        OpenCounter.innerHTML= parseInt(OpenCounter.innerHTML) + 1;
      }
      if (o.overlay === true){
        lmSB.style.opacity = 0.2;
      }
    },
    move:function(o){
      if (o.overlay === true){
        lmSB.style.opacity = parseFloat(1.0 - o.percentage/170).toFixed(2);
      }
    },
    error:function(){
      console.log('error',e);
    }
  });
});


(function (app) {
}(scriptive({})));


(function (app) {
  window.addEventListener('DOMContentLoaded', function() {
    var lmSB = document.getElementById("lCm").getElementsByClassName("lmSB")[0];
    app.panel();
    app.extend({
      ready:function(e){
        console.log('ready',e);
      }
    });
  });
}(scriptive({
  main:'#lCm',
  mainActive:'.lmSB',
  menu:'#lMn',
  open:'right'
})));



window.addEventListener('DOMContentLoaded', function() {
  var lmSB = document.getElementById("lCm").getElementsByClassName("lmSB")[0];
  // var lmSB = document.getElementById("lCm").querySelector(".lmSB");
  // scriptive('#clickTest').click();

  scriptive({
    main:'#lCm',
    mainActive:'.lmSB',
    menu:'#lMn',
    open:'right'
  }).extend({
    ready:function(e){
      console.log('ready',e);
    },
    close:function(e){
      lmSB.style.opacity =1;
    },
    open:function(o){
      var OpenCounter = o.panel.querySelector('.OpenCounter');
      if (OpenCounter) {
        OpenCounter.innerHTML= parseInt(OpenCounter.innerHTML) + 1;
      }
      if (o.overlay === true){
        lmSB.style.opacity = 0.2;
      }
    },
    move:function(o){
      if (o.overlay === true){
        lmSB.style.opacity = parseFloat(1.0 - o.percentage/170).toFixed(2);
      }
    },
    error:function(){
      console.log('error',e);
    },
  });
  scriptive().panel();
  scriptive('#clickTest').click(function(e) {
    console.log('clickTest',e.target);
  });

});