menu:{
  // name:'Menu',
  title:'Effortless bible analysis',
  header:{
    about:{
      attr:{class:'fix',go:'about'},
      child:{
        tag:'<a>', attr:{class:'icon-info'}
      }
    },
    title:{
      attr:{ class:'title',text:'Effortless bible analysis'}
    },
    setting:{
      attr:{class:'fix',go:'setting'},
      child:{
        tag:'<a>', attr:{class:'icon-cog'}
      }
    }
  }
},
language:{
  name:'Language',
  title:'Language',
  header:{
    home:{
      attr:{class:'fix',go:'menu'},
      child:{
        tag:'<a>', attr:{class:'icon-menu'}
      }
    },
    title:{
      attr:{ class:'title',text:'Language'}
    },
    setting:{
      attr:{class:'fix',go:'setting'},
      child:{
        tag:'<a>', attr:{class:'icon-cog'}
      }
    }
  }
},
category :{
  name:'Category',
  title:'Category',
  header:{
    home:{
      attr:{class:'fix',go:'menu'},
      child:{
        tag:'<a>', attr:{class:'icon-menu'}
      }
    },
    title:{
      attr:{ class:'title',text:'Category'}
    },
    setting:{
      attr:{class:'fix',go:'search'},
      child:{
        tag:'<a>', attr:{class:'icon-search'}
      }
    }
  }
},
verse:{
  // name:'Verse',
  title:'Verse',
  header:{
    home:{
      attr:{class:'fix',go:'menu'},
      child:{
        tag:'<a>', attr:{class:'icon-menu'},
      }
    },
    title:{
      attr:{ class:'title',text:'Verse'}
    },
    setting:{
      attr:{class:'fix filter'},
      child:{
        tag:'<a>', attr:{class:'icon-map-o'},
        job:function(evt){
          evt.bind(app.config.Handler, function(e) {
            // console.log('click');
            $(this).parent().toggleClass(eba.setting.classname.active);
          });
          // return $('<input>',{type:'text',name:'q',id:'q',placeholder:'search...'});
        }
      }
    }
  }
},
search:{
  name:'Search',
  title:'Search',
  header:{
    home:{
      attr:{class:'fix',go:'menu'},
      child:{
        tag:'<a>', attr:{class:'icon-menu'}
      }
    },
    title:{
      attr:{ class:'title'},
      child:{
        tag:'<form>', attr:{name:'search'},
        job:function(){
          return $('<input>',{type:'text',name:'q',id:'q',placeholder:'search...'});
        }
      }
    },
    setting:{
      attr:{class:'fix',go:'search'},
      child:{
        tag:'<a>', attr:{class:'icon-search'}
      }
    }
  }
},
bookmark:{
  name:'Bookmark',
  title:'Bookmark',
  header:{
    home:{
      attr:{class:'fix',go:'menu'},
      child:{
        tag:'<a>', attr:{class:'icon-menu'}
      }
    },
    title:{
      attr:{ class:'title',text:'Bookmark'}
    },
    setting:{
      attr:{class:'fix',go:'setting'},
      child:{
        tag:'<a>', attr:{class:'icon-cog'}
      }
    }
  }
},
daily:{
  name:'Daily Verse',
  title:'Daily Verse',
  header:{
    home:{
      attr:{class:'fix',go:'menu'},
      child:{
        tag:'<a>', attr:{class:'icon-menu'}
      }
    },
    title:{
      attr:{ class:'title',text:'Daily Verse'}
    },
    setting:{
      attr:{class:'fix',go:'setting'},
      child:{
        tag:'<a>', attr:{class:'icon-cog'}
      }
    }
  }
},
setting:{
  name:'Setting',
  title:'Setting',
  header:{
    home:{
      attr:{class:'fix',go:'menu'},
      child:{
        tag:'<a>', attr:{class:'icon-menu'}
      }
    },
    title:{
      attr:{ class:'title',text:'Setting'}
    },
    setting:{
      attr:{class:'fix',go:'about'},
      child:{
        tag:'<a>', attr:{class:'icon-info'}
      }
    }
  }
},
about:{
  name:'About',
  title:'About',
  header:{
    home:{
      attr:{class:'fix',go:'menu'},
      child:{
        tag:'<a>', attr:{class:'icon-menu'}
      }
    },
    title:{
      attr:{ class:'title',text:'About'}
    },
    setting:{
      attr:{class:'fix',go:'setting'},
      child:{
        tag:'<a>', attr:{class:'icon-cog'}
      }
    }
  }
}