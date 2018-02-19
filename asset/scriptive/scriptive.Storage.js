name:{},
db:win.localStorage,
select:function(key,val) {
  var val = this.db.getItem(this.ids(key));
  try {
    this.name[key] = val?JSON.parse(val):{};
  } catch (e) {
    this.name[key] = val;
  } finally {
    return this;
  }
},
insert:function(key,val) {
  var id = this.ids(key);
  if (typeof (val) == 'object') {
    this.db.setItem(id,JSON.stringify(val));
  } else {
    this.db.setItem(id,val);
  }
  this.name[key] = val;
  return this;
},
update:function(key,val) {
  return this.insert(key,val||this.name[key]);
},
delete:function(key) {
  this.db.removeItem(this.ids(key));
  return this;
},
deleteAll:function(key) {
  this.db.clear();
  return this;
},
ids:function(key) {
  return config.idUnique.replace(/unique/,key);
}