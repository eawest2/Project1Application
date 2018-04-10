//Red Rover Code Base
$( document ).ready(function() {


//Primary Variable Storage

var localLocation = {};
var marsWeather = 0;
var localWeather = 0;
var marsPhoto = 0;
var marsMonth = 0;

$("#launch").on("click", function(){
    $("#main-content").html(
        `<div class="row">
            <div class="col" >
                <div class="card" style="width: 100%">
                    <div class="card-body local-weather-style">
                        <h5 class="card-title">Local Weather</h5>
                        <ul id = "local-weather">
                            
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col" >
                <div class="card" style="width: 100%">
                    <div class="card-body mars-weather-style" >
                        <h5 class="card-title">Mars Weather</h5>
                        <ul id= "mars-weather">
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div id="weather-comparison">
            <div class="card" style="width: 100%">
                <div class="card-body">
                    <h5 class="card-title">Weather Comparison</h5>
                    <ul class="text-left" id= "compare-weather">
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

            FXdelta();
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


        $("#local-weather").text(
        "<li>Wind Speed: " + 10 + "</li>" +
        "<li>Temp: " + localWeather.main.temp + "</li>" +
        "<li>Conditions: " + localWeather.weather[0].main + "</li>"
        );

        //write mars info

        FXcomputeMarsMonth();

        $("#mars-weather").text(
            "<li>Martian Month: " +  + "</li>" +
            "<li>Temp: " + ((marsWeather.min_temp + marsWeather.max_temp)/2) + "</li>" +
            "<li>Conditions: " + marsWeather.atmo_opacity + "</li>"
        );

        //write mars photo

    };

    function FXcomputeMarsMonth(){

        var marsCalendar = ["Sagittarius","Dhanus","Capricornus", "Makara", "Aquarius","Kumbha", ]

        if (marsWeather.season == "Month 1"){
            marsMonth = marsCalendar[0];
        }
        else if (marsWeather.season == "Month 2"){
            marsMonth = marsCalendar[1];
        }
        else if (marsWeather.season == "Month 3"){
            marsMonth = marsCalendar[2];
        }
        else if (marsWeather.season == "Month 4"){
            marsMonth = marsCalendar[3];
        }
        else if (marsWeather.season == "Month 5"){
            marsMonth = marsCalendar[4];
        }
        else if (marsWeather.season == "Month 6"){
            marsMonth = marsCalendar[5];
        }
        else if (marsWeather.season == "Month 7"){
            marsMonth = marsCalendar[6];
        }
        else if (marsWeather.season == "Month 8"){
            marsMonth = marsCalendar[7];
        }
        else if (marsWeather.season == "Month 9"){
            marsMonth = marsCalendar[8];
        }
        else if (marsWeather.season == "Month 10"){
            marsMonth = marsCalendar[9];
        }
        else if (marsWeather.season == "Month 11"){
            marsMonth = marsCalendar[10];
        }
        else if (marsWeather.season == "Month 12"){
            marsMonth = marsCalendar[11];
        }
        else if (marsWeather.season == "Month 13"){
            marsMonth = marsCalendar[12];
        }
        else if (marsWeather.season == "Month 14"){
            marsMonth = marsCalendar[13];
        }
        else if (marsWeather.season == "Month 15"){
            marsMonth = marsCalendar[14];
        }
        else if (marsWeather.season == "Month 16"){
            marsMonth = marsCalendar[15];
        }
        else if (marsWeather.season == "Month 17"){
            marsMonth = marsCalendar[16];
        }
        else if (marsWeather.season == "Month 18"){
            marsMonth = marsCalendar[17];
        }
        else if (marsWeather.season == "Month 19"){
            marsMonth = marsCalendar[18];
        }
        else if (marsWeather.season == "Month 20"){
            marsMonth = marsCalendar[19];
        }
        else if (marsWeather.season == "Month 21"){
            marsMonth = marsCalendar[20];
        }
        else if (marsWeather.season == "Month 22"){
            marsMonth = marsCalendar[21];
        }
        else if (marsWeather.season == "Month 23"){
            marsMonth = marsCalendar[22];
        }
        else if (marsWeather.season == "Month 24"){
            marsMonth = marsCalendar[23];
        }



    };

    //Compute delta
    function FXdelta () {
        //compute deltaTemp
        console.log(localWeather.main.temp - 273.15);
        console.log (marsWeather.max_temp);
        console.log (marsWeather.min_temp);

        var deltaTemp = Math.floor((localWeather.main.temp - 273.15) - ((marsWeather.min_temp + marsWeather.max_temp)/2));
        
        console.log(deltaTemp);

        //compute deltaWeather

        var marsAtmo = marsWeather.atmo_opacity
        var localAtmo = localWeather.weather[0].main
        
        if (localAtmo == "Clouds" && marsAtmo == "Cloudy" ) {
        $("#compare-weather").append("<ul> There's cloud cover on mars today, just like home. However I bet your clouds aren't made of iron filings moving at 60 miles an hour. </ul>");
        }
        else if (localAtmo == "Clouds" && marsAtmo == "Sunny" ) {
        $("#compare-weather").append("<ul>It's Sunny on mars today, unlike home. However, its probably still darker on Mars despite the clouds, since the sun is an extra 50,000,000 miles away </ul>");
        }
        else if (localAtmo == "Clear") {
        $("#compare-weather").append("<ul>Clear Skies at home is a happy reminder of how we have a glorious atmosphere that we can breathe. Unlike on Mars, which has only 60% as much atmosphere in general, and the majority of it is Carbon Dioxide.</ul>");
        }
        else if (localAtmo == "Rain") {
        $("#compare-weather").append("<ul>Rain may make you think that the weather must be better anywhere else. Not on Mars, where it never rains, and all the water is frozen into ice crystals.</ul>");
        }
        else if (localAtmo == "Snow") {
        $("#compare-weather").append("<ul>Snow can be cold and upsetting, but ultimately it repleneshes the ground water. Meanwhile, on Mars, the only snow is frozen Carbon Dioxide crystals at the poles and thus a minimum of -78.5 degrees celcius.</ul>");
        }
        else if (localAtmo == "Extreme") {
        $("#compare-weather").append("<ul>The weather is pretty garbage right now at home, no lie. But remember that no matter how bad it is, at least you're not dying of radiation poisoning like you would be on Mars since they have no Van Allen belts to protect you from radiation.</ul>");
        }
        else if (localAtmo == "Mist") {
        $("#compare-weather").append("<ul>A nice light mist in the air is always a welcome reminder of how you have water vapor to breathe in to help you stay hydrated. Unlike Mars, where all the water is frozen in tiny crystals in the dirt.</ul>");
        }
        else if (localAtmo == "Extreme") {
        $("#compare-weather").append("<ul>The weather is pretty garbage right now at home, no lie. But remember that no matter how bad it is, at least you're not dying of radiation poisoning like you would be on Mars since they have no Van Allen belts to protect you from radiation.</ul>");
        }
        else if (localAtmo == "Fog") {
        $("#compare-weather").append("<ul>Fog may make visibility a pain, but remember that no matter how bad it is, the visibility is better than during a Martian dust storm, and the fog isn't made of razor sharp iron particles either.</ul>");
        }
        else {
        $("#compare-weather").append("<ul>Earth weather can be wild and varried, but at least your blood isn't likely to freeze in 30 seconds if you walk outside.</ul>");
        };

        ;


        //compute deltaSeason

        //initialize FXdeltaWrite

    };

    //Write delta content to DOM
    function FXdeltaWrite () {
        //write comparison 1
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
