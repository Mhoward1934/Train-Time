// Initialize Firebase
var config = {
    apiKey: "AIzaSyCKFJf-XFDfl2h8e-S3MGXQXDcekkPMvG8",
    authDomain: "train-time-b3044.firebaseapp.com",
    databaseURL: "https://train-time-b3044.firebaseio.com",
    projectId: "train-time-b3044",
    storageBucket: "",
    messagingSenderId: "918132511166"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName = [];
var destination = [];
var firstTime = [];
var frequency = [];

//Initial array of trains scheduled that can be added to
var currentTrain = {
    train name = ["Htown", "Capital Express", "Ocean Beacon"],
    Destination = ["Houston", "Austin", "Galveston"],
    Frequency = ["120", "60", "90"],
    Next Arrival = [],
    Minutes Away = []
}


