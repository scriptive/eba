if (x <= config.widthMax){
  if (x <= config.widthMin) {
    eMain.style[offsetNormal] = $.pixel(config.widthMin);
    if($.panel)$.panel.style.zIndex = 1;
    if($.button)$.button.classList.remove(config.classActive);
    eMain.classList.remove(config.classOverlay);
    if ($.has.position(offsetReverse) < config.widthMin){
      eMain.style[offsetReverse] = $.pixel(config.widthMin);
    }
  } else {
    if($.panel)$.panel.style.zIndex = 2;
    eMain.style[offsetNormal] = $.pixel(x);
    if ($.has.max()){
      eMain.style[offsetReverse] = $.pixel(config.widthMin);
      if ($.has.min()){
        // NOTE:Close
        requestParam.overlay=true;
        eMain.style[offsetReverse] = $.pixel(Math.abs(x) * -1);
        if (x == config.widthMax) {
          eMain.classList.add(config.classOverlay);
        }
      }
      $.toggleClass($.button);
      if($.panel)$.panel.style.maxWidth =  $.pixel(config.widthMax);
    } else {
      // NOTE: screen is wide enought for both
      if($.button)$.button.classList.add(config.classActive);
    }
  }
}