position:function(p){
  var x = eMain.style[p];
  return x?parseInt(x):0;
},
left:function(x){
  return ((x + eMain.offsetWidth) - (eMain.offsetWidth + $.has.position(lt)));
},
right:function(x){
  return (eMain.offsetWidth + $.has.position(lt)) - x;
},
panelOffset:function(id){
  panel.Current = doc.getElementById(id);
  offsetNormal=(panel.Current && panel.Current.dataset[config.dataOffset])?panel.Current.dataset[config.dataOffset]:false;
  if (offsetNormal) {
    offsetReverse = (offsetNormal==lt)?rt:lt;
    return true;
  }
},
panelButton:function(e){
  if (e instanceof Element){
    panel.Button = e;
  } else {
    // eMain.dataset[offsetNormal]
    panel.Button = doc.querySelector('[data-0="1"]'.replace("0", config.dataId).replace("1",e));
  }
},
slided:function(p){
  return $.has.position(p) == config.widthMax;
},
max:function(){
  return (eMain.offsetWidth - config.widthMax) <= config.widthMax;
},
min:function(){
  return eMain.offsetWidth <= config.widthMax;
},
main:function(e){
  if (!eMain && config.main) {
    eMain = (typeof config.main == 'string')?doc.querySelector(config.main):config.main;
    $.has.menu();
  }
},
menu:function(){
  if (!eMenu && config.menu) {
    eMenu = (typeof config.menu == 'string')?doc.querySelector(config.menu):config.menu;
  }
}