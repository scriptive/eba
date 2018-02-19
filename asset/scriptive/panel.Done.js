if (offsetNormal) {
  var w = ($.has.position(offsetNormal) > config.dragMin)?config.widthMax:config.widthMin;
  panel.Toggle(w);
  return w < 1;
}