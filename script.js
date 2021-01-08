$(document).ready(function () {

    const apiKey = "003a409f77a14111e24eab0bc46c05ec";

    $("#search-button").on("click", function () {
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
          
            $("#day1").text(moment().add(0,"days").format("MM/DD/YY"));

            $("#city-name").text(currentWeather.name)
            $("#temperature").text("Temperature: "+ currentWeather.main.temp + " °F");
            $("#humidity").text("Humidity: " + currentWeather.main.humidity + "%");
            $("#wind-speed").text("Wind Speed: " + currentWeather.wind.speed);
           

            
            lat = currentWeather.coord.lat
            lon = currentWeather.coord.lon
            weatherLocation(lat,lon);

        })
        

     function weatherLocation(lat, lon){

         
         $.ajax({
             type: "GET",
             url: "http://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + lon + "&appid=" + apiKey,
             dataType: "json"
            }).then(function(uvInd){
                console.log(uvInd);
                $("#UV-index").text("UV Index: " + uvInd.value);
                

            })
            
        }
            
            
            
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q="+ searchValue + "&units=imperial"+ "&appid=" + apiKey,
            dataType: "json"
        }).then(function(fiveDays){
            console.log(fiveDays);

            //Need to fix the icons make them change depending of weather

            $("#day1").text(moment().add(1,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/10d@2x.png").appendTo("#day1");
            $("<div>").text("Temperature: "+ fiveDays.list[0].main.temp + " °F").appendTo("#day1");
            $("<div>").text("Humidity: "+ fiveDays.list[0].main.humidity + "%").appendTo("#day1");


            $("#day2").text(moment().add(2,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/10d@2x.png").appendTo("#day2");
            $("<div>").text("Temperature: "+ fiveDays.list[7].main.temp + " °F").appendTo("#day2");
            $("<div>").text("Humidity: "+ fiveDays.list[7].main.humidity + "%").appendTo("#day2");

            $("#day3").text(moment().add(3,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/10d@2x.png").appendTo("#day3");
            $("<div>").text("Temperature: "+ fiveDays.list[15].main.temp + " °F").appendTo("#day3");
            $("<div>").text("Humidity: "+ fiveDays.list[15].main.humidity + "%").appendTo("#day3");

            $("#day4").text(moment().add(4,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/10d@2x.png").appendTo("#day4");
            $("<div>").text("Temperature: "+ fiveDays.list[23].main.temp + " °F").appendTo("#day4");
            $("<div>").text("Humidity: "+ fiveDays.list[23].main.humidity + "%").appendTo("#day4");

            $("#day5").text(moment().add(5,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/10d@2x.png").appendTo("#day5");
            $("<div>").text("Temperature: "+ fiveDays.list[31].main.temp + " °F").appendTo("#day5");
            $("<div>").text("Humidity: "+ fiveDays.list[31].main.humidity + "%").appendTo("#day5");



        })
        
    }

});