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
  lang:'https://storage.googleapis.com/effortless/language.json',
  urlLocal:'eba/bId.xml',
  urlAPI:['https://storage.googleapis.com/effortless/bId.xml']
  // urlAPI:['lang/bId.xml']
  // https://drive.google.com/uc?export=download&id=0B_7bPVufJ-j4b3ZiRFBPQkZZbXM
  // http://laisiangtho.github.io/core/bible/bId.xml
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
  noBookmark: 'No Star...',
  isNotFound: 'Not found: "{is}"',
  Loading: 'Loading',
  isError: 'Error',
  addLanguage: 'Add',
  removeLanguage: 'Remove',
  manageLanguage: 'Add Languages'
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
    name:'Languages',
    class:'icon-language',
    title:'Effortless'
  },
  // book:{
  //   id:2,
  //   name:'Book',
  //   class:'language',
  //   title:'Effortless'
  // },
  category:{
    id:2,
    // name:'Category',
    class:'book'
  },
  reader:{
    id:3,
    // name:'Reader',
    class:'chapter'
  },
  lookup:{
    id:4,
    name:'Search',
    class:'icon-lookup',
    title:'Search'
  },
  lookupresult:{
    id:5,
    title:'Effortless'
  },
  bookmark:{
    id:6,
    name:'Stars',
    class:'icon-star',
    title:'Stars'
  },
  randomverse:{
    id:7,
    name:'Random Verse',
    class:'icon-random',
    title:'Random Verse'
  },
  setting:{
    id:8,
    name:'Display',
    class:'icon-display',
    title:'Display'
  },
  about:{
    id:9,
    name:'About',
    class:'icon-about',
    title:'About'
  },
  contact:{
    id:10,
    name:'Contact',
    class:'icon-contact',
    title:'Contact'
  }
}