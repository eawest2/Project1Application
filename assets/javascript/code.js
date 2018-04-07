//Red Rover Code Base
$( document ).ready(function() {


//Primary Variable Storage

var localLocation = 0;
var marsWeather = 0;
var localWeather = 0;
var marsPhoto = 0;



//AJAX call functions

    //Geolocation ** STRETCH GOAL**

    //Open Weather Call function
    function displayLocalWeather() {
        // This is our API key and variables for the queryURL
        var APIKey = "7d2ff8f5647ce6dbd5231ca3f107d20b";
        var city = "";
        var country = "";

        // The URL to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + city + country + "&units=imperial&appid=" + APIKey;
        
        // AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // Stores all of the retrieved data inside of an object called "response"
        .then(function(response) {
            console.log("queryURL check" + queryURL);
            console.log("result object check" + response);
            // Assigns response object to global variable
            localWeather = response;
        });
    } 

    //Mars call function
    function displayMarsWeather() {
        // The URL to query the MAAS2
        var queryURL = "https://api.maas2.jiinxt.com/latest"

        // AJAX call to MAAS2 API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // Stores all of the retrieved data inside of an object called "response"
        .then(function(response) {
            console.log("queryURL check" + queryURL);
            console.log("result object check" + response);
            // Assigns response object to global variable
            marsWeather = response;
        });
    }

    //Mars photo call function


//Function Declaration

    //Function to initialize all page content
    function FXstart (){

    };

    //Function to reset page back to location selection
    function FXresest (){


    };

    //Determine weather location
        //Write weather options to DOM
        function FXweatherPrint (){

        };

        //Geolocate user endpoint
        function FXweatherGeolocation (){

        };

    //Write collected info to DOM
    function FXwriteFacts (){

        //write weather info
        $(".temp").text("Temperature (F) " + response.main.temp);
        $(".weather").text(response.weather.description);

        //write mars info
        $(".marsTemp").text("Temperature (C) " + response.max_temp);
        $(".marsWeather").text(response.atmo_opacity);
        //write mars photo

    };

    //Compute delta
    function FXdelta () {
        //compute deltaTemp
        //compute deltaWeather
        //compute deltaSeason
    };

    //Write delta content to DOM
    function FXdeltaWrite () {
        //write comparison 1
        //write comparison 2
        //write comparison 3

    };


//Initialize

FXstart();
displayMarsWeather();
//howler player function//
$(function(){

	var howler_example = new Howl({
		src: ["assets/audio/8BallAitken_CycloneCountry.mp3"],
		volume: 0.5
	});

	$("#howler-play").on("click", function(){
		howler_example.play();
	});

	$("#howler-pause").on("click", function(){
		howler_example.pause();
	});

	$("#howler-stop").on("click", function(){
		howler_example.stop();
	});

	$("#howler-volup").on("click", function(){
		var vol = howler_example.volume();
		vol += 0.1;
		if (vol > 1) {
			vol = 1;
		}
		howler_example.volume(vol);
	});

	$("#howler-voldown").on("click", function(){
		var vol = howler_example.volume();
		vol -= 0.1;
		if (vol < 0) {
			vol = 0;
		}
		howler_example.volume(vol);
	});

});
});