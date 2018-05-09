// Initialize Firebase
var config = {
  apiKey: "AIzaSyBzD9QDpejlmn1X8PMxoeDvZnXccETqH1I",
  authDomain: "basic-zomi.firebaseapp.com",
  databaseURL: "https://basic-zomi.firebaseio.com",
  projectId: "basic-zomi",
  storageBucket: "basic-zomi.appspot.com",
  messagingSenderId: "772916234412",
  name:'EBA'
};
// firebase.initializeApp(config);

// Initialize the default app
var app = firebase.initializeApp(config);

console.log(app.name);  // "[DEFAULT]"

// You can retrieve services via the defaultApp variable...
// var defaultStorage = app.storage();
// var defaultDatabase = app.database();

// ... or you can use the equivalent shorthand notation
// defaultStorage = firebase.storage();
// defaultDatabase = firebase.database();
// console.log(defaultDatabase);
// var userId = firebase.auth().currentUser.uid;
// console.log(userId);

// firebase.auth().signInWithEmailAndPassword('test@test.com', 'testing').then(function(e) {
//   // Sign-out successful.
//   console.log('done');
//   console.log(e);
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   console.log(error);
// });


firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    // return firebase.auth().signInWithEmailAndPassword(email, password);
    return firebase.auth().signInWithEmailAndPassword('test@test.com', 'testing').then(function(e) {
      // Sign-out successful.
      console.log('done');
      console.log(e);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});


// firebase.database().ref('language/').once('value').then(function(snapshot) {
//   // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // console.log(snapshot.val());
//   snapshot.forEach(function(childSnapshot) {
//     var childKey = childSnapshot.key;
//     var childData = childSnapshot.val();
//     console.log(childKey,childData);
//     // ...
//   });
// });
// var newPostKey = firebase.database().ref().child('posts').push().key;
// console.log(newPostKey);
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
// });