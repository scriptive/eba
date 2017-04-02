var localQuery = local.name.query, 
  fO = {
    page: configuration.pageHome, book:'eba',category: 1, q:'', pagePrevious:configuration.pageHome,result: ''
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
      // console.log('configuration:',configuration.pagePrevious,'localQuery:',localQuery.pagePrevious,'current',localQuery.page);
    },
    q: function(i,n,d,o) {
      o[i] = decodeURIComponent(n);
    }
};
return new Promise(function(resolve, reject) {
  try {
    if (localQuery.isEmpty()){
      localQuery.merge(fO,configuration.hash);
    } else {
      fO.pagePrevious = localQuery.page;
      localQuery.merge(configuration.hash);
    }
    localQuery.each(function(i,v,o){if (fM.isFunction(i))fM[i](i,v,fO[i],o);});
    resolve();
  } catch (e) {
    reject(e);
  }
}).then(function() {
  local.update('query');
  return true;
}, function(e) {
  return e;
});