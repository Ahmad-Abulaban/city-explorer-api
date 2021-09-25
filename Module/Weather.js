const axios = require("axios");
let cacheMemory = {};
function handleWeather(request, response) {
  let { city } = request.query;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;
  if (cacheMemory[city] !== undefined) {
    console.log("the cashe contain data ");
    console.log(cacheMemory);
    response.send(cacheMemory[city]);
  } else { 
      console.log("cache memory is empty hit the api");
    try {
      axios.get(url).then((results) => {
        const WeatherArray = results.data.data.map(
          (weather) => new Weather(weather)
        );
        cacheMemory[city] = WeatherArray;
        response.status(200).send(WeatherArray);
      });
    } catch (error) {
      console.log("something happend", error);
    }
  }
}

class Weather {
  constructor(weather) {
    this.date = weather.datetime;
    this.description = weather.weather.description;
  }
}

module.exports = handleWeather;
