export:{
  home:function(timeStamp){
    app.data.get({timeAttempt:timeStamp,sheetName:app.sheetName.language}).progress(function(msg) {
      app.notification(msg);
    }).done(function(response) {
      app.export.list().progress(function(msg) {
        app.notification(msg);
      }).done(function() {
        app.notification();
      }).fail(function(error) {
        app.notification(error.message,true);
      });
    }).fail(function(error) {
      app.notification(error.message,true);
    });
  },
  list:function(){
    var deferred = $.Deferred(),
    ul = $('<ul>',{class:'lt export'}).appendTo(app.container.scrollbar('export'));
    deferred.notify('Appending');
    $.each(app.sheet.Language.row, function( key, row ) {
      var hasBible = app.export.bible.hasOwnProperty(row.id), classBibleAvailable = hasBible?'yes':'no';
      $('<li>',{id:row.id,class:classBibleAvailable}).append(
        $('<div>',{class:'fixed'}).html(row.id),
        $('<div>',{class:'context','data-name':row.name}).html(row.desc),
        $('<div>',{class:'context status'}).html(hasBible?app.export.bible[row.id].name:''),
        $('<div>',{class:'material-icons fixed export',title:'Export XML'}).html('file_download').bind(configuration.handler, function(e){
          configuration.language=row.id;
          app.notification('One moment please...').delay(300).promise().done(function(){
            app.export.start(row);
          });
        })
      ).appendTo(ul);
    });
    ul.promise().done(function() {
      deferred.resolve();
    });
    return deferred.promise();
  },
  start:function(row){
    // TODO: check bible is imported, load testament, book, category, verse then generate xml -> save
    if (app.export.bible.hasOwnProperty(row.id)) {
      // NOTE: {name:fileId, file:e}
      // xmlBible =$.parseXML(app.export.bible[row.id].file);
      xmlBible =app.export.bible[row.id].file;
      // xmlBible=$(bible);
      var xmlEBA = $(app.export.xmlCreate()).children();
      var currentUser = app.sheet.currentUser.row[0];
      xmlEBA.append($('<info>').append(
        $('<row>',{id:'name'}).html(row.name),
        $('<row>',{id:'desc'}).html(row.desc),
        $('<row>',{id:'version'}).html(row.version),
        $('<row>',{id:'launched'}).html(row.launched),
        $('<row>',{id:'lang'}).html(row.lang)
        // $('<name>').html(row.name),
        // $('<desc>').html(row.desc),
        // $('<version>').html(row.version),
        // $('<launched>').html(row.launched),
        // $('<lang>').html(row.lang)
      ));
      xmlEBA.append($('<author>').append(
        $('<row>',{id:'name'}).html(currentUser.name),
        $('<row>',{id:'email'}).html(currentUser.email),
        $('<row>',{id:'url'}).html('')
        // $('<name>').html(currentUser.name),
        // $('<email>').html(currentUser.email),
        // $('<url>').html('')
      ));
      // <job on="September 25, 2016">We started converting our data into XML!</job>
      xmlEBA.append($('<modification>').append(
        $('<added>').append(
          $('<job>',{'date':'September 25, 2016'}).html('We started converting our data into XML!')
        ),
        $('<updated>').append(
          $('<job>').html('')
        ),
        $('<removed>').append(
          $('<job>').html('')
        )
      ));
      app.testament.get().progress(function() {
        app.notification('getting Testament');
      }).done(function(rT) {
        var xmlTestament = $('<testament>').appendTo(xmlEBA);
        $.each(rT.row, function( key, row ) {
          // NOTE: <row id="1" shortname="TL" reg="1-39">Thuciam Lui</row>
          $('<row>',{id:row.i.id,shortname:row.i.shortname}).html(row.i.name).appendTo(xmlTestament);
        });
        xmlTestament.promise().done(function(){
          app.book.get().progress(function() {
            app.notification('getting Book');
          }).done(function(rB) {
            var xmlBook = $('<book>').appendTo(xmlEBA);
            $.each(rB.row, function( key, row ) {
              // NOTE: <row id="1">Piancil</row>
              $('<row>',{id:row.i.id}).html(row.i.name).appendTo(xmlBook);
            });
            xmlBook.promise().done(function(){
              app.category.get().progress(function() {
                app.notification('getting Category');
              }).done(function(rS) {
                var rows = rS.row.slice(0).sort(function(a,b) {return a.i.sort - b.i.sort;});
                var xmlSection = $('<section>').appendTo(xmlEBA);
                $.each(rows, function( key, row ) {
                  // NOTE: <section id="1" name="Ai, Aisanna" sort="1">Sorcerer</section>
                  $('<row>',{id:row.i.id,name:row.i.name,sort:row.i.sort,group:row.i.group}).html(row.i.desc).appendTo(xmlSection);
                });
                xmlSection.promise().done(function(){
                  app.export.getVerse(rows).progress(function(msg) {
                    app.notification('getting '+msg+'...');
                  }).done(function() {
                    app.notification('generating XML...',true).promise().done(function(){
                      app.export.xmlSave(xmlDoc);
                    });
                    // app.notification('Done and start generating XML',true);
                  }).fail(function(error) {
                    app.notification(error,true);
                  });
                });
              }).fail(function(error) {
                // NOTE: getting Category fail
                app.notification(error.message,true);
              });
            });
          }).fail(function(error) {
            // NOTE: getting Book fail
            app.notification(error.message,true);
          });
        });
      }).fail(function(error) {
        // NOTE: getting Testament fail
        app.notification(error.message,true);
      });
    } else {
      app.notification('Current task required XML Bible',true);
    }
  },
  getVerse:function(response){
    // var deferred = $.Deferred(), row = response.row.slice(0).sort(function(a,b) {return a.i.sort - b.i.sort;});
    var xmlEBA = $(xmlDoc).children(),
    deferred = $.Deferred(),
    arrVerse=[];
    var task={
      process:function(){
        var row = response.shift();
        
        
        // deferred.notify(row.i.name);
        app.verse.get(row.i.id).progress(function() {
          deferred.notify(row.i.name);
        }).done(function(rV) {
          app.notification('appending '+row.i.name+'...').delay(100).promise().done(function(){
            task.verseProcess(rV.row.slice(0)).done(function() {
              if (response.length){
                task.process();
              } else {
                deferred.resolve();
              }
            }).fail(function(error) {
              deferred.reject(error);
            });
          });
        }).fail(function(error) {
          deferred.reject(error);
        });
      },
      verseProcess:function(response){
        var xmlEBA = $(xmlDoc).children(), xmlCategory,wait=$.Deferred(),job={
          process:function(){
            var row = response.shift();
            task.verseText(row.book,row.chapter,row.verse).done(function(v) {
              if (!xmlCategory)xmlCategory = $('<category>',{id:row.category}).appendTo(xmlEBA);
              var testamentId = (parseInt(row.book)<=39?1:2);
              $('<row>',{testament:testamentId,book:row.book,chapter:row.chapter,verse:row.verse,tag:row.tag}).html(v).appendTo(xmlCategory);
              xmlCategory.promise().done(function(){
                if (response.length){
                  job.process();
                } else {
                  wait.resolve();
                }
              });
            }).fail(function(s) {
              // NOTE: getting Verse fail
              // console.log(s);
              // wait.reject();
              if (response.length){
                job.process();
              } else {
                wait.resolve();
              }
            });
          }
        };
        job.process();
        return wait.promise();
      },
      verseText:function(bID,cID,vID){
        var wait=$.Deferred(),chapter = $(xmlBible).find('bible > book#bID > chapter#cID > verse'.replace(/bID/,bID).replace(/cID/,cID)),
        verses=[], verseFormat = '[vn] vt',
        sIds = vID.split('-'), firstID = sIds[0], lastID = sIds.slice(-1).pop();
        if (chapter) {
          try {
            $.each(chapter, function( i, v ) {
              var oId = v.getAttribute("id");
              if (oId) {
                var oIds = oId.split('-');
                // NOTE: textContent remove lines breaks, and remove double spaces
                var vt = v.innerHTML.replace(/(\r\n|\n|\r)/gm," ").replace(/ +(?= )/g,'');
                if (vID == oId) {
                  verses.push(verseFormat.replace(/vn/,oId).replace(/vt/,vt))
                } else if (sIds.length > 1){
                  if (oIds.length == 1 && (parseInt(firstID) <= parseInt(oId) && parseInt(lastID) >= parseInt(oId)) ) {
                    verses.push(verseFormat.replace(/vn/,oId).replace(/vt/,vt))
                  } else if (parseInt(firstID) <= parseInt(oIds[0]) && parseInt(lastID) >= parseInt(oIds.slice(-1).pop())) {
                    verses.push(verseFormat.replace(/vn/,oId).replace(/vt/,vt))
                  }
                }
              }
            });
            wait.resolve(verses.join(' '));
          } catch (e) {
            wait.reject(e);
          }
        } else {
          wait.reject('No chapter found!');
        }
        return wait.promise();
      }
    };
    task.process();
    return deferred.promise();
  },
  selectLanguage:function(bId){
    var selectName = $('<select>',{name:'language'});
    $.each(app.sheet.Language.row, function( key, row ) {
      var param = {value:row.id};
      if (bId && row.id == bId) param.selected='selected';
      $('<option>',param).html(row.name).appendTo(selectName);
    });
    return selectName;
  },
  validateXML:function(xml) {
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
          var xmlDocs = new DOMParser().parseFromString(xml, "application/xml");
        } catch (e) {
          return reject(e.message);
        }
        if (xmlDocs.getElementsByTagName("parsererror").length > 0) {
          checkErrorXML(xmlDocs.getElementsByTagName("parsererror")[0]);
          reject(txt);
        } else {
          resolve(xmlDocs);
        }
      } else {
        reject('Your browser cannot handle XML validation');
      }
    });
  },
  add:function(){
    // NOTE: header add call this method
    app.notification(
      $('<form>',{name:'language'}).append(
        $('<div>').append(
          $('<p>').html('Language'),
          app.export.selectLanguage(configuration.language)
        ),
        $('<div>',{class:'info'}).append(
          $('<input>',{'type':'file','id':'file','name':'file','accept':'.xml'}).bind('change', function(e) {
            var par = $(this), msgContainer = par.next().next();
            configuration.language=$( "select[name=language]" ).val();
            
            var lstContainer = $('ul.lt.export>li#0'.replace(/0/,configuration.language));
            var file = e.target.files[0];
            var fileId = file.name.replace(/\.[^/.]+$/, "");
            // NOTE: file.name, file.type, file.size, file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString():''
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
              app.export.validateXML(x.target.result).then(function(e){
                app.export.bible[configuration.language]={name:fileId, file:e};
                msgContainer.html('xml has been imported to language'.replace(/xml/,fileId).replace(/language/,configuration.language));
                lstContainer.addClass('yes').removeClass('no');
                lstContainer.find('.status').html(fileId);
              },function(e){
                delete app.export.bible[configuration.language];
                lstContainer.addClass('no').removeClass('yes');
                lstContainer.find('.status').html('');
                msgContainer.html(e);
              });
            };
            reader.readAsText(file);
          }),
          $('<input>',{type:'button',name:'cancel',value:'Close'}).bind(configuration.handler, function(e) {
            app.notification();
          }),
          $('<p>',{class:'msg'}),
          $('<p>',{class:'notice'}).html('Import Bible maa in, na import na ding language pen telmasa in!')
        )
      ).submit( function(event ) {
        event.preventDefault();
      })
    );
  },
  bible:{
  },
  xmlCreate:function(){
    // return xmlEBADoc=new DOMParser().parseFromString('<?xml version="1.0"?><eba></eba>','application/xml');
    // return (new XMLSerializer()).serializeToString(xmlDoc).replace(' xmlns="http://www.w3.org/1999/xhtml"','');
    return xmlDoc = $.parseXML('<?xml version="1.0"?><eba xmlns="http://www.w3.org/1999/xhtml"></eba>','application/xml'); // xmlDoc = $(xml).children()
  },
  xmlToString:function(e){
    // return (new XMLSerializer()).serializeToString(e);
    return (new XMLSerializer()).serializeToString(e).replace(' xmlns="http://www.w3.org/1999/xhtml"','');
  },
  xmlSave:function(e){
    var a = document.createElement("a"),
        file = new Blob([app.export.xmlToString(e)], {type: 'text/xml'}),
        // file = new Blob([(new XMLSerializer()).serializeToString(e)], {type: 'text/xml'}),
        url = URL.createObjectURL(file);
        a.href = url;
        // app.export.bible[row.id].name
    a.download = '0.xml'.replace(/0/,configuration.language);
    a.click();
    setTimeout(function() {
      window.URL.revokeObjectURL(url);  
    }, 0); 
  },
  xml:{
  }
},