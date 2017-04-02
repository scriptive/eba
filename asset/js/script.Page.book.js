book:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, localBook = local.name.book, ol=app.elementCreate('ol');
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-book');
  
  app.book.all.each(function(i,v) {
    var li = ol.appendChild(app.elementCreate('li'));
    var activeClass = (localBook.hasOwnProperty(i) && localBook[i].id.hasOwnProperty('local'))?'icon-ok offline':'icon-cloud online';
    var dv1 = li.appendChild(app.elementCreate('div'));
    dv1.eventClick(function(event){
      var o = event.target; 
      if (o.classList.contains("offline")){
        app.Toggle.dialog(function(container){
          // NOTE: Open
          var p=container.appendChild(app.elementCreate('p'));
          p.innerHTML=configuration.lang.isLocalRemove.replace('{is}',v.name);
        },function(container){
          return new app.xml(i).delete().then(function(){
            if (localBook[i].hasOwnProperty('name')){
              delete localBook[i];
              o.parentNode.removeElement();
              local.update('book');
            } else {
              o.addAttr('class','icon-cloud online');
            }
          });
        });
      } else {
        var temp = o.parentNode.firstElementChild.nextElementSibling;
        new app.xml(i).download(function(){
          o.addAttr('class','icon-loading animate-spin');
        }).then(function(e){
          new app.xml(i).save(e).then(function(){
            o.addAttr('class','icon-ok offline');
          },function(){
            o.addAttr('class','icon-attention offline');
          });
        },function(){
          o.addAttr('class','icon-cloud online');
        });
      }
    }).addAttr('class',activeClass);
    var dv2 = li.appendChild(app.elementCreate('div'));
    dv2.addAttr('data-description',v.description).eventClick(function(){
      // console.log('main',{book:i}.paramater(['#catalog']));
      window.location.hash = {book:i}.paramater(['#catalog']);
    }).innerHTML=v.name;
  });
  var validateXML = function(xml) {
    
    return new Promise(function(resolve, reject) {
      var txt = "", h3OK = 1;
      
      function checkErrorXML(x) {
        txt = "", h3OK = 1;
        return checkXML(x);
      }
      
      function checkXML(n) {
        var i, nam = n.nodeName;
        if (nam == "h3") {
          if (h3OK == 0) return;
          h3OK = 0
        }
        if (nam == "#text") txt = n.nodeValue;
        for (i = 0; i < n.childNodes.length; i++) {
          checkXML(n.childNodes[i]);
        }
      }
      if (document.implementation.createDocument) {
        // code for Mozilla, Firefox, Opera, etc.
        try {
          var xmlDoc = new DOMParser().parseFromString(xml, "application/xml");
        } catch (e) {
          return reject(e.message);
        }
        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
          checkErrorXML(xmlDoc.getElementsByTagName("parsererror")[0]);
          reject(txt);
        } else {
          resolve(xmlDoc);
        }
      } else {
        reject('Your browser cannot handle XML validation');
      }
    });
  }
  var uploadElement = app.elementCreate('ol').addClass('main-upload');
  uploadElement.appendChild(app.elementCreate('li')).addContent('This section might not work on mobile devices, and testing purpose only!');
  uploadElement.appendChild(app.elementCreate('li')).appendChild(app.elementCreate('input')).addAttr('type','file').addAttr('id','file').addAttr('name','file').addAttr('accept','.xml').eventHandler('change',function(e){
    var par = e.target.parentNode.parentNode;
    var msgContainer = par.firstChild;
    var olContainer = par.parentNode.firstChild;
    // console.log(olContainer);
    var file = e.target.files[0];
    var fileId = file.name.replace(/\.[^/.]+$/, "");
    // NOTE: file.name, file.type, file.size, file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString():''
    // console.log(file);
    var reader = new FileReader();
    reader.onerror = function(e) {
      console.log('error', e);
    };
    reader.onprogress = function(e) {
      // console.log(e);
    };
    reader.onabort = function(e) {
      // console.log(e);
    };
    reader.onloadstart = function(e) {
      // document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(x) {
      validateXML(x.target.result).then(function(e){
        // console.log(fileId);
        var xmlInfo = e.querySelector('eba info');
        // var fileObject={
        //   filename:file.name,
        //   name: xmlInfo.querySelector('name').innerHTML,
        //   description: xmlInfo.querySelector('desc').innerHTML
        // };
        
        // console.log(fileObject);
        localBook[fileId]={
          id:{
            local:true
          },
          name: xmlInfo.querySelector('name').innerHTML,
          description: xmlInfo.querySelector('desc').innerHTML
        };
        app.book.all[fileId]=localBook[fileId];
        local.update('book');
        var hashObj={
          i:new Date().getTime()
        };
        // window.location.hash = hashObj.paramater('#book');
        // console.log(new Date().toLocaleString());
        // console.log(new Date().getTime());
        app.fileStorage.save({
          // urlLocal: 'directory/filename.txt',
          urlLocal: configuration.file.urlLocal.replace(/bId/,fileId),
          // blob: new Blob([e.target.result], {type: file.type}),
          data: x.target.result,
          // fileContent: 'this is plain text',
          fileType: file.type
        }).then(function(e){
          // console.log('success',hashObj.paramater('#book'));
          window.location.hash = hashObj.paramater('#book');
        },function(e){
          console.log('fail');
        }).then(function(e){
          console.log('done');
        });
      },function(e){
        msgContainer.innerHTML=e;
      });
    };
    reader.readAsText(file);
  });
  app.Toggle.main().appendChild(uploadElement);
  resolve();
},
// <li>
//   <div></div>
//   <div class="icon-toggle-on"></div>
// </li>