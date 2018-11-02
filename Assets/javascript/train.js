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
    $("#column3").text(snapshot.val().firstTime);
    $("#column4").text(snapshot.val().frequency);

    var firstTime = childSnapshot.val().firstTime;
    var tFrequency = parseInt(childSnapshot.val().frequency);
    var firstTrain = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTrain);
    console.log(firstTime);
    var currentTime = moment();
    var currentTimeCalc = moment().subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrain), "minutes");
    var tRemainder = diffTime % tFrequency;
    var minutesRemaining = tFrequency - tRemainder;
    var nextTRain = moment().add(minutesRemaining, "minutes").format("hh:mm A");
    var beforeCalc = moment(firstTrain).diff(currentTimeCalc, "minutes");
    var beforeMinutes = Math.ceil(moment.duration(beforeCalc).asMinutes());

    if ((currentTimeCalc - firstTrain) < 0) {
      nextTrain = childSnapshot.val().firstTime;
      console.log("Before First Train");
      minutesRemaining = beforeMinutes;
    }
    else {
      nextTrain = moment().add(minutesRemaining, "minutes").format("hh:mm A");
      minutesRemaining = tFrequency - tRemainder;
      console.log("Working");
    }
  });

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});





