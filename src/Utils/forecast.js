const request = require('request')

function forecast(latitude, longitude, callback){
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude + "&lon=" + longitude +"&appid=8a559b557cecd0fa7c2df53bdbf1586f&units=metric&exclude=minutely,hourly,daily"

    request({url, json: true}, (error, response) =>{
        if(error){
            callback("Unable to connnect to weather service!!", undefined)
        } else if(response.body.cod){
            callback("Please proive proper loction and try agian!!!", undefined)
        } else{
            callback(undefined, response)
        }
    })
}

// .body.current.weather[0].description + ". It is currently " +response.body.current.temp + " celcius out. There is a " + response.body.current.humidity + "% humidity."
module.exports = forecast