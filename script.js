$(document).ready(function () {


    //TODO LIST TO FINISH:
    //ADD THE CITIES SEARCH TO LOCAL STORAGE. WHEN OPEN AGAIN I STILL HAVE THE LAST SEARCHED CITY
    //FIX APPENDING EACH TIME ANOTHER SEARCH IS DONE

    const apiKey = "003a409f77a14111e24eab0bc46c05ec";

    $("#search-button").on("click", function (e) {
        e.preventDefault();
        var searchValue = $("#city-input").val()
        console.log(searchValue);
        searchWeather(searchValue);
    })

    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial" + "&appid=" + apiKey,
            dataType: "json"
            

        }).then(function (currentWeather) {
            console.log(currentWeather)

            var currentTime = (moment().add(0,"days").format("MM/DD/YY"));
          // Need to fix position of icon
            $("<h3>").appendTo("#city-name").text(currentWeather.name + "  "+ currentTime)
            $("<img>").attr("src", "http://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png").appendTo("#city-name");
            $("#temperature").text("Temperature: "+ currentWeather.main.temp + " °F");
            $("#humidity").text("Humidity: " + currentWeather.main.humidity + "%");
            $("#wind-speed").text("Wind Speed: " + currentWeather.wind.speed);

            lat = currentWeather.coord.lat
            lon = currentWeather.coord.lon
            weatherLocation(lat,lon);
        });
        

     function weatherLocation(lat, lon){

         $.ajax({
             type: "GET",
             url: "http://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + lon + "&appid=" + apiKey,
             dataType: "json"
            }).then(function(uvInd){
                console.log(uvInd);
                
                //Need Fix: UV color only for the number background
                //Need to refactor to more DRY code
                $("#UV-index").text("UV Index: " + uvInd.value);

                if(uvInd.value >=3 && uvInd.value <=5){
                    $("#UV-index").attr("style", "background-color:yellow");
                }
                else if(uvInd.value >= 6 && uvInd.value <=7){
                    $("#UV-index").attr("style", "background-color:orange");
                }
                else if(uvInd.value >= 8){
                    $("#UV-index").attr("style", "background-color:red");
                }
                else {
                    $("#UV-index").attr("style", "background-color:green");
                }

            })
            
        }
            
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q="+ searchValue + "&units=imperial"+ "&appid=" + apiKey,
            dataType: "json"
        }).then(function(fiveDays){
            console.log(fiveDays);
            
            //Fix Need to refactor with forloop to optimize code lines

            $("#day1").text(moment().add(1,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDays.list[0].weather[0].icon + "@2x.png").appendTo("#day1");
            $("<div>").text("Temperature: "+ fiveDays.list[0].main.temp + " °F").appendTo("#day1");
            $("<div>").text("Humidity: "+ fiveDays.list[0].main.humidity + "%").appendTo("#day1");


            $("#day2").text(moment().add(2,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDays.list[6].weather[0].icon + "@2x.png").appendTo("#day2");
            $("<div>").text("Temperature: "+ fiveDays.list[6].main.temp + " °F").appendTo("#day2");
            $("<div>").text("Humidity: "+ fiveDays.list[6].main.humidity + "%").appendTo("#day2");

            $("#day3").text(moment().add(3,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDays.list[15].weather[0].icon + "@2x.png").appendTo("#day3");
            $("<div>").text("Temperature: "+ fiveDays.list[15].main.temp + " °F").appendTo("#day3");
            $("<div>").text("Humidity: "+ fiveDays.list[15].main.humidity + "%").appendTo("#day3");

            $("#day4").text(moment().add(4,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDays.list[23].weather[0].icon + "@2x.png").appendTo("#day4");
            $("<div>").text("Temperature: "+ fiveDays.list[23].main.temp + " °F").appendTo("#day4");
            $("<div>").text("Humidity: "+ fiveDays.list[23].main.humidity + "%").appendTo("#day4");

            $("#day5").text(moment().add(5,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDays.list[31].weather[0].icon + "@2x.png").appendTo("#day5");
            $("<div>").text("Temperature: "+ fiveDays.list[31].main.temp + " °F").appendTo("#day5");
            $("<div>").text("Humidity: "+ fiveDays.list[31].main.humidity + "%").appendTo("#day5");



        })
        
    }

});