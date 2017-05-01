/*
  developer: Khen Solomon Lethil
  version: 1.0.3
*/
var app={
  service:{
    document:PropertiesService.getDocumentProperties(), script:PropertiesService.getScriptProperties(), user:PropertiesService.getUserProperties()
  },
  query:{
  },
  config:{
    sheetUser:'User', sheetMessage:'Message', sheetIndex:'Index',sheetConfig:'Config'
  },
  spreadsheet:function(openCallback){
    if (typeof(openCallback) == 'function') {
      this.spreadsheet = openCallback(SpreadsheetApp);
    } else {
      // this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      // this.spreadsheet = SpreadsheetApp.openById(SpreadsheetApp.getActiveSpreadsheet().getId());
      this.spreadsheet = SpreadsheetApp.openById(app.service.script.getProperty("SpreadsheetId"));
    }
    this.owner=function(){
      this.owner = this.spreadsheet.getOwner();
      this.email=function(){
        return this.owner.getEmail();
      };
      this.username=function(){
        return this.owner.getUsername();
      };
      return this;
    };
    this.from=function(sheetName){
      this.sheet=this.spreadsheet.getSheetByName(sheetName);
      this.columnName=function(){
        return this.sheet.getRange(1, 1, 1, this.sheet.getLastColumn()).getValues()[0];
      };
      this.Indexes=function(){
        return new app.spreadsheet().from(app.config.sheetIndex);
      };
      this.columnIndex=function(name){
        var column={};
        for(var id in name){
          var columnId = name[id];
          column[columnId]=this.Indexes().search({sheet:sheetName,column:columnId}).row[0]||{};
        }
        return column;
      };
      this.positionInRow=function(rowNum, columnNum, nameValue) {
        // var rowNum = 1, columnNum = 1;
        var row = this.sheet.getRange(rowNum, columnNum, this.sheet.getLastRow()).getValues();
        for (var i=0; i<row.length; i++) { 
          if ( row[i].join("#").indexOf(nameValue) !== -1 ) {
            return i+1;
          }
        }
        return false;
      };
      // NOTE: not using at the moment!
      this.positionInColumn=function(columnName, nameValue) {
        var column = this.sheet.getRange(columnName + ":" + columnName);  // like A:A
        var values = column.getValues(); 
        var row = 0;
        while ( values[row] && values[row][0] !== nameValue ) {
          row++;
        }
        if (values[row][0] === nameValue) 
          return row+1;
        else 
          return -1;
      };
      this.get=function(param){
        var row=[],rowTotal=1,column={},sheetRelational;
        if (this.sheet) {
          var columnKeys=[],data=this.sheet.getDataRange().getValues();
          rowTotal=data.length; 
          for(var id in data){
            var cell={}, rowValues = data[id];
            if (id == 0){
              for(var n in rowValues){
                var name = rowValues[n];
                column[name]={};
                columnKeys.push(name);
                if (typeof(param) != 'function'){
                  var Indexes = this.Indexes();
                  if (Indexes.sheet){
                    var columnIndex = Indexes.search({sheet:sheetName,column:name}).row[0];
                    if (columnIndex){
                      if (columnIndex.hasOwnProperty('option')) try { columnIndex.option = JSON.parse(columnIndex.option); } catch (e) { };
                      column[name]=columnIndex;
                    }
                  }
                }
              }
              // columnKeys=Object.keys(column);
            } else {
              if (typeof(param) == 'function') {
                cell = param(rowValues,columnKeys);
              } else {
                for(var i=0; i < columnKeys.length; i++) {
                  var name = columnKeys[i];
                  if (column.hasOwnProperty(name) && column[name].hasOwnProperty('option') &&  column[name].option.hasOwnProperty('relational')){
                    if (!sheetRelational) sheetRelational= new app.spreadsheet().from(column[name].option.relational)
                    var rowRelational = sheetRelational.search(app.merge({id:rowValues[i]},(typeof param =='object')?param.relational:{})).row[0];
                    cell[name] = rowRelational?rowRelational:rowValues[i];
                  } else {
                    cell[name]=rowValues[i];
                  }
                  // if (name == 'relational') {
                  //   
                  //   if (!sheetRelational) sheetRelational= new app.spreadsheet().from(sheetName+'Relational')
                  //   var rowRelational = sheetRelational.search(app.merge({id:rowValues[i]},param)).row[0];
                  //   cell[columnKeys[i]] = rowRelational?rowRelational:rowValues[i];
                  // } else{
                  //   cell[columnKeys[i]]=rowValues[i];
                  // }
                  // if (columnKeys[i] == 'Relational') {
                  //   if (!sheetRelational) sheetRelational= new app.spreadsheet().from(sheetName+columnKeys[i])
                  //   var rowRelational = sheetRelational.search(app.merge({id:rowValues[i]},param)).row[0];
                  //   cell[columnKeys[i]] = rowRelational?rowRelational:rowValues[i];
                  // } else{
                  //   cell[columnKeys[i]]=rowValues[i];
                  // }
                }
                // for(var i=0; i < columnKeys.length; i++) {
                //   cell[columnKeys[i]]=rowValues[i];
                // }
              }
              if (typeof(cell) === 'object')row.push(cell);
              // if (typeof(cell) === 'object' && Object.keys(cell).length)row.push(cell);
            }
          }
        }
        return {rowTotal:--rowTotal,rowReturn:row.length,row:row,column:column};
      };
      this.search=function(arg) {
        return this.get(function(row,column){
          var cell={}, status=0;
          for(var i in column){
            cell[column[i]]=row[i];
            for (var k in arg) if(column[i] == k && row[i] == arg[k])status++;
          }
          return (Object.keys(arg).length == status?cell:false);
        });
      };
      this.post=function(param) {
        var lock=LockService.getPublicLock(), param=app.merge({indexName:{}},param);
        lock.waitLock(30000);
        try {
          var rowDate=new Date(), rowId=rowDate.valueOf(), rowPosition, column=this.columnName(), cell=[];
          if (param.hasOwnProperty('indexName') && typeof (param.indexName) === 'object') {  
            var indexPosition = column.indexOf(param.indexName.key)+1;
            if (indexPosition) {
              // NOTE: has to DELETE or EDIT
              if (param.indexName.hasOwnProperty('value') && param.indexName.value){
                rowPosition = this.positionInRow(1,indexPosition,param.indexName.value);
              }
            }
          }
          if (rowPosition && param.indexName.task == 'delete'){
            // NOTE: DELETE
            this.sheet.deleteRow(rowPosition);
          } else {
            for(var i in column){
              var cellValue, columnName = column[i], hasColumnValue = param.hasOwnProperty(columnName);
              if (columnName == param.indexName.key) {
                cellValue = rowId;
                if (hasColumnValue) {
                  cellValue = param[columnName];
                }
              } else if (columnName == "timestamp") {
                if (hasColumnValue) {
                  cellValue = param[columnName];
                } else {
                  cellValue = rowDate;
                }
              } else if (hasColumnValue){
                cellValue = param[columnName];
              } else {
                cellValue ='';
              }
              if (rowPosition) {
                if (hasColumnValue){
                  // NOTE: EDIT
                  this.sheet.getRange(rowPosition,parseInt(i)+1).setValues([[cellValue]]);
                }
              } else {
                cell.push(cellValue);
              }
            }
            if (cell.length){
              // NOTE: INSERT
              this.sheet.getRange(this.sheet.getLastRow()+1, 1, 1, cell.length).setValues([cell]);
            }
          }
          if (param.hasOwnProperty('relational')) {
            if (param.relational === true){
              return true;
            } else {
              return this.search(param.relational);
            }
          } else {
            return this.get();
          }
        } catch(e){
          return e;
        } finally {
          lock.releaseLock();
        }
      };
      this.update=function(resp) {
      };
      return this;
    };
  },
  user:{
    active:function(){
      return Session.getActiveUser();
      // return Session.getEffectiveUser();
      // return Session.getTemporaryActiveUserKey();
    },
    email:function(){
      return this.active().getEmail();
    },
    username:function(){
      return this.active().getUsername();
    },
    check:function(user,message){
      var userEmail=this.email();
      var userName=this.username();
      var userMessage = new app.spreadsheet().from(message);
      var response = new app.spreadsheet().from(user).search({email:userEmail});
      // var response = new app.spreadsheet().from(user).search({email:userEmail});
      if (response.rowReturn) {
        response.row[0].userStatus=3;
        response.row[0].userNotices=userMessage.search({id:'userNotices'}).row[0].message;
        if (response.row[0].role) {
          if (typeof (response.row[0].role) == 'string') {
            // NOTE: under approval
            response.row[0].userStatus=0;
            if (!response.row[0].message) {
              response.row[0].message = userMessage.search({id:'userRegistered'}).row[0].message.replace(0,userEmail);
            }
          } else if (!response.row[0].message) {
            // NOTE: Approved
            response.row[0].message = userMessage.search({id:'userApproved'}).row[0].message.replace(0,userEmail);
          }
        } else {
          response.row[0].userStatus=2;
          if (!response.row[0].message) {
            response.row[0].message = userMessage.search({id:'userProcess'}).row[0].message.replace(0,userEmail);
          }
        }
      } else if (new app.spreadsheet().owner().email() == userEmail) {
        response.row.push({
          message:userMessage.search({id:'userOwner'}).row[0].message.replace(0,userName),
          email:userEmail,
          name:'Team',
          about:'Application developer',
          role:7,
          userStatus:7
        });
      } else {
        // NOTE: request registration
        response.row.push({
          message:userMessage.search({id:'userRegistration'}).row[0].message.replace(0,userEmail),
          email:userEmail,
          userStatus:1,
          userNotices:userMessage.search({id:'userNotices'}).row[0].message,
        });
        
        // var userUrl = ScriptApp.getService().getUrl();
        // var ownerEmail = new app.spreadsheet().owner().email();
        // MailApp.sendEmail(ownerEmail, defaultSheetName,userProcessRequest.replace(0,userEmail).replace(1,userUrl));
      }
      return response;
    }
  },
  request:{},
  response:{
    json:function(obj) {
      return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
    }
  },
  merge:function(){
    var obj = {}, i = 0, il = arguments.length, key;
    for (; i < il; i++) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key))obj[key] = arguments[i][key];
      }
    }
    return obj;
  }
};
// NOTE: GET All
// var response = new app.spreadsheet().from(sheetName).get();
// NOTE: SEARCH
// var response = new app.spreadsheet().from(sheetName).search({id:'16507'});
// NOTE: INSERT
// var response = new app.spreadsheet().from(sheetName).post({indexName:{key:'id'},columnName:'value'});
// NOTE: EDIT
// var response = new app.spreadsheet().from(sheetName).post({indexName:{key:'id',value:'idValue'},columnName:'value'});
// NOTE: DELETE
// var response = new app.spreadsheet().from(sheetName).post({indexName:{key:'id',value:'idValue',task:'delete'}});
