var config = {
    apiKey: "AIzaSyBzD9QDpejlmn1X8PMxoeDvZnXccETqH1I",
    authDomain: "basic-zomi.firebaseapp.com",
    databaseURL: "https://basic-zomi.firebaseio.com",
    projectId: "basic-zomi",
    storageBucket: "basic-zomi.appspot.com",
    messagingSenderId: "772916234412",
    name: "EBA"
};

var app = firebase.initializeApp(config);

console.log(app.name);

firebase.auth().signInWithEmailAndPassword("test@test.com", "testing").then(function(e) {
    console.log("done");
    console.log(e);
}).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
});