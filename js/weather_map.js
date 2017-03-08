$(document).ready(function(){
    "use strict";

    var APPID = "7f8e3aa0aad113510e0c1eaafd1c17b8"
    var url = "http://api.openweathermap.org/data/2.5/forecast/daily";
    var latitudeInput = $("#latitude");
    var longitudeInput = $("#longitude");
    var searchButton = $("#search");

    //make a function for making an Ajax request to the OpenWeatherMap API to return a weather object
    function getWeather(lat,lon) {
        $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
            APPID: APPID,
            // q: "San Antonio, TX",
            lat: lat,
            lon: lon,
            cnt:3,
            units: "imperial"
        }).fail(function(data, status) {
            alert("Failed to load: " + status);
        }).done(function(data) {
            var htmlString = "";
            data.list.forEach (function(object){
                htmlString += "<div class='col-md-4 forecast'>" + "<strong>" + "<big>" + "<font color='#851313'>" + "H: " + parseInt(object.temp.max) + "&deg;" + "</font>" + "</strong>" + "</big>" + " " + "<strong>" + "<big>"+ "<font color='#2389A8'>" + "L: " + parseInt(object.temp.min) + "&deg;" + "</font>" + "</strong>" + "</big>" + "<br>"
                htmlString += "<img src='http://openweathermap.org/img/w/" + object.weather[0].icon + ".png'>"
                // http:openweathermap.org/img/w/[icon].png
                htmlString += "<p>" + "<b>Clouds:</b> " + object.weather[0].description + "</p>"
                htmlString += "<p>" + "<b>Humidity:</b> " + parseInt(object.humidity) + "%" + "</p>"
                htmlString += "<p>" + "<b>Wind Speed:</b> " + object.speed + "</p>" + "</div>"
                console.log(data.list);
            });
                $("#weather").html(htmlString)
        });
    }

    getWeather(29.418785,-98.490342);

    searchButton.click(function(){
        getWeather(latitudeInput.val(),longitudeInput.val());
    });

        var lat;
        var lng;
        
        // Set our address to geocode
        var address = "San Antonio, Texas";

        // Init geocoder object
        var geocoder = new google.maps.Geocoder();

        // Geocode our address
        geocoder.geocode({ "address": address }, function(results, status) {

           // Check for a successful result
           if (status == google.maps.GeocoderStatus.OK) {

               // Recenter the map over the address
               map.setCenter(results[0].geometry.location);
              lat=(results[0].geometry.location.lat());
              lng=(results[0].geometry.location.lng());
              var sanAntonio = { "lat": lat, "lng": lng };

                var marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                draggable: true,
                position: sanAntonio,

                map: map
            });

                // Create a new infoWindow object with content
                // var infowindow = new google.maps.InfoWindow({
                //     content: "Holy Cow offers a mouthwatering selection of burgers, sandwiches, salads, and an awesome selection of beer and wine."
                // });

                // Open the window using our map and marker
                infowindow.open(map, marker);

           } else {

               // Show an error message with the status if our request fails
               alert("Geocoding was not successful - STATUS: " + status);
           }
        });

        // Set our map options
        var mapOptions = {
            // Set the zoom level
            zoom: 13,

            // This sets the center of the map at our location
            // center: {
            //     lat:  29.426791,
            //     lng: -98.489602
            // }
        };
       
        // Render the map
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
})();


//Create input boxes for "Latitude" and "Longitude" and a
//<button> that will take the values from those inputs and
//feed them into your API request. Use Google Maps to find
//the coordinates for different places around the world and
//test this out.

//Go back to your Google Maps API exercise. Recreate the map
//below your 3 day forecast. Read through the documentation
//for the Google Maps API and figure out how to allow the user
//to drop a pin on any place on the map. Once the user drops a
//pin, grab its coordinates and feed those into your OpenWeatherMap
//API. Update the three day forecast with the information from
//those coordinates (you should also get rid of your input boxes
//at this point).



//add some input fields and some kind of a button that you
//are going to specify so that when you click the btuton,
//the event triggered is gonna take the.val from lat and
//.val from long and will pass it into our "getWeather"
//function (might be named differently) b/c this will be
//called when you click that button. Then uncommon lat and long


// practice writing console.logs of various parts of the OpenWeatherMap object...
    // console.log the humidity of the 2nd day
    // console.log the humidity of all the days (maybe use .forEach?)
    // console.log the temprature of the 3rd day in celsius
    // console.log the temprature of the 3rd day in fahrenheit
    // console.log all types of information you will ultimately display for a single day in the 3-day forcast div
    // console.log all type of information you will ultimately display for all days in the 3-day forcast divs


//****TODO!!!:
//Add name of city when refreshing lat and lon.
//Work on getting Google Map back on, and having lat and lng buttons refresh when search is clicked.
//make marker draggable with marker event that will refresh top 3 boxes! Something similar than search button

