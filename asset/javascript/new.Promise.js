return new Promise(function(resolve, reject) {
  if (Iam == ok) {
    resolve();
  } else {
    reject(e);
  }
}).then(function(){
  return true;
},function(e){
  return e;
});