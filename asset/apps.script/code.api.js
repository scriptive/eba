// =include code.Common.js
var defaultSheetName = "Language";
// https://script.google.com/macros/s/AKfycbzTlG_e7waRlElIWEUheKXZ5mjiWRvhH1qQ5QwTqWPsu6tUgMAn/exec
// https://script.google.com/macros/s/AKfycbzTlG_e7waRlElIWEUheKXZ5mjiWRvhH1qQ5QwTqWPsu6tUgMAn/exec
// https://script.google.com/macros/s/AKfycby_JUIqAOFFCJLwpB-O0qeMenNER9mWJJdN2cgbQmsc/dev
// NOTE: how to
// https://script.google.com/macros/s/AKfycby_JUIqAOFFCJLwpB-O0qeMenNER9mWJJdN2cgbQmsc/dev?sheet=Language
// https://script.google.com/macros/s/AKfycby_JUIqAOFFCJLwpB-O0qeMenNER9mWJJdN2cgbQmsc/dev?sheet=Category&language=2
// https://script.google.com/macros/s/AKfycby_JUIqAOFFCJLwpB-O0qeMenNER9mWJJdN2cgbQmsc/dev?sheet=Book&language=2
// https://script.google.com/macros/s/AKfycby_JUIqAOFFCJLwpB-O0qeMenNER9mWJJdN2cgbQmsc/dev?sheet=Verse&category=2
/*
NOTE parameter?
  sheet=sheetName
*/
function doGet(e) {
  if (e.queryString && e.parameter.sheet){
    try {
      if (e.parameter.language){
        e.parameter.relational={language:e.parameter.language};
      }
      if (e.parameter.category){
        e.parameter.relational={category:e.parameter.category};
      }
      return app.response.json(new app.spreadsheet().from(e.parameter.sheet).get(e.parameter));
    } catch(e){
      return app.response.json(e);
    }
  } else {
    return app.response.json(new app.spreadsheet().from(defaultSheetName).get());
  }
}
// function doPost(e){
//   JSON.parse(e.postData.contents)
//   if (e.queryString && e.parameter.sheet){
//     try {
//       return app.response.json(new app.spreadsheet().from(e.parameter.sheet).post(e.parameter));
//     } catch(e){
//       return app.response.json(e);
//     }
//   } else {
//     return app.response.json({message:'error'});
//   }
// }
function test(e) {
  var response = new app.spreadsheet().from('abc').get();
  Logger.log(response);
}
