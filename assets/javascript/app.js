
$(document).ready(function(){
    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyB0-Qw7CZA6vpkv2lmcksTFSEFEgkChZmE",
        authDomain: "warp-speed-train.firebaseapp.com",
        databaseURL: "https://warp-speed-train.firebaseio.com",
        projectId: "warp-speed-train",
        storageBucket: "",
        messagingSenderId: "602556985024"
      };

    firebase.initializeApp(config);
 
    var database = firebase.database();


    //Button for adding trains
    $(".submit").on("click", function(event) {
        event.preventDefault();
    
    //Grab user input 
    var trainName = $("#trainName-input").val().trim();
    var theDestination = $("#theDestination-input").val().trim();
    var firstTrainTime = $("#firstTrainTime-input").val().trim();
    var trainFrequency = $("#trainFrequency-input").val().trim();


    //Object to hold train information
    var newTrain = {
        train: trainName,
        destination: theDestination,
        first: firstTrainTime, 
        frequency: trainFrequency,
    };

    database.ref().push(newTrain);

    //Log information to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);
    
    

    //Clears texts-boxes
    $("#trainName-input").val("");
    $("#theDestination-input").val("");
    $("#firstTrainTime-input").val("");
    $("#trainFrequency-input").val("");

    });

    //Create firebase event to add trains to database 
    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        console.log(childSnapshot.val());


    var trainName = childSnapshot.val().train;
    var theDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    // grabs current time
    var currentTime = moment(currentTime);
    console.log(moment(currentTime).format("hh:mm"));

     // First Time (pushed back 1 year to make sure it comes before current time)
     var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
     console.log(firstTimeConverted);

     var diffTrainTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTrainTime);

    // Time apart (remainder)
    var tRemainder = diffTrainTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var otherTrains = moment().add(tMinutesTillTrain, "minutes");
    console.log("arrival = " + moment(otherTrains).format("hh:mm"));
    
    $(".time").text(moment(currentTime).format("hh:mm"));

    $(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + theDestination + "</td><td>" +
    trainFrequency + "</td><td>" + otherTrains.format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
 
    })

      // Smooth scrolling using jQuery easing
      $(".about-click").click(function() {
        $("html, body").animate({
            scrollTop: $("#about").offset().top
        }, 800);
    })

    $(".schedule-click").click(function() {
        $("html, body").animate({
            scrollTop: $("#schedule").offset().top
        }, 800);
    })
    $(".employeeportal-click").click(function() {
        $("html, body").animate({
            scrollTop: $("#employee").offset().top
        }, 800);
    })


  
    


});
