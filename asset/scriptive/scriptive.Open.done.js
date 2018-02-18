if (offsetNormal) {
  var w = ($.has.position(offsetNormal) > config.dragMin)?config.widthMax:config.widthMin;
  $.open.toggle(w);
  return w < 1;
}