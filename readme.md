# EBA
Effortless bible analysis

```json
// scriptive.json
"project": {
  "eba":{
    "root":"../scriptive.eba"
  }
}
```
## Initiate
- [x] Home
- [x] Category
- [x] Reader
- [x] Search
- [x] Result
- [x] Stars
- [x] Random Verse
- [x] About
- [x] Contact

```javascript
// process().template().terminal().route();
// terminal().route();
var process();
var template();
var terminal();
var route();

new Promise(function(resolve, reject) {
  process().then(function(){
    return template();
  },function(e){
    return e;
  }).then(function(e) {
    if (e) {
      reject(e);
    } else {
      resolve();
    }
  });
}).then(function() {
  app.resizeEvent(function(){
  });
  app.hashEvent(function(e) {
    if(e)configuration.hash=e;
    terminal().then(function(e) {
    });
  });
  app.panelEvent(function(s){
  });

}, function(e) {
  app.notification(e);
});
```

## Todo
- Page
  - [x] Home/Language
  - [x] -Category
  - [x] -Reader
  - [x] Lookup/search
  - [x] Bookmark/Stars
  - [x] Setting/Display
  - [x] Random Verse
  - [x] About
  - [x] Contact

## Command lines

- `npm run download -- --pro=eba`
- `gulp --pro=eba`
- `npm run build -- --os=<chrome,ios,android,web,electron> --pro=<?>  --dir=<?>`
  - `npm run ios -- --pro=eba`
  - `npm run android -- --pro=eba`
  - `npm run web -- --pro=eba`
  - `npm run electron -- --pro=eba`
  - `npm run chrome -- --pro=eba`
- `npm run docs -- --pro=eba`
- `npm run developer -- --pro=eba`