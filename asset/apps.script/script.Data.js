data:{
  age:{},
  timeAttempt:function(sheet){
    // return parseInt(timeAttempt - this.age[sheet]) >= 20000;
    return parseInt(Date.now() - this.age[sheet]) >= 20000;
  },
  get:function(param){
    var deferred = $.Deferred(),
    // timeAttempt = Math.round(param.timeAttempt),
    sheet = (param.hasOwnProperty('sheetStore'))?param.sheetStore:param.sheetName;
    deferred.notify('One moment please...');
    if (!this.age.hasOwnProperty(sheet))this.age[sheet]=0;
    if (app.sheet.hasOwnProperty(sheet) && configuration.freshData == 1){
      // NOTE: Single Admin. load data from memory if avaiable!
      deferred.resolve(app.sheet[sheet]);
    } else if (!app.sheet.hasOwnProperty(sheet) || this.timeAttempt(sheet)) {
      // NOTE: Multi Admin. load data from source!
      if (typeof google !== 'undefined') {
        google.script.run.withFailureHandler(function(error){
          deferred.reject(error);
        }).withSuccessHandler(function(response){
          if (typeof response == 'object' && response.hasOwnProperty('message')) {
            deferred.reject(response.message);
          } else {
            app.data.age[sheet] = Date.now();
            app.sheet[sheet]=response;
            deferred.resolve(response);
          }
        }).select(param);
      } else {
        // require script.Data.response.select.js
      }
    } else {
      // NOTE: Multi Admin. load data from memory because its seem to be updated!
      deferred.resolve(this.sheet[sheet]);
    }
    return deferred.promise();
  },
  search:function(param){
    var deferred = $.Deferred(),
    sheet = (param.hasOwnProperty('sheetStore'))?param.sheetStore:param.sheetName;
    deferred.notify('One moment please...');
    if (!this.age.hasOwnProperty(sheet))this.age[sheet]=0;
    if (app.sheet.hasOwnProperty(sheet) && configuration.freshData == 1){
      // NOTE: Single Admin. load data from memory if avaiable!
      deferred.resolve(app.sheet[sheet]);
    } else if (!app.sheet.hasOwnProperty(sheet) || this.timeAttempt(sheet)) {
      // NOTE: Multi Admin. load data from source!
      if (typeof google !== 'undefined') {
        google.script.run.withFailureHandler(function(error){
          deferred.reject(error);
        }).withSuccessHandler(function(response){
          if (typeof response == 'object' && response.hasOwnProperty('message')) {
            deferred.reject(response.message);
          } else {
            app.data.age[sheet] = Date.now();
            app.sheet[sheet]=response;
            deferred.resolve(response);
          }
        }).search(param);
      } else {
        // require script.Data.response.search.js
      }
    } else {
      // NOTE: Multi Admin. load data from memory because its seem to be updated!
      deferred.resolve(this.sheet[sheet]);
    }
    return deferred.promise();
  },
  post:function(param){
    var deferred = $.Deferred(),
    sheet = (param.hasOwnProperty('sheetStore'))?param.sheetStore:param.sheetName;
    deferred.notify('One moment please...');
    if (typeof google !== 'undefined') {
      google.script.run.withFailureHandler(function(error){
        deferred.reject(error);
      }).withSuccessHandler(function(response){
        if (typeof response == 'object' && response.hasOwnProperty('message')) {
          deferred.reject(response.message);
        } else {
          app.data.age[sheet] = Date.now();
          app.sheet[sheet]=response;
          deferred.resolve(response);
        }
      }).update(param);
    } else {
      // require script.Data.response.update.js
    }
    return deferred.promise();
  },
  userCheck:function(param){
    var deferred = $.Deferred();
    deferred.notify('One moment please...');
    if (typeof google !== 'undefined') {
      google.script.run.withFailureHandler(function(error){
        deferred.reject(error);
      }).withSuccessHandler(function(response){
        if (response.row[0].userStatus > 1){
          // NOTE: userApproved = 3, userProcess = 2
          app.sheet.currentUser=response;
          deferred.resolve(response);
        } else {
          // NOTE: userRegistration = 1, userRegistered = 0
          deferred.reject(response);
        }
      }).userCheck();
    } else {
      // require script.Data.response.userCheck.js
    }
    return deferred.promise();
  },
  userInvitation:function(param){
    var deferred = $.Deferred();
    deferred.notify('One moment please...');
    if (typeof google !== 'undefined') {
      google.script.run.withFailureHandler(function(error){
        deferred.reject(error);
      }).withSuccessHandler(function(response){
        deferred.resolve(response);
      }).userInvitation(param);
    } else {
      // require script.Data.response.userInvitation.js
    }
    return deferred.promise();
  }
}