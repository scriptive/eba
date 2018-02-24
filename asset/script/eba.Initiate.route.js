var availableLanguage=Object.keys(local.name.setting.available),
  fO = {
    // page: configuration.pageHome, book:'eba',category: 1, q:'', pagePrevious:configuration.pageHome,result: ''
    page: configuration.pageHome, language:availableLanguage[0],testament:1,category: 1, q:'', pagePrevious:configuration.pageHome,result: ''
  },
  fM = {
    page: function(i,n,d,o) {
      o[i] = configuration.page.hasOwnProperty(n.toLowerCase())?n.toLowerCase():d;
    },
    pagePrevious: function(i,n,d,o) {
      if (o[i] && configuration.page.hasOwnProperty(o[i])){
        if (d != o.page) {
          o[i]=(configuration.page[d].id <= configuration.page[o.page].id)?d:configuration.pageHome;
        }
      } else {
        o[i]=d;
      }
      configuration[i]= o[i];
    },
    language:function(i,n,d,o){
      if (availableLanguage.length){
        if (!$(availableLanguage).inArray(n))configuration[i]= o[d];
        if (local.name.query.hasOwnProperty('pageBlock')) delete local.name.query.pageBlock;
      } else {
        local.name.query.page = configuration.pageHome;
        local.name.query.pageBlock = 1;
      }
    },
    q: function(i,n,d,o) {
      o[i] = decodeURIComponent(n);
    }
};
return new Promise(function(resolve, reject) {
  try {
    if ($(local.name.query).isEmpty()){
      $(local.name.query).merge(fO,app.hashObject);
    } else {
      fO.pagePrevious = local.name.query.page;
      $(local.name.query).merge(app.hashObject);
    }
    $(local.name.query).each(function(i,v,o){
      if (fM[i] instanceof Function) fM[i](i,v,fO[i],o);
      // if (fM.isFunction(i))fM[i](i,v,fO[i],o);
    });
    resolve();
  } catch (e) {
    reject(e);
  }
});