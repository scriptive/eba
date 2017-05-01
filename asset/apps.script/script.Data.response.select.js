var tmp={
  User:{
    row:[
      {
        email:'khensolomon@gmail.com',
        name:'Solomon',
        about:'about',
        message:'message',
        reply:'reply',
        role:7
      },
      {
        email:'khensolomon@gsmail.com',
        name:'mmam 2',
        about:'mmam 2',
        message:'msmm 2',
        reply:'mmsm 2',
        role:3
      }
    ]
  },
  // id	name	desc	lang
  Language:{
    column:{
      id:{},
      name:{},
      desc:{},
      lang:{}
    },
    row:[
      {
        id:1,
        name:'Zolai',
        desc:'Zolai desc',
        lang:'niv'
      },
      {
        id:3,
        name:'English',
        desc:'English sdesc',
        lang:'kjv'
      }
    ]
  },
  // timestamp	id	language	name	shortname
  Testament:{
    column:{
      timestamp:{},
      id:{},
      language:{},
      name:{},
      shortname:{}
    },
    row:[
      {
        i:{
          timestamp:12341231,
          id:1,
          language:1,
          name:'Old',
          shortname:'OT'
        }
      },
      {
        i:{
          timestamp:12341232,
          id:2,
          language:1,
          name:'New',
          shortname:'NT'
        }
      }
    ]
    // row:[
    //   {
    //     i:1
    //   },
    //   {
    //     i:2
    //   }
    // ]
  },
  // timestamp	id	language	name
  Book:{
    column:{
      timestamp:{},
      id:{},
      language:{},
      name:{}
    },
    row:[
      {
        i:{
          timestamp:12341231,
          id:1,
          language:1,
          name:'gen'
        }
      },
      {
        i:{
          timestamp:12341232,
          id:2,
          language:1,
          name:'exo'
        }
      }
    ]
    // row:[
    //   {
    //     i:1
    //   },
    //   {
    //     i:2
    //   }
    // ]
  },
  // timestamp	id	language	sort	group	name	desc
  Category:{
    column:{
      timestamp:{},
      id:{},
      language:{},
      sort:{},
      group:{},
      name:{},
      desc:{}
    },
    row:[
      {
        i:{
          timestamp:1,
          id:1,
          language:1,
          sort:2,
          group:1,
          name:'abc',
          desc:'abc desc'
        }
      },
      {
        i:{
          timestamp:1,
          id:2,
          language:1,
          sort:1,
          group:1,
          name:'xyx',
          desc:'xyx desc'
        }
      }
    ]
  },
  // timestamp	category	book	chapter	verse	tag
  Verse:{
    column:{
      timestamp:{},
      category:{},
      book:{},
      chapter:{},
      verse:{},
      tag:{}
    },
    row:[
      {
        timestamp:1,
        category:1,
        book:2,
        chapter:2,
        verse:'1-4',
        tag:''
      },
      {
        timestamp:1,
        category:1,
        book:1,
        chapter:2,
        verse:'3-7',
        tag:''
      },
      {
        timestamp:1,
        category:1,
        book:2,
        chapter:2,
        verse:'2-6',
        tag:''
      }
    ]
  }
};
var response= tmp[sheet];
app.sheet[sheet]=response;
deferred.resolve(response);
