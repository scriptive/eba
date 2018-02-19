if (!eMenu) return;
new Hammer(eMenu).on('tap', function(evt) {
  var e = evt.target;
  requestParam={};
  // TODO: if e has children??
  if (e.dataset[config.dataId]) {
    $.has.panelButton(e);
    if ($.has.panelOffset(e.dataset[config.dataId])) {
      requestParam.panel=panel.Current;
      if ($.has.slided(offsetNormal)) {
        panel.Toggle(config.widthMin);
        $.on(3);
      } else {
        panel.Toggle(config.widthMax);
        $.on(2);
      }
    }
  }
});