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
            url: "http://api.openweathermap.org/data/2.5/forecast?q="+ searchValue+ "&appid=" + apiKey,
            dataType: "json"
        }).then(function(response){
            console.log(response);

            var div1 = $("<div>")
            $("#day1").text(moment().add(1,"days").format("MM/DD/YY"))
            div1
            
            
            
            

        })
        
    }

});