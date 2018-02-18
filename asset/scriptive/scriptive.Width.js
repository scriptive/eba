// Math.max(eMain.parentElement.offsetWidth,doc.body.offsetWidth)
// eWidthOffset = doc.documentElement.clientWidth;
eWidthOffset = Math.min(eMain.parentElement.offsetWidth,doc.documentElement.clientWidth);

if ((eWidthOffset - config.widthLeftover) <= config.widthMax) {
  config.widthMax = eWidthOffset - config.widthLeftover;
} else {
  config.widthMax = eWidthPanel;
}