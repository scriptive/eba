scriptive({}).ready(function(app,$){
  var doc = document, scSB = doc.getElementById("lCm").getElementsByClassName("scSB")[0];
  $('#clickTest').click(function(e) {
    console.log('clickTest',e.target);
  });
  app.extend({
    close:function(e){
      scSB.style.opacity =1;
    },
    open:function(o){
      var OpenCounter = o.panel.querySelector('.OpenCounter');
      if (OpenCounter) {
        OpenCounter.innerHTML= parseInt(OpenCounter.innerHTML) + 1;
      }
      if (o.overlay === true){
        scSB.style.opacity = 0.2;
      }
    },
    move:function(o){
      if (o.overlay === true){
        scSB.style.opacity = parseFloat(1.0 - o.percentage/170).toFixed(2);
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
    var scSB = document.getElementById("lCm").getElementsByClassName("scSB")[0];
    app.panel();
    app.extend({
      ready:function(e){
        console.log('ready',e);
      }
    });
  });
}(scriptive({
  main:'#lCm',
  mainActive:'.scSB',
  menu:'#lMn',
  open:'right'
})));



window.addEventListener('DOMContentLoaded', function() {
  var scSB = document.getElementById("lCm").getElementsByClassName("scSB")[0];
  // var scSB = document.getElementById("lCm").querySelector(".scSB");
  // scriptive('#clickTest').click();

  scriptive({
    main:'#lCm',
    mainActive:'.scSB',
    menu:'#lMn',
    open:'right'
  }).extend({
    ready:function(e){
      console.log('ready',e);
    },
    close:function(e){
      scSB.style.opacity =1;
    },
    open:function(o){
      var OpenCounter = o.panel.querySelector('.OpenCounter');
      if (OpenCounter) {
        OpenCounter.innerHTML= parseInt(OpenCounter.innerHTML) + 1;
      }
      if (o.overlay === true){
        scSB.style.opacity = 0.2;
      }
    },
    move:function(o){
      if (o.overlay === true){
        scSB.style.opacity = parseFloat(1.0 - o.percentage/170).toFixed(2);
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