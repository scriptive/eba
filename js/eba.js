var configPanel={main:"#lCm",mainActive:".lmSB",menu:"#lMn"},configMain={idUnique:"eba:unique"},configuration={description:"This is not the entire bible. This is the bible analysis according to topics. Thus it helps to search, check and study the scriptures. Please be advised, read the bible book to meditate.",information:{email:"supereffortless@gmail.com",introduction:"Please give proper title/subject for your email.",list:[{name:"Advice",desc:"xxxxxxx"},{name:"Broken Report",desc:"xxxxxxx"},{name:"Copyrights",desc:"xxxxxxx"},{name:"Discussion",desc:"xxxxxxx"},{name:"Donation",desc:"xxxxxxx"},{name:"Mistaken Verse",desc:"xxxxxxx"},{name:"Question",desc:"xxxxxxx"}],conclusion:"You will be replied as soon as possible."},page:{home:{id:1,name:"Home",class:"icon-language",title:"Effortless"},category:{id:2,name:"Category",class:"book"},reader:{id:3,name:"Reader",class:"chapter"},search:{id:4,name:"Search",class:"icon-lookup",title:"Search"},result:{id:5,title:"Effortless"},bookmark:{id:6,name:"Stars",class:"icon-star",title:"Stars"},random:{id:7,name:"Random Verse",class:"icon-random",title:"Random Verse"},setting:{id:8,class:"icon-display",title:"Display"},about:{id:9,name:"About",class:"icon-about",title:"About"},contact:{id:10,name:"Contact",class:"icon-contact",title:"Contact"}},hash:{},file:{template:"z.html",book:"https://storage.googleapis.com/effortless/book.json",urlLocal:"eba/bId.xml",urlAPI:["https://storage.googleapis.com/effortless/bId.xml"]},fileStorage:{RequestQuota:1073741824,Permission:1,objectStore:{name:"eba",version:1}},lang:{isLocalRemove:'Would you like to remove "{is}" from local?',tryAWord:"Try a word or two!",noMatchFor:"No match for {for}!",noCategoryContent:"This category has no content...",noCategoryData:"This category has no data...",noBookmark:"None",noLanguage:"...",isNotFound:'Not found: "{is}"',Loading:"Loading",isError:"Error",addLang:"Add",addingLang:"Adding",removeLang:"Remove",removingLang:"Removing"},classname:{active:"active",inactive:"inactive",filter:"filter",available:"available"},version:"1.0.1",build:"1.0.1"};scriptive(configMain).ready(function(e,n){var t,a=document,o=e.storage;e.on("error",function(e){console.log("error",e)}),e.extension({notification:function(e){console.log("notification",e)},initiate:function(){configuration.pageHome=Object.keys(configuration.page)[0];var i=function(){return r().then(function(){return o.update("query"),new Promise(function(n,t){e.page[o.name.query.page](n,t)}).then(function(){a.body.setAttribute("id",o.name.query.page),e.header.content()},function(e){return e})},function(e){return e})},r=function(){var e=Object.keys(o.name.setting.available),t={page:configuration.pageHome,language:e[0],testament:1,category:1,q:"",pagePrevious:configuration.pageHome,result:""},a={page:function(e,n,t,a){a[e]=configuration.page.hasOwnProperty(n.toLowerCase())?n.toLowerCase():t},pagePrevious:function(e,n,t,a){a[e]&&configuration.page.hasOwnProperty(a[e])?t!=a.page&&(a[e]=configuration.page[t].id<=configuration.page[a.page].id?t:configuration.pageHome):a[e]=t,configuration[e]=a[e]},language:function(t,a,i,r){e.length?(n(e).inArray(a)||(configuration[t]=r[i]),o.name.query.hasOwnProperty("pageBlock")&&delete o.name.query.pageBlock):(o.name.query.page=configuration.pageHome,o.name.query.pageBlock=1)},q:function(e,n,t,a){a[e]=decodeURIComponent(n)}};return new Promise(function(e,i){try{n(o.name.query).isEmpty()?n(o.name.query).merge(t,configuration.hash):(t.pagePrevious=o.name.query.page,n(o.name.query).merge(configuration.hash)),n(o.name.query).each(function(e,n,o){a[e]instanceof Function&&a[e](e,n,t[e],o)}),e()}catch(e){i(e)}})};new Promise(function(r,l){(o.select("setting").select("book").select("query").select("language").select("randomverse").select("todo").select("bookmark").select("suggestion"),o.name.setting.hasOwnProperty("build")?o.name.setting.build==configuration.build?configuration.requireUpdate=0:configuration.requireUpdate=2:configuration.requireUpdate=1,configuration.requireUpdate&&(o.name.setting.version=configuration.version,o.name.setting.build=configuration.build,o.update("setting")),new Promise(function(n,a){t=fileStorage(configuration.fileStorage,{success:function(){e.isEmpty(o.name.book)?e.book.json().then(function(){n()},function(e){a(e)}):n()},fail:function(e){a(e)}})})).then(function(){return a.body.classList.add("config_Screen"),o.name.setting.hasOwnProperty("class")?n(o.name.setting.class).each(function(e,n){a.body.classList.add(n)}):o.name.setting.class={},o.name.setting.hasOwnProperty("available")||(o.name.setting.available={}),t.download({url:configuration.file.template.replace(/z/,["default","all"].join(".")),before:function(e){e.overrideMimeType("text/html; charset=utf-8"),e.responseType="document"}}).then(function(e){try{for(var n=e.data.body;n.firstChild;)a.body.appendChild(n.firstChild);return i().then(function(e){var n=a.querySelector("div#screen");if(e)return e;n&&n.remove()})}catch(e){return e}},function(e){return e})},function(e){return e}).then(function(e){e?l(e):r()})}).then(function(){n(configPanel).initPanel(function(e){var t=document.getElementById("lCm").getElementsByClassName("lmSB")[0];e.open(function(e){var a=e.panel.querySelector("ul");n(a).removeChild(),n(configuration.page).each(function(e,t){t.name&&n(a).appendChild("li").addClass(e).toggleClass("active",o.name.query.page==e).appendChild("a").attr("href","#"+e).setContent(t.name)}),!0===e.overlay&&(t.style.opacity=.2)}),e.close(function(){t.style.opacity=1}),e.drag(function(e){!0===e.overlay&&(t.style.opacity=parseFloat(1-e.percentage/170).toFixed(2))})}),e.resizeEvent(function(){}),e.hashChange(function(e){e&&(configuration.hash=e),i().then(function(e){e&&console.log("page error",e)})});document.querySelector("form.search")},function(n){"object"==typeof n&&n.hasOwnProperty("message")?e.notification(n.message):"string"==typeof n&&e.notification(n)})},Data:function(n){var a=e.book,i="book",r=o.name,l=this;this.open=function(){return t.open({urlLocal:configuration.file.urlLocal.replace(/bId/,n),readAs:"readAsText"})},this.download=function(e){var o={dir:JSON.parse(JSON.stringify(configuration.file.urlAPI)),request:function(a){return t.download({url:a,urlLocal:configuration.file.urlLocal.replace(/bId/,n),before:function(e){e.overrideMimeType("text/xml; charset=utf-8")},progress:e})},process:function(e,t){var i=o.dir.shift().replace(/bId/,n);return o.request(i).then(function(t){t.xml||(t.xml=(new DOMParser).parseFromString(t.data,t.fileType)),a.file[n]=t.xml,e(t)},function(n){o.dir.length?o.process(e,t):t(n)})}};return new Promise(o.process)},this.save=function(c){return new Promise(function(s,u){t.save(c).then(function(t){a.hasOwnProperty(i)&&a[i].hasOwnProperty(n)&&(r[i][n]=a[i][n]);var c=t.total;new e.Content(n).xml().then(function(e){e.information().then(function(e){e.information.size=l.bytesToSize(c),a.hasOwnProperty(i)&&a[i].hasOwnProperty(n)?r[i][n].information=e.information:r[i][n]={name:e.information.name,updated:"0",information:e.information},o.name.setting.available[n]=1},function(e){console.log(e)})},function(e){}).then(function(){o.update(i).update("setting"),s(t)})},function(e){u(e)})})},this.bytesToSize=function(e,n){if(0==e)return"0 Bytes";var t=n||2,a=Math.floor(Math.log(e)/Math.log(1e3));return parseFloat((e/Math.pow(1e3,a)).toFixed(t))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]},this.delete=function(){return new Promise(function(e,a){t.delete({urlLocal:configuration.file.urlLocal.replace(/bId/,n),fileNotFound:!0}).then(function(t){delete r[i][n].information,delete o.name.setting.available[n],o.update(i).update("setting"),e(t)},function(e){a(e)})})},this.request=function(e){return new Promise(function(t,o){a.file.hasOwnProperty(n)?t(a.file[n]):r[i].hasOwnProperty(n)?l.open().then(function(e){e.xml=(new DOMParser).parseFromString(e.fileContent,e.fileType),a.file[n]=e.xml,t(e.xml)},function(e){l.delete().then(function(){o(e)})}):l.download(e).then(function(e){l.save(e).then(function(){console.log("save success")},function(){console.log("save fail")}).then(function(){t(e.xml)})},function(e){o(e)})})}},Content:function(t){var a,i={category:0,section:0,verse:0};configuration.category={};var r=function(t,a,o){return new Promise(function(r,l){var s=c(o);if(!s.length)return l(configuration.lang.noCategoryData);n(s).each(function(r,l){var c,s=o||l.getAttribute("id");n(l.querySelectorAll(m())).each(function(o,r){var l=a(r);if(l){c||(c=f.createOl(t,s)),i.verse++;var m=r.getAttribute("book"),g=m<=39?1:2,p=r.getAttribute("chapter"),h=r.getAttribute("verse"),v=(r.getAttribute("tag"),d(g).innerHTML,u(m).innerHTML),y=e.book.hasBookmark(s,m,p,h)?configuration.classname.active:configuration.classname.inactive,C=m<=39?"OT":"NT",b=v.replace(/\s+/g,"-").toLowerCase(),k=e.createElement("li");n(c).appendChild(k).addClass(y).addClass(C).addClass(b),n(k).appendChild("div").addClass("icon-star").click(function(n){e.book.addBookmark(n.target.parentNode,s,m,p,h)}),n(k).appendChild("div").attr("data-title","123 234:345".replace(123,v).replace(234,p).replace(345,h)).setContent(f.replaceNumber(l))}})}),i.verse?r(i):l(o?configuration.lang.noCategoryContent:configuration.lang.noMatchFor)})},l=function(e){return e?a.querySelector('section row[id="0"]'.replace(0,e)):a.querySelectorAll("section row")},c=function(e){return a.querySelectorAll(e?'category[id="0"]'.replace(0,e):"category")},s=function(e){return a.querySelectorAll('category[id="0"] row'.replace(0,e))},u=function(e){return e?a.querySelector('book row[id="0"]'.replace(0,e)):a.querySelectorAll("book row")},d=function(e){return e?a.querySelector('testament row[id="0"]'.replace(0,e)):a.querySelectorAll("testament row")},m=function(e,n,t,a,o){var i="row";return e&&(i+='[book="0"]'.replace(0,e)),n&&(i+='[chapter="0"]'.replace(0,n)),t&&(i+='[verse="0"]'.replace(0,t)),a&&(i+='[testament="0"]'.replace(0,a)),o&&(i+='[tag="0"]'.replace(0,o)),i},f={replaceKeyword:function(e,n){return"string"==typeof n?e.replace(new RegExp(n,"gi"),"<b>$&</b>"):e},replaceNumber:function(e){return e.match(/\[(.*?)\]/g).length>1?e.replace(/\[(.*?)\]/g,"<sup>$1</sup>"):e.replace(/\[(.*?)\]/g,"")},createOl:function(t,a){i.category++;var o=l(a),r=e.createElement("li");return n(r).appendChild("h2").attr("data-description",o.innerHTML).setContent(o.getAttribute("name")),e.book.category.name=o.getAttribute("name"),n(t).appendChild(r).appendChild("ol").element}},g={section:function(e){return new Promise(function(t,a){var o=[];n(l()).each(function(t,a){i.section++;var r=a.getAttribute("id"),l=a.getAttribute("name"),c=(a.getAttribute("sort"),a.innerHTML,l.charAt(0));o.indexOf(c)<0&&(o.push(c),n(e).appendChild("li").addClass("alpha").attr("id",c).setContent(c)),n(e).appendChild("li").addClass("icon-arrow-right").attr("data-title",r).appendChild("a").attr("data-total",s(r).length).attr("data-description",a.innerHTML).attr("href","#reader?category="+r).setContent(l)}),t(i)})},randomverse:function(){return new Promise(function(e,n){i.information={};var t=Math.floor(Math.random()*l().length),a=s(t),o=a[Math.floor(Math.random()*a.length)],r=o.getAttribute("book"),c=o.getAttribute("chapter"),u=o.getAttribute("verse");i.information[t]={},i.information[t][r]={},i.information[t][r][c]=[u],e(i)})},information:function(){return new Promise(function(e,t){var o;i.information={},n(o?a.querySelector('info row[id="0"]'.replace(0,o)):a.querySelectorAll("info row")).each(function(e,n){i.section++;var t=n.getAttribute("id");i.information[t]=n.innerHTML}),e(i)})},reader:function(e,n){return r(e,function(e){return e.innerHTML},n)},lookup:function(e,n){return r(e,function(e){var t=e.getAttribute("testament");if(new RegExp(n,"i").test(e.innerHTML)){if(!(t=e.getAttribute("testament")))return f.replaceKeyword(e.innerHTML,n);if(t==o.name.testament)return f.replaceKeyword(e.innerHTML,n)}})},bookmark:function(t,a){return new Promise(function(r,l){n(a).each(function(a,r){var l;n(r).each(function(r,s){n(s).each(function(s,g){n(g).each(function(g,p){n(c(a)).each(function(c,g){n(g.querySelectorAll(m(r,s,p))).each(function(c,m){l||(l=f.createOl(t,a)),i.verse++;var g=d(r<=39?1:2).innerHTML,h=u(r).innerHTML,v=g.replace(" ","-").toLowerCase(),y=h.replace(" ","-").toLowerCase(),C=e.book.hasBookmark(a,r,s,p)?configuration.classname.active:configuration.classname.inactive,b=e.createElement("li");n(l).appendChild(b).addClass(C).addClass(v).addClass(y),n(b).appendChild("div").addClass("icon-star").click(function(t){var i=t.target.parentNode;e.book.addBookmark(i,a,r,s,p),"randomverse"!=o.name.query.page&&(i=i.remove())&&""===i.innerHTML&&(i=i.parentNode.remove())&&""===i.innerHTML&&n(i).addClass("msg").appendChild("li").appendChild("div").setContent(configuration.lang.noBookmark)}),n(b).appendChild("div").attr("data-title","123 234:345".replace(123,h).replace(234,s).replace(345,p)).setContent(f.replaceNumber(m.innerHTML))})})})})})}),i.verse?r(i):l(configuration.lang.noBookmark)})}};this.xml=function(){return new Promise(function(n,o){new e.Data(t).request(function(){}).then(function(e){a=e,n(g)},function(e){o(e)})})}},book:{file:{},category:{},addBookmark:function(e,n,t,a,i){var r=o.name.bookmark;e.classList.contains(configuration.classname.active)?(r[n][t][a].splice(r[n][t][a].indexOf(i),1),r[n][t][a].length<=0&&(delete r[n][t][a],0===Object.keys(r[n][t]).length&&(delete r[n][t],0===Object.keys(r[n]).length&&delete r[n])),e.classList.remove(configuration.classname.active),e.classList.add(configuration.classname.inactive)):(r.hasOwnProperty(n)||(r[n]={}),r[n].hasOwnProperty(t)||(r[n][t]={}),r[n][t].hasOwnProperty(a)||(r[n][t][a]=[]),r[n][t][a].push(i.toString()),e.classList.add(configuration.classname.active),e.classList.remove(configuration.classname.inactive)),o.update("bookmark")},hasBookmark:function(e,n,t,a){var i=o.name.bookmark;if(i.hasOwnProperty(e)&&i[e].hasOwnProperty(n)&&i[e][n].hasOwnProperty(t))return i[e][n][t].indexOf(a)>-1},isAvailable:function(e){if(!n(o.name.book).isEmpty()&&o.name.book.hasOwnProperty(e)&&o.name.book[e].hasOwnProperty("information"))return!0},json:function(a){return new Promise(function(i,r){a=a||configuration.file.book,t.download({url:a}).then(function(t){e.book.all=n(o.name.book).merge(JSON.parse(t.data)),o.update("book"),i()},function(e){r(e)})})}},page:{home:function(t,i){var r=a.getElementById("lCm").getElementsByClassName("lmSB")[0];n(r).removeChild();var l=a.createElement("ul");l.setAttribute("class","home"),o.name.query.hasOwnProperty("pageBlock")&&n(r).appendChild("ul").addClass("msg notify").appendChild("li").appendChild("p").setContent(configuration.lang.noLanguage),r.appendChild(l),n(o.name.book).each(function(t,o){var i=a.createElement("li"),r=a.createElement("div"),c=a.createElement("div"),s=a.createElement("div");i.setAttribute("id",t),r.appendChild(c),r.appendChild(s),n(c).click(function(e){var n=e.target;window.location.hash="#category?language=lID".replace(/lID/,n.dataset.bid)}).attr("data-bid",t).setContent(o.name),n(s).click(function(n){n.target;e.book.isAvailable(t)?(s.innerHTML=configuration.lang.removingLang,new e.Data(t).delete().then(function(){s.innerHTML=configuration.lang.addLang},function(e){s.innerHTML=configuration.lang.isError})):new e.Data(t).download(function(){s.innerHTML=configuration.lang.addingLang}).then(function(n){return new e.Data(t).save(n).then(function(){s.innerHTML=configuration.lang.removeLang},function(){s.innerHTML=configuration.lang.isError+":01"})},function(e){s.innerHTML=configuration.lang.isError+":02"})}).setContent(configuration.lang.addLang),e.book.isAvailable(t)&&(i.setAttribute("class",configuration.classname.active),s.innerHTML=configuration.lang.removeLang),i.appendChild(r),l.appendChild(i)}),t()},category:function(t,i){var r=o.name.query,l=r.page,c=r.language,s=a.getElementById("lCm").getElementsByClassName("lmSB")[0],u=n(s).removeChild().appendChild("ul").attr("class","category");configuration.page[l].title=o.name.book[c].name,new e.Content(c).xml().then(function(e){e.section(u.element).then(function(e){},function(e){})},function(e){u.attr("class","msg error").appendChild("li").appendChild("div").setContent(configuration.lang.isNotFound.replace("{is}",o.name.query.language))}).then(function(){t();var o=e.createElement("li");n(s).appendChild("ul").attr("class","category-index").appendChild(o).click(function(e){var n=e.target.getAttribute("class"),t=a.getElementById(n);t&&(s.scrollTop=t.offsetTop)}),u.selectChild("li.alpha",!0).each(function(e,t){n(o).appendChild("p").attr("class",t.getAttribute("id")).setContent(t.innerHTML)})})},reader:function(t,i){var r=a.getElementById("lCm").getElementsByClassName("lmSB")[0],l=n(r).removeChild().appendChild("ul").attr("class","reader"),c=o.name.query,s=c.page,u=c.language;new e.Content(u).xml().then(function(e){e.reader(l.element,c.category).then(function(e){},function(e){})},function(e){}).then(function(){configuration.page[s].title=e.book.category.name,t()})},search:function(t,i){var r=a.getElementById("lCm").getElementsByClassName("lmSB")[0],l=e.createElement("ul");n(r).removeChild().appendChild(l).addClass("search"),n(l).appendChild("li").appendChild("div").appendChild("input").attr("type","search").attr("name","q").attr("id","q").attr("placeholder","search..."),n(l).appendChild("li").appendChild("div").click(function(t){var a=t.target;if(a.nextElementSibling)a.nextElementSibling.remove();else{var i=e.createElement("ol");n(a.parentNode).appendChild(i).click(function(e){var t=e.target,a=t.getAttribute("id");a&&o.name.query.language!=a&&(t.parentNode.querySelector("."+configuration.classname.active).classList.remove(configuration.classname.active),n(t).addClass(configuration.classname.active),o.name.query.language=a)}),n(o.name.book).each(function(e,t){n(i).appendChild("li").attr("id",e).addClass(o.name.query.language==e?configuration.classname.active:configuration.classname.inactive).setContent(t.name)})}}).setContent("Language");var c=e.createElement("div");n(l).appendChild("li").addClass("lsi").appendChild(c).click(function(e){var t=e.target,a=t.getAttribute("id");if(a&&o.name.query.testament!=a){var i=t.parentNode.querySelector("."+configuration.classname.active);i&&i.classList.remove(configuration.classname.active),n(t).addClass(configuration.classname.active),o.name.query.testament=a}}),n(c).appendChild("p").attr("id","1").addClass(1==o.name.query.testament?configuration.classname.active:configuration.classname.inactive).setContent("OT"),n(c).appendChild("p").attr("id","2").addClass(2==o.name.query.testament?configuration.classname.active:configuration.classname.inactive).setContent("NT"),n(l).appendChild("li").appendChild("div").click(function(){var e=a.getElementById("q").value;e&&o.name.query.language&&o.name.query.testament&&(window.location.hash="#result?q=123&i=234".replace(/123/,e).replace(/234/,(new Date).getTime()))}).setContent("Enter"),t()},result:function(t,i){var r=a.getElementById("lCm").getElementsByClassName("lmSB")[0],l=e.createElement("ul"),c=o.name.query,s=(c.page,c.language);n(r).removeChild().appendChild(l).attr("class","reader"),new e.Content(s).xml().then(function(e){o.name.query.q?e.lookup(l,o.name.query.q).then(function(e){},function(e){n(l).attr("class","msg error").appendChild("li").appendChild("div").setContent(e.replace("{for}",o.name.query.q))}):n(l).attr("class","msg error").appendChild("li").appendChild("div").setContent(configuration.lang.tryAWord)},function(e){n(l).attr("class","msg error").appendChild("li").appendChild("div").setContent(configuration.lang.isNotFound.replace("{is}",o.name.query.book))}).then(function(){t()})},bookmark:function(t,i){var r=a.getElementById("lCm").getElementsByClassName("lmSB")[0],l=e.createElement("ul");n(r).removeChild().appendChild(l).attr("class","reader"),new e.Content(o.name.query.language).xml().then(function(e){e.bookmark(l,o.name.bookmark).then(function(e){},function(e){n(l).attr("class","msg error").appendChild("li").appendChild("div").setContent(e)})},function(e){n(l).attr("class","msg error").appendChild("li").appendChild("div").setContent(configuration.lang.isNotFound.replace("{is}",o.name.query.language))}).then(function(){t()})},random:function(t,i){var r=a.getElementById("lCm").getElementsByClassName("lmSB")[0],l=e.createElement("ul");n(r).removeChild().appendChild(l).attr("class","reader");var c=!1,s=(new Date).toLocaleDateString().toString().replace(/\//g,"");new Promise(function(t,a){o.name.randomverse&&n(o.name.randomverse).isObject()&&!n(o.name.randomverse).isEmpty()?o.name.randomverse.id!=s&&(o.name.randomverse.id=s,c=!0):(c=!0,o.name.randomverse.id=s),c?new e.Content(o.name.query.language).xml().then(function(e){e.randomverse().then(function(e){o.name.randomverse.verse=e.information,o.update("randomverse"),t()})}):t()}).then(function(){new e.Content(o.name.query.language).xml().then(function(e){e.bookmark(l,o.name.randomverse.verse).then(function(e){},function(e){})},function(e){}).then(function(){t()})})},setting:function(t,i){var r=o.name.setting,l=a.getElementById("lCm").getElementsByClassName("lmSB")[0],c=e.createElement("ul");n(l).removeChild().appendChild(c).addClass("setting"),r.hasOwnProperty("class")||(r.class={}),n({fontsize:{title:"Words size",style:"body {font-size:$100%;}",option:{"80%":{title:"1",class:"size-small-extra"},"90%":{title:"2",class:"size-small"},"100%":{title:"3",class:"size-normal",defaults:!0},"120%":{title:"4",class:"size-large"},"150%":{title:"5",class:"size-large-extra"}}},background:{title:"background colour",style:"body {background-color:$white;}",option:{"#ffffff":{class:"color-white"},"#F8F8F8":{class:"color-lightgray",defaults:!0},"#7f7f7f":{class:"color-dimgrey"},"#b97a59":{class:"color-chocolate"},"#880016":{class:"color-darkred"},"#ed1b24":{class:"color-red"},"#fef102":{class:"color-gold"},"#24b04d":{class:"color-green"},"#3f47cc":{class:"color-darkblue"}}}}).each(function(t,a){var i=e.createElement("li");n(c).appendChild(i).appendChild("h3").setContent(a.title);var l=n(c).appendChild(i).appendChild("ol").addClass(t).element;n(a.option).each(function(e,a){var i=configuration.classname.inactive,c=n(l).appendChild("li").addClass(a.class).addClass("icon-ok");a.hasOwnProperty("title")&&c.attr("data-title",a.title),r.class.hasOwnProperty(t)?i=r.class[t]==a.class?configuration.classname.active:configuration.classname.inactive:a.hasOwnProperty("defaults")&&(i=configuration.classname.active),c.addClass(i).click(function(e){var i=e.target;i.classList.contains(configuration.classname.active)||(n(i.parentNode.getElementsByClassName(configuration.classname.active)).each(function(e,n){n.classList.remove(configuration.classname.active)}),i.classList.add(configuration.classname.active),r.class.hasOwnProperty(t)&&document.body.classList.contains(r.class[t])&&document.body.classList.remove(r.class[t]),document.body.classList.contains(a.class)||document.body.classList.add(a.class),r.class[t]=a.class,o.update("setting"))})})}),t()},about:function(t,i){var r=a.getElementById("lCm").getElementsByClassName("lmSB")[0],l=e.createElement("ul");n(r).removeChild().appendChild(l).addClass("about").appendChild("li").addClass("description").appendChild("p").addClass("desc").setContent(configuration.description),n(o.name.book).each(function(t,a){var o=e.createElement("li");n(l).appendChild(o),n(o).addClass(configuration.classname.available).appendChild("h3").setContent(a.name),a.hasOwnProperty("information")&&!n(a.information).isEmpty()?(n(o).appendChild("p").attr("data-title","Version").setContent(a.information.version),a.information.hasOwnProperty("size")?n(o).appendChild("p").attr("data-title","Size").setContent(a.information.size):n(o).appendChild("p").attr("data-title","Size").setContent("size view required to readd language")):n(o).addClass(configuration.classname.inactive)}),t()},contact:function(t,o){var i=a.getElementById("lCm").getElementsByClassName("lmSB")[0];n(i).removeChild();var r=e.createElement("ul");i.appendChild(r).setAttribute("class","about");var l=configuration.information;r.appendChild(e.createElement("li")).innerHTML=l.email,r.appendChild(e.createElement("li")).innerHTML=l.introduction;var c=e.createElement("li");n(r).appendChild(c),n(l.list).each(function(e,t){n(c).appendChild("p").attr("data-title",t.name).setContent(t.desc)}),r.appendChild(e.createElement("li")).innerHTML=l.conclusion,t()}},header:{content:function(){var e=a.getElementById("lMn"),t=e.querySelector(".icon-panel"),i=e.querySelector("#lmD"),r=e.querySelector("#backLink");i.setAttribute("data-title",configuration.page[o.name.query.page].title),o.name.query.page!=o.name.query.pagePrevious?r||((r=a.createElement("li")).setAttribute("class","icon-left"),r.setAttribute("id","backLink"),e.insertBefore(r,e.firstChild),t.style.display="none",n(r).click(function(){window.location.hash="#123".replace(/123/,o.name.query.pagePrevious)})):r&&(r.remove(),t.style.display="")}}}).initiate()});