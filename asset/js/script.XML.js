var configuration = app.config, dataSession=app.book, localId='language', localSession = app.localStorage.name, self=this;
// new app.xml(bId).open().then();
this.open=function(){
  return app.fileStorage.open({
    urlLocal: configuration.file.urlLocal.replace(/bId/,bId),
    readAs:'readAsText'
  });
};
/*
new app.xml(bId).download(function(){
  o.setAttribute('class','icon-loading animate-spin');
}).then(function(e){
  new app.xml(bId).save(e).then(function(){
    o.setAttribute('class','icon-ok offline');
  },function(){
    o.setAttribute('class','icon-attention offline');
  });
});
*/
this.download=function(progressCallback){
  // https://scriptive.github.io/eba/xml/bId.xml
  var xmlRequest={
    dir:JSON.parse(JSON.stringify(configuration.file.urlAPI)),
    request:function(url){
      return app.fileStorage.download({
        url: url,
        urlLocal: configuration.file.urlLocal.replace(/bId/,bId),
        before:function(xhr){
          xhr.overrideMimeType('text/xml; charset=utf-8');
        },
        progress: progressCallback
      });
    },
    process:function(successCallback,failCallback){
      var url = xmlRequest.dir.shift().replace(/bId/,bId);
      return xmlRequest.request(url).then(function(e){
        if (!e.xml)e.xml = new DOMParser().parseFromString(e.data,e.fileType);
        dataSession.file[bId]=e.xml;
        successCallback(e);
      },function(e){
        if (xmlRequest.dir.length){
          xmlRequest.process(successCallback,failCallback);
        } else {
          failCallback(e);
        }
      });
    }
  };
  // return new Promise(function(resolve, reject) {
  //   xmlRequest.process(resolve,reject);
  // });
  return new Promise(xmlRequest.process);
};
/*
new app.xml(bId).save({}).then(function(){
  o.setAttribute('class','icon-ok offline');
},function(){
  o.setAttribute('class','icon-attention offline');
});
*/
this.save=function(e){
  return new Promise(function(resolve, reject) {
    app.fileStorage.save(e).then(function(s){
      // console.log(dataSession[localId]);
      // localSession[localId][bId]=dataSession[localId][bId];
      if (dataSession.hasOwnProperty(localId) && dataSession[localId].hasOwnProperty(bId))localSession[localId][bId]=dataSession[localId][bId];
      // localSession[localId][bId]['info']={
      //   version:'abc',
      //   launched:'abc'
      // };

      new app.Content(bId).xml().then(function(e){
        e.information().then(function(e){
          // reader Done
          if (dataSession.hasOwnProperty(localId) && dataSession[localId].hasOwnProperty(bId)){
            localSession[localId][bId]['information']=e.information;
          } else {
            localSession[localId][bId]={
              name:e.information.name,
              updated:'0',
              information:e.information
            };
          }
        },function(e){
        });
      },function(e){

      }).then(function(){
        app.localStorage.update(localId);
        resolve(s);
      });

    },function(e){
      reject(e)
    });
  });
};
/*
new app.xml(bId).delete().then(function(){
  o.setAttribute('class','icon-ok offline');
},function(){
  o.setAttribute('class','icon-attention offline');
});
*/
this.delete=function(){
  return new Promise(function(resolve, reject) {
    app.fileStorage.delete({
      urlLocal: configuration.file.urlLocal.replace(/bId/,bId),
      fileNotFound: true
    }).then(function(e){
      
      delete localSession[localId][bId];
      app.localStorage.update(localId);
      resolve(e);
    },function(e){
      reject(e)
    });
  });
};
/*
new app.xml(bId).request(function(){
  // NOTE: progressCallback
}).then(function(e){
  xmlBible=e;
  resolve(responseBible);
},function(e){
  reject(e);
});
*/
// console.log(localSession[localId][bId],bId);
this.request=function(progressCallback){
  return new Promise(function(resolve, reject) {
    if (dataSession.file.hasOwnProperty(bId)){
      resolve(dataSession.file[bId]);
    } else if (localSession[localId].hasOwnProperty(bId)){
      self.open().then(function(e){
        e.xml = new DOMParser().parseFromString(e.fileContent,e.fileType);
        dataSession.file[bId]=e.xml;
        resolve(e.xml);
      },function(e){
        // console.log('open fail',e);
        self.delete().then(function(){
          reject(e);
        });
      });
      /*
      app.fileStorage.open({
        urlLocal: configuration.file.urlLocal.replace(/bId/,bId),
        readAs:'readAsText'
      }).then(function(e){
        e.xml = new DOMParser().parseFromString(e.fileContent,e.fileType);
        resolve(e.xml);
      },function(e){
        new app.xml(bId).delete().then(function(){
          reject(e);
        });
      });
      */
    } else {
      // TODO: progressCallback function(){}
      self.download(progressCallback).then(function(e){
        self.save(e).then(function(){
          console.log('save success');
        },function(){
          console.log('save fail');
        }).then(function(){
          resolve(e.xml);
        });
      },function(e){
        reject(e);
      });
      /*
      new app.xml(bId).download(progressCallback).then(function(e){
        new app.xml(bId).save(e).then(function(){
          console.log('saving success');
        },function(){
          console.log('saving fail');
        }).then(function(){
          resolve(e.xml);
        });
      },function(e){
        reject(e);
      });
      */
    }
  });
};