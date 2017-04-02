data:{
  // test:[1,2,3]
},
set: function(id,val){
  Object.defineProperty(this.data, id, {
    value: val
  });
},
remove: function(){
},
import: function(url,file){
  app.setting.language[file]={
    xml:file,
    name:'(?) '+file+' temp',
    description:'Unknown'
  };
  return this.load(url,file);
},
get: function(file,callback){
  if (!file) {
    if (Object.keys(this.data)[0]){
      file = Object.keys(this.data)[0];
      console.log(file);
    } else {
      file = Object.keys(app.setting.language)[0];
    }
  }
  if(this.data.hasOwnProperty(file)){
    var deferred = $.Deferred();
    if (callback){ callback(); }
    deferred.resolve(app.xml.data[file]);
    return deferred.promise();
    // if (callback){ callback(); }
    // this.done=function(callback){
    //   return callback(app.xml.data[file]);
    // };
    // return deferred;
  } else{
    return this.load('db',file,callback);
  }  
},
load: function(url,file,callback){
  return $.ajax({
    // ?zomi=developer
    type:'GET',url:'url/file.xml'.replace('url', url).replace('file', app.setting.language[file].xml),cache:false,dataType:'xml',
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      if (callback){
        xhr.addEventListener("progress", callback, false);
      }
      return xhr;
    }
  }).done(function(xml) {
    app.xml.set(file,xml);
  })
  .fail(function() {
  })
  .always(function() {
  });
  // var xmlDoc = $.parseXML(xml), xml = $(xmlDoc);
  // $(this).attr("title"); $(this).text(); $(this).find('description').text();
}