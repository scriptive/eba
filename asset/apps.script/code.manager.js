// =include code.Common.js
// NOTE: do

var defaultSheetName = "Language";
function doGet(e) {
  return HtmlService.createTemplateFromFile('layout').evaluate()
  .setSandboxMode(HtmlService.SandboxMode.NATIVE)
  .setTitle('Effortless bible analysis')
  .setFaviconUrl('https://scriptive.github.io/eba/img/icon.png')
  .addMetaTag('viewport', 'initial-scale=1.0, user-scalable=no');
}
function doPost(e){
  // app.query = e;
  try {
    return app.response.json(new app.spreadsheet().from(defaultSheetName).post(e.parameter));
  } catch(e){
    return app.response.json(e);
  } 
}
// NOTE: custom
function userTest() {
  // var response = new app.spreadsheet().from(app.config.app.config.sheetIndex).search({email:'khensolomon@gmail.com',name:'one'});
  // var response = new app.spreadsheet().from(defaultSheetName).search({id:'1480014116507'});
  var response = new app.spreadsheet().from(defaultSheetName).get();
  Logger.log(response);
  // var response = new app.spreadsheet().from(app.config.sheetIndex).search({sheet:'Lamal',name:'source'});
  /*
  var column={
    name: new app.spreadsheet().from(defaultSheetName).columnName()
    index:{}
  };
  var columnIndex = new app.spreadsheet().from(app.config.sheetIndex);
  for(var id in column.name){
    var columnId = column.name[id];
    column.index[columnId]=columnIndex.search({sheet:'Lamal',column:columnId}).row[0]||{};
  }
  return column;
  */
}
function relationalTest() {
    var response = new app.spreadsheet().from('Category').get({relational:{language:1}});
    Logger.log(response);
}
function userCheck() {
  return app.user.check(app.config.sheetUser,app.config.sheetMessage);
}
function userInvitation(param) {
  var userUrl = ScriptApp.getService().getUrl(), userMessage = new app.spreadsheet().from(app.config.sheetMessage);
  var message = userMessage.search({id:'userSendInvitation'}).row[0].message;
  MailApp.sendEmail(param.email, defaultSheetName,message.replace(0,param.name).replace(1,param.message).replace(2,userUrl));
  // var user = new app.spreadsheet().from(app.config.app.config.sheetIndex).search({email:param.email});
  return userMessage.search({id:'userSentInvitation'}).row[0].message.replace(0,param.email);
}
function select(param) {
  return new app.spreadsheet().from(param.sheetName).get(param);
}
function update(param) {
  return new app.spreadsheet().from(param.sheetName).post(param);
}
function search(param) {
  if (param.hasOwnProperty('relational')) {
    return new app.spreadsheet().from(param.sheetName).search(param.relational);
  } else {
    return new app.spreadsheet().from(param.sheetName).get(param);
  }
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
// function setup() {
//   app.service.script.setProperty("SpreadsheetId", SpreadsheetApp.getActiveSpreadsheet().getId());
// }