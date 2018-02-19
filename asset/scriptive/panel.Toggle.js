if (x <= config.widthMax){
  if (x <= config.widthMin) {
    eMain.style[offsetNormal] = $.pixel(config.widthMin);
    if(panel.Current)panel.Current.style.zIndex = 1;
    if(panel.Button)panel.Button.classList.remove(config.classActive);
    eMain.classList.remove(config.classOverlay);
    if ($.has.position(offsetReverse) < config.widthMin){
      eMain.style[offsetReverse] = $.pixel(config.widthMin);
    }
  } else {
    if(panel.Current)panel.Current.style.zIndex = 2;
    eMain.style[offsetNormal] = $.pixel(x);
    if ($.has.max()){
      if ((doc.body.offsetWidth - config.widthMax) <= config.widthMax){
        eMain.style[offsetReverse] = $.pixel(Math.abs(x) * -1);
        requestParam.overlay=true;
        if (x == config.widthMax) {
          eMain.classList.add(config.classOverlay);
          panel.Close();
        }
      } else {
        // NOTE: just Close other Panel, because screen isn't wide enought for both
        eMain.style[offsetReverse] = $.pixel(config.widthMin);
      }
      if(panel.Button)$.toggleClass(panel.Button);
      if(panel.Current)panel.Current.style.maxWidth =  $.pixel(config.widthMax);
    } else {
      // NOTE: screen is wide enought for both
      if(panel.Button)panel.Button.classList.add(config.classActive);
    }

    // if(panel.Current)panel.Current.style.zIndex = 2;
    // eMain.style[offsetNormal] = $.pixel(x);
    // if ($.has.max()){
    //   eMain.style[offsetReverse] = $.pixel(config.widthMin);
    //   if ($.has.min()){
    //     // NOTE:Close
    //     requestParam.overlay=true;
    //     eMain.style[offsetReverse] = $.pixel(Math.abs(x) * -1);
    //     if (x == config.widthMax) {
    //       eMain.classList.add(config.classOverlay);
    //     }
    //   }
    //   $.toggleClass(panel.Button);
    //   if(panel.Current)panel.Current.style.maxWidth =  $.pixel(config.widthMax);
    // } else {
    //   // NOTE: screen is wide enought for both
    //   if(panel.Button)panel.Button.classList.add(config.classActive);
    // }
  }
}