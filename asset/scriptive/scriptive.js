/*!
    scriptive
    Version 1.0.0-2010.01.21
    https://scriptive.github.io/scriptive
*/
(function(win,doc) {
  'use strict';
  // TODO: lock(open,close), auto(open,close)
  var eMain,eMenu,eDrag,eWidthPanel=320,eWidthOffset,lt='left',rt='right',
  requestExtend={},
  requestParam={},
  offsetNormal='',
  offsetReverse='',
  config={
    // element:'',
    main:'',
    mainActive:'',
    menu:'',
    classActive:'active',
    classOverlay:'overlay',
    widthMax:eWidthPanel,
    widthMin:0,
    widthLeftover:60,
    widthUnit:'px',
    dragArea:50,
    dragMin:200,
    dataOffset:'offset',
    dataId:'id',
    dataLeft:lt,
    dataRight:rt,
    idUnique:'app:unique'
  },
  configHash={},
  // panel:{
  //   element:'',
  //   button:'',
  //   done:function(){
  //   },
  //   toggle:function(x){
  //   },
  //   click:function(){
  //   },
  //   drag:function(){
  //   }
  // },
  $={
    panel:'',
    button:'',
    // storage:{
    //   // require scriptive.Storage.js
    // },
    pixel:function(x){
      return x + config.widthUnit;
    },
    has:{
      // =require scriptive.Has.js
    },
    open:{
      done:function(){
        // =require scriptive.Open.done.js
      },
      toggle:function(x){
        // =require scriptive.Open.toggle.js
      }
    },
    toggleClass:function(e){
      // =require scriptive.toggleClass.js
    },
    click:function(){
      // =require scriptive.Click.js
    },
    drag:function(){
      // =require scriptive.Drag.js
    },
    menu:{

    },
    hash:function(){
      var r=configHash,q,o=win.location.hash.split('?');
      // var o = win.location.href.slice(win.location.href.indexOf('#') + 1).split('?')
        if (o.length){
          var hash = o[0].split('/');
          for(var i = 0; i < hash.length; i++){
            if (hash[i]) {
              if (i == 0){
                r['page']=hash[i].replace(/#/,'');
              } else {
                r[i]=hash[i];
              }
            }
          }
          if (o.length > 1){
            var search = /([^\?#&=]+)=([^&]*)/g;
            while (q = search.exec(o[1])) r[q[1]] = q[2];
          }
        }
      return r;
    },
    merge:function() {
      var o = {}, i = 0, il = arguments.length, k;
      for (; i < il; i++) {
        for (k in arguments[i]) {
          if (arguments[i].hasOwnProperty(k)) o[k] = arguments[i][k];
        }
      }
      return o;
    },
    // extend:function(o, s) {
    //   for (var i in s) if (s.hasOwnProperty(i)) o[i] = s[i];
    //   return o;
    // },
    width:function(){
      // =require scriptive.Width.js
    },
    resize:function() {
      $.width();
      if ((eWidthOffset - config.widthMax) <= config.widthMax) {
        $.open.toggle(config.widthMin);
        $.on(3);
      }
    },
    ready:function(callback) {
      $.has.main();
      if (eMain) {
        $.width();
        if(eMenu)$.click();
        $.drag();
      }
      callback();
    },
    // NOTE: on
    on:function(i) {
      i = ['error','ready','panelOpen','panelClose', 'panelDrag'][i];
      if (requestExtend.hasOwnProperty(i) && requestExtend[i] instanceof Function) {
        requestExtend[i](requestParam);
      }
    },
    // NOTE: initiate
    // i:function(e){
    //   if (e instanceof Object){
    //     if (e instanceof Element){
    //     // if (e.nodeName){
    //       this.element = e;
    //     } else {
    //       eWidthPanel = $.extend(config,e).widthMax;
    //     }
    //   } else if (typeof(e) === 'string') {
    //     try {
    //       this.element = doc.querySelector(e);
    //     } catch (e) {
    //       requestParam.error=e;
    //       $.on(0);
    //     }
    //   }
    //   $.extend(this,requestExtend);
    // },
    // NOTE: return
    r:function(e){
      var self=this;
      // $.i.call(self,e);
      self.element=e;
      self.ready=function(callback){
        // $.extend(self,requestExtend);
        // $.extend(config,self.element);
        config = $.merge(config,self.element);
        // console.log(config);
        win.addEventListener('DOMContentLoaded', function(){
          // if (callback instanceof Function)callback(self,scriptive);
          if (callback instanceof Function) {
            if (win.cordova && location.protocol == 'file:') {
              doc.addEventListener('deviceready', function(){
                callback(self,scriptive);
              }, false);
            } else {
              callback(self,scriptive);
            }
          }
        });
      };
      self.initPanel=function(callback){
        config = $.merge(config,self.element);
        $.ready(function(){
          eWidthPanel = config.widthMax;
          if (callback instanceof Function)callback({
            open:function(callback){
              requestExtend.panelOpen=callback;
            },
            close:function(callback){
              requestExtend.panelClose=callback;
            },
            drag:function(callback){
              requestExtend.panelDrag=callback;
            }
          });
          if (eMain.dataset[config.open]) {
            $.has.panelOffset(eMain.dataset[config.open]);
          }
          if (offsetNormal) {
            $.has.panelButton(eMain.dataset[offsetNormal]);
            requestParam.panel=$.panel;
            $.open.toggle(config.widthMax);
            $.on(2);
          }
        });
      };
      self.hashChange=function(callback){
        win.addEventListener('hashchange', function(event){
          // $.resize(event);
          if (callback instanceof Function)$.hash(),$.resize(),callback(configHash);
        },false);
      };
      self.resizeEvent=function(callback){
        win.addEventListener('resize', function(event){
          $.resize();
          if (callback instanceof Function)callback(event);
        },false);
      };

      self.on=function(id,callback){
        requestExtend[id]=callback;
      };
      self.click=function(callback){
        if (self.element && callback instanceof Function)new Hammer(self.element).on('tap', callback);
        return self;
      };
      // self.addAttr=function(id,name){
      //   if (self.element && self.element instanceof Element)self.element.setAttribute(id,name);
      //   return self;
      // };
      self.attr=function(id,name){
        if (arguments.length >= 2) {
          self.element.setAttribute(id,name);
        } else {
          return self.element.getAttribute(id);
        }
        return self;
      };
      self.addClass=function(name){
        try {
          self.element.classList.add(name);
        } catch (e) {
          self.attr('class',name);
        } finally {

        }
        return self;
      };
      self.toggleClass=function(name,idea){
        self.element.classList.toggle(name,idea);
        return self;
      };

      self.removeClass=function(name){
        self.element.classList.remove(name);
        return self;
      };
      self.setContent=function(name){
        if (self.element && self.element instanceof Element)self.element.innerHTML=name;
        return self;
      };
      //NOTE htmlElement
      self.createElement=function(e){
        // self.element = doc.createElement(arguments.length?e:self.element);
        if (arguments.length) {
          return doc.createElement(e);
        } else {
          self.element = doc.createElement(self.element);
        }
        return self;
      };
      self.appendChild=function(e){
        if (!(e instanceof Element))e = self.createElement(e);
        if (arguments.length > 1) {
          self.element.appendChild(e);
        } else {
          self.element=self.element.appendChild(e);
        }
        // self.element=self.element.appendChild(e);
        return self;
      };
      // without a doubt! you guys already knew what it feels like to be loved, but how many of us
      // var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
      // container.remove();
      // container.innerHTML = '';
      // $(container).removeChild();
      // $('div').createElement().appendTo(container)
      // $(self.element).appendTo(container)
      // wrap.appendChild(action);
      self.removeChild=function(e){
        self.element = (arguments.length?e:self.element);
        while(self.element.firstChild){ self.element.removeChild(self.element.firstChild);}
        return self;
      };
      self.selectChild=function(e,i){
        self.element = (i)?self.element.querySelectorAll(e):self.element.querySelector(e);
        return self;
      };
      self.extension=function(o){
        if (o instanceof Object)for (var i in o) if (o.hasOwnProperty(i)) self[i] = o[i];
        return self;
      };
      self.isEmpty=function(o){
        o = (arguments.length)?arguments[0]:self.element;
        if (self.isObject(o)){
          return Object.keys(o).length === 0;
        } else if (self.isArray(o)){
          return o.length;
        } else {
          return true;
        }
      };
      self.isFunction=function(){
        if ((arguments.length?arguments[0]:self.element) instanceof Function) return true;
      };
      self.isObject=function(){
        if ((arguments.length?arguments[0]:self.element) instanceof Object) return true;
      };
      self.isArray=function(){
        if ((arguments.length?arguments[0]:self.element) instanceof Array) return true;
      };
      self.isNumeric=function(){
      };
      self.inArray=function(){
        return self.element.indexOf(arguments[0]) > -1;
      };
      self.merge=function(){
        var o = self.element, i = 0, il = arguments.length, k;
        for (; i < il; i++) {
          for (k in arguments[i]) {
            if (arguments[i].hasOwnProperty(k)) o[k] = arguments[i][k];
          }
        }
        return self.element;
      };
      self.each=function(){
        var o=(arguments.length > 1?arguments[0]:self.element),
        callback=(arguments.length > 1?arguments[1]:arguments[0]),
        a={
          object: function() {
            var s=0, l = Object.keys(o).length;
            for (var i in o) {
              if (o.hasOwnProperty(i)) {
                s++; callback(i, o[i], o, s==l);
              }
            }
          },
          array: function() {
            // console.log('array');
            var l = o.length;
            for (var i = 0; i < l; i++) {
              callback(i, o[i], o, i==l-1);
            }
          }
        };
        // return obj[typeof this](this);
        return a[self.isObject(o)?'object':'array']();
      };
      self.storage={
        // =require scriptive.Storage.js
      };
    }
  };
  win.scriptive=function(e){
    return new $.r(e);
  };
}(window,document));