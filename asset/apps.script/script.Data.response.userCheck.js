app.sheet.currentUser={
  row:[
    {
      email:'khensolomon@gmail.com',
      about:'about',
      message:'this is why and how',
      reply:'reply',
      role:7,
      userStatus:3,
      userNotices:'blah blah'
    }
  ]
};
// deferred.resolve(app.sheet.currentUser);
// deferred.reject(app.sheet.currentUser);

if (app.sheet.currentUser.row[0].userStatus > 1){
  // userApproved = 3, userProcess = 2
  // app.sheet.currentUser=response;
  deferred.resolve(app.sheet.currentUser);
} else {
  // userRegistration = 1, userRegistered = 0
  deferred.reject(app.sheet.currentUser);
}