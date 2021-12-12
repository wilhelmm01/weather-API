var currentForecast = document.getElementById("current");
var key = "ca90b1ee3ee78f78b6f96f9d4ec5800a"  
var fiveDayForecast = document.getElementById("forecast");
var favorite = document.getElementById("fav-btn");





function getForecast() {
   document.getElementById("btn").onclick = function(event) {
       event.preventDefault();
   var location = document.getElementById("location").value;
   localStorage.setItem("fav-city", location)
    console.log(location)

    var getLocal = document.createElement("button")
    getLocal.textContent = localStorage.getItem("fav-city")
    
    favorite.appendChild(getLocal)
    

    //Getting latitude and longitute
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + key;
    console.log("API Link: " + requestURL)
    
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then (function(data){

            //Console Logging for testing
            console.log("lat " + data.coord.lat)
            console.log("lon " + data.coord.lon);

            var lat = data.coord.lat;
            var lon = data.coord.lon;

    //getting current and 5 day
     var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=" + key;
        fetch(forecastURL)
            .then(function (response) {
                return response.json();
                
            })
            .then(function(response){
                console.log("Current " + response.current.temp + "degrees");
                console.log ("wind " + response.current.wind_speed);
                console.log("Humidity " + response.current.humidity + "%")
                console.log("UVI " + response.current.uvi);

                var city = document.createElement("h3");
                city.textContent= location

                var currentTemp = document.createElement("h4");
                currentTemp.textContent = "Current Temp: " + parseInt(response.current.temp) + "° F"

                var windSpeed = document.createElement("p");
                windSpeed.textContent = "Wind: " + parseInt(response.current.wind_speed) + " MPH";

                var humidity = document.createElement("p");
                humidity.textContent = "Humidity: " + response.current.humidity + " %";

                var uvi = document.createElement("p");
                uvi.textContent = "UV Index: " + response.current.uvi;




                
                currentForecast.append(city);
                currentForecast.append(currentTemp);
                currentForecast.append(windSpeed);
                currentForecast.append(humidity);
                currentForecast.append(uvi);
              
                
                
                
                for (var i=1; i<6; i++){
                    
                    var futureDateResponse = (response.daily[i].dt);
                    var forecastDate = new Date(i);
                    forecastDate.setUTCSeconds(futureDateResponse);
                    var futureDate = forecastDate;
                    var forecastMonth = futureDate.getMonth()+1;
                    var forecastDay = futureDate.getDate();
                    var forecastYear = futureDate.getFullYear();

                    console.log(forecastMonth + "/" + forecastDay + "/" + forecastYear)

                    var dateOutput = forecastMonth + "/" + forecastDay + "/" + forecastYear

                   
                    var forecast = document.createElement("div")
                    forecast.classList.add("card")
                    forecast.textContent = dateOutput
                  

                    var forecastTemp = document.createElement("p")
                    forecastTemp.textContent = "High Temp: " + parseInt(response.daily[i].temp.max)+ "° F"

                    var forecastWind = document.createElement("p")
                    forecastWind.textContent = "Wind Speed " +response.daily[i].wind_speed

                    var forecastHumidity = document.createElement("p")
                    forecastHumidity.textContent = "Humidity: " + response.daily[i].humidity + " %"

                    //var div = document.createElement("div")
                    //div.innerHTML = '<div class="card" id="card"></div>'

                    fiveDayForecast.append(forecast);
                    forecast.append(forecastTemp);
                    forecast.append(forecastWind);
                    forecast.append(forecastHumidity)

                    

                    console.log(fiveDayForecast);

                }

                
            })
       
        })
}

}



    getForecast();









//for (var i=0; i < 6; i++){
   // var div = document.createElement("div")
   // div.innerHTML = '<div class="card" id="card"></div>'
    //div.appendChild(fiveDayForecast);
    //console.log(div)
//}