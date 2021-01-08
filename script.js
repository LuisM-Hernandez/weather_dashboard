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
          
            $("#city-name").text(currentWeather.name);
            $("#temperature").text("Temperature: "+ currentWeather.main.temp + " °F");
            $("#humidity").text("Humidity: " + currentWeather.main.humidity + "%");
            $("#wind-speed").text("Wind Speed: " + currentWeather.wind.speed);
            // $("#UV-index").text(response)
        })

        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q="+ searchValue + "&units=imperial"+ "&appid=" + apiKey,
            dataType: "json"
        }).then(function(response){
            console.log(response);

        
            $("#day1").text(moment().add(1,"days").format("MM/DD/YY"));
            $("<img>").attr("src", "http://openweathermap.org/img/wn/10d@2x.png").appendTo("#day1");
            $("<div>").text("Temperature: "+ response.list[0].main.temp + " °F").appendTo("#day1");
            $("<div>").text("Humidity: "+ response.list[0].main.humidity + "%").appendTo("#day1");

        })
        
    }

});