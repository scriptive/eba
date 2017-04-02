name: '{application.name} alpha',
description:'{application.description}',
author:'{application.author}',
version: '{application.version}',
build: '{application.build}',
id: 'eba',
idUnique: 'eba:unique',
developer: '{application.developer}',
file: {
  template: 'z.html',
  lang:'lang/book.json',
  urlLocal:'eba/bId.xml',
  urlAPI:['db/bId.xml','lang/bId.xml']
},
fileStorage:{
  RequestQuota: 1073741824,
  Permission: 1,
  objectStore:{
   name:'eba',
   version:1
  }
},
lang: {
  isLocalRemove: 'Would you like to remove "{is}" from local?',
  tryAWord: 'Try a word or two!',
  noMatchFor: 'No match for {for}!',
  noCategoryContent: 'This category has no content...',
  noCategoryData: 'This category has no data...',
  noBookmark: 'No Bookmark...',
  isNotFound: 'Not found: "{is}"'
},
classname: {
  active: 'active',
  inactive: 'inactive',
  filter: 'filter'
},
// NOTE: page
page:{
  home:{
    id:1,
    name:'Home',
    class:'icon-home'
  },
  book:{
    id:2,
    name:'Book',
    class:'icon-language'
  },
  catalog:{
    id:3,
    name:'Catalog',
    class:'icon-book'
  },
  reader:{
    id:4,
    name:'Reader',
    class:'icon-chapter'
  },
  lookup:{
    id:5,
    name:'Lookup',
    class:'icon-lookup'
  },
  bookmark:{
    id:6,
    name:'Bookmark',
    class:'icon-bookmark'
  },
  setting:{
    id:7,
    name:'Setting',
    class:'icon-setting'
  },
  about:{
    id:8,
    name:'About',
    class:'icon-info'
  }
}