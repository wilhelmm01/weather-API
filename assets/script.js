var currentForecast = document.getElementById("current");
var key = "ca90b1ee3ee78f78b6f96f9d4ec5800a"  
var fiveDayForecast = document.getElementById("forecast");
var favorite = document.getElementById("saved");
var container = document.getElementById('container');



function getForecast() {
document.getElementById("btn").onclick = function(event) {
  event.preventDefault();
  
  
  var location = document.getElementById("location").value;
  localStorage.setItem("fav-city", JSON.stringify(location));
  console.log(location)


    

    //Getting latitude and longitute
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + key;
    console.log("API Link: " + requestURL)
    
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then (function(data){


            var lat = data.coord.lat;
            var lon = data.coord.lon;

    //getting current and 5 day
     var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=" + key;
        fetch(forecastURL)
            .then(function (response) {
                return response.json();
                
            })
            .then(function(response){


                var currentDate = (response.daily[0].dt);
                    var todayDate = new Date(0);
                    todayDate.setUTCSeconds(currentDate);
                    var date = todayDate;
                    var month = date.getMonth()+1;
                    var day = date.getDate();
                    var year = date.getFullYear();

                    var dayOutput  = month + "/" + day + "/" + year


                document.getElementById("local").innerHTML = location + "-" + dayOutput
                document.getElementById('localtemp').innerHTML = "Current Temp: " + parseInt(response.current.temp) + "° F"
                document.getElementById("localwind").innerHTML = "Wind: " + parseInt(response.current.wind_speed) + " MPH";
                document.getElementById("localhumidity").innerHTML = "Humidity: " + response.current.humidity + " %";
                document.getElementById("localuv").innerHTML = "UV Index: " + response.current.uvi;
                
                
                function getFiveDay(){


                    for (var i=1; i<6; i++){
                    
                    var futureDateResponse = (response.daily[i].dt);
                    var forecastDate = new Date(i);
                    forecastDate.setUTCSeconds(futureDateResponse);
                    var futureDate = forecastDate;
                    var forecastMonth = futureDate.getMonth()+1;
                    var forecastDay = futureDate.getDate();
                    var forecastYear = futureDate.getFullYear();


                    var dateOutput = forecastMonth + "/" + forecastDay + "/" + forecastYear

                   
                    var forecast = document.createElement("div")
                    forecast.classList.add("card")
                    forecast.setAttribute("id", "cards")
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
                }

                
               
            }

 getFiveDay();
               
                })

                })

            }
            
        }








getForecast();
   