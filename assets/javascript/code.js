//Red Rover Code Base
$( document ).ready(function() {


//Primary Variable Storage

var localLocation = {};
var marsWeather = 0;
var localWeather = 0;
var marsPhoto = 0;

$("#launch").on("click", function(){
    $("#main-content").html(
        `<div class="row">
            <div class="col" id="local-weather">
                <div class="card" style="width: 100%">
                    <div class="card-body">
                        <h5 class="card-title">Local Weather</h5>
                        <ul>
                            <li>Wind Speed: 10</li>
                            <li>Temp: 70</li>
                            <li>Sunlight: All</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col" id="mars-weather">
                <div class="card" style="width: 100%">
                    <div class="card-body">
                        <h5 class="card-title">Mars Weather</h5>
                        <ul>
                            <li>Wind Speed: 60</li>
                            <li>Temp: -100</li>
                            <li>Sunlight: None</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div id="weather-comparison">
            <div class="card" style="width: 100%">
                <div class="card-body">
                    <h5 class="card-title">Weather Comparison</h5>
                    <ul class="text-left">
                        <li>Tornado</li>
                        <li>Antartica</li>
                        <li>Black void</li>
                    </ul>
                </div>
            </div>
        </div>`
        // <button class="btn btn-default" id="relaunch">Re-Launch</button>
    );
});

// $("#relaunch").on("click", function(){
//     console.log("hi");
//     // $("#main-content").html(
//     //     `<button class="btn btn-primary btn-lg" id="launch">Launch</button>`
//     // );
// });



//AJAX call functions

    // // Geolocation call function
    // function FXweatherGeolocation () {
    //     // The URL to query the ip-API
    //     var queryURL = "http://ip-api.com/json";

    //     // AJAX call to ip-API
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     })
    //     // Stores all of the retrieved data inside of an object called "response"
    //     .then(function(response) {
    //         console.log("queryURL check: " + queryURL);
    //         console.log("result object check: " + response);
    //         // Assigns response object to global variable     
    //         localLocation = response;
    //         console.log("localLocation: " + localLocation);
    //         console.log("ip-api lat" + localLocation.lat);
    //         console.log("ip-api lon" + localLocation.lon);
    //     });
    // }

    //Open Weather Call function
    function FXdisplayLocalWeather() {
        // This is our API key and variables for the queryURL
        var APIKey = "7d2ff8f5647ce6dbd5231ca3f107d20b";

        // The URL to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + localLocation.lat + "&lon=" + localLocation.lon + "&appid=" + APIKey;
        
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

            // Testing responses
            console.log("OW object check: " + localWeather);
            console.log("OW Temperature (K) check: " + localWeather.main.temp)
            console.log("OW weather description check: " + localWeather.weather[0].description)
        });
    } 

    //Mars call function
    function FXdisplayMarsWeather() {
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

            // Testing responses
            console.log("MAAS2 Temperature (C) check " + marsWeather.max_temp);
            console.log("MAAS2 Atmo check " + marsWeather.atmo_opacity);
        });
    }

    //Mars photo call function
    function FXdisplayMarsImage() {
        // This is our API key and variables for the Mars Photos queryURL
        var currentSOL = "";
        var APIKey = "7d2ff8f5647ce6dbd5231ca3f107d20b";
        var queryURL = 
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + currentSOL + "&api_key=" + APIKey;

        // AJAX call to Mars Photos API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // Stores all of the retrieved data inside of an object called "response"
        .then(function(response) {
            console.log("queryURL check" + queryURL);
            console.log("result object check" + response);
            // Assigns response object to global variable
            marsPhoto = response;
        });
    }


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
            var options = {
                enableHighAccuracy: false, 
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                var crd = pos.coords;

                console.log('Your current position is: ');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);

                localLocation = {
                    lat: crd.latitude,
                    lon: crd.longitude
                };

                console.log("localLocationObject check: " + localLocation);
            };
            
            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            
            navigator.geolocation.getCurrentPosition(success, error, options);
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
        var deltaTemp = (localWeather.main.temp - 273.15) - ((marsWeather.min_temp + marsWeather.max_temp)/2);
        console.log(deltaTemp);

        //compute deltaWeather


        //compute deltaSeason
    };

    //Write delta content to DOM
    function FXdeltaWrite () {
        //write comparison 1
        //write comparison 2
        //write comparison 3

    };

    //howler player functions//
    $(function(){
        var sound1=new Howl({
        src: ["assets/audio/RingTone01_Longer.mp3"],
        volume: 0.8
        });
        $("#launch").on("click", function(){
        sound1.play();
        });  
    });
    $(function(){
        var sound2=new Howl({
        src: ["assets/audio/earth001.mp3"],
        volume: 0.8
        });
        $("#somewhere1").on("click", function(){
        sound2.play();
        });  
    });
    $(function(){
        var sound3=new Howl({
        src: ["assets/audio/tim-kahn__mars.wav"],
        volume: 0.8
        });
        $("#somewhere2").on("click", function(){
        sound3.play();
        });  
    });            
    $(function(){
        var music=new Howl({
            src: ["assets/audio/CycloneCountry.mp3"],
            volume: 0.5
        });
        $("#howler-play").on("click", function(){
            music.play();
        });
        $("#howler-pause").on("click", function(){
            music.pause();
        });
        $("#howler-stop").on("click", function(){
            music.stop();
        });
        $("#howler-volup").on("click", function(){
            var vol = music.volume();
            vol += 0.1;
            if (vol>1) {
                vol=1;
            }
            music.volume(vol);
        });
        $("#howler-voldown").on("click", function(){
            var vol=music.volume();
            vol -= 0.1;
            if (vol<0) {
                vol=0;
            }
            music.volume(vol);
	});
});


//Initialize

FXstart();
FXweatherGeolocation();
$("#launch").on("click", function() {
    FXdisplayLocalWeather();
    FXdisplayMarsWeather();
});


});
