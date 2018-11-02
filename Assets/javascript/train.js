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
database.ref().on("child_added", function (childSnapshot) {

  // Console.loging added train schedule
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTime);
  console.log(childSnapshot.val().frequency);

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#column1").text(snapshot.val().name);
    $("#column2").text(snapshot.val().destination);
    //$("#column4").text(snapshot.val().firstTime);
    $("#column3").text(snapshot.val().frequency);
    

    var firstTime = childSnapshot.val().firstTime;
    var tFrequency = childSnapshot.val().frequency;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    //console.log(firstTimeConverted);
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % tFrequency;
    //console.log(tRemainder);
    var tMinutesTillTrain = tFrequency - tRemainder;
    $("#column5").text(tMinutesTillTrain);
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    $("#column4").text(nextTrain);
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    
  });

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});





