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
//console.log(database);
// function currentTrain() {
//   var trainName = ["HTown", "Capital Express", "Ocean Beacon"];
//   var destination = ["Houston", "Austin", "Galveston"];
//   var firstTime = ["08:00", "13:00", "15:00"];
//   var frequency = ["90", "60", "120"];
//   //console.log(currentName);
// }

$("button").on("click", function (event) {
  event.preventDefault();

  var name = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTime = $("#firstTrainTime").val().trim();
  var frequency = $("#frequency").val().trim();

  database.ref().push({
    name: name,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
  });
})

//$(document).on("click", currentTrain);




