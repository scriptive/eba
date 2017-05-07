var configuration = app.config, local = app.localStorage, xmlDoc, result={
  category:0,
  section:0,
  verse:0
};
configuration.catalog={
  // testament:{ },
  // book:{ },
  // tag:{ }
};

var selectorCommon=function(container,callbackVerse,category){
  // NOTE: using in responseXML->lookup, reader
  return new Promise(function(resolve, reject) {
    var xmlCategories = selectorCategory(category);

    if (!xmlCategories.length) return reject(configuration.lang.noCategoryData);
    xmlCategories.each(function(i,xmlCategory){
      var ol, categoryId = category?category:xmlCategory.getAttribute('id');
      xmlCategory.querySelectorAll(selectorVerse()).each(function(i,v){
        var verseText = callbackVerse(v);
        if (verseText){
          if (!ol)ol = html.createOl(container,categoryId);
          result.verse ++;
          var bookId = v.getAttribute('book'), testamentId = (bookId<=39?1:2), chapterId = v.getAttribute('chapter'), verseId = v.getAttribute('verse'), tagId = v.getAttribute('tag'),
          testament=selectorTestamentname(testamentId),
          testamentName = testament.innerHTML,
          bookName=selectorBookname(bookId).innerHTML,
          // tagName = selectorTagname(tagId).innerHTML,
          bookmarkClass = app.book.hasBookmark(categoryId,bookId,chapterId,verseId)?configuration.classname.active:configuration.classname.inactive,
          // testamentClass = testament.getAttribute('shortname').replace(/\s+/g, '-').toLowerCase(),
          testamentClass = (bookId<=39?'OT':'NT'),
          bookClass = bookName.replace(/\s+/g, '-').toLowerCase();
          // tagClass = tagName.replace(/\s+/g, '-').toLowerCase();
          // console.log(testamentClass,bookClass);
          var li = ol.appendChild(app.elementCreate('li')).addClass(bookmarkClass).addClass(testamentClass).addClass(bookClass);//.addClass(tagClass), 
          
          containerBookmark = li.appendChild(app.elementCreate('div')).addClass('icon-star').eventClick(function(event){
            app.book.addBookmark(event.target.parentNode,categoryId,bookId,chapterId,verseId);
          }),
          containerVerse = li.appendChild(app.elementCreate('div'));

          containerVerse.addAttr('data-title','123 234:345'.replace(123, bookName).replace(234, chapterId).replace(345, verseId));
          containerVerse.innerHTML = html.replaceNumber(verseText);
          /*
          var containerTag = containerVerse.appendChild(app.elementCreate('p'));
          containerTag.appendChild(app.elementCreate('span')).innerHTML=testamentName;
          containerTag.appendChild(app.elementCreate('span')).innerHTML=bookName;
          containerTag.appendChild(app.elementCreate('span')).innerHTML=tagName;
          
          if (!configuration.catalog.hasOwnProperty('tag'))configuration.catalog.tag={};
          if (configuration.catalog.tag.hasOwnProperty(tagId)){
            configuration.catalog.tag[tagId].total++;
          } else {
            configuration.catalog.tag[tagId]={};
            configuration.catalog.tag[tagId].total=1;
            configuration.catalog.tag[tagId].name=tagName;
            configuration.catalog.tag[tagId].class=tagClass;
          }
          */
          // if (!configuration.catalog.hasOwnProperty('book'))configuration.catalog.book={};
          // if (configuration.catalog.book.hasOwnProperty(bookId)){
          //   configuration.catalog.book[bookId].total++;
          // } else {
          //   configuration.catalog.book[bookId]={};
          //   configuration.catalog.book[bookId].total=1;
          //   configuration.catalog.book[bookId].name=bookName;
          //   configuration.catalog.book[bookId].class=bookClass;
          // }
          // if (!configuration.catalog.hasOwnProperty('testament'))configuration.catalog.testament={};
          // if (configuration.catalog.testament.hasOwnProperty(testamentId)){
          //   configuration.catalog.testament[testamentId].total++;
          // } else {
          //   configuration.catalog.testament[testamentId]={};
          //   configuration.catalog.testament[testamentId].total=1;
          //   configuration.catalog.testament[testamentId].name=testamentName;
          //   configuration.catalog.testament[testamentId].class=testamentClass;
          // }
        }
      });
    });
    if (result.verse) {
      resolve(result);
    } else if (category) {
      reject(configuration.lang.noCategoryContent);
    } else {
      reject(configuration.lang.noMatchFor);
    }
  });
};
var selectorInformation=function(i){
  if (i){
    return xmlDoc.querySelector('info row[id="0"]'.replace(0, i));
  } else {
    return xmlDoc.querySelectorAll('info row');
  }
};
var selectorSection=function(i){
  if (i){
    return xmlDoc.querySelector('section row[id="0"]'.replace(0, i));
  } else {
    return xmlDoc.querySelectorAll('section row');
  }
};
// var selectorBook=function(i){
//   return xmlDoc.querySelectorAll('book category');
// };
var selectorCategory=function(i){
  return xmlDoc.querySelectorAll(i?'category[id="0"]'.replace(0, i):'category');
  // return xmlDoc.querySelectorAll(i?'category row[id="0"]'.replace(0, i):'category');
};
var selectorCategoryVerse=function(i){
  return xmlDoc.querySelectorAll('category[id="0"] row'.replace(0,i));
};
var selectorBookname=function(i){
  if (i){
    return xmlDoc.querySelector('book row[id="0"]'.replace(0, i));
  } else{
    return xmlDoc.querySelectorAll('book row');
  }
};
var selectorTestamentname=function(i){
  if (i){
    return xmlDoc.querySelector('testament row[id="0"]'.replace(0, i));
  } else{
    return xmlDoc.querySelectorAll('testament row');
  }
};
var selectorTagname=function(i){
  // i?'tag row[id="0"]'.replace(0, i):'tag row'
  return xmlDoc.querySelector('tag row[id="0"]'.replace(0, i));
};
var selectorTagrow=function(){
  return xmlDoc.querySelectorAll('tag row');
};
var selectorVerse=function(book,chapter,verse,testament,tag){
  var regVerse = 'row';
  if (book) regVerse = regVerse+'[book="0"]'.replace(0, book);
  if (chapter) regVerse = regVerse+'[chapter="0"]'.replace(0, chapter);
  if (verse) regVerse = regVerse+'[verse="0"]'.replace(0, verse);
  if (testament) regVerse = regVerse+'[testament="0"]'.replace(0, testament);
  if (tag) regVerse = regVerse+'[tag="0"]'.replace(0, tag);
  return regVerse;
};
var html={
  replaceKeyword:function(s,n){
    //TODO s.replace(/(([^\s]+\s\s*){20})(.*)/,"$1…")
    return (typeof (n) === "string"?s.replace(new RegExp(n, "gi"), '<b>$&</b>'):s);
  },
  replaceNumber:function(s){
    if (s.match(/\[(.*?)\]/g).length > 1){
      return s.replace(/\[(.*?)\]/g,'<sup>$1</sup>');
    } else {
      return s.replace(/\[(.*?)\]/g,'');
    }
    // console.log(s.replace(new RegExp("\\[.*?\\]","g"),"---$&---"));
    // console.log(s.replace(new RegExp("\\[.*?\\]","g"),"---$&---"));
    // console.log(s.replace(new RegExp("\\[(.*)\\]","g"),"---$&1---"));
    return s.replace(/\[(.*?)\]/g,'<sup>$1</sup>')
    // return s.replace(/\d+/g, '<sup>$&</sup>');
  },
  createOl:function(container,categoryId){
    result.category++;
    var xmlSection = selectorSection(categoryId),
    li = container.appendChild(app.elementCreate('li')),
    h2 = li.appendChild(app.elementCreate('h2')).addAttr('data-description',xmlSection.innerHTML).innerHTML = xmlSection.getAttribute('name');
    return li.appendChild(app.elementCreate('ol'));
  }
};
/*
olMain.querySelectorAll('li').each(function(i,v){
  var char = v.dataset.char, id = v.getAttribute('id');
  if (!alphabet.has(char)){
    alphabet.push(char);
    olIndex.appendChild(app.elementCreate('li').addAttr('class',id)).innerHTML=char;
  }
  // console.log(v.dataset.alpha);
});
*/
var responseXML={
  section:function(container){
    return new Promise(function(resolve, reject) {
      var alphabet=[];
      selectorSection().each(function(i,v){
        result.section++;
        var id = v.getAttribute('id'), name = v.getAttribute('name'), sort = v.getAttribute('sort'), description = v.innerHTML, char = name.charAt(0);
        if (!alphabet.has(char)){
          alphabet.push(char);
          container.appendChild(app.elementCreate('li').addClass('alpha').addAttr('id',char)).innerHTML=char;
        }
        container.appendChild(app.elementCreate('li'))
          .addClass('icon-arrow-right')
          // .addAttr('id',id)
          .addAttr('data-title',id)
          // .addAttr('data-char',name.charAt(0))
            .appendChild(app.elementCreate('a'))
            .addAttr('data-total',selectorCategoryVerse(id).length)
            .addAttr('data-description',v.innerHTML)
            .addAttr('href',{category:id}.paramater(['#reader']))
            .innerHTML=name;
        // container.appendChild(app.elementCreate('li'))
        //   .addClass('icon-arrow-right')
        //   .addAttr('data-title',id)
        //     .appendChild(app.elementCreate('a'))
        //     .addAttr('data-total',selectorCategoryVerse(id).length)
        //     .addAttr('data-description',v.innerHTML)
        //     .addAttr('href',{category:id}.paramater(['#reader']))
        //     .innerHTML=name;
      });
      resolve(result);
    });
  },
  randomverse:function(){
    return new Promise(function(resolve, reject) {
      result.information={};

      var categoryId= Math.floor(Math.random() * selectorSection().length);
      var Verses = selectorCategoryVerse(categoryId);
      var position = Math.floor(Math.random() * Verses.length);
      var v = Verses[position];
      
      var bookId = v.getAttribute('book'), testamentId = (bookId<=39?1:2), chapterId = v.getAttribute('chapter'), verseId = v.getAttribute('verse');
      // console.log(testamentId,bookId,chapterId,verseId);
      result.information[categoryId]={};
      result.information[categoryId][bookId]={}
      result.information[categoryId][bookId][chapterId]=[verseId];
      resolve(result);
    });
  },
  information:function(){
    return new Promise(function(resolve, reject) {
      result.information={};
      selectorInformation().each(function(i,v){
        result.section++;
        var id = v.getAttribute('id');
        result.information[id]=v.innerHTML;
      });
      resolve(result);
    });
  },
  /*
  exportCategory:function(language){
    // timestamp	id	language	sort	group	name	desc
    // TODO: sorting
    var logSorted = {};
    var logContent='id\tlanguage\tsort\tgroup\tname\tdesc';
    return new Promise(function(resolve, reject) {
      selectorSection().each(function(i,v){
        result.section++;
        var id = v.getAttribute('id'), name = v.getAttribute('name'), sort = v.getAttribute('sort'), description = v.innerHTML;
        // logContent = logContent+"\n"+id+"\t"+language+"\t"+sort+"\t"+1+"\t"+name+"\t"+description;
        logSorted[sort]={id:id,language:language,sort:sort,name:name,description:description};
      });
      logSorted.each(function(i,v){
        logContent = logContent+"\n"+v.id+"\t"+v.language+"\t"+v.sort+"\t"+1+"\t"+v.name+"\t"+v.description;
      });
      console.log(logContent);
      resolve(logContent);
    });
  },
  exportTestament:function(language){
    // timestamp	id	language	name	shortname
    var logContent='id\tlanguage\tname\tshortname';
    return new Promise(function(resolve, reject) {
      selectorTestamentname().each(function(i,v){
        var id = v.getAttribute('id'), shortname=v.getAttribute('shortname'), name = v.innerHTML;
        logContent = logContent+"\n"+id+"\t"+language+"\t"+name+"\t"+shortname;
      });
      console.log(logContent);
      resolve(logContent);
    });
  },
  exportBook:function(language){
    // timestamp	id	language	name
    var logContent='id\tlanguage\tname';
    return new Promise(function(resolve, reject) {
      selectorBookname().each(function(i,v){
        var id = v.getAttribute('id'), description = v.innerHTML;
        logContent = logContent+"\n"+id+"\t"+language+"\t"+description;
      });
      console.log(logContent);
      resolve(logContent);
    });
  },
  exportVerse:function(category){
    // timestamp	category	book	chapter	verse	tag
    var logContent='category\tbook\tchapter\tverse';
    return new Promise(function(resolve, reject) {
      var xmlCategories = selectorCategory(category);
      if (!xmlCategories.length) return reject(configuration.lang.noCategoryData);
      xmlCategories.each(function(i,xmlCategory){
        var categoryId = category?category:xmlCategory.getAttribute('id');
        xmlCategory.querySelectorAll(selectorVerse()).each(function(i,v){
          var bookId = v.getAttribute('book'), testamentId = (bookId<=39?1:2), chapterId = v.getAttribute('chapter'), verseId = v.getAttribute('verse'),
          testamentName = selectorTestamentname(testamentId).innerHTML,
          bookName=selectorBookname(bookId).innerHTML;
          if (bookId && chapterId && verseId){
            result.verse ++;
            logContent = logContent+"\n"+categoryId+"\t"+bookId+"\t"+chapterId+"\t"+verseId;
          }
        });
      });
      if (result.verse) {
        // console.log(logContent);
        resolve(result);
      } else if (category) {
        reject(configuration.lang.noCategoryContent);
      } else {
        reject(configuration.lang.noMatchFor);
      }
    });
  },
  */
  reader:function(container,category){
    return selectorCommon(container,function(v){
      return v.innerHTML;
    },category);
  },
  lookup:function(container,paraSearch){
    return selectorCommon(container,function(v){
      var testamentId = v.getAttribute('testament');
      // testamentId == local.name.testament &&
      // if (new RegExp(paraSearch, "i").test(v.innerHTML)) return html.replaceKeyword(v.innerHTML,paraSearch);
      // testamentId == local.name.testament &&
      if (new RegExp(paraSearch, "i").test(v.innerHTML)) {
        var testamentId = v.getAttribute('testament');
        if (testamentId) {
          if (testamentId == local.name.testament) {
            return html.replaceKeyword(v.innerHTML,paraSearch);
          }
        } else {
          return html.replaceKeyword(v.innerHTML,paraSearch);
        }
      }
    });
  },
  bookmark:function(container,lst){
    return new Promise(function(resolve, reject) {
      // local.name.bookmark.each(function(categoryId,c){
      lst.each(function(categoryId,c){
        var ol;
        c.each(function(bookId,c){
          c.each(function(chapterId,c){
            c.each(function(i,verseId){
              selectorCategory(categoryId).each(function(i,xmlCategory){
                xmlCategory.querySelectorAll(selectorVerse(bookId,chapterId,verseId)).each(function(i,v){
                  if (!ol) ol = html.createOl(container,categoryId);
                  result.verse ++;

                  var testamentId = (bookId<=39?1:2),
                  testamentName = selectorTestamentname(testamentId).innerHTML,
                  bookName=selectorBookname(bookId).innerHTML,
                  testamentClass = testamentName.replace(' ', '-').toLowerCase(),
                  bookClass = bookName.replace(' ', '-').toLowerCase(),
                  bookmarkClass = app.book.hasBookmark(categoryId,bookId,chapterId,verseId)?configuration.classname.active:configuration.classname.inactive,
                  li = ol.appendChild(app.elementCreate('li')).addClass(bookmarkClass).addClass(testamentClass).addClass(bookClass), 
                  containerBookmark = li.appendChild(app.elementCreate('div')).addClass('icon-star').eventClick(function(event){
                    var evt=event.target.parentNode;
                    app.book.addBookmark(evt,categoryId,bookId,chapterId,verseId);
                    if (local.name.query.page!='randomverse'){
                      evt=evt.removeElement();
                      if (evt.innerHTML === ""){
                        evt=evt.parentNode.removeElement();
                        // NOTE: ol is empty
                        if (evt.innerHTML === ""){
                          // NOTE: no bookmark
                          evt.addAttr('class','msg').appendChild(app.elementCreate('li')).appendChild(app.elementCreate('div')).innerHTML=configuration.lang.noBookmark;
                        }
                      }
                    }
                  }),
                  containerVerse = li.appendChild(app.elementCreate('div'));
                  containerVerse.addAttr('data-title','123 234:345'.replace(123, bookName).replace(234, chapterId).replace(345, verseId));
                  containerVerse.innerHTML = html.replaceNumber(v.innerHTML);
                });
              });
            });
          });
        });
      });
      if (result.verse) {
        resolve(result);
      } else {
        reject(configuration.lang.noBookmark);
      }
    });
  }
};
this.xml=function(){
  return new Promise(function(resolve, reject) {
    new app.xml(bId).request(function(){
      // console.log('loading');
    }).then(function(e){
      xmlDoc=e;
      resolve(responseXML);
    },function(e){
      reject(e);
    });
  });
};