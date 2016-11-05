setup:function(){
  // var storage = window.localStorage;
  // var value = storage.getItem(key); // Pass a key name to get its value.
  // storage.setItem(key, value) // Pass a key name and its value to add or update that key.
  // storage.removeItem(key) // Pass a key name to remove that key from storage.
  // localStorage.setItem("savedData", JSON.stringify(objects));
  // objects = JSON.parse(localStorage.getItem("savedData")));
},
name:{},
storage:window.localStorage,
select:function(key,json){
  this.name[key] = this.storage.getItem(key);
  if (json){
    this.name[key] = (this.name[key]? JSON.parse(this.name[key]):{});
  }
  return this;
},
insert:function(key,val){
  this.storage.setItem(key,val);
  return this;
},
update:function(key){
  if ($.isPlainObject(this.name[key])){
    this.storage.setItem(key,JSON.stringify(this.name[key]));
  } else {
    this.storage.setItem(key,this.name[key]);
  }
  // if (json){
  //   this.storage.setItem(key,JSON.stringify(this.name[key]));
  // } else {
  //   this.storage.setItem(key,this.name[key]);
  // }
  return this;
  // this.storage.setItem(key,val);
  // return this;
},
delete:function(key){
  this.storage.removeItem(key);
  return this;
}