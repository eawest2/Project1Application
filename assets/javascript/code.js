//Red Rover Code Base



//Primary Variable Storage

var localLocation = 0;
var marsWeather = 0;
var localWeather = 0;
var marsPhoto = 0;



//AJAX call functions

    //Geolocation ** STRETCH GOAL**

    //Open Weather Call function
    // This is our API key
    var APIKey = "7d2ff8f5647ce6dbd5231ca3f107d20b";
    var city = "";
    var country = "";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" + city + country + "&units=imperial&appid=" + APIKey;
      
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);
        // Assigns the response object to global variable
        localWeather = response; 

    //Mars call function

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