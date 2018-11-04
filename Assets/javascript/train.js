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
// var tMinutesTillTrain = tFrequency - tRemainder;
// var tRemainder = diffTime % tFrequency;
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// // //$("#column4").text(nextTrain);
// // //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
// var childSnapshot = [];
// //ar tFrequency = childSnapshot.val() + frequency;
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

$("button").on("click", function (event) {
  event.preventDefault();

  //Grab values from the form and table
  name = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTime = $("#firstTrainTime").val().trim();
  frequency = $("#frequency").val().trim();
  nextArrival = $("#column4").val().trim();
  minutesAway = $("#column5").val().trim();

  database.ref().push({
    name: name,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway,
    
  });
})

// Firebase watcher .on("child_added"
//database.ref().on("child_added", function (childSnapshot) {
//  event.preventDefault();

//   // Console.loging added train schedule
//   console.log(childSnapshot.val().name);
//   console.log(childSnapshot.val().destination);
//   console.log(childSnapshot.val().firstTime);
//   console.log(childSnapshot.val().frequency);
//   console.log(childSnapshot.val().nextArrival);
//   console.log(childSnapshot.val().minutesAway);

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (childSnapshot) {
  event.preventDefault();
  //console.log(child_added);

  var firstTime = childSnapshot.val().firstTime;
  
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  //console.log(firstTimeConverted);
  
  var currentTime = moment();
  //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //console.log("DIFFERENCE IN TIME: " + diffTime);
  
  var tFrequency = childSnapshot.val().frequency;
  
  var tRemainder = diffTime % tFrequency;
  //console.log(tRemainder);
  
  var tMinutesTillTrain = tFrequency - tRemainder;
  //$("#column5").text(tMinutesTillTrain);
  //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  //$("#column4").text(nextTrain);
  // //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  // Change the HTML to reflect
  $("#column1").append("<tr>, <td>" + childSnapshot.val().name);
  $("#column2").append("<tr>, <td>" + childSnapshot.val().destination);
  $("#column3").append("<tr>, <td>" + childSnapshot.val().frequency);
  $("#column4").append("<tr>, <td>" + (moment().add(tMinutesTillTrain, "minutes").format("hh:mm")));
  $("#column5").append("<tr>, <td>" + tMinutesTillTrain);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
