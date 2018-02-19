if (!eMain) return;
// eDrag.add(new Hammer.Tap({enable: false}));
// eDrag.add(new Hammer.Tap({enable: $.open.check}));
// eDrag.on("tap", function(evt){
//   // eDrag.get('tap').set({ enable: false });
//   // eDrag.get('tap').set({ enable: true });
// },true);
var eDrag = new Hammer(config.mainActive?eMain.querySelector(config.mainActive):eMain);
eDrag.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, pointers: 0,threshold: 0 }));
eDrag.on("panstart", function(evt){
  // TODO: make is shorter
  requestParam={};
  // console.log(config.dragArea, $.has.left(evt.center.x),$.has.right(evt.center.x),$.has.left(evt.center.x) < config.dragArea);
  if (eMain.dataset[config.dataLeft] && config.dragArea > $.has.left(evt.center.x)) {
    $.has.panelOffset(eMain.dataset[config.dataLeft]);
  } else if (eMain.dataset[config.dataRight] && $.has.right(evt.center.x) < config.dragArea) {
    $.has.panelOffset(eMain.dataset[config.dataRight]);
  } else {
    offsetNormal=null;
  }
  if (offsetNormal) {
    requestParam.panel = panel.Current;
    // TODO: if more element exists
    // var id = eMain.dataset[offsetNormal];
    // panel.Button = doc.querySelector('[data-0="1"]'.replace("0", config.dataId).replace("1",id));

    $.has.panelButton(eMain.dataset[offsetNormal]);
    // panel.Current.style.zIndex = 2;
    // offsetReverse = (offsetNormal==lt)?rt:lt;
    if ($.has.slided(offsetNormal)) {
      // NOTE: Closing
      if ($.has.position(offsetReverse) < config.widthMin){
        // NOTE: just close?
        // panel.Current.style.zIndex = 1;
        // eMain.style[offsetNormal] = $.pixel(0);
        // eMain.style[offsetReverse] = $.pixel(0);
        // offsetNormal=false;
      } else {
        if ($.has.max()){
          // NOTE: if offsetOpposite gonna open there is not enought space
        } else {
          // NOTE: normal close
        }
      }
    } else {
      // NOTE: opening
      panel.Current.style.zIndex = 2;
      $.on(2);
    }
  }
},true).on("pan", function(e){
  if (offsetNormal) {
    var x = (offsetNormal == lt)?e.center.x:(eWidthOffset - e.center.x);
    requestParam.percentage = x/config.widthMax*100;
    if (requestParam.percentage > 0 && requestParam.percentage < 100) {
      panel.Toggle(x);
      $.on(4);
    }
  }
// },true).on("panmove", function(e){
  // console.log('panmove',e);
// },true).on("panleft", function(e){
// },true).on("panright", function(e){
// },true).on("panup", function(e){
// },true).on("pandown", function(e){
},true).on("panend", function(e){
  if (panel.Done()) $.on(3);
},true).on("pancancel", function(e){
  if (panel.Done()) $.on(3);
},true);