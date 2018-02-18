if (!eMenu) return;
new Hammer(eMenu).on('tap', function(evt) {
  var e = evt.target;
  requestParam={};
  // TODO: if e has children??
  if (e.dataset[config.dataId]) {
    $.has.panelButton(e);
    if ($.has.panelOffset(e.dataset[config.dataId])) {
      requestParam.panel=$.panel;
      if ($.has.slided(offsetNormal)) {
        $.open.toggle(config.widthMin);
        $.on(3);
      } else {
        // $.panel.style.zIndex = 2;
        $.open.toggle(config.widthMax);
        $.on(2);
      }
    }
  }
});