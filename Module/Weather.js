const axios = require("axios");

function handleWeather(request, response) {

    try{
    let { city} = request.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;

    axios.get(url).then(results => {
        const WeatherArray = results.data.data.map(weather => new Weather(weather));
        response.status(200).send(WeatherArray);
    })
    } catch(error){
       console.log('something happend', error);
}

}


class Weather{
    constructor(weather){
        this.date = weather.datetime;
        this.description = weather.weather.description;
        
    }
}

module.exports = handleWeather;