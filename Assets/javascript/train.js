$(document).ready()

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCKFJf-XFDfl2h8e-S3MGXQXDcekkPMvG8",
  authDomain: "train-time-b3044.firebaseapp.com",
  databaseURL: "https://train-time-b3044.firebaseio.com",
  projectId: "train-time-b3044",
  storageBucket: "train-time-b3044.appspot.com",
  messagingSenderId: "918132511166"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log(database);

//initial value
var name = "";
var destination = "";
var firstTime = "";
var frequency = "";

$("button").on("click", function (event) {
  event.preventDefault();

  //Grab values from the form
  name = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTime = $("#firstTrainTime").val().trim();
  frequency = $("#frequency").val().trim();

  database.ref().push({
    name: name,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
  });
})

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging added train schedule
  console.log(sv.name);
  console.log(sv.destination);
  console.log(sv.firstTime);
  console.log(sv.frequency);

  // Change the HTML to reflect
  $("#column1").text(sv.name);
  $("#column2").text(sv.destination);
  $("#column3").text(sv.firstTime);
  $("#column4").text(sv.frequency);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
//$(document).on("click", currentTrain);




